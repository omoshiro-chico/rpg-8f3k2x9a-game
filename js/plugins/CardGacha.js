/*:
 * @target MZ
 * @plugindesc カードガチャ（単発・10連）＋弾切替（左右キー）＋弾ごと背景画像＋弾解放スイッチ＋石（弾別アイテム）消費制限＋メニュー置換（formation→gacha） v22.3 排出画像先読み対応
 * @author 悟空
 *
 * @help
 * ・カードは防具（Armor）を対象に抽選し，パーティに防具として付与します．
 * ・弾は Banners 弾．1弾あたり PerBannerCount 枚（ID連番）です．
 * ・左右キーで弾を切り替えます（右で加算，左で減算）．
 * ・弾解放スイッチがOFFの弾は選べません（左右でスキップ）．
 * ・背景は弾ごとの画像を表示します（img/pictures）．
 *   BackgroundPrefix が gacha_bg_ なら，gacha_bg_1 ～ を置きます．
 * ・カード防具にはメモ欄 <rarity:1..5> が必要です．
 *
 * ■石（弾ごとに独立，アイテムで管理）
 * ・StoneItemIds に弾ごとの石アイテムIDを指定します（例：15,16,17,18,19）．
 * ・確認ウィンドウ右上に「アイコン × 所持数」を表示します．
 * ・単発／10連の行には「アイコン × 必要数（5，50）」を表示します（所持数ではない）．
 * ・単発は SingleCost 個，10連は TenCost 個を消費します．
 * ・不足している場合はガチャ不可（コマンドが無効化）です．
 * ・「石が足りない」等のメッセージは表示しません（未解放のみ表示）．
 *
 * ■UI
 * ・TouchUI の右上キャンセルボタン（戻るボタン）をガチャ画面では表示しません．
 *
 * ■追加
 * ・ガシャ待機画面BGM（GachaBGM）
 * ・弾切替SE（BannerChangeSE）
 *
 * ■追加（v22.0）
 * ・プラグインコマンド OpenGacha でマップイベントから起動可能（弾選択画面から開始）
 * ・ガチャ後に弾選択へ戻った時，待機BGMが消える問題を修正
 *
 * ■追加（v22.2）
 * ・UnlockSwitches が全部0ならメニューにガチャを出さない
 * ・メニュー表示用の主スイッチ（MenuEnableSwitch）を追加（OFFなら出さない）
 *
 * ■追加（v22.3）
 * ・抽選で排出されたカード画像を演出開始前に先読み
 * ・先読み完了後に演出開始
 * ・結果表示時は先読み済みBitmapを優先利用
 *
 * @command OpenGacha
 * @text ガチャを開く
 * @desc ガチャシーンを開きます（弾選択画面から開始）．bannerNoで初期弾（1始まり）指定可．
 *
 * @arg bannerNo
 * @text 初期弾番号（1始まり）
 * @type number
 * @default 1
 * @min 1
 *
 * @param MenuEnableSwitch
 * @text メニュー表示 主スイッチ
 * @type switch
 * @default 0
 * @desc 0なら常に表示許可．0以外ならこのスイッチがONのときだけメニューにガチャを出す．
 *
 * @param Banners
 * @text 弾数
 * @type number
 * @default 5
 *
 * @param StartID
 * @text 1弾の開始防具ID
 * @type number
 * @default 101
 *
 * @param PerBannerCount
 * @text 1弾あたりの枚数
 * @type number
 * @default 20
 *
 * @param BackgroundPrefix
 * @text 背景画像の接頭辞
 * @type string
 * @default gacha_bg_
 *
 * @param UnlockSwitches
 * @text 弾解放スイッチID（カンマ区切り）
 * @type string
 * @default 0,0,0,0,0
 * @desc 0は常時解放．例：0,10,11,12,13
 *
 * @param StoneItemIds
 * @text 石アイテムID（弾ごと，カンマ区切り）
 * @type string
 * @default 0,0,0,0,0
 * @desc 例：15,16,17,18,19．0の弾はガチャ不可．
 *
 * @param SingleCost
 * @text 単発の石消費数
 * @type number
 * @min 0
 * @default 5
 *
 * @param TenCost
 * @text 10連の石消費数
 * @type number
 * @min 0
 * @default 50
 *
 * @param Rate1
 * @type number
 * @default 70
 * @desc ★1排出率（％）
 *
 * @param Rate2
 * @type number
 * @default 30
 * @desc ★2排出率（％）
 *
 * @param Rate3
 * @type number
 * @default 0
 * @desc ★3排出率（％）
 *
 * @param Rate4
 * @type number
 * @default 0
 * @desc ★4排出率（％）
 *
 * @param Rate5
 * @type number
 * @default 0
 * @desc ★5排出率（％）
 *
 * @param SE1
 * @type file
 * @dir audio/se
 * @desc ★1用効果音
 *
 * @param SE2
 * @type file
 * @dir audio/se
 * @desc ★2用効果音
 *
 * @param SE3
 * @type file
 * @dir audio/se
 * @desc ★3用効果音
 *
 * @param SE4
 * @type file
 * @dir audio/se
 * @desc ★4用効果音
 *
 * @param SE5
 * @type file
 * @dir audio/se
 * @desc ★5用効果音
 *
 * @param GachaBGM
 * @text ガシャ待機BGM
 * @type file
 * @dir audio/bgm
 * @desc ガチャ待機画面（確認ウィンドウ表示中）で流すBGM．空なら何もしない．
 *
 * @param BannerChangeSE
 * @text 弾切替SE
 * @type file
 * @dir audio/se
 * @desc 左右キーで弾が実際に切り替わった時に鳴らすSE．空なら鳴らさない．
 */

