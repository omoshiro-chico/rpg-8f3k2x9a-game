/*:
 * @target MZ
 * @plugindesc ガチャ演出用．イントロ背景フェードイン→本番背景フェード重ね＋中央ズーム＋周囲4体スライドイン＋ラスト5人ズーム＋オーバーレイ＋背景二段フェード＋最後キャラ切替＆Enter後の左下スライド＋ドアップ振動ズーム＋最後の追加4枚演出＋集中線演出＋ラスト2枚ズーム＆1枚回転フェード v24.6 preload修正版
 * @author You
 *
 * @command StartSceneSimple
 * @text シーン開始（即表示）
 * @desc 背景＋中央＋左上＋右上＋左下＋右下を一気に表示する（アニメなし）．
 *
 * @arg bgName
 * @type string
 * @text 背景画像名
 *
 * @arg centerName
 * @type string
 * @text 中央画像名
 *
 * @arg leftName
 * @type string
 * @text 左上画像名
 *
 * @arg rightName
 * @type string
 * @text 右上画像名
 *
 * @arg bottomLeftName
 * @type string
 * @text 左下画像名
 *
 * @arg bottomRightName
 * @type string
 * @text 右下画像名
 *
 * @command StartSceneGacha
 * @text シーン開始（全部入り演出）
 * @desc イントロ→本番背景→中央ズーム→4体スライド→5人ズーム→オーバーレイ→背景二段フェード→最後キャラ3枚→Enter後左下スライド→ドアップ振動＋最後4枚演出＋集中線演出→ラスト2枚ズーム＆1枚回転フェード．
 *
 * @arg gachaType
 * @type number
 * @text ガチャ設定番号（1〜4）
 * @default 1
 * @desc 1〜4で演出分岐．1＝外れ寄り，4＝大当たり寄り．
 *
 * @arg introBgName
 * @type string
 * @text イントロ背景画像名
 *
 * @arg bgName
 * @type string
 * @text 本番背景画像名
 *
 * @arg centerFirstName
 * @type string
 * @text 中央画像1（拡大用）
 *
 * @arg centerSecondName
 * @type string
 * @text 中央画像2（縮小後）
 *
 * @arg leftName
 * @type string
 * @text 左上画像名
 *
 * @arg rightName
 * @type string
 * @text 右上画像名
 *
 * @arg bottomLeftName
 * @type string
 * @text 左下画像名
 *
 * @arg bottomRightName
 * @type string
 * @text 右下画像名
 *
 * @arg slideDuration
 * @type number
 * @text 1体あたりのスライド時間
 * @default 20
 *
 * @arg centerZoomDuration
 * @type number
 * @text 中央ズーム時間
 * @default 120
 *
 * @arg waitAfterZoom
 * @type number
 * @text ズーム終了後の待ち時間
 * @default 10
 *
 * @arg waitBetweenCards
 * @type number
 * @text カード同士の間隔
 * @default 10
 *
 * @arg overlay1Name
 * @type string
 * @text オーバーレイ1
 *
 * @arg overlay2Name
 * @type string
 * @text オーバーレイ2
 *
 * @arg overlay3Name
 * @type string
 * @text オーバーレイ3
 *
 * @arg nextBgName
 * @type string
 * @text 切り替え後の背景1
 *
 * @arg extraBgName
 * @type string
 * @text 切り替え後の背景2
 *
 * @arg overlayDuration
 * @type number
 * @text オーバーレイ1枚の表示時間
 * @default 45
 *
 * @arg fadeDuration
 * @type number
 * @text 背景フェード時間
 * @default 60
 *
 * @arg finalWait
 * @type number
 * @text 2枚目背景後の待ち時間
 * @default 30
 *
 * @arg charChangeWait
 * @type number
 * @text キャラ1→2までの時間
 * @default 20
 *
 * @arg finalChar1Name
 * @type string
 * @text 最後のキャラ1
 *
 * @arg finalChar2Name
 * @type string
 * @text 最後のキャラ2
 *
 * @arg finalChar3Name
 * @type string
 * @text 最後のキャラ3（ドアップ用）
 *
 * @arg extraTopName
 * @type string
 * @text 最後：上側追加画像
 *
 * @arg extraBottomUpperName
 * @type string
 * @text 最後：下側（上）追加画像
 *
 * @arg extraBottomLowerName
 * @type string
 * @text 最後：下側（下）追加画像
 *
 * @arg extraFadeName
 * @type string
 * @text 最後：クロスフェード先画像
 *
 * @arg pairImage1Name
 * @type string
 * @text ラスト2枚：画像1
 *
 * @arg pairImage2Name
 * @type string
 * @text ラスト2枚：画像2
 *
 * @arg lastRotateName
 * @type string
 * @text ラスト：回転する画像1
 *
 * @arg lastRotate2Name
 * @type string
 * @text ラスト：回転する画像2
 *
 * @arg lastRotate3Name
 * @type string
 * @text ラスト：回転する画像3
 *
 * @arg lastRotate4Name
 * @type string
 * @text ラスト：回転する画像4
 *
 * @arg lastRotate5Name
 * @type string
 * @text ラスト：回転する画像5
 *
 * @arg soloRightName
 * @type string
 * @text スライドパターン用：右からだけ出る画像（新追加1）
 *
 * @arg soloLeftName
 * @type string
 * @text スライドパターン用：左からだけ出る画像（新追加2）
 *
 * @arg topEffectName
 * @type string
 * @text エフェクト時に上から出す画像
 *
 * @arg altBgName
 * @type string
 * @text ④用：本番背景差し替え
 *
 * @arg altExtraBgName
 * @type string
 * @text ④用：切り替え後背景2差し替え
 *
 * @arg altMeteorName
 * @type string
 * @text ④用：隕石画像差し替え
 *
 * @command ClearScene
 * @text シーン消去
 * @desc ピクチャ1〜20を消去し，ガチャ演出フラグも解除する．
 *
 * @param GachaBgmName
 * @type file
 * @dir audio/bgm
 * @text ガチャ演出用BGM
 * @desc Gacha_Anime演出中に流すBGM（演出開始〜終了まで）．空ならBGMは変えない．
 *
 * @param GachaBgmVolume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @text ガチャBGM音量
 *
 * @param GachaBgmPitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @text ガチャBGMピッチ
 *
 * @param GachaBgmPan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @text ガチャBGMパン
 *
 * @param HideGlideSeName
 * @type file
 * @dir audio/se
 * @text ヒデシロ滑空SE
 * @desc 中央画像1登場時に鳴らすSE．空なら鳴らない．
 *
 * @param HideGlideSeVolume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @text ヒデシロ滑空SE音量
 *
 * @param HideGlideSePitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @text ヒデシロ滑空SEピッチ
 *
 * @param HideGlideSePan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @text ヒデシロ滑空SEパン
 *
 * @param HideFlySeName
 * @type file
 * @dir audio/se
 * @text ヒデシロ飛ぶSE
 * @desc 中央ズーム完了後，中央画像2登場時に鳴らすSE．空なら鳴らない．
 *
 * @param HideFlySeVolume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @text ヒデシロ飛ぶSE音量
 *
 * @param HideFlySePitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @text ヒデシロ飛ぶSEピッチ
 *
 * @param HideFlySePan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @text ヒデシロ飛ぶSEパン
 *
 * @param OverlaySeName
 * @type file
 * @dir audio/se
 * @text オーバーレイSE
 * @desc オーバーレイ画像登場時に鳴らすSE．空なら鳴らない．
 *
 * @param OverlaySeVolume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @text オーバーレイSE音量
 *
 * @param OverlaySePitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @text オーバーレイSEピッチ
 *
 * @param OverlaySePan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @text オーバーレイSEパン
 *
 * @param FinalChar1SeName
 * @type file
 * @dir audio/se
 * @text 最後のキャラ1SE
 * @desc finalChar1登場時に鳴らすSE．空なら鳴らない．
 *
 * @param FinalChar1SeVolume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @text 最後のキャラ1SE音量
 *
 * @param FinalChar1SePitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @text 最後のキャラ1SEピッチ
 *
 * @param FinalChar1SePan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @text 最後のキャラ1SEパン
 *
 * @param SpaceOkSeName
 * @type file
 * @dir audio/se
 * @text スペース押下SE
 * @desc Enter（決定キー）で最後の演出に入る瞬間に鳴らすSE．空なら鳴らない．
 *
 * @param SpaceOkSeVolume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @text スペース押下SE音量
 *
 * @param SpaceOkSePitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @text スペース押下SEピッチ
 *
 * @param SpaceOkSePan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @text スペース押下SEパン
 *
 * @param FinalChar3SeName
 * @type file
 * @dir audio/se
 * @text 最後のキャラ3SE
 * @desc ドアップ用キャラ登場時に鳴らすSE．空なら鳴らない．
 *
 * @param FinalChar3SeVolume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @text 最後のキャラ3SE音量
 *
 * @param FinalChar3SePitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @text 最後のキャラ3SEピッチ
 *
 * @param FinalChar3SePan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @text 最後のキャラ3SEパン
 *
 * @param NobihameSeName
 * @type file
 * @dir audio/se
 * @text のびはめ波SE
 * @desc のびはめ波ピクチャ登場時に鳴らすSE．空なら鳴らない．
 *
 * @param NobihameSeVolume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @text のびはめ波SE音量
 *
 * @param NobihameSePitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @text のびはめ波SEピッチ
 *
 * @param NobihameSePan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @text のびはめ波SEパン
 *
 * @param Pair1SeName
 * @type file
 * @dir audio/se
 * @text ラスト2枚画像1SE
 * @desc ラスト2枚演出の画像1登場時に鳴らすSE．空なら鳴らない．
 *
 * @param Pair1SeVolume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @text ラスト2枚画像1SE音量
 *
 * @param Pair1SePitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @text ラスト2枚画像1SEピッチ
 *
 * @param Pair1SePan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @text ラスト2枚画像1SEパン
 *
 * @param TopEffectSeName
 * @type file
 * @dir audio/se
 * @text 上から出す画像SE
 * @desc エフェクト時に上から出す画像登場時に鳴らすSE．空なら鳴らない．
 *
 * @param TopEffectSeVolume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @text 上から出す画像SE音量
 *
 * @param TopEffectSePitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @text 上から出す画像SEピッチ
 *
 * @param TopEffectSePan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @text 上から出す画像SEパン
 */

