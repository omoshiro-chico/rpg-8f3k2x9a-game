/*:
 * @target MZ
 * @plugindesc 指定した敵イラストを img/pictures から常駐プリロードするプラグイン v1.0
 * @author ChatGPT
 *
 * @param PictureNames
 * @text 常駐する画像名一覧
 * @type string[]
 * @default []
 * @desc img/pictures 内の画像名を拡張子なしで指定します．例: ["enemy1","enemy2"]
 *
 * @param PreloadAtBoot
 * @text 起動時にプリロード
 * @type boolean
 * @default true
 * @desc ゲーム起動後に常駐プリロードを開始します．
 *
 * @param RetryOnMapStart
 * @text マップ開始時に再確認
 * @type boolean
 * @default true
 * @desc マップ開始時に未ロード画像があれば再度ロードします．
 *
 * @help
 * 【概要】
 * 指定した img/pictures 内の画像を常駐プリロードします．
 * 敵イラストを戦闘前にラグなく出したい用途向けです．
 *
 * 【使い方】
 * - PictureNames に画像名を拡張子なしで入れてください．
 *   例: ["boss1","boss2","enemy_a"]
 * - 対象画像は img/pictures に置いてください．
 *
 * 【注意】
 * - 常駐保持するため，画像数や解像度が大きすぎるとメモリ使用量は増えます．
 * - 4.6MB程度ならかなり現実的ですが，実メモリ消費はPNGサイズより大きくなります．
 */

(() => {
    "use strict";

    const PLUGIN_NAME = "EnemyArtPreloader";
    const params = PluginManager.parameters(PLUGIN_NAME);

    function parseStringArray(param) {
        try {
            const parsed = JSON.parse(param || "[]");
            if (!Array.isArray(parsed)) return [];
            return parsed
                .map(v => String(v || "").trim())
                .filter(v => v.length > 0);
        } catch (e) {
            console.error(`[${PLUGIN_NAME}] PictureNames の解析に失敗しました．`, e);
            return [];
        }
    }

    const PICTURE_NAMES = [...new Set(parseStringArray(params["PictureNames"]))];
    const PRELOAD_AT_BOOT = String(params["PreloadAtBoot"] || "true") === "true";
    const RETRY_ON_MAP_START = String(params["RetryOnMapStart"] || "true") === "true";

    const PersistentPictureCache = {
        _bitmaps: new Map(),
        _started: false,

        start() {
            if (this._started) return;
            this._started = true;
            this.preloadAll();
        },

        preloadAll() {
            for (const name of PICTURE_NAMES) {
                this.ensureLoaded(name);
            }
        },

        ensureLoaded(name) {
            if (!name) return null;

            let bitmap = this._bitmaps.get(name);
            if (bitmap && !bitmap.isError()) {
                return bitmap;
            }

            bitmap = ImageManager.loadPicture(name);
            this._bitmaps.set(name, bitmap);

            bitmap.addLoadListener(() => {
                console.log(`[${PLUGIN_NAME}] loaded: ${name}`);
            });

            return bitmap;
        },

        isReady(name) {
            const bitmap = this._bitmaps.get(name);
            return !!(bitmap && bitmap.isReady());
        },

        anyNotReady() {
            for (const name of PICTURE_NAMES) {
                if (!this.isReady(name)) {
                    return true;
                }
            }
            return false;
        },

        refreshMissing() {
            for (const name of PICTURE_NAMES) {
                const bitmap = this._bitmaps.get(name);
                if (!bitmap || bitmap.isError()) {
                    this.ensureLoaded(name);
                }
            }
        },

        debugDump() {
            const result = [];
            for (const name of PICTURE_NAMES) {
                const bitmap = this._bitmaps.get(name);
                result.push({
                    name,
                    exists: !!bitmap,
                    ready: !!(bitmap && bitmap.isReady()),
                    error: !!(bitmap && bitmap.isError())
                });
            }
            console.table(result);
        }
    };

    window.EnemyArtPreloaderCache = PersistentPictureCache;

    if (PRELOAD_AT_BOOT) {
        const _Scene_Boot_start = Scene_Boot.prototype.start;
        Scene_Boot.prototype.start = function() {
            _Scene_Boot_start.call(this);
            PersistentPictureCache.start();
        };
    }

    if (RETRY_ON_MAP_START) {
        const _Scene_Map_start = Scene_Map.prototype.start;
        Scene_Map.prototype.start = function() {
            _Scene_Map_start.call(this);
            PersistentPictureCache.start();
            PersistentPictureCache.refreshMissing();
        };
    }

    const _Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        PersistentPictureCache.start();
        PersistentPictureCache.refreshMissing();
        _Scene_Battle_start.call(this);
    };

})();