(() => {
  "use strict";

  // =========================
  // UI調整（ここだけ触ればOK）
  // =========================
  const UI_SINGLE_NAME_LEFT_PAD = 110;
  const UI_TEN_NAME_LEFT_PAD    = 110;

  const UI_SINGLE_COST_RIGHT_PAD = 105;
  const UI_TEN_COST_RIGHT_PAD    = 98;

  const UI_NAME_W = 72;
  const UI_ICON_TEXT_PAD = 6;

  const PLUGIN_NAME = "CardGacha";
  const params = PluginManager.parameters(PLUGIN_NAME);

  const MENU_ENABLE_SWITCH = Math.max(0, Number(params["MenuEnableSwitch"] || 0));

  const BANNERS = Math.max(1, Number(params["Banners"] || 5));
  const START_ID = Number(params["StartID"] || 101);
  const PER_BANNER = Math.max(1, Number(params["PerBannerCount"] || 20));
  const BG_PREFIX = String(params["BackgroundPrefix"] || "gacha_bg_");

  const unlockSwitches = String(params["UnlockSwitches"] || "0,0,0,0,0")
    .split(",")
    .map(s => Number(String(s).trim() || "0"));

  const stoneItemIds = String(params["StoneItemIds"] || "0,0,0,0,0")
    .split(",")
    .map(s => Number(String(s).trim() || "0"));

  const SINGLE_COST = Math.max(0, Number(params["SingleCost"] || 5));
  const TEN_COST = Math.max(0, Number(params["TenCost"] || 50));

  const RATE = {
    1: Number(params["Rate1"] || 70),
    2: Number(params["Rate2"] || 30),
    3: Number(params["Rate3"] || 0),
    4: Number(params["Rate4"] || 0),
    5: Number(params["Rate5"] || 0),
  };

  const SE = {
    1: params["SE1"] ? { name: params["SE1"], pan: 0, pitch: 100, volume: 90 } : null,
    2: params["SE2"] ? { name: params["SE2"], pan: 0, pitch: 100, volume: 90 } : null,
    3: params["SE3"] ? { name: params["SE3"], pan: 0, pitch: 100, volume: 90 } : null,
    4: params["SE4"] ? { name: params["SE4"], pan: 0, pitch: 100, volume: 90 } : null,
    5: params["SE5"] ? { name: params["SE5"], pan: 0, pitch: 100, volume: 90 } : null,
  };

  const GACHA_BGM_NAME = String(params["GachaBGM"] || "").trim();
  const BANNER_CHANGE_SE = params["BannerChangeSE"]
    ? { name: params["BannerChangeSE"], pan: 0, pitch: 100, volume: 100 }
    : null;

  function bannerStartId(bannerIndex0) {
    return START_ID + bannerIndex0 * PER_BANNER;
  }

  function bannerArmorIds(bannerIndex0) {
    const s = bannerStartId(bannerIndex0);
    return Array.from({ length: PER_BANNER }, (_, i) => s + i);
  }

  function isBannerUnlocked(bannerIndex0) {
    const sw = unlockSwitches[bannerIndex0] ?? 0;
    if (!sw) return true;
    return !!$gameSwitches.value(sw);
  }

  function findNextUnlocked(current0, dir) {
    let idx = current0;
    for (let t = 0; t < BANNERS; t++) {
      idx = (idx + dir + BANNERS) % BANNERS;
      if (isBannerUnlocked(idx)) return idx;
    }
    return current0;
  }

  function stoneItemIdOf(bannerIndex0) {
    return stoneItemIds[bannerIndex0] ?? 0;
  }

  function stoneItemOf(bannerIndex0) {
    const id = stoneItemIdOf(bannerIndex0);
    if (id <= 0) return null;
    return $dataItems[id] || null;
  }

  function stoneCountOf(bannerIndex0) {
    const it = stoneItemOf(bannerIndex0);
    if (!it) return 0;
    return Number($gameParty.numItems(it) || 0);
  }

  function canGachaBanner(bannerIndex0, cost) {
    const it = stoneItemOf(bannerIndex0);
    if (!it) return false;
    return stoneCountOf(bannerIndex0) >= cost;
  }

  function spendStone(bannerIndex0, cost) {
    const it = stoneItemOf(bannerIndex0);
    if (!it) return false;
    if (stoneCountOf(bannerIndex0) < cost) return false;
    $gameParty.gainItem(it, -cost);
    return true;
  }

  function cardRarityStars(armor) {
    if (!armor || !armor.note) return 0;
    const m = armor.note.match(/<rarity:(\d+)>/i);
    return m ? Math.min(Number(m[1]), 5) : 0;
  }

  function pickRarity() {
    const total = Object.values(RATE).reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 5; i >= 1; i--) {
      if (r < RATE[i]) return i;
      r -= RATE[i];
    }
    return 1;
  }

  function calcGachaTypeFromMaxRarity(maxRarity) {
    if (maxRarity >= 5) return 4;
    if (maxRarity >= 4) return 3;
    if (maxRarity >= 3) return 2;
    return 1;
  }

  function clearGachaAnimeScreen() {
    const screen = $gameScreen;
    for (let i = 1; i <= 20; i++) screen.erasePicture(i);
    if (screen._gachaAnimeState) {
      screen._gachaAnimeState.active = false;
      screen._gachaAnimeState.awaitFinalInput = false;
    }
  }

  function playGachaAnimeByType(gachaType) {
    if (!$gameScreen.startGachaAnime) return false;

    const introBgName = "暗転";
    const bgName = "gacha";
    const centerFirstName = "ヒデシロ滑空";
    const centerSecondName = "ヒデシロ飛ぶ";
    const leftName = "チオズ飛ぶ";
    const rightName = "チコ飛ぶ";
    const bottomLeftName = "ヒデ公飛ぶ";
    const bottomRightName = "チビ飛ぶ";
    const slideDuration = 10;
    const centerZoomDuration = 60;
    const waitAfterZoom = 10;
    const waitBetween = 10;
    const overlay1Name = "白エフェクト1";
    const overlay2Name = "白エフェクト2";
    const overlay3Name = "白エフェクト3";
    const nextBgName = "白";
    const extraBgName = "haikei";
    const overlayDuration = 5;
    const fadeDuration = 30;
    const finalWait = 10;
    const charChangeWait = 5;
    const finalChar1Name = "瞬間移動";
    const finalChar2Name = "ヒデはめは1";
    const finalChar3Name = "ヒデはめは2";
    const extraTopName = "波1";
    const extraBottomUpper = "波2";
    const extraBottomLower = "波3";
    const extraFadeName = "白";
    const pairImage1Name = "パリン1";
    const pairImage2Name = "パリン2";
    const lastRotateName = "ドライブらびれの";
    const lastRotate2Name = "あきぴー";
    const lastRotate3Name = "ハンマー";
    const lastRotate4Name = "ヒデ親子";
    const lastRotate5Name = "ももトリオ";
    const soloRightName = "らびれの飛ぶ";
    const soloLeftName = "らび飛ぶ";
    const topEffectName = "全ちゃん";
    const altBgName = "gacha_blue";
    const altExtraBgName = "haikei_blue";
    const altMeteorName = "隕石_blue";

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
    return true;
  }

  function loadCardPictureBitmapByArmorId(armorId) {
    return ImageManager.loadBitmap("img/pictures/", "card" + armorId);
  }

  function preloadDrawResultPictures(results) {
    const ids = [...new Set((results || []).map(r => r && r.armor ? r.armor.id : 0).filter(id => id > 0))];
    return ids.map(id => loadCardPictureBitmapByArmorId(id));
  }

  function areBitmapsReady(bitmaps) {
    if (!bitmaps || bitmaps.length === 0) return true;
    return bitmaps.every(bitmap => bitmap && bitmap.isReady());
  }

  function drawCardBitmapFit(window, bitmap, topY) {
    if (!window || !bitmap || !bitmap.isReady()) return;
    const scale = Math.min(
      window.contents.width / bitmap.width,
      (window.contents.height - topY) / bitmap.height,
      1
    );
    const dw = bitmap.width * scale;
    const dh = bitmap.height * scale;
    const dx = (window.contents.width - dw) / 2;
    const dy = topY;
    window.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, dx, dy, dw, dh);
  }

  // =========================
  // メニューにガチャを出すか
  // =========================
  function shouldShowGachaInMenu() {
    if (MENU_ENABLE_SWITCH > 0 && !$gameSwitches.value(MENU_ENABLE_SWITCH)) return false;
    const allUnlockZero = unlockSwitches.every(sw => !Number(sw || 0));
    if (allUnlockZero) return false;
    return true;
  }

  // =========================
  // 待機BGMを必要なら再生（同一BGMなら何もしない）
  // =========================
  function playWaitBgmIfNeeded() {
    if (!GACHA_BGM_NAME) return;

    const cur = AudioManager._currentBgm;
    const curName = cur && cur.name ? String(cur.name) : "";
    if (curName === GACHA_BGM_NAME) return;

    AudioManager.playBgm({ name: GACHA_BGM_NAME, pan: 0, pitch: 100, volume: 90 });
  }

  // =========================
  // プラグインコマンド（マップイベントから起動）
  // =========================
  PluginManager.registerCommand(PLUGIN_NAME, "OpenGacha", args => {
    const bn = Math.max(1, Number(args.bannerNo || 1));
    $gameTemp._cardGachaStartBanner0 = bn - 1;
    SceneManager.push(Scene_Gacha);
  });

  Window_MenuCommand.prototype.addFormationCommand = function () {
    if (!shouldShowGachaInMenu()) return;
    this.addCommand("ガチャ", "gacha", true);
  };

  const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function () {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("gacha", () => SceneManager.push(Scene_Gacha));
  };

  class Scene_Gacha extends Scene_MenuBase {
    createBackground() {
      /* noop */
    }

    createCancelButton() {
      // TouchUI の右上キャンセルボタンを出さない
    }

    create() {
      super.create();

      this._prevBgmForGacha = AudioManager.saveBgm();
      playWaitBgmIfNeeded();

      const start0raw = ($gameTemp._cardGachaStartBanner0 != null)
        ? Number($gameTemp._cardGachaStartBanner0)
        : 0;
      $gameTemp._cardGachaStartBanner0 = null;

      this._bannerIndex0 = ((start0raw % BANNERS) + BANNERS) % BANNERS;

      if (!isBannerUnlocked(this._bannerIndex0)) {
        this._bannerIndex0 = findNextUnlocked(this._bannerIndex0, +1);
      }

      this.createGachaSpriteset();
      this.createBannerBackgroundSpriteAboveSpriteset();

      this._waitingAnime = false;
      this._afterAnimeWait = 0;
      this._gachaMaxRarity = 0;
      this._cards = [];
      this._index = 0;

      this._resultWindow = null;
      this._nextWindow = null;

      this._pendingResultPreloadBitmaps = [];
      this._pendingStartAnimeType = 0;
      this._pendingSkipAnimeToResult = false;

      this.createConfirmWindow();
      this.refreshBannerVisuals();
    }

    terminate() {
      super.terminate();
      if (this._prevBgmForGacha) AudioManager.playBgm(this._prevBgmForGacha);
    }

    createGachaSpriteset() {
      this._spriteset = new Spriteset_Base();
      const windowIndex = this.children.indexOf(this._windowLayer);
      if (windowIndex >= 0) this.addChildAt(this._spriteset, windowIndex);
      else this.addChild(this._spriteset);
    }

    createBannerBackgroundSpriteAboveSpriteset() {
      this._bgSprite = new Sprite();
      const windowIndex = this.children.indexOf(this._windowLayer);
      const insertIndex = windowIndex >= 0 ? windowIndex : this.children.length;
      this.addChildAt(this._bgSprite, insertIndex);
      this._bgSprite.visible = true;
    }

    setBannerBackgroundVisible(v) {
      if (this._bgSprite) this._bgSprite.visible = !!v;
    }

    refreshBackground() {
      const name = `${BG_PREFIX}${this._bannerIndex0 + 1}`;
      const bmp = ImageManager.loadPicture(name);
      this._bgSprite.bitmap = bmp;

      if (bmp.isReady()) {
        const sw = Graphics.boxWidth;
        const sh = Graphics.boxHeight;
        const scale = Math.max(sw / bmp.width, sh / bmp.height) * 1.05;
        this._bgSprite.scale.x = scale;
        this._bgSprite.scale.y = scale;
        this._bgSprite.x = (sw - bmp.width * scale) / 2;
        this._bgSprite.y = (sh - bmp.height * scale) / 2;
      } else {
        bmp.addLoadListener(() => {
          const sw = Graphics.boxWidth;
          const sh = Graphics.boxHeight;
          const scale = Math.max(sw / bmp.width, sh / bmp.height) * 1.05;
          this._bgSprite.scale.x = scale;
          this._bgSprite.scale.y = scale;
          this._bgSprite.x = (sw - bmp.width * scale) / 2;
          this._bgSprite.y = (sh - bmp.height * scale) / 2;
        });
      }
    }

    isInResultFlow() {
      return !!this._resultWindow ||
             !!this._nextWindow ||
             this._waitingAnime ||
             this._afterAnimeWait > 0 ||
             this._pendingResultPreloadBitmaps.length > 0;
    }

    refreshBannerVisuals() {
      this.refreshBackground();
      this.setBannerBackgroundVisible(true);
      if (this._confirmWindow) this._confirmWindow.setBanner(this._bannerIndex0);
    }

    update() {
      super.update();

      $gameScreen.update();
      if (this._spriteset) this._spriteset.update();

      if (this._pendingResultPreloadBitmaps.length > 0) {
        if (!areBitmapsReady(this._pendingResultPreloadBitmaps)) {
          return;
        }

        const gachaType = this._pendingStartAnimeType;
        const skipAnime = this._pendingSkipAnimeToResult;

        this._pendingResultPreloadBitmaps = [];
        this._pendingStartAnimeType = 0;
        this._pendingSkipAnimeToResult = false;

        if (!skipAnime && playGachaAnimeByType(gachaType)) {
          this._waitingAnime = true;
          this._afterAnimeWait = 0;
        } else {
          clearGachaAnimeScreen();
          this.startResultDisplay();
        }
        return;
      }

if (this._confirmWindow && this._confirmWindow.active && !this.isInResultFlow()) {

  let dir = 0;

  // --- キーボード ---
  if (Input.isTriggered("right")) {
    dir = +1;
  } else if (Input.isTriggered("left")) {
    dir = -1;
  }

  // --- タップ（確認ウィンドウより上のみ有効） ---
  if (dir === 0 && TouchInput.isTriggered()) {
    const touchY = TouchInput.y;

    // 確認ウィンドウより上だけ判定
    if (touchY < this._confirmWindow.y) {
      const touchX = TouchInput.x;

      if (touchX < Graphics.boxWidth / 2) {
        dir = -1; // 左半分 → 左へ
      } else {
        dir = +1; // 右半分 → 右へ
      }
    }
  }

  // --- 実際の切替処理 ---
  if (dir !== 0) {
    const next = findNextUnlocked(this._bannerIndex0, dir);
    if (next !== this._bannerIndex0) {
      this._bannerIndex0 = next;
      if (BANNER_CHANGE_SE) AudioManager.playSe(BANNER_CHANGE_SE);
      this.refreshBannerVisuals();
    }
  }
}

      if (this._waitingAnime) {
        if (!$gameScreen.isGachaAnimeActive || !$gameScreen.isGachaAnimeActive()) {
          this._waitingAnime = false;
          this._afterAnimeWait = 35;
        }
      }

      if (this._afterAnimeWait > 0) {
        this._afterAnimeWait--;
        if (this._afterAnimeWait <= 0) {
          clearGachaAnimeScreen();
          this.startResultDisplay();
        }
      }
    }

    createConfirmWindow() {
      const w = Math.floor(Graphics.boxWidth * 0.55);
      const h = this.calcWindowHeight(5, true);
      const x = (Graphics.boxWidth - w) / 2;
      const y = Graphics.boxHeight - h - 24;
      const rect = new Rectangle(x, y, w, h);

      this._confirmWindow = new Window_GachaConfirm(rect);
      this._confirmWindow.setHandler("single", this.doSingle.bind(this));
      this._confirmWindow.setHandler("ten", this.doTen.bind(this));
      this._confirmWindow.setHandler("cancel", this.popScene.bind(this));
      this.addWindow(this._confirmWindow);
      this._confirmWindow.activate();
    }

    prepareDraw(count) {
      this._cards = [];
      for (let i = 0; i < count; i++) this._cards.push(this.drawOne());
      this._index = 0;
      this._gachaMaxRarity = this._cards.reduce((m, r) => Math.max(m, r.rarity), 0);
    }

    currentBannerPoolArmors() {
      const ids = bannerArmorIds(this._bannerIndex0);
      return ids.map(id => $dataArmors[id]).filter(a => a);
    }

    drawOne() {
      const pool = this.currentBannerPoolArmors();
      const pickedRarity = pickRarity();

      let candidates = pool.filter(a => cardRarityStars(a) === pickedRarity);
      if (!candidates.length) candidates = pool.slice();

      const armor = candidates[Math.floor(Math.random() * candidates.length)];
      const r = cardRarityStars(armor);

      $gameParty.gainItem(armor, 1);
      return { armor, rarity: r };
    }

    beginDrawFlow() {
      const gachaType = calcGachaTypeFromMaxRarity(this._gachaMaxRarity);
      this._pendingResultPreloadBitmaps = preloadDrawResultPictures(this._cards);
      this._pendingStartAnimeType = gachaType;
      this._pendingSkipAnimeToResult = false;

      if (this._pendingResultPreloadBitmaps.length === 0) {
        this._pendingSkipAnimeToResult = false;
      }
    }

    doSingle() {
      if (!isBannerUnlocked(this._bannerIndex0)) return;
      if (!canGachaBanner(this._bannerIndex0, SINGLE_COST)) return;
      if (!spendStone(this._bannerIndex0, SINGLE_COST)) return;

      this.setBannerBackgroundVisible(false);
      this._confirmWindow.hide();
      this.prepareDraw(1);
      this.beginDrawFlow();
    }

    doTen() {
      if (!isBannerUnlocked(this._bannerIndex0)) return;
      if (!canGachaBanner(this._bannerIndex0, TEN_COST)) return;
      if (!spendStone(this._bannerIndex0, TEN_COST)) return;

      this.setBannerBackgroundVisible(false);
      this._confirmWindow.hide();
      this.prepareDraw(10);
      this.beginDrawFlow();
    }

    startResultDisplay() {
      this.showSingle();
    }

    _destroyWindows() {
      if (this._resultWindow) {
        this._resultWindow.destroy();
        this._resultWindow = null;
      }
      if (this._nextWindow) {
        this._nextWindow.destroy();
        this._nextWindow = null;
      }
    }

    showSingle() {
      this._destroyWindows();

      const rect = new Rectangle(
        0,
        0,
        Graphics.boxWidth,
        Graphics.boxHeight - this.calcWindowHeight(1, true)
      );
      this._resultWindow = new Window_GachaResult(rect, this._index, this._cards.length);
      this._resultWindow.setCard(this._cards[this._index]);
      this.addWindow(this._resultWindow);

      const r = this._cards[this._index].rarity;
      if (SE[r]) AudioManager.playSe(SE[r]);

      const rectBtn = new Rectangle(
        0,
        Graphics.boxHeight - this.calcWindowHeight(1, true),
        Graphics.boxWidth,
        this.calcWindowHeight(1, true)
      );
      this._nextWindow = new Window_GachaNext(rectBtn);
      this._nextWindow.setHandler("next", this.nextStep.bind(this));
      this.addWindow(this._nextWindow);
      this._nextWindow.activate();
    }

    nextStep() {
      this._index++;
      if (this._index < this._cards.length) {
        this.showSingle();
      } else if (this._cards.length > 1) {
        this.showTenGrid();
      } else {
        this.returnToConfirm();
      }
    }

    showTenGrid() {
      this._destroyWindows();

      const rect = new Rectangle(
        0,
        0,
        Graphics.boxWidth,
        Graphics.boxHeight - this.calcWindowHeight(1, true)
      );
      this._resultWindow = new Window_GachaTenGrid(rect);
      this._resultWindow.setCards(this._cards);
      this.addWindow(this._resultWindow);

      const rectBtn = new Rectangle(
        0,
        Graphics.boxHeight - this.calcWindowHeight(1, true),
        Graphics.boxWidth,
        this.calcWindowHeight(1, true)
      );
      this._nextWindow = new Window_GachaNext(rectBtn);
      this._nextWindow.setHandler("next", this.returnToConfirm.bind(this));
      this.addWindow(this._nextWindow);
      this._nextWindow.activate();
    }

    returnToConfirm() {
      this._destroyWindows();

      this._cards = [];
      this._index = 0;
      this._gachaMaxRarity = 0;
      this._waitingAnime = false;
      this._afterAnimeWait = 0;
      this._pendingResultPreloadBitmaps = [];
      this._pendingStartAnimeType = 0;
      this._pendingSkipAnimeToResult = false;

      clearGachaAnimeScreen();

      playWaitBgmIfNeeded();

      this._confirmWindow.show();
      this._confirmWindow.activate();
      this.refreshBannerVisuals();
    }
  }

  class Window_GachaConfirm extends Window_Command {
    initialize(rect) {
      super.initialize(rect);
      this._bannerIndex0 = 0;
      this.refresh();
    }

    setBanner(bannerIndex0) {
      this._bannerIndex0 = bannerIndex0;
      this.refresh();
    }

    isCurrentBannerUnlocked() {
      return isBannerUnlocked(this._bannerIndex0);
    }

    makeCommandList() {
      const unlocked = this.isCurrentBannerUnlocked();
      const canSingle = unlocked && canGachaBanner(this._bannerIndex0, SINGLE_COST);
      const canTen = unlocked && canGachaBanner(this._bannerIndex0, TEN_COST);

      this.addCommand("単発", "single", canSingle);
      this.addCommand("10連", "ten", canTen);
      this.addCommand("やめる", "cancel", true);
    }

    drawStoneInfoRightTop() {
      const it = stoneItemOf(this._bannerIndex0);
      if (!it) return;

      const count = stoneCountOf(this._bannerIndex0);
      const icon = it.iconIndex || 0;

      const iconW = ImageManager.iconWidth;
      const pad = UI_ICON_TEXT_PAD;
      const text = `×${count}`;
      const textW = this.textWidth(text);
      const blockW = iconW + pad + textW;

      const x = this.contents.width - blockW - 12;
      const y = 0;

      this.drawIcon(icon, x, y + 2);
      this.resetTextColor();
      this.drawText(text, x + iconW + pad, y, textW + 24, "left");
    }

    drawAllItems() {
      this.contents.clear();

      const bannerNo = this._bannerIndex0 + 1;

      this.changeTextColor(ColorManager.systemColor());
      this.drawText(`←　第${bannerNo}弾　→`, 0, 0, this.contents.width, "center");

      this.drawStoneInfoRightTop();

      if (!this.isCurrentBannerUnlocked()) {
        this.changeTextColor(ColorManager.crisisColor());
        this.drawText("未解放", 0, this.lineHeight(), this.contents.width, "center");
        this.resetTextColor();
      }

      for (let i = 0; i < this.maxItems(); i++) this.drawItem(i);
    }

    itemRect(index) {
      const rect = super.itemRect(index);
      rect.y += this.lineHeight() * 2;
      return rect;
    }

    drawItem(index) {
      const rect = this.itemRect(index);
      const symbol = this.commandSymbol(index);
      const name = this.commandName(index);
      const enabled = this.isCommandEnabled(index);

      this.resetTextColor();
      this.changePaintOpacity(enabled);

      if (symbol === "cancel") {
        this.drawText(name, rect.x, rect.y, rect.width, "center");
        this.changePaintOpacity(true);
        return;
      }

      if (symbol === "single" || symbol === "ten") {
        const it = stoneItemOf(this._bannerIndex0);

        const nameLeftPad = (symbol === "single") ? UI_SINGLE_NAME_LEFT_PAD : UI_TEN_NAME_LEFT_PAD;
        const costRightPad = (symbol === "single") ? UI_SINGLE_COST_RIGHT_PAD : UI_TEN_COST_RIGHT_PAD;

        const nameX = rect.x + nameLeftPad;
        this.drawText(name, nameX, rect.y, UI_NAME_W, "left");

        if (it) {
          const need = (symbol === "single") ? SINGLE_COST : TEN_COST;
          const icon = it.iconIndex || 0;

          const iconW = ImageManager.iconWidth;
          const pad = UI_ICON_TEXT_PAD;
          const text = `×${need}`;
          const textW = this.textWidth(text);
          const blockW = iconW + pad + textW;

          const rightEdge = rect.x + rect.width - costRightPad;
          const leftX = rightEdge - blockW;

          this.drawIcon(icon, leftX, rect.y + 2);
          this.drawText(text, leftX + iconW + pad, rect.y, textW + 24, "left");
        }

        this.changePaintOpacity(true);
        return;
      }

      this.drawText(name, rect.x, rect.y, rect.width, "left");
      this.changePaintOpacity(true);
    }
  }

  class Window_GachaResult extends Window_Base {
    constructor(rect, index, total) {
      super(rect);
      this._armor = null;
      this._rarity = 1;
      this._index = index;
      this._total = total;
    }

    setCard(result) {
      this._armor = result.armor;
      this._rarity = result.rarity;
      this.refresh();
    }

    refresh() {
      this.contents.clear();
      if (!this._armor) return;

      this.changeTextColor(ColorManager.systemColor());
      this.drawText(`${this._index + 1}/${this._total}`, 0, 0, 200, "left");

      if (this._rarity === 5) {
        this.changeTextColor(ColorManager.crisisColor());
        this.drawText("★".repeat(this._rarity), 0, 0, this.contents.width, "center");
      } else {
        this.changeTextColor(ColorManager.textColor(17));
        this.drawText("★".repeat(this._rarity), 0, 0, this.contents.width, "center");
      }

      this.resetTextColor();
      this.drawText(this._armor.name, 0, this.lineHeight(), this.contents.width, "center");

      const bitmap = loadCardPictureBitmapByArmorId(this._armor.id);
      const topY = this.lineHeight() * 3;

      if (bitmap.isReady()) {
        drawCardBitmapFit(this, bitmap, topY);
      } else {
        bitmap.addLoadListener(() => {
          this.contents.clear();
          this.changeTextColor(ColorManager.systemColor());
          this.drawText(`${this._index + 1}/${this._total}`, 0, 0, 200, "left");
          if (this._rarity === 5) {
            this.changeTextColor(ColorManager.crisisColor());
            this.drawText("★".repeat(this._rarity), 0, 0, this.contents.width, "center");
          } else {
            this.changeTextColor(ColorManager.textColor(17));
            this.drawText("★".repeat(this._rarity), 0, 0, this.contents.width, "center");
          }
          this.resetTextColor();
          this.drawText(this._armor.name, 0, this.lineHeight(), this.contents.width, "center");
          drawCardBitmapFit(this, bitmap, topY);
        });
      }
    }
  }

  class Window_GachaTenGrid extends Window_Base {
    setCards(results) {
      this._results = results;
      this.refresh();
    }

    refresh() {
      this.contents.clear();
      if (!this._results) return;

      const cols = 5;
      const rows = 2;
      const cellW = this.contents.width / cols;
      const cellH = this.contents.height / rows;

      this._results.forEach((r, i) => {
        const bitmap = loadCardPictureBitmapByArmorId(r.armor.id);

        const draw = () => {
          const scale = Math.min(cellW / bitmap.width, cellH / bitmap.height, 1);
          const dw = bitmap.width * scale;
          const dh = bitmap.height * scale;
          const col = i % cols;
          const row = Math.floor(i / cols);
          const dx = col * cellW + (cellW - dw) / 2;
          const dy = row * cellH + (cellH - dh) / 2;
          this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, dx, dy, dw, dh);
        };

        if (bitmap.isReady()) {
          draw();
        } else {
          bitmap.addLoadListener(draw);
        }
      });
    }
  }

  class Window_GachaNext extends Window_Command {
    makeCommandList() {
      this.addCommand("つぎへ", "next");
    }
  }
})();