(() => {
    "use strict";

    const PLUGIN_NAME = "Gacha_Anime";

    const params = PluginManager.parameters(PLUGIN_NAME);
    const GACHA_BGM = {
        name:   String(params["GachaBgmName"] || ""),
        volume: Number(params["GachaBgmVolume"] || 90),
        pitch:  Number(params["GachaBgmPitch"] || 100),
        pan:    Number(params["GachaBgmPan"] || 0),
    };

    function makeSeParam(base) {
        const name = String(params[base + "Name"] || "");
        if (!name) return null;
        return {
            name:   name,
            volume: Number(params[base + "Volume"] || 90),
            pitch:  Number(params[base + "Pitch"] || 100),
            pan:    Number(params[base + "Pan"] || 0),
        };
    }

    const SE_HIDE_GLIDE   = makeSeParam("HideGlideSe");
    const SE_HIDE_FLY     = makeSeParam("HideFlySe");
    const SE_OVERLAY      = makeSeParam("OverlaySe");
    const SE_FINAL_CHAR1  = makeSeParam("FinalChar1Se");
    const SE_SPACE_OK     = makeSeParam("SpaceOkSe");
    const SE_FINAL_CHAR3  = makeSeParam("FinalChar3Se");
    const SE_NOBIHAME     = makeSeParam("NobihameSe");
    const SE_PAIR1        = makeSeParam("Pair1Se");
    const SE_TOP_EFFECT   = makeSeParam("TopEffectSe");

    const BG_ID           = 1;
    const CENTER_ID       = 2;
    const LEFT_ID         = 3;
    const RIGHT_ID        = 4;
    const BOTTOM_LEFT_ID  = 5;
    const BOTTOM_RIGHT_ID = 6;
    const OVERLAY_ID      = 7;

    const EFFECT_PIC_ID         = 8;
    const EXTRA_BOTTOM_DOWN_ID  = 9;
    const EXTRA_BOTTOM_UP_ID    = 10;
    const FINAL_CENTER_ID       = 11;
    const EXTRA_TOP_ID          = 12;
    const EXTRA_FADE_ID         = 13;
    const BLINK_BG_ID           = 14;
    const SECOND_MOVING_PIC_ID  = 15;
    const MOVING_PIC_ID         = 16;

    const PAIR1_ID              = 17;
    const PAIR2_ID              = 18;
    const LAST_ROTATE_ID        = 19;
    const TOP_EFFECT_PIC_ID     = 20;

    const PRELOAD_WAIT_PHASE = -100;

    const FINAL_ZOOM_WAIT_FRAMES = 60;
    const FINAL_ZOOM_DURATION    = 50;
    const FINAL_ZOOM_SCALE       = 220;

    const FINAL_ZOOM_OFFSET_RATE_Y = 0.80;
    const FINAL_ZOOM_OFFSET_RATE_X = 1.50;

    const ENTER_SLIDE_DURATION      = 20;
    const ENTER_WAIT_AFTER_SLIDE    = 60;
    const ENTER_ZOOM_SHAKE_DURATION = 90;

    const EXTRA_ZOOM_OFFSET_RATE_X = 0.7;
    const EXTRA_ZOOM_OFFSET_RATE_Y = 0.7;

    const EFFECT_PIC_NAME       = "溜め";
    const EFFECT_PIC_X_RATE     = 0.4;
    const EFFECT_PIC_Y_RATE     = 0.6;
    const EFFECT_PIC_BASE_SCALE = 140;
    const EFFECT_ROTATE_SPEED   = 5;

    const SHAKE_BG_NAME   = "集中線1";
    const BLINK_BG_NAME   = "集中線2";
    const FINAL_BG_NAME   = "白";
    const MOVING_PIC_NAME = "のびはめ波";

    const MOVING_START_X_RATE = -0.50;
    const MOVING_START_Y_RATE = 1.50;
    const MOVING_UP_X_RATE    = 0.30;
    const MOVING_UP_Y_RATE    = 0.70;

    const MOVE_UP_FRAMES      = 100;
    const MOVING_WAIT_FRAMES  = 10;
    const MOVE_BACK_FRAMES    = 30;
    const MOVE_CENTER_FRAMES  = 30;

    const MOVING_CENTER_X_RATE = 0.20;
    const MOVING_CENTER_Y_RATE = 1.0;

    const SECOND_MOVING_PIC_NAME_DEFAULT  = "隕石";
    const SECOND_START_X_RATE     = 1.00;
    const SECOND_START_Y_RATE     = 0.00;
    const SECOND_CENTER_X_RATE    = 0.90;
    const SECOND_CENTER_Y_RATE    = 0.10;
    const SECOND_MOVE_FRAMES      = MOVE_CENTER_FRAMES;

    const SHAKE_SWITCH_DURATION = 40;
    const SHAKE_MAX_AMP         = 20;
    const BLINK_TOTAL_FRAMES    = 180;
    const BLINK_INTERVAL        = 2;

    const EXTRA_TOP_START_OFFSET_X = 1100;
    const EXTRA_TOP_START_OFFSET_Y = -700;
    const EXTRA_TOP_END_OFFSET_X   = 250;
    const EXTRA_TOP_END_OFFSET_Y   = -250;

    const EXTRA_BOTTOM_UP_START_OFFSET_X = 1100;
    const EXTRA_BOTTOM_UP_START_OFFSET_Y = -700;
    const EXTRA_BOTTOM_UP_END_OFFSET_X   = 250;
    const EXTRA_BOTTOM_UP_END_OFFSET_Y   = -250;

    const EXTRA_BOTTOM_DOWN_START_OFFSET_X = 1100;
    const EXTRA_BOTTOM_DOWN_START_OFFSET_Y = -700;
    const EXTRA_BOTTOM_DOWN_END_OFFSET_X   = 250;
    const EXTRA_BOTTOM_DOWN_END_OFFSET_Y   = -250;

    const LAST_SHRINK_SCALE = 70;
    const LAST_EXPAND_SCALE = 250;

    const LAST_CROSSFADE_DURATION = 40;

    const PAIR_ANIM_DURATION = 80;
    const PAIR1_ZOOM_SCALE   = 800;
    const PAIR2_ZOOM_SCALE   = 1000;

    const BEFORE_PAIR_WAIT_FRAMES = 60;
    const WAIT_AFTER_PAIR_TO_FINAL_BG = 20;

    const LAST_ROTATE_FADEIN_DURATION  = 60;
    const LAST_ROTATE_STAY_DURATION    = 20;
    const LAST_ROTATE_FADEOUT_DURATION = 60;
    const LAST_ROTATE_SPEED            = 0.05;

    function uniqueValidNames(names) {
        return [...new Set((names || []).filter(name => typeof name === "string" && name.length > 0))];
    }

    function loadPreloadPictureBitmap(name) {
        return ImageManager.loadBitmap("img/pictures/", name);
    }

    function loadPictureBitmaps(names) {
        return uniqueValidNames(names).map(name => loadPreloadPictureBitmap(name));
    }

    function areBitmapsReady(bitmaps) {
        if (!bitmaps || bitmaps.length === 0) return true;
        return bitmaps.every(bitmap => bitmap && bitmap.isReady());
    }

    function buildSimplePreloadPictureList(bgName, centerName, leftName, rightName, bottomLeftName, bottomRightName) {
        return uniqueValidNames([
            bgName,
            centerName,
            leftName,
            rightName,
            bottomLeftName,
            bottomRightName
        ]);
    }

    function buildGachaPreloadPictureList(args) {
        const effectiveType = Number(args.effectiveGachaType || 1);
        const mainBg = (effectiveType === 4 && args.useAltSet && args.altBgName) ? args.altBgName : args.bgName;
        const extraBg = (effectiveType === 4 && args.useAltSet && args.altExtraBgName) ? args.altExtraBgName : args.extraBgName;
        const meteorName = (effectiveType === 4 && args.altMeteorName) ? args.altMeteorName : SECOND_MOVING_PIC_NAME_DEFAULT;

        return uniqueValidNames([
            args.introBgName,
            mainBg,
            args.centerFirstName,
            args.centerSecondName,
            args.leftName,
            args.rightName,
            args.bottomLeftName,
            args.bottomRightName,
            args.overlay1Name,
            args.overlay2Name,
            args.overlay3Name,
            args.nextBgName,
            extraBg,
            args.finalChar1Name,
            args.finalChar2Name,
            args.finalChar3Name,
            args.extraTopName,
            args.extraBottomUpperName,
            args.extraBottomLowerName,
            args.extraFadeName,
            args.pairImage1Name,
            args.pairImage2Name,
            args.lastRotateName,
            args.lastRotate2Name,
            args.lastRotate3Name,
            args.lastRotate4Name,
            args.lastRotate5Name,
            args.soloRightName,
            args.soloLeftName,
            args.topEffectName,
            args.altBgName,
            args.altExtraBgName,
            args.altMeteorName,
            EFFECT_PIC_NAME,
            SHAKE_BG_NAME,
            BLINK_BG_NAME,
            FINAL_BG_NAME,
            MOVING_PIC_NAME,
            meteorName
        ]);
    }

    function showSceneSimple(bgName, centerName, leftName, rightName, bottomLeftName, bottomRightName) {
        const preloadNames = buildSimplePreloadPictureList(
            bgName,
            centerName,
            leftName,
            rightName,
            bottomLeftName,
            bottomRightName
        );
        loadPictureBitmaps(preloadNames);

        const screen = $gameScreen;
        const w = Graphics.width;
        const h = Graphics.height;

        if (bgName) {
            screen.showPicture(BG_ID, bgName, 0, 0, 0, 100, 100, 255, 0);
        }
        if (centerName) {
            screen.showPicture(CENTER_ID, centerName, 1, w / 2, h / 2, 50, 50, 255, 0);
        }
        if (leftName) {
            screen.showPicture(LEFT_ID, leftName, 1, w * 0.15, h * 0.3, 50, 50, 255, 0);
        }
        if (rightName) {
            screen.showPicture(RIGHT_ID, rightName, 1, w * 0.85, h * 0.3, 40, 40, 255, 0);
        }
        if (bottomLeftName) {
            screen.showPicture(BOTTOM_LEFT_ID, bottomLeftName, 1, w * 0.15, h * 0.75, 40, 40, 255, 0);
        }
        if (bottomRightName) {
            screen.showPicture(BOTTOM_RIGHT_ID, bottomRightName, 1, w * 0.85, h * 0.75, 40, 40, 255, 0);
        }
    }

    function stopGachaBgm(state) {
        if (state && state.bgmPlaying && GACHA_BGM.name) {
            AudioManager.stopBgm();
            state.bgmPlaying = false;
        }
    }

    Game_Screen.prototype.initGachaAnimeState = function() {
        if (!this._gachaAnimeState) {
            this._gachaAnimeState = { active: false };
        }
    };

    const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        if (this._waitMode === "gachaAnime") {
            return $gameScreen.isGachaAnimeActive();
        }
        return _Game_Interpreter_updateWaitMode.call(this);
    };

    function setupSingleChar(state) {
        const slots = [];
        if (state.leftName)        slots.push("left");
        if (state.rightName)       slots.push("right");
        if (state.bottomLeftName)  slots.push("bottomLeft");
        if (state.bottomRightName) slots.push("bottomRight");

        if (slots.length > 0) {
            const idx  = Math.floor(Math.random() * slots.length);
            const slot = slots[idx];
            state.singleCharSlot = slot;
            switch (slot) {
                case "left":
                    state.singleCharName = state.leftName;
                    break;
                case "right":
                    state.singleCharName = state.rightName;
                    break;
                case "bottomLeft":
                    state.singleCharName = state.bottomLeftName;
                    break;
                case "bottomRight":
                    state.singleCharName = state.bottomRightName;
                    break;
                default:
                    state.singleCharName = "";
                    break;
            }
        } else {
            state.singleCharSlot = null;
            state.singleCharName = "";
        }
    }

    function calcEffectiveGachaType(requestType) {
        const gt = Number(requestType || 1);
        const r = Math.random();
        if (gt === 4) {
            if (r < 0.85) return 4;
            if (r < 0.90) return 3;
            if (r < 0.95) return 2;
            return 1;
        } else if (gt === 3) {
            if (r < 0.90) return 3;
            if (r < 0.95) return 2;
            return 1;
        } else if (gt === 2) {
            if (r < 0.90) return 2;
            return 1;
        } else {
            return 1;
        }
    }

    function choosePatternType(state) {
        const hasLeft        = !!state.leftName;
        const hasRight       = !!state.rightName;
        const hasBottomLeft  = !!state.bottomLeftName;
        const hasBottomRight = !!state.bottomRightName;
        const hasPairTop     = hasLeft && hasRight;
        const hasPairBottom  = hasBottomLeft && hasBottomRight;
        const hasSoloLeft    = !!state.soloLeftName;
        const hasSoloRight   = !!state.soloRightName;

        const baseSinglePattern = (forceSingle = false) => {
            if (forceSingle) {
                setupSingleChar(state);
                return 10;
            }
            const pt = Math.random() < 0.5 ? 0 : 10;
            if (pt === 10) setupSingleChar(state);
            return pt;
        };

        const gt = state.gachaType || 1;

        if (gt === 1) {
            state.patternType = baseSinglePattern(true);
            return;
        }

        if (gt === 2) {
            const r = Math.random();
            if (r < 0.7 && (hasPairTop || hasPairBottom)) {
                const cand = [];
                if (hasPairTop)    cand.push(2);
                if (hasPairBottom) cand.push(3);
                state.patternType = cand[Math.floor(Math.random() * cand.length)];
            } else {
                state.patternType = baseSinglePattern();
            }
            return;
        }

        if (gt === 3) {
            if (hasSoloLeft && Math.random() < 0.7) {
                state.patternType = 5;
            } else {
                const r = Math.random();
                if (r < 0.7 && (hasPairTop || hasPairBottom)) {
                    const cand = [];
                    if (hasPairTop)    cand.push(2);
                    if (hasPairBottom) cand.push(3);
                    state.patternType = cand[Math.floor(Math.random() * cand.length)];
                } else {
                    state.patternType = baseSinglePattern();
                }
            }
            return;
        }

        if (gt === 4) {
            if (hasSoloRight && Math.random() < 0.5) {
                state.patternType = 4;
            } else {
                if (hasSoloLeft && Math.random() < 0.7) {
                    state.patternType = 5;
                } else {
                    const r = Math.random();
                    if (r < 0.7 && (hasPairTop || hasPairBottom)) {
                        const cand = [];
                        if (hasPairTop)    cand.push(2);
                        if (hasPairBottom) cand.push(3);
                        state.patternType = cand[Math.floor(Math.random() * cand.length)];
                    } else {
                        state.patternType = baseSinglePattern();
                    }
                }
            }
            return;
        }

        const patterns = [1];
        if (hasPairTop)    patterns.push(2);
        if (hasPairBottom) patterns.push(3);
        if (hasSoloRight)  patterns.push(4);
        if (hasSoloLeft)   patterns.push(5);
        state.patternType = patterns[Math.floor(Math.random() * patterns.length)];
    }

    function initializeGachaAnimeState(screen, setup) {
        const state = screen._gachaAnimeState;
        const w = Graphics.width;
        const h = Graphics.height;

        const introBg = setup.introBgName || "";
        state.introBgName = introBg;

        state.mainBgName  = setup.bgName || "";
        state.nextBgName  = setup.nextBgName || "";
        state.extraBgName = setup.extraBgName || "";

        state.requestGachaType = setup.requestGachaType;
        state.gachaType        = setup.effectiveGachaType;

        state.secondMovingPicName = SECOND_MOVING_PIC_NAME_DEFAULT;
        if (state.gachaType === 4 && setup.useAltSet) {
            if (setup.altBgName)      state.mainBgName = setup.altBgName;
            if (setup.altExtraBgName) state.extraBgName = setup.altExtraBgName;
            if (setup.altMeteorName)  state.secondMovingPicName = setup.altMeteorName;
        } else if (setup.altMeteorName && state.gachaType === 4) {
            state.secondMovingPicName = setup.altMeteorName;
        }

        const introName = setup.centerFirstName || setup.centerSecondName || "";
        const finalName = setup.centerSecondName || setup.centerFirstName || "";

        state.active             = true;
        state.awaitFinalInput    = false;
        state.preloading         = false;
        state.preloadBitmaps     = [];
        state.preloadStarted     = false;

        state.baseCenterX        = w / 2;
        state.baseCenterY        = h / 2;

        if (introBg) {
            state.phase = -2;
        } else if (state.mainBgName) {
            screen.showPicture(BG_ID, state.mainBgName, 0, 0, 0, 100, 100, 255, 0);
            state.phase = 0;
        } else {
            state.phase = 0;
        }

        state.frame              = 0;
        state.crossFrame         = 0;
        state.fadeDuration       = setup.fadeDuration;
        state.centerZoomDuration = setup.centerZoomDuration;
        state.waitAfterZoom      = setup.waitAfterZoom;
        state.slideDuration      = setup.slideDuration;
        state.waitBetweenCard    = setup.waitBetweenCards;

        state.centerIntroName    = introName;
        state.centerFinalName    = finalName;
        state.leftName           = setup.leftName || "";
        state.rightName          = setup.rightName || "";
        state.bottomLeftName     = setup.bottomLeftName || "";
        state.bottomRightName    = setup.bottomRightName || "";
        state.finalZoomFrame     = 0;

        state.overlayNames = [
            setup.overlay1Name || "",
            setup.overlay2Name || "",
            setup.overlay3Name || ""
        ];
        state.overlayDuration = setup.overlayDuration;
        state.overlayIndex    = 0;
        state.overlayFrame    = 0;

        state.finalWaitDuration = setup.finalWait;
        state.charChangeWait    = setup.charChangeWait;
        state.finalChar1Name    = setup.finalChar1Name || "";
        state.finalChar2Name    = setup.finalChar2Name || "";
        state.finalChar3Name    = setup.finalChar3Name || "";

        state.extraTopName        = setup.extraTopName || "";
        state.extraBottomUpName   = setup.extraBottomUpperName || "";
        state.extraBottomDownName = setup.extraBottomLowerName || "";
        state.extraFadeName       = setup.extraFadeName || "";

        state.pairImage1Name = setup.pairImage1Name || "";
        state.pairImage2Name = setup.pairImage2Name || "";

        state.lastRotateName         = setup.lastRotateName || "";
        state.lastRotate2Name        = setup.lastRotate2Name || "";
        state.lastRotate3Name        = setup.lastRotate3Name || "";
        state.lastRotate4Name        = setup.lastRotate4Name || "";
        state.lastRotate5Name        = setup.lastRotate5Name || "";
        state.lastRotateSelectedName = "";

        state.soloRightName = setup.soloRightName || "";
        state.soloLeftName  = setup.soloLeftName || "";
        state.topEffectName = setup.topEffectName || "";

        state.enterBaseX       = state.baseCenterX;
        state.enterBaseY       = state.baseCenterY;
        state.enterZoomStarted = false;
        state.zoomStartX       = state.baseCenterX;
        state.zoomStartY       = state.baseCenterY;
        state.zoomEndX         = state.baseCenterX;
        state.zoomEndY         = state.baseCenterY;

        state.movingPhase        = 0;
        state.movingFrame        = 0;
        state.movingDone         = false;
        state.secondMovingActive = false;
        state.secondMovingFrame  = 0;
        state.secondMovingDone   = false;

        state.singleCharName = "";
        state.singleCharSlot = null;

        choosePatternType(state);

        state.enablePair = false;
        if (state.gachaType === 1) {
            state.enablePair = false;
        } else if (state.gachaType === 2 || state.gachaType === 3) {
            state.enablePair = Math.random() < 0.7;
        } else if (state.gachaType === 4) {
            state.enablePair = true;
        }

        state.bgmPlaying = false;
        if (GACHA_BGM.name) {
            AudioManager.playBgm(GACHA_BGM);
            state.bgmPlaying = true;
        }
    }

    Game_Screen.prototype.startGachaAnime = function(
        introBgName,
        bgName,
        centerFirstName,
        centerSecondName,
        leftName,
        rightName,
        bottomLeftName,
        bottomRightName,
        slideDuration,
        centerZoomDuration,
        waitAfterZoom,
        waitBetweenCards,
        overlay1Name,
        overlay2Name,
        overlay3Name,
        nextBgName,
        extraBgName,
        overlayDuration,
        fadeDuration,
        finalWait,
        charChangeWait,
        finalChar1Name,
        finalChar2Name,
        finalChar3Name,
        extraTopName,
        extraBottomUpperName,
        extraBottomLowerName,
        extraFadeName,
        pairImage1Name,
        pairImage2Name,
        lastRotateName,
        lastRotate2Name,
        lastRotate3Name,
        lastRotate4Name,
        lastRotate5Name,
        soloRightName,
        soloLeftName,
        topEffectName,
        gachaType,
        altBgName,
        altExtraBgName,
        altMeteorName
    ) {
        this.initGachaAnimeState();
        const state = this._gachaAnimeState;

        const slideD    = Math.max(1, slideDuration || 20);
        const zoomD     = Math.max(1, centerZoomDuration || 120);
        const waitZoom  = Math.max(0, waitAfterZoom || 10);
        const betweenW  = Math.max(0, waitBetweenCards || 10);
        const overlayD  = Math.max(1, overlayDuration || 45);
        const fadeD     = Math.max(1, fadeDuration || 60);
        const finalW    = Math.max(0, finalWait || 30);
        const charW     = Math.max(1, charChangeWait || 20);

        this.erasePicture(BG_ID);
        this.erasePicture(CENTER_ID);
        this.erasePicture(LEFT_ID);
        this.erasePicture(RIGHT_ID);
        this.erasePicture(BOTTOM_LEFT_ID);
        this.erasePicture(BOTTOM_RIGHT_ID);
        this.erasePicture(OVERLAY_ID);
        this.erasePicture(EFFECT_PIC_ID);
        this.erasePicture(EXTRA_BOTTOM_DOWN_ID);
        this.erasePicture(EXTRA_BOTTOM_UP_ID);
        this.erasePicture(FINAL_CENTER_ID);
        this.erasePicture(EXTRA_TOP_ID);
        this.erasePicture(EXTRA_FADE_ID);
        this.erasePicture(BLINK_BG_ID);
        this.erasePicture(MOVING_PIC_ID);
        this.erasePicture(SECOND_MOVING_PIC_ID);
        this.erasePicture(PAIR1_ID);
        this.erasePicture(PAIR2_ID);
        this.erasePicture(LAST_ROTATE_ID);
        this.erasePicture(TOP_EFFECT_PIC_ID);

        stopGachaBgm(state);

        const requestType = Number(gachaType || 1);
        const effectiveGachaType = calcEffectiveGachaType(requestType);
        const useAltSet = effectiveGachaType === 4 && Math.random() < 0.7;

        const setup = {
            requestGachaType: requestType,
            effectiveGachaType,
            useAltSet,

            introBgName: String(introBgName || ""),
            bgName: String(bgName || ""),
            centerFirstName: String(centerFirstName || ""),
            centerSecondName: String(centerSecondName || ""),
            leftName: String(leftName || ""),
            rightName: String(rightName || ""),
            bottomLeftName: String(bottomLeftName || ""),
            bottomRightName: String(bottomRightName || ""),
            overlay1Name: String(overlay1Name || ""),
            overlay2Name: String(overlay2Name || ""),
            overlay3Name: String(overlay3Name || ""),
            nextBgName: String(nextBgName || ""),
            extraBgName: String(extraBgName || ""),
            finalChar1Name: String(finalChar1Name || ""),
            finalChar2Name: String(finalChar2Name || ""),
            finalChar3Name: String(finalChar3Name || ""),
            extraTopName: String(extraTopName || ""),
            extraBottomUpperName: String(extraBottomUpperName || ""),
            extraBottomLowerName: String(extraBottomLowerName || ""),
            extraFadeName: String(extraFadeName || ""),
            pairImage1Name: String(pairImage1Name || ""),
            pairImage2Name: String(pairImage2Name || ""),
            lastRotateName: String(lastRotateName || ""),
            lastRotate2Name: String(lastRotate2Name || ""),
            lastRotate3Name: String(lastRotate3Name || ""),
            lastRotate4Name: String(lastRotate4Name || ""),
            lastRotate5Name: String(lastRotate5Name || ""),
            soloRightName: String(soloRightName || ""),
            soloLeftName: String(soloLeftName || ""),
            topEffectName: String(topEffectName || ""),
            altBgName: String(altBgName || ""),
            altExtraBgName: String(altExtraBgName || ""),
            altMeteorName: String(altMeteorName || ""),

            slideDuration: slideD,
            centerZoomDuration: zoomD,
            waitAfterZoom: waitZoom,
            waitBetweenCards: betweenW,
            overlayDuration: overlayD,
            fadeDuration: fadeD,
            finalWait: finalW,
            charChangeWait: charW
        };

        const preloadList = buildGachaPreloadPictureList(setup);

        state.active = true;
        state.awaitFinalInput = false;
        state.preloading = true;
        state.preloadStarted = true;
        state.preloadBitmaps = loadPictureBitmaps(preloadList);
        state.pendingSetup = setup;
        state.phase = PRELOAD_WAIT_PHASE;
        state.frame = 0;
        state.crossFrame = 0;
        state.bgmPlaying = false;
    };

    function updateMovingPic(screen, state, w, h) {
        if (!MOVING_PIC_NAME) return;

        const meteorName = state.secondMovingPicName || SECOND_MOVING_PIC_NAME_DEFAULT;

        const startX  = w * MOVING_START_X_RATE;
        const startY  = h * MOVING_START_Y_RATE;
        const upX     = w * MOVING_UP_X_RATE;
        const upY     = h * MOVING_UP_Y_RATE;
        const centerX = w * MOVING_CENTER_X_RATE;
        const centerY = h * MOVING_CENTER_Y_RATE;

        if (state.movingPhase === 0) {
            state.movingPhase = 1;
            state.movingFrame = 0;
            screen.showPicture(MOVING_PIC_ID, MOVING_PIC_NAME, 1, startX, startY, 100, 100, 255, 0);
            if (SE_NOBIHAME) AudioManager.playSe(SE_NOBIHAME);
        }

        if (state.movingDone) return;

        let fromX, fromY, toX, toY, dur;

        switch (state.movingPhase) {
            case 1:
                fromX = startX;
                fromY = startY;
                toX   = upX;
                toY   = upY;
                dur   = MOVE_UP_FRAMES;
                break;
            case 2:
                fromX = upX;
                fromY = upY;
                toX   = upX;
                toY   = upY;
                dur   = MOVING_WAIT_FRAMES;
                break;
            case 3:
                fromX = upX;
                fromY = upY;
                toX   = startX;
                toY   = startY;
                dur   = MOVE_BACK_FRAMES;
                break;
            case 4:
                fromX = startX;
                fromY = startY;
                toX   = centerX;
                toY   = centerY;
                dur   = MOVE_CENTER_FRAMES;
                break;
            default:
                state.movingDone = true;
                screen.showPicture(MOVING_PIC_ID, MOVING_PIC_NAME, 1, centerX, centerY, 100, 100, 255, 0);
                return;
        }

        const t     = state.movingFrame;
        const ratio = dur > 0 ? Math.min(1.0, t / dur) : 1.0;

        const baseX = fromX + (toX - fromX) * ratio;
        const baseY = fromY + (toY - fromY) * ratio;

        const maxAmp = 8;
        const amp    = maxAmp * (1.0 - ratio);
        const dx     = (Math.random() * 2 - 1) * amp;
        const dy     = (Math.random() * 2 - 1) * amp;

        screen.movePicture(MOVING_PIC_ID, 1, baseX + dx, baseY + dy, 100, 100, 255, 0, 1);

        if (state.movingPhase === 4 && meteorName) {
            const sStartX  = w * SECOND_START_X_RATE;
            const sStartY  = h * SECOND_START_Y_RATE;
            const sCenterX = w * SECOND_CENTER_X_RATE;
            const sCenterY = h * SECOND_CENTER_Y_RATE;

            if (!state.secondMovingActive) {
                state.secondMovingActive = true;
                state.secondMovingFrame  = 0;
                screen.showPicture(SECOND_MOVING_PIC_ID, meteorName, 1, sStartX, sStartY, 100, 100, 255, 0);
            }

            if (!state.secondMovingDone) {
                const st   = state.secondMovingFrame;
                const sDur = SECOND_MOVE_FRAMES;
                const sRat = sDur > 0 ? Math.min(1.0, st / sDur) : 1.0;

                const sBaseX = sStartX + (sCenterX - sStartX) * sRat;
                const sBaseY = sStartY + (sCenterY - sStartY) * sRat;

                const sAmp = 6 * (1.0 - sRat);
                const sdx  = (Math.random() * 2 - 1) * sAmp;
                const sdy  = (Math.random() * 2 - 1) * sAmp;

                screen.movePicture(SECOND_MOVING_PIC_ID, 1, sBaseX + sdx, sBaseY + sdy, 100, 100, 255, 0, 1);

                state.secondMovingFrame++;

                if (state.secondMovingFrame > sDur) {
                    state.secondMovingDone = true;
                    screen.showPicture(SECOND_MOVING_PIC_ID, meteorName, 1, sCenterX, sCenterY, 100, 100, 255, 0);
                }
            }
        }

        state.movingFrame++;

        if (state.movingFrame > dur) {
            state.movingPhase++;
            state.movingFrame = 0;
            if (state.movingPhase > 4) {
                state.movingDone = true;
                screen.showPicture(MOVING_PIC_ID, MOVING_PIC_NAME, 1, centerX, centerY, 100, 100, 255, 0);
            }
        }
    }

    Game_Screen.prototype.updateGachaAnime = function() {
        this.initGachaAnimeState();
        const state = this._gachaAnimeState;
        if (!state.active) return;

        if (state.phase === PRELOAD_WAIT_PHASE) {
            if (!areBitmapsReady(state.preloadBitmaps)) {
                return;
            }
            initializeGachaAnimeState(this, state.pendingSetup);
            state.pendingSetup = null;
            return;
        }

        const screen = this;
        const w = Graphics.width;
        const h = Graphics.height;

        if (EFFECT_ROTATE_SPEED !== 0) {
            const effPic = screen.picture(EFFECT_PIC_ID);
            if (effPic) effPic.rotate(EFFECT_ROTATE_SPEED);
        }

        if (LAST_ROTATE_SPEED !== 0) {
            const lastPic = screen.picture(LAST_ROTATE_ID);
            if (lastPic) lastPic.rotate(LAST_ROTATE_SPEED);
        }

        state.frame++;

        if (state.phase === -2) {
            const introBg = state.introBgName;
            if (!introBg) {
                state.phase = 0;
                state.frame = 0;
                return;
            }

            if (state.crossFrame === 0) {
                screen.showPicture(BG_ID, introBg, 0, 0, 0, 100, 100, 0, 0);
                screen.movePicture(BG_ID, 0, 0, 0, 100, 100, 255, 0, state.fadeDuration);
            }

            state.crossFrame++;

            if (state.crossFrame >= state.fadeDuration) {
                screen.showPicture(BG_ID, introBg, 0, 0, 0, 100, 100, 255, 0);
                state.phase      = state.mainBgName ? -1 : 0;
                state.frame      = 0;
                state.crossFrame = 0;
            }
        } else if (state.phase === -1) {
            const mainBg = state.mainBgName;
            if (!mainBg) {
                state.phase = 0;
                state.frame = 0;
                return;
            }

            if (state.crossFrame === 0) {
                screen.showPicture(OVERLAY_ID, mainBg, 0, 0, 0, 100, 100, 0, 0);
                screen.movePicture(OVERLAY_ID, 0, 0, 0, 100, 100, 255, 0, state.fadeDuration);
            }

            state.crossFrame++;

            if (state.crossFrame >= state.fadeDuration) {
                screen.showPicture(BG_ID, mainBg, 0, 0, 0, 100, 100, 255, 0);
                screen.erasePicture(OVERLAY_ID);

                state.phase      = 0;
                state.frame      = 0;
                state.crossFrame = 0;
            }
        } else if (state.phase === 0) {
            if (state.frame === 1 && state.centerIntroName) {
                screen.showPicture(CENTER_ID, state.centerIntroName, 1, w / 2, h / 2, 120, 120, 255, 0);
                screen.movePicture(CENTER_ID, 1, w / 2, h / 2, 50, 50, 255, 0, state.centerZoomDuration);
                if (SE_HIDE_GLIDE) AudioManager.playSe(SE_HIDE_GLIDE);
            }

            if (state.frame === state.centerZoomDuration) {
                if (state.centerFinalName && state.centerFinalName !== state.centerIntroName) {
                    screen.showPicture(CENTER_ID, state.centerFinalName, 1, w / 2, h / 2, 50, 50, 255, 0);
                    if (SE_HIDE_FLY) AudioManager.playSe(SE_HIDE_FLY);
                }
            }

            if (state.frame >= state.centerZoomDuration + state.waitAfterZoom) {
                state.phase = 1;
                state.frame = 0;
            }
        } else if (state.phase === 1) {
            if (state.patternType === 10) {
                if (state.frame === 1 && state.singleCharName) {
                    AudioManager.playSe({ name: "Wind7", volume: 90, pitch: 100, pan: 0 });

                    let picId   = LEFT_ID;
                    let startX  = -w * 0.3;
                    let targetX = w * 0.15;
                    let targetY = h * 0.3;

                    switch (state.singleCharSlot) {
                        case "right":
                            picId   = RIGHT_ID;
                            startX  = w * 1.3;
                            targetX = w * 0.85;
                            targetY = h * 0.3;
                            break;
                        case "bottomLeft":
                            picId   = BOTTOM_LEFT_ID;
                            startX  = -w * 0.3;
                            targetX = w * 0.15;
                            targetY = h * 0.75;
                            break;
                        case "bottomRight":
                            picId   = BOTTOM_RIGHT_ID;
                            startX  = w * 1.3;
                            targetX = w * 0.85;
                            targetY = h * 0.75;
                            break;
                        case "left":
                        default:
                            picId   = LEFT_ID;
                            startX  = -w * 0.3;
                            targetX = w * 0.15;
                            targetY = h * 0.3;
                            break;
                    }

                    screen.showPicture(picId, state.singleCharName, 1, startX, targetY, 50, 50, 255, 0);
                    screen.movePicture(picId, 1, targetX, targetY, 50, 50, 255, 0, state.slideDuration);
                }

                if (state.frame >= state.slideDuration + state.waitBetweenCard) {
                    state.phase = 5;
                    state.frame = 0;
                }
                return;
            }

            if (state.patternType === 0) {
                state.phase = 5;
                state.frame = 0;
                return;
            }

            if (state.frame === 1) {
                let name = null;
                let startX = 0;
                let targetX = 0;
                let targetY = 0;

                switch (state.patternType) {
                    case 1:
                    case 2:
                        name    = state.leftName;
                        startX  = -w * 0.3;
                        targetX = w * 0.15;
                        targetY = h * 0.3;
                        break;
                    case 3:
                        name    = state.bottomLeftName;
                        startX  = -w * 0.3;
                        targetX = w * 0.15;
                        targetY = h * 0.3;
                        break;
                    case 5:
                        name    = state.soloLeftName;
                        startX  = -w * 0.3;
                        targetX = w * 0.15;
                        targetY = h * 0.3;
                        break;
                    case 4:
                    default:
                        name = null;
                        break;
                }

                if (name) {
                    AudioManager.playSe({ name: "Wind7", volume: 90, pitch: 100, pan: 0 });
                    screen.showPicture(LEFT_ID, name, 1, startX, targetY, 50, 50, 255, 0);
                    screen.movePicture(LEFT_ID, 1, targetX, targetY, 50, 50, 255, 0, state.slideDuration);
                }
            }

            const pic = screen.picture(LEFT_ID);
            const finished = state.frame >= state.slideDuration + state.waitBetweenCard || !pic;
            if (finished) {
                state.phase = 2;
                state.frame = 0;
            }
        } else if (state.phase === 2) {
            if (state.patternType === 0 || state.patternType === 10) {
                state.phase = 5;
                state.frame = 0;
                return;
            }

            if (state.frame === 1) {
                let name = null;
                let startX = 0;
                let targetX = 0;
                let targetY = 0;

                switch (state.patternType) {
                    case 1:
                    case 2:
                        name    = state.rightName;
                        startX  = w * 1.3;
                        targetX = w * 0.85;
                        targetY = h * 0.3;
                        break;
                    case 3:
                        name    = state.bottomRightName;
                        startX  = w * 1.3;
                        targetX = w * 0.85;
                        targetY = h * 0.3;
                        break;
                    case 4:
                        name    = state.soloRightName || state.rightName;
                        startX  = w * 1.3;
                        targetX = w * 0.85;
                        targetY = h * 0.3;
                        break;
                    case 5:
                    default:
                        name = null;
                        break;
                }

                if (name) {
                    AudioManager.playSe({ name: "Wind7", volume: 90, pitch: 100, pan: 0 });
                    screen.showPicture(RIGHT_ID, name, 1, startX, targetY, 50, 50, 255, 0);
                    screen.movePicture(RIGHT_ID, 1, targetX, targetY, 50, 50, 255, 0, state.slideDuration);
                }
            }

            const pic = screen.picture(RIGHT_ID);
            const finished = state.frame >= state.slideDuration + state.waitBetweenCard || !pic;
            if (finished) {
                state.phase = 3;
                state.frame = 0;
            }
        } else if (state.phase === 3) {
            if (state.patternType !== 1) {
                state.phase = 4;
                state.frame = 0;
                return;
            }

            if (state.frame === 1 && state.bottomLeftName) {
                AudioManager.playSe({ name: "Wind7", volume: 90, pitch: 100, pan: 0 });
                const startX  = -w * 0.3;
                const targetX = w * 0.15;
                const targetY = h * 0.75;
                screen.showPicture(BOTTOM_LEFT_ID, state.bottomLeftName, 1, startX, targetY, 50, 50, 255, 0);
                screen.movePicture(BOTTOM_LEFT_ID, 1, targetX, targetY, 50, 50, 255, 0, state.slideDuration);
            }
            if (state.frame >= state.slideDuration + state.waitBetweenCard) {
                state.phase = 4;
                state.frame = 0;
            }
        } else if (state.phase === 4) {
            if (state.patternType !== 1) {
                state.phase          = 5;
                state.frame          = 0;
                state.finalZoomFrame = 0;
                return;
            }

            if (state.frame === 1 && state.bottomRightName) {
                AudioManager.playSe({ name: "Wind7", volume: 90, pitch: 100, pan: 0 });
                const startX  = w * 1.3;
                const targetX = w * 0.85;
                const targetY = h * 0.75;
                screen.showPicture(BOTTOM_RIGHT_ID, state.bottomRightName, 1, startX, targetY, 50, 50, 255, 0);
                screen.movePicture(BOTTOM_RIGHT_ID, 1, targetX, targetY, 50, 50, 255, 0, state.slideDuration);
            }
            if (state.frame >= state.slideDuration) {
                state.phase          = 5;
                state.frame          = 0;
                state.finalZoomFrame = 0;
            }
        } else if (state.phase === 5) {
            state.finalZoomFrame++;
            if (state.finalZoomFrame >= FINAL_ZOOM_WAIT_FRAMES) {
                const offsetY = h * FINAL_ZOOM_OFFSET_RATE_Y;
                const offsetX = w * FINAL_ZOOM_OFFSET_RATE_X;

                if (screen.picture(CENTER_ID)) {
                    screen.movePicture(CENTER_ID, 1, w / 2, h / 2 + offsetY, FINAL_ZOOM_SCALE, FINAL_ZOOM_SCALE, 255, 0, FINAL_ZOOM_DURATION);
                }
                if (screen.picture(LEFT_ID)) {
                    screen.movePicture(LEFT_ID, 1, w * 0.15 - offsetX, h * 0.3 + offsetY, FINAL_ZOOM_SCALE, FINAL_ZOOM_SCALE, 255, 0, FINAL_ZOOM_DURATION);
                }
                if (screen.picture(RIGHT_ID)) {
                    screen.movePicture(RIGHT_ID, 1, w * 0.85 + offsetX, h * 0.3 + offsetY, FINAL_ZOOM_SCALE, FINAL_ZOOM_SCALE, 255, 0, FINAL_ZOOM_DURATION);
                }
                if (screen.picture(BOTTOM_LEFT_ID)) {
                    screen.movePicture(BOTTOM_LEFT_ID, 1, w * 0.15 - offsetX, h * 0.75 + offsetY, FINAL_ZOOM_SCALE, FINAL_ZOOM_SCALE, 255, 0, FINAL_ZOOM_DURATION);
                }
                if (screen.picture(BOTTOM_RIGHT_ID)) {
                    screen.movePicture(BOTTOM_RIGHT_ID, 1, w * 0.85 + offsetX, h * 0.75 + offsetY, FINAL_ZOOM_SCALE, FINAL_ZOOM_SCALE, 255, 0, FINAL_ZOOM_DURATION);
                }

                state.phase          = 6;
                state.finalZoomFrame = 0;
            }
        } else if (state.phase === 6) {
            state.finalZoomFrame++;
            if (state.finalZoomFrame >= FINAL_ZOOM_DURATION) {
                state.phase        = 7;
                state.overlayIndex = 0;
                state.overlayFrame = 0;
            }
        } else if (state.phase === 7) {
            const names = state.overlayNames || [];
            if (state.overlayIndex >= names.length) {
                state.phase      = 8;
                state.crossFrame = 0;
                return;
            }

            const name = names[state.overlayIndex];

            if (!name) {
                state.overlayIndex++;
                state.overlayFrame = 0;
                if (state.overlayIndex >= names.length) {
                    state.phase      = 8;
                    state.crossFrame = 0;
                }
                return;
            }

            if (state.overlayFrame === 0) {
                screen.showPicture(OVERLAY_ID, name, 1, w / 2, h / 2, 100, 100, 255, 0);
                if (state.overlayIndex === 1) {
                    screen.erasePicture(CENTER_ID);
                }
                if (SE_OVERLAY) AudioManager.playSe(SE_OVERLAY);
            }

            state.overlayFrame++;

            if (state.overlayFrame >= state.overlayDuration) {
                state.overlayIndex++;
                state.overlayFrame = 0;
                if (state.overlayIndex >= names.length) {
                    state.phase      = 8;
                    state.crossFrame = 0;
                }
            }
        } else if (state.phase === 8) {
            const nextBg = state.nextBgName;
            if (!nextBg) {
                state.phase      = 9;
                state.crossFrame = 0;
                state.frame      = 0;
                return;
            }

            if (state.crossFrame === 0) {
                screen.showPicture(OVERLAY_ID, nextBg, 0, 0, 0, 100, 100, 0, 0);
                screen.movePicture(OVERLAY_ID, 0, 0, 0, 100, 100, 255, 0, state.fadeDuration);
            }

            state.crossFrame++;

            if (state.crossFrame >= state.fadeDuration) {
                screen.showPicture(BG_ID, nextBg, 0, 0, 0, 100, 100, 255, 0);
                screen.erasePicture(OVERLAY_ID);

                screen.erasePicture(CENTER_ID);
                screen.erasePicture(LEFT_ID);
                screen.erasePicture(RIGHT_ID);
                screen.erasePicture(BOTTOM_LEFT_ID);
                screen.erasePicture(BOTTOM_RIGHT_ID);

                state.phase      = 9;
                state.crossFrame = 0;
                state.frame      = 0;
            }
        } else if (state.phase === 9) {
            const extraBg = state.extraBgName;
            if (!extraBg) {
                state.phase = 10;
                state.frame = 0;
                return;
            }

            if (state.crossFrame === 0) {
                screen.showPicture(OVERLAY_ID, extraBg, 0, 0, 0, 100, 100, 0, 0);
                screen.movePicture(OVERLAY_ID, 0, 0, 0, 100, 100, 255, 0, state.fadeDuration);
            }

            state.crossFrame++;

            if (state.crossFrame >= state.fadeDuration) {
                screen.showPicture(BG_ID, extraBg, 0, 0, 0, 100, 100, 255, 0);
                screen.erasePicture(OVERLAY_ID);

                screen.erasePicture(CENTER_ID);
                screen.erasePicture(LEFT_ID);
                screen.erasePicture(RIGHT_ID);
                screen.erasePicture(BOTTOM_LEFT_ID);
                screen.erasePicture(BOTTOM_RIGHT_ID);

                state.phase      = 10;
                state.crossFrame = 0;
                state.frame      = 0;
            }
        } else if (state.phase === 10) {
            const total1 = state.finalWaitDuration;
            const total2 = state.finalWaitDuration + state.charChangeWait;

            if (state.frame === total1 && state.finalChar1Name) {
                screen.showPicture(CENTER_ID, state.finalChar1Name, 1, state.baseCenterX, state.baseCenterY, 100, 100, 255, 0);
                if (SE_FINAL_CHAR1) AudioManager.playSe(SE_FINAL_CHAR1);
            }

            if (state.frame === total2 && state.finalChar2Name) {
                screen.showPicture(CENTER_ID, state.finalChar2Name, 1, state.baseCenterX, state.baseCenterY, 100, 100, 255, 0);
                state.awaitFinalInput = true;
                state.enterBaseX      = state.baseCenterX;
                state.enterBaseY      = state.baseCenterY;
            }

            if (state.awaitFinalInput && (Input.isTriggered("ok") || TouchInput.isTriggered())) {
                if (SE_SPACE_OK) AudioManager.playSe(SE_SPACE_OK);

                const offsetX = -w * 0.05;
                const offsetY =  h * 0.05;

                const targetX = state.enterBaseX + offsetX;
                const targetY = state.enterBaseY + offsetY;

                if (EFFECT_PIC_NAME) {
                    const effX = w * EFFECT_PIC_X_RATE;
                    const effY = h * EFFECT_PIC_Y_RATE;
                    screen.showPicture(EFFECT_PIC_ID, EFFECT_PIC_NAME, 1, effX, effY, EFFECT_PIC_BASE_SCALE, EFFECT_PIC_BASE_SCALE, 255, 0);
                }

                if (state.gachaType === 4 && state.topEffectName && Math.random() < 0.7) {
                    const topX       = w / 2;
                    const topStartY  = -h * 0.3;
                    const topTargetY = h * 0.2;
                    screen.showPicture(TOP_EFFECT_PIC_ID, state.topEffectName, 1, topX, topStartY, 100, 100, 255, 0);
                    if (SE_TOP_EFFECT) AudioManager.playSe(SE_TOP_EFFECT);
                    screen.movePicture(TOP_EFFECT_PIC_ID, 1, topX, topTargetY, 100, 100, 255, 0, ENTER_SLIDE_DURATION);
                }

                screen.movePicture(CENTER_ID, 1, targetX, targetY, 100, 100, 255, 0, ENTER_SLIDE_DURATION);

                state.awaitFinalInput   = false;
                state.enterBaseX        = targetX;
                state.enterBaseY        = targetY;

                state.zoomStartX        = targetX;
                state.zoomStartY        = targetY;
                state.zoomEndX          = state.baseCenterX;
                state.zoomEndY          = state.baseCenterY;

                state.phase             = 11;
                state.frame             = 0;
                state.enterZoomStarted  = false;
            }
        } else if (state.phase === 11) {
            const t = state.frame;

            if (t < ENTER_SLIDE_DURATION) {
                return;
            }

            const afterSlideT = t - ENTER_SLIDE_DURATION;

            if (afterSlideT < ENTER_WAIT_AFTER_SLIDE) {
                return;
            }

            const zoomT = afterSlideT - ENTER_WAIT_AFTER_SLIDE;

            if (!state.enterZoomStarted) {
                const name3 = state.finalChar3Name || state.finalChar2Name || state.finalChar1Name;
                if (name3) {
                    const extraX = -w * EXTRA_ZOOM_OFFSET_RATE_X;
                    const extraY =  h * EXTRA_ZOOM_OFFSET_RATE_Y;

                    state.zoomStartX += extraX;
                    state.zoomStartY += extraY;

                    screen.erasePicture(CENTER_ID);

                    screen.showPicture(FINAL_CENTER_ID, name3, 1, state.zoomStartX, state.zoomStartY, 260, 260, 255, 0);
                    if (SE_FINAL_CHAR3) AudioManager.playSe(SE_FINAL_CHAR3);

                    if (state.extraBottomDownName) {
                        screen.showPicture(EXTRA_BOTTOM_DOWN_ID, state.extraBottomDownName, 1, state.zoomStartX + EXTRA_BOTTOM_DOWN_START_OFFSET_X, state.zoomStartY + EXTRA_BOTTOM_DOWN_START_OFFSET_Y, 260, 260, 255, 0);
                    }
                    if (state.extraBottomUpName) {
                        screen.showPicture(EXTRA_BOTTOM_UP_ID, state.extraBottomUpName, 1, state.zoomStartX + EXTRA_BOTTOM_UP_START_OFFSET_X, state.zoomStartY + EXTRA_BOTTOM_UP_START_OFFSET_Y, 260, 260, 255, 0);
                    }
                    if (state.extraTopName) {
                        screen.showPicture(EXTRA_TOP_ID, state.extraTopName, 1, state.zoomStartX + EXTRA_TOP_START_OFFSET_X, state.zoomStartY + EXTRA_TOP_START_OFFSET_Y, 260, 260, 255, 0);
                    }
                }
                screen.erasePicture(EFFECT_PIC_ID);
                screen.erasePicture(TOP_EFFECT_PIC_ID);

                state.enterZoomStarted = true;
            }

            if (zoomT <= ENTER_ZOOM_SHAKE_DURATION) {
                const ratio = zoomT / ENTER_ZOOM_SHAKE_DURATION;
                const scale = 260 - (260 - 100) * ratio;

                const baseX = state.zoomStartX + (state.zoomEndX - state.zoomStartX) * ratio;
                const baseY = state.zoomStartY + (state.zoomEndY - state.zoomStartY) * ratio;

                const maxAmp = 5;
                const amp    = maxAmp * (1 - ratio);
                const dx     = (Math.random() * 2 - 1) * amp;
                const dy     = (Math.random() * 2 - 1) * amp;

                const cx = baseX + dx;
                const cy = baseY + dy;

                screen.movePicture(FINAL_CENTER_ID, 1, cx, cy, scale, scale, 255, 0, 1);

                if (state.extraBottomDownName) {
                    const offX = EXTRA_BOTTOM_DOWN_START_OFFSET_X + (EXTRA_BOTTOM_DOWN_END_OFFSET_X - EXTRA_BOTTOM_DOWN_START_OFFSET_X) * ratio;
                    const offY = EXTRA_BOTTOM_DOWN_START_OFFSET_Y + (EXTRA_BOTTOM_DOWN_END_OFFSET_Y - EXTRA_BOTTOM_DOWN_START_OFFSET_Y) * ratio;
                    screen.movePicture(EXTRA_BOTTOM_DOWN_ID, 1, cx + offX, cy + offY, scale, scale, 255, 0, 1);
                }

                if (state.extraBottomUpName) {
                    const offX = EXTRA_BOTTOM_UP_START_OFFSET_X + (EXTRA_BOTTOM_UP_END_OFFSET_X - EXTRA_BOTTOM_UP_START_OFFSET_X) * ratio;
                    const offY = EXTRA_BOTTOM_UP_START_OFFSET_Y + (EXTRA_BOTTOM_UP_END_OFFSET_Y - EXTRA_BOTTOM_UP_START_OFFSET_Y) * ratio;
                    screen.movePicture(EXTRA_BOTTOM_UP_ID, 1, cx + offX, cy + offY, scale, scale, 255, 0, 1);
                }

                if (state.extraTopName) {
                    const offX = EXTRA_TOP_START_OFFSET_X + (EXTRA_TOP_END_OFFSET_X - EXTRA_TOP_START_OFFSET_X) * ratio;
                    const offY = EXTRA_TOP_START_OFFSET_Y + (EXTRA_TOP_END_OFFSET_Y - EXTRA_TOP_START_OFFSET_Y) * ratio;
                    screen.movePicture(EXTRA_TOP_ID, 1, cx + offX, cy + offY, scale, scale, 255, 0, 1);
                }

                if (zoomT === ENTER_ZOOM_SHAKE_DURATION) {
                    const name3 = state.finalChar3Name || state.finalChar2Name || state.finalChar1Name;
                    const cxEnd = state.zoomEndX;
                    const cyEnd = state.zoomEndY;

                    screen.showPicture(FINAL_CENTER_ID, name3, 1, cxEnd, cyEnd, 100, 100, 255, 0);
                    if (state.extraBottomDownName) {
                        screen.showPicture(EXTRA_BOTTOM_DOWN_ID, state.extraBottomDownName, 1, cxEnd + EXTRA_BOTTOM_DOWN_END_OFFSET_X, cyEnd + EXTRA_BOTTOM_DOWN_END_OFFSET_Y, 100, 100, 255, 0);
                    }
                    if (state.extraBottomUpName) {
                        screen.showPicture(EXTRA_BOTTOM_UP_ID, state.extraBottomUpName, 1, cxEnd + EXTRA_BOTTOM_UP_END_OFFSET_X, cyEnd + EXTRA_BOTTOM_UP_END_OFFSET_Y, 100, 100, 255, 0);
                    }
                    if (state.extraTopName) {
                        screen.showPicture(EXTRA_TOP_ID, state.extraTopName, 1, cxEnd + EXTRA_TOP_END_OFFSET_X, cyEnd + EXTRA_TOP_END_OFFSET_Y, 100, 100, 255, 0);
                    }

                    state.phase = 12;
                    state.frame = 0;
                }
            } else {
                const name3 = state.finalChar3Name || state.finalChar2Name || state.finalChar1Name;
                screen.showPicture(FINAL_CENTER_ID, name3, 1, state.zoomEndX, state.zoomEndY, 100, 100, 255, 0);
                state.phase = 12;
                state.frame = 0;
            }
        } else if (state.phase === 12) {
            const t   = state.frame;
            const dur = LAST_CROSSFADE_DURATION;
            const cx  = state.zoomEndX;
            const cy  = state.zoomEndY;

            if (t === 1 && state.extraFadeName) {
                screen.showPicture(EXTRA_FADE_ID, state.extraFadeName, 1, cx, cy, 100, 100, 0, 0);
            }

            const clampedT = Math.min(t, dur);
            const ratio    = dur > 0 ? clampedT / dur : 1.0;

            const fadeOutOpacity = 255 * (1.0 - ratio);
            const fadeInOpacity  = 255 * ratio;

            const name3 = state.finalChar3Name || state.finalChar2Name || state.finalChar1Name;

            if (name3) {
                screen.movePicture(FINAL_CENTER_ID, 1, cx, cy, 100, 100, Math.round(fadeOutOpacity), 0, 1);
            }

            if (state.extraTopName) {
                screen.movePicture(EXTRA_TOP_ID, 1, cx + EXTRA_TOP_END_OFFSET_X, cy + EXTRA_TOP_END_OFFSET_Y, 100, 100, Math.round(fadeOutOpacity), 0, 1);
            }

            if (state.extraBottomUpName) {
                const shrScale = 100 + (LAST_SHRINK_SCALE - 100) * ratio;
                screen.movePicture(EXTRA_BOTTOM_UP_ID, 1, cx + EXTRA_BOTTOM_UP_END_OFFSET_X, cy + EXTRA_BOTTOM_UP_END_OFFSET_Y, shrScale, shrScale, Math.round(fadeOutOpacity), 0, 1);
            }

            if (state.extraBottomDownName) {
                const expScale = 100 + (LAST_EXPAND_SCALE - 100) * ratio;
                screen.movePicture(EXTRA_BOTTOM_DOWN_ID, 1, cx + EXTRA_BOTTOM_DOWN_END_OFFSET_X, cy + EXTRA_BOTTOM_DOWN_END_OFFSET_Y, expScale, expScale, Math.round(fadeOutOpacity), 0, 1);
            }

            if (state.extraFadeName) {
                screen.movePicture(EXTRA_FADE_ID, 1, cx, cy, 100, 100, Math.round(fadeInOpacity), 0, 1);
            }

            if (t >= dur) {
                if (state.extraFadeName) {
                    screen.showPicture(EXTRA_FADE_ID, state.extraFadeName, 1, cx, cy, 100, 100, 255, 0);
                }
                screen.erasePicture(FINAL_CENTER_ID);
                screen.erasePicture(EXTRA_TOP_ID);
                screen.erasePicture(EXTRA_BOTTOM_UP_ID);
                screen.erasePicture(EXTRA_BOTTOM_DOWN_ID);
                screen.erasePicture(EFFECT_PIC_ID);

                state.phase = 13;
                state.frame = 0;
            }
        } else if (state.phase === 13) {
            const cx = w / 2;
            const cy = h / 2;

            if (state.frame === 1) {
                if (SHAKE_BG_NAME) {
                    screen.showPicture(EXTRA_FADE_ID, SHAKE_BG_NAME, 1, cx, cy, 100, 100, 255, 0);
                }
            }

            state.phase = 14;
            state.frame = 0;
        } else if (state.phase === 14) {
            const cx = w / 2;
            const cy = h / 2;

            updateMovingPic(screen, state, w, h);

            const t = state.frame;

            if (t === 1 && BLINK_BG_NAME) {
                screen.showPicture(BLINK_BG_ID, BLINK_BG_NAME, 1, cx, cy, 100, 100, 0, 0);
            }

            const dx = (Math.random() * 2 - 1) * SHAKE_MAX_AMP;
            const dy = (Math.random() * 2 - 1) * SHAKE_MAX_AMP;

            const blinkOn = BLINK_BG_NAME ? (Math.floor(t / BLINK_INTERVAL) % 2 === 0) : false;

            if (SHAKE_BG_NAME) {
                const shakeOpacity = blinkOn ? 255 : 80;
                screen.movePicture(EXTRA_FADE_ID, 1, cx + dx, cy + dy, 100, 100, shakeOpacity, 0, 1);
            }

            if (BLINK_BG_NAME) {
                const blinkOpacity = blinkOn ? 0 : 255;
                screen.movePicture(BLINK_BG_ID, 1, cx + dx, cy + dy, 100, 100, blinkOpacity, 0, 1);
            }

            if (t >= BLINK_TOTAL_FRAMES) {
                state.phase = 15;
                state.frame = 0;
            }
        } else if (state.phase === 15) {
            if (!FINAL_BG_NAME) {
                state.active = false;
                stopGachaBgm(state);
                return;
            }

            const cx = w / 2;
            const cy = h / 2;
            const t  = state.frame;
            const d  = Math.max(1, SHAKE_SWITCH_DURATION);
            const ratio = Math.min(1.0, t / d);

            if (t === 1) {
                this.showPicture(OVERLAY_ID, FINAL_BG_NAME, 0, 0, 0, 100, 100, 0, 0);
            }

            this.movePicture(OVERLAY_ID, 0, 0, 0, 100, 100, Math.round(255 * ratio), 0, 1);

            const fadeOutOpacity = Math.round(255 * (1.0 - ratio));

            this.movePicture(EXTRA_FADE_ID, 1, cx, cy, 100, 100, fadeOutOpacity, 0, 1);

            const blinkPic = this.picture(BLINK_BG_ID);
            if (blinkPic) {
                this.movePicture(BLINK_BG_ID, 1, cx, cy, 100, 100, fadeOutOpacity, 0, 1);
            }

            this.movePicture(MOVING_PIC_ID, 1, this.picture(MOVING_PIC_ID)?.x() || cx, this.picture(MOVING_PIC_ID)?.y() || cy, 100, 100, fadeOutOpacity, 0, 1);
            this.movePicture(SECOND_MOVING_PIC_ID, 1, this.picture(SECOND_MOVING_PIC_ID)?.x() || cx, this.picture(SECOND_MOVING_PIC_ID)?.y() || cy, 100, 100, fadeOutOpacity, 0, 1);

            if (t >= d) {
                this.showPicture(BG_ID, FINAL_BG_NAME, 0, 0, 0, 100, 100, 255, 0);

                this.erasePicture(OVERLAY_ID);
                this.erasePicture(EXTRA_FADE_ID);
                this.erasePicture(BLINK_BG_ID);
                this.erasePicture(MOVING_PIC_ID);
                this.erasePicture(SECOND_MOVING_PIC_ID);

                if (!state.enablePair) {
                    state.active = false;
                    stopGachaBgm(state);
                    return;
                }

                state.phase = 16;
                state.frame = 0;
            }
        } else if (state.phase === 16) {
            const name1 = state.pairImage1Name;
            const name2 = state.pairImage2Name;
            const cx = w / 2;
            const cy = h / 2;

            if (!name1 && !name2) {
                state.phase = 17;
                state.frame = 0;
                return;
            }

            const tAll = state.frame;
            const wait = BEFORE_PAIR_WAIT_FRAMES;
            const d    = PAIR_ANIM_DURATION;

            if (tAll <= wait) {
                return;
            }

            const t = tAll - wait;

            if (t === 1) {
                if (name1) {
                    screen.showPicture(PAIR1_ID, name1, 1, cx, cy, 100, 100, 255, 0);
                    if (SE_PAIR1) AudioManager.playSe(SE_PAIR1);
                }
                if (name2) {
                    screen.showPicture(PAIR2_ID, name2, 1, cx, cy, 80, 80, 0, 0);
                }
            }

            const clampedT = Math.min(t, d);
            const ratio    = d > 0 ? clampedT / d : 1.0;

            if (name1) {
                const scale1   = 100 + (PAIR1_ZOOM_SCALE - 100) * ratio;
                const opacity1 = Math.round(255 * (1.0 - ratio));
                screen.movePicture(PAIR1_ID, 1, cx, cy, scale1, scale1, opacity1, 0, 1);
            }

            if (name2) {
                const scale2   = 80 + (PAIR2_ZOOM_SCALE - 80) * ratio;
                const opacity2 = Math.round(255 * ratio);
                screen.movePicture(PAIR2_ID, 1, cx, cy, scale2, scale2, opacity2, 0, 1);
            }

            if (t >= d) {
                if (name1) screen.erasePicture(PAIR1_ID);
                if (name2) screen.erasePicture(PAIR2_ID);

                state.phase = 17;
                state.frame = 0;
            }
        } else if (state.phase === 17) {
            if (state.frame >= WAIT_AFTER_PAIR_TO_FINAL_BG) {
                state.phase = 18;
                state.frame = 0;
            }
        } else if (state.phase === 18) {
            const candidates = [];
            if (state.gachaType === 2) {
                if (state.lastRotate2Name) candidates.push(state.lastRotate2Name);
                if (state.lastRotate3Name) candidates.push(state.lastRotate3Name);
                if (state.lastRotate4Name) candidates.push(state.lastRotate4Name);
                if (state.lastRotate5Name) candidates.push(state.lastRotate5Name);
            } else {
                if (state.lastRotateName)  candidates.push(state.lastRotateName);
                if (state.lastRotate2Name) candidates.push(state.lastRotate2Name);
                if (state.lastRotate3Name) candidates.push(state.lastRotate3Name);
                if (state.lastRotate4Name) candidates.push(state.lastRotate4Name);
                if (state.lastRotate5Name) candidates.push(state.lastRotate5Name);
            }

            if (!state.lastRotateSelectedName) {
                if (candidates.length > 0) {
                    const idx = Math.floor(Math.random() * candidates.length);
                    state.lastRotateSelectedName = candidates[idx];
                } else {
                    state.lastRotateSelectedName = "";
                }
            }

            const name = state.lastRotateSelectedName;
            if (!name) {
                state.active = false;
                stopGachaBgm(state);
                return;
            }

            const cx = w / 2;
            const cy = h / 2;
            const t  = state.frame;

            let speedRate = 1.0;
            if (state.gachaType === 1) {
                speedRate = 0.6;
            }

            const fadeInEnd  = Math.max(1, Math.round(LAST_ROTATE_FADEIN_DURATION  * speedRate));
            const stayEnd    = fadeInEnd + Math.max(1, Math.round(LAST_ROTATE_STAY_DURATION    * speedRate));
            const fadeOutEnd = stayEnd   + Math.max(1, Math.round(LAST_ROTATE_FADEOUT_DURATION * speedRate));

            if (t === 1) {
                screen.showPicture(LAST_ROTATE_ID, name, 1, cx, cy, 100, 100, 0, 0);
            }

            let opacity = 255;

            if (t <= fadeInEnd) {
                const r = fadeInEnd > 0 ? t / fadeInEnd : 1.0;
                opacity = Math.round(255 * r);
            } else if (t <= stayEnd) {
                opacity = 255;
            } else if (t <= fadeOutEnd) {
                const r = (t - stayEnd) / (fadeOutEnd - stayEnd);
                opacity = Math.round(255 * (1.0 - r));
            } else {
                screen.erasePicture(LAST_ROTATE_ID);
                state.active = false;
                stopGachaBgm(state);
                return;
            }

            screen.movePicture(LAST_ROTATE_ID, 1, cx, cy, 100, 100, opacity, 0, 1);
        }
    };

    const _Game_Screen_update = Game_Screen.prototype.update;
    Game_Screen.prototype.update = function() {
        _Game_Screen_update.call(this);
        this.updateGachaAnime();
    };

    Game_Screen.prototype.isGachaAnimeActive = function() {
        return this._gachaAnimeState && this._gachaAnimeState.active;
    };

    const _Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function() {
        if ($gameScreen.isGachaAnimeActive()) {
            return false;
        }
        return _Game_Player_canMove.call(this);
    };

    const _Game_Player_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
    Game_Player.prototype.triggerButtonAction = function() {
        if ($gameScreen.isGachaAnimeActive()) {
            return false;
        }
        return _Game_Player_triggerButtonAction.call(this);
    };

    PluginManager.registerCommand(PLUGIN_NAME, "StartSceneSimple", function(args) {
        const bgName          = String(args.bgName || "");
        const centerName      = String(args.centerName || "");
        const leftName        = String(args.leftName || "");
        const rightName       = String(args.rightName || "");
        const bottomLeftName  = String(args.bottomLeftName || "");
        const bottomRightName = String(args.bottomRightName || "");

        showSceneSimple(bgName, centerName, leftName, rightName, bottomLeftName, bottomRightName);
    });

    PluginManager.registerCommand(PLUGIN_NAME, "StartSceneGacha", function(args) {
        const gachaType          = Number(args.gachaType || 1);
        const introBgName        = String(args.introBgName || "暗転");
        const bgName             = String(args.bgName || "gacha");
        const centerFirstName    = String(args.centerFirstName || "ヒデシロ滑空");
        const centerSecondName   = String(args.centerSecondName || "ヒデシロ飛ぶ");
        const leftName           = String(args.leftName || "チオズ飛ぶ");
        const rightName          = String(args.rightName || "チコ飛ぶ");
        const bottomLeftName     = String(args.bottomLeftName || "ヒデ公飛ぶ");
        const bottomRightName    = String(args.bottomRightName || "チビ飛ぶ");
        const slideDuration      = Number(args.slideDuration || 10);
        const centerZoomDuration = Number(args.centerZoomDuration || 60);
        const waitAfterZoom      = Number(args.waitAfterZoom || 10);
        const waitBetween        = Number(args.waitBetweenCards || 10);
        const overlay1Name       = String(args.overlay1Name || "白エフェクト1");
        const overlay2Name       = String(args.overlay2Name || "白エフェクト2");
        const overlay3Name       = String(args.overlay3Name || "白エフェクト3");
        const nextBgName         = String(args.nextBgName || "白");
        const extraBgName        = String(args.extraBgName || "haikei");
        const overlayDuration    = Number(args.overlayDuration || 5);
        const fadeDuration       = Number(args.fadeDuration || 30);
        const finalWait          = Number(args.finalWait || 10);
        const charChangeWait     = Number(args.charChangeWait || 5);
        const finalChar1Name     = String(args.finalChar1Name || "瞬間移動");
        const finalChar2Name     = String(args.finalChar2Name || "ヒデはめは1");
        const finalChar3Name     = String(args.finalChar3Name || "ヒデはめは2");
        const extraTopName       = String(args.extraTopName || "波1");
        const extraBottomUpper   = String(args.extraBottomUpperName || "波2");
        const extraBottomLower   = String(args.extraBottomLowerName || "波3");
        const extraFadeName      = String(args.extraFadeName || "白");
        const pairImage1Name     = String(args.pairImage1Name || "パリン1");
        const pairImage2Name     = String(args.pairImage2Name || "パリン2");
        const lastRotateName     = String(args.lastRotateName || "ドライブらびれの");
        const lastRotate2Name    = String(args.lastRotate2Name || "ドライブらびれの");
        const lastRotate3Name    = String(args.lastRotate3Name || "ドライブらびれの");
        const lastRotate4Name    = String(args.lastRotate4Name || "ドライブらびれの");
        const lastRotate5Name    = String(args.lastRotate5Name || "ドライブらびれの");
        const soloRightName      = String(args.soloRightName || "らびれの飛ぶ");
        const soloLeftName       = String(args.soloLeftName || "らび飛ぶ");
        const topEffectName      = String(args.topEffectName || "全ちゃん");
        const altBgName          = String(args.altBgName || "gacha_blue");
        const altExtraBgName     = String(args.altExtraBgName || "haikei_blue");
        const altMeteorName      = String(args.altMeteorName || "隕石_blue");

        $gameScreen.startGachaAnime(
            introBgName,
            bgName,
            centerFirstName,
            centerSecondName,
            leftName,
            rightName,
            bottomLeftName,
            bottomRightName,
            slideDuration,
            centerZoomDuration,
            waitAfterZoom,
            waitBetween,
            overlay1Name,
            overlay2Name,
            overlay3Name,
            nextBgName,
            extraBgName,
            overlayDuration,
            fadeDuration,
            finalWait,
            charChangeWait,
            finalChar1Name,
            finalChar2Name,
            finalChar3Name,
            extraTopName,
            extraBottomUpper,
            extraBottomLower,
            extraFadeName,
            pairImage1Name,
            pairImage2Name,
            lastRotateName,
            lastRotate2Name,
            lastRotate3Name,
            lastRotate4Name,
            lastRotate5Name,
            soloRightName,
            soloLeftName,
            topEffectName,
            gachaType,
            altBgName,
            altExtraBgName,
            altMeteorName
        );

        this.setWaitMode("gachaAnime");
    });

    PluginManager.registerCommand(PLUGIN_NAME, "ClearScene", function() {
        const screen = $gameScreen;
        screen.erasePicture(BG_ID);
        screen.erasePicture(CENTER_ID);
        screen.erasePicture(LEFT_ID);
        screen.erasePicture(RIGHT_ID);
        screen.erasePicture(BOTTOM_LEFT_ID);
        screen.erasePicture(BOTTOM_RIGHT_ID);
        screen.erasePicture(OVERLAY_ID);
        screen.erasePicture(EFFECT_PIC_ID);
        screen.erasePicture(EXTRA_BOTTOM_DOWN_ID);
        screen.erasePicture(EXTRA_BOTTOM_UP_ID);
        screen.erasePicture(FINAL_CENTER_ID);
        screen.erasePicture(EXTRA_TOP_ID);
        screen.erasePicture(EXTRA_FADE_ID);
        screen.erasePicture(BLINK_BG_ID);
        screen.erasePicture(MOVING_PIC_ID);
        screen.erasePicture(SECOND_MOVING_PIC_ID);
        screen.erasePicture(PAIR1_ID);
        screen.erasePicture(PAIR2_ID);
        screen.erasePicture(LAST_ROTATE_ID);
        screen.erasePicture(TOP_EFFECT_PIC_ID);

        if (screen._gachaAnimeState) {
            screen._gachaAnimeState.active          = false;
            screen._gachaAnimeState.awaitFinalInput = false;
            screen._gachaAnimeState.preloading      = false;
            screen._gachaAnimeState.preloadStarted  = false;
            screen._gachaAnimeState.preloadBitmaps  = [];
            screen._gachaAnimeState.pendingSetup    = null;
            stopGachaBgm(screen._gachaAnimeState);
        }
    });
})();