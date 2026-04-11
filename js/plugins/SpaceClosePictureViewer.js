/*:
 * @target MZ
 * @plugindesc 指定画像を前面表示し，スペースキーで閉じるプラグイン v1.0
 * @author ChatGPT
 *
 * @command showPictureViewer
 * @text 画像ビューア表示
 * @desc 指定した画像を画面前面に表示します．スペース，決定，キャンセルで閉じます．
 *
 * @arg fileName
 * @text 画像ファイル名
 * @type file
 * @dir img/pictures
 * @desc img/pictures 内の画像を拡張子なしで指定します．
 *
 * @arg closeSwitchId
 * @text 閉じた時にONにするスイッチ
 * @type switch
 * @default 0
 * @desc 0なら何もしません．1以上なら閉じた時にそのスイッチをONにします．
 *
 * @arg blockPlayer
 * @text 表示中にプレイヤー操作停止
 * @type boolean
 * @on 停止する
 * @off 停止しない
 * @default true
 *
 * @arg darkBackground
 * @text 背景を暗くする
 * @type boolean
 * @on 暗くする
 * @off 暗くしない
 * @default true
 *
 * @help
 * 【概要】
 * img/pictures の画像を画面前面に表示し，
 * スペースキー，Enterキー，Escキーで閉じられるプラグインです．
 *
 * 【使い方】
 * 1．このプラグインを導入
 * 2．イベントコマンドの「プラグインコマンド」から
 *    「画像ビューア表示」を実行
 * 3．表示したい画像を選ぶ
 *
 * 【対応キー】
 * ・スペースキー
 * ・Enterキー
 * ・Escキー
 * ・右クリック
 *
 * 【画像配置】
 * 画像は画面中央に表示され，
 * 画面内に収まるよう自動で縮小されます．
 *
 * 【注意】
 * 画像は img/pictures に入れてください．
 */

(() => {
    "use strict";

    const pluginName = "SpaceClosePictureViewer";

    function ensureSpaceMapper() {
        if (!Input.keyMapper[32]) {
            Input.keyMapper[32] = "space";
        }
    }

    PluginManager.registerCommand(pluginName, "showPictureViewer", args => {
        ensureSpaceMapper();

        const fileName = String(args.fileName || "").trim();
        const closeSwitchId = Number(args.closeSwitchId || 0);
        const blockPlayer = String(args.blockPlayer || "true") === "true";
        const darkBackground = String(args.darkBackground || "true") === "true";

        if (!fileName) {
            console.warn(`${pluginName}: 画像ファイル名が指定されていません．`);
            return;
        }

        $gameTemp._pictureViewerRequest = {
            fileName,
            closeSwitchId,
            blockPlayer,
            darkBackground
        };
    });

    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        this.createPictureViewerLayer();
    };

    Scene_Map.prototype.createPictureViewerLayer = function() {
        this._pictureViewerContainer = new Sprite();
        this._pictureViewerContainer.visible = false;
        this._pictureViewerContainer.z = 999999;

        this._pictureViewerBackground = new Sprite(
            new Bitmap(Graphics.width, Graphics.height)
        );
        this._pictureViewerBackground.bitmap.fillAll("rgba(0, 0, 0, 0.6)");
        this._pictureViewerBackground.visible = false;

        this._pictureViewerSprite = new Sprite();
        this._pictureViewerSprite.anchor.x = 0.5;
        this._pictureViewerSprite.anchor.y = 0.5;
        this._pictureViewerSprite.x = Graphics.width / 2;
        this._pictureViewerSprite.y = Graphics.height / 2;
        this._pictureViewerSprite.visible = false;

        this._pictureViewerContainer.addChild(this._pictureViewerBackground);
        this._pictureViewerContainer.addChild(this._pictureViewerSprite);
        this.addChild(this._pictureViewerContainer);

        this._pictureViewerActive = false;
        this._pictureViewerBlockPlayer = true;
        this._pictureViewerCloseSwitchId = 0;
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        this.updatePictureViewerRequest();
        this.updatePictureViewerInput();
    };

    Scene_Map.prototype.updatePictureViewerRequest = function() {
        const request = $gameTemp._pictureViewerRequest;
        if (!request) {
            return;
        }

        $gameTemp._pictureViewerRequest = null;
        this.openPictureViewer(request);
    };

    Scene_Map.prototype.openPictureViewer = function(request) {
        const bitmap = ImageManager.loadPicture(request.fileName);

        this._pictureViewerBlockPlayer = request.blockPlayer;
        this._pictureViewerCloseSwitchId = request.closeSwitchId || 0;

        this._pictureViewerBackground.visible = !!request.darkBackground;
        this._pictureViewerContainer.visible = true;
        this._pictureViewerSprite.visible = true;
        this._pictureViewerSprite.bitmap = bitmap;
        this._pictureViewerSprite.scale.x = 1;
        this._pictureViewerSprite.scale.y = 1;
        this._pictureViewerActive = true;

        bitmap.addLoadListener(() => {
            this.refreshPictureViewerScale();
        });
    };

    Scene_Map.prototype.refreshPictureViewerScale = function() {
        const sprite = this._pictureViewerSprite;
        const bitmap = sprite.bitmap;
        if (!bitmap || !bitmap.width || !bitmap.height) {
            return;
        }

        const maxWidth = Graphics.width * 0.95;
        const maxHeight = Graphics.height * 0.95;
        const scaleX = maxWidth / bitmap.width;
        const scaleY = maxHeight / bitmap.height;
        const scale = Math.min(scaleX, scaleY, 1.0);

        sprite.scale.x = scale;
        sprite.scale.y = scale;
        sprite.x = Graphics.width / 2;
        sprite.y = Graphics.height / 2;
    };

    Scene_Map.prototype.updatePictureViewerInput = function() {
        if (!this._pictureViewerActive) {
            return;
        }

        if (
            Input.isTriggered("space") ||
            Input.isTriggered("ok") ||
            Input.isTriggered("cancel") ||
            TouchInput.isCancelled() ||
            TouchInput.isTriggered()
        ) {
            this.closePictureViewer();
        }
    };

    Scene_Map.prototype.closePictureViewer = function() {
        this._pictureViewerActive = false;
        this._pictureViewerContainer.visible = false;
        this._pictureViewerBackground.visible = false;
        this._pictureViewerSprite.visible = false;
        this._pictureViewerSprite.bitmap = null;

        if (this._pictureViewerCloseSwitchId > 0) {
            $gameSwitches.setValue(this._pictureViewerCloseSwitchId, true);
        }

        this._pictureViewerCloseSwitchId = 0;
    };

    const _Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function() {
        const scene = SceneManager._scene;
        if (
            scene &&
            scene instanceof Scene_Map &&
            scene._pictureViewerActive &&
            scene._pictureViewerBlockPlayer
        ) {
            return false;
        }
        return _Game_Player_canMove.call(this);
    };

    const _Scene_Map_isMenuEnabled = Scene_Map.prototype.isMenuEnabled;
    Scene_Map.prototype.isMenuEnabled = function() {
        if (this._pictureViewerActive && this._pictureViewerBlockPlayer) {
            return false;
        }
        return _Scene_Map_isMenuEnabled.call(this);
    };
})();