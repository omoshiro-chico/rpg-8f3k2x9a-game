/*:
 * @target MZ
 * @plugindesc img/enemies 内の指定敵画像を常駐プリロードするプラグイン v2.0
 * @author ChatGPT
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
 * img/enemies 内の敵画像を常駐プリロードします．
 * 戦闘前や初回表示時のラグを減らす用途向けです．
 *
 * 【この版の仕様】
 * - 読み込み先は img/enemies です．
 * - 敵画像名一覧はプラグイン内部に固定で埋め込んであります．
 * - 「スチル6ヒデシーロ」は除外しています．
 *
 * 【注意】
 * - 常駐保持するため，画像数や解像度が大きいほどメモリ使用量は増えます．
 * - PNGファイルサイズが軽くても，展開後メモリはそれよりかなり大きくなることがあります．
 * - 画像を追加したら，ENEMY_NAMES に名前を追記してください．拡張子は不要です．
 */

(() => {
    "use strict";

    const PLUGIN_NAME = "EnemyArtPreloader";
    const params = PluginManager.parameters(PLUGIN_NAME);

    const PRELOAD_AT_BOOT = String(params["PreloadAtBoot"] || "true") === "true";
    const RETRY_ON_MAP_START = String(params["RetryOnMapStart"] || "true") === "true";

    // img/enemies 内のプリロード対象一覧（拡張子なし）
    // 「スチル6ヒデシーロ」は除外
    const ENEMY_NAMES = [
        "No.10 チビックス",
        "No.11 点滴オムツ民",
        "No.12 メカらびっと",
        "No.13 魔獣メロ",
        "No.14 下級兵 A",
        "No.15 下級兵 B",
        "No.16 下級兵 C",
        "No.17 下級兵 D",
        "No.18 下級兵 E",
        "No.19 下級兵 F",
        "No.20 なななドール",
        "No.21 泥人形koap",
        "No.22 タラ子分",
        "No.23 タラコキング",
        "No.24 神殺龍",
        "No.25-b 音楽戦士GT",
        "No.26-a もこもこさん",
        "No.27 おしりまっちゃっちゃ君 )",
        "No.28 ペンギン大革命 (2)",
        "No.29 装動ライダー",
        "No.30 メカラランテス",
        "No.4 やきにく信者",
        "No.5 未成年壁画",
        "No.6 ボトボトゾンビ",
        "No.7 極悪兵士(男)",
        "No.8 極悪兵士(女)",
        "No.9 ほねぴー",
        "No.EX2-a らびっと(フルパワー)",
        "No.EX2-b らびっと(異形)",
        "Re_No.0-a ハチシロ",
        "Re_No.0-b ドクシロ",
        "Re_No.0-c ヒデフライ",
        "Re_No.1-a ヒデーバ",
        "Re_No.1-b ヒデーバベス",
        "Re_No.1-c メタルヒデーバ",
        "Re_No.1-d タコヒデーバ",
        "Re_No.1-e マッシュヒデーバ",
        "Re_No.1-f マラヒデーバ",
        "Re_カカオ土人",
        "Re_ハバネロ土人",
        "Re_仙豆土人",
        "あこしょう顔",
        "くさったみかん",
        "しげる",
        "ほんまもん村人",
        "もも",
        "らびっと",
        "アホのごろつき",
        "ガンギマ1号",
        "ガンギマ2号",
        "ガンギマ3号",
        "コンタ",
        "バンジャイデビル",
        "ヒデシロ",
        "ヒデシーロ",
        "ヒデフライ",
        "ヒデーバ",
        "ヒデーバベス",
        "ボケナス",
        "マッシュヒデーバ",
        "マラヒデーバ",
        "メガイッチャ",
        "メタルしげる",
        "メタルヒデーバ",
        "ユーケーデーモン",
        "レインボー魔人",
        "人参の刃さん",
        "大根の刃さん",
        "大神官ロゼ",
        "天狗お面兵士",
        "数管",
        "敵チェコ",
        "敵チオズ",
        "敵ヒデ公",
        "洗脳",
        "活躍民ガリ",
        "活躍民デブ",
        "牢獄テロリスト",
        "界王神ロゼ",
        "破壊神ロゼ",
        "色違い兵士(体)",
        "色違い兵士(力)",
        "色違い兵士(技)",
        "色違い兵士(知)",
        "色違い兵士(速)",
        "詐欺師",
        "赤かぶの刃さん",
        "黒目犬"
    ];

    const UNIQUE_ENEMY_NAMES = [...new Set(
        ENEMY_NAMES
            .map(name => String(name || "").trim())
            .filter(name => name.length > 0)
    )];

    const PersistentEnemyCache = {
        _bitmaps: new Map(),
        _started: false,

        start() {
            if (this._started) return;
            this._started = true;
            this.preloadAll();
        },

        loadBitmapByName(name) {
            return ImageManager.loadBitmap("img/enemies/", name);
        },

        preloadAll() {
            for (const name of UNIQUE_ENEMY_NAMES) {
                this.ensureLoaded(name);
            }
        },

        ensureLoaded(name) {
            if (!name) return null;

            let bitmap = this._bitmaps.get(name);

            if (bitmap && !bitmap.isError()) {
                return bitmap;
            }

            bitmap = this.loadBitmapByName(name);
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
            for (const name of UNIQUE_ENEMY_NAMES) {
                if (!this.isReady(name)) {
                    return true;
                }
            }
            return false;
        },

        refreshMissing() {
            for (const name of UNIQUE_ENEMY_NAMES) {
                const bitmap = this._bitmaps.get(name);
                if (!bitmap || bitmap.isError() || !bitmap.isReady()) {
                    this.ensureLoaded(name);
                }
            }
        },

        getBitmap(name) {
            return this._bitmaps.get(name) || null;
        },

        debugDump() {
            const result = [];
            for (const name of UNIQUE_ENEMY_NAMES) {
                const bitmap = this._bitmaps.get(name);
                result.push({
                    name: name,
                    exists: !!bitmap,
                    ready: !!(bitmap && bitmap.isReady()),
                    error: !!(bitmap && bitmap.isError())
                });
            }
            console.table(result);
        },

        count() {
            return UNIQUE_ENEMY_NAMES.length;
        },

        names() {
            return UNIQUE_ENEMY_NAMES.slice();
        }
    };

    window.EnemyArtPreloaderCache = PersistentEnemyCache;

    if (PRELOAD_AT_BOOT) {
        const _Scene_Boot_start = Scene_Boot.prototype.start;
        Scene_Boot.prototype.start = function() {
            _Scene_Boot_start.call(this);
            PersistentEnemyCache.start();
        };
    }

    if (RETRY_ON_MAP_START) {
        const _Scene_Map_start = Scene_Map.prototype.start;
        Scene_Map.prototype.start = function() {
            _Scene_Map_start.call(this);
            PersistentEnemyCache.start();
            PersistentEnemyCache.refreshMissing();
        };
    }

    const _Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        PersistentEnemyCache.start();
        PersistentEnemyCache.refreshMissing();
        _Scene_Battle_start.call(this);
    };

    console.log(`[${PLUGIN_NAME}] target folder: img/enemies/`);
    console.log(`[${PLUGIN_NAME}] preload targets: ${UNIQUE_ENEMY_NAMES.length}`);
})();