/*:
 * @target MZ
 * @plugindesc カード図鑑（番号→星→名前→所持数・星は黄色・説明固定表示・画像表示）．防具参照版
 * @author チェコ
 *
 * @help
 * メニューに「カード」コマンドを追加します．
 * 一覧には「001 ★★ スライムカード   x1」のように表示します．
 * 星はメモ欄 <rarity:数値> で設定し，最大5までです．
 * 未入手は「？？？」表示です．
 * 一度入手したカードは，所持0でも名前などを表示します（装備で0になっても維持）．
 *
 * スキル付与は「装備中だけ有効」です．
 * 付与方法は2通り対応します．
 * 1) 防具の特徴で「スキル追加」を設定
 * 2) 防具のメモ欄に <addSkill:67> または <addSkill:67,68> のように記載
 *    ※内部的に特徴へ変換するため，挙動は1)と同じになります．
 *
 * 画像は img/pictures に card101.png のように防具ID対応で置きます．
 * 例）防具ID=101なら card101 を読み込みます．
 */

(() => {
  const START_ID = 101;     // カード防具の開始ID
  const CARD_COUNT = 100;    // カード総数（防具数）

  const CARD_ARMOR_IDS = Array.from({ length: CARD_COUNT }, (_, i) => START_ID + i);

  // =========================
  // ユーティリティ
  // =========================

  function isCardArmorId(armorId) {
    return CARD_ARMOR_IDS.includes(armorId);
  }

  function safeGetArmor(armorId) {
    return $dataArmors ? $dataArmors[armorId] : null;
  }

  // レアリティ（星の数）をメモ欄から取得
  function cardRarityStars(armor) {
    if (!armor || !armor.note) return 0;
    const match = armor.note.match(/<rarity:(\d+)>/i);
    if (!match) return 0;
    return Math.min(Number(match[1]), 5); // 最大5まで
  }

  // =========================
  // 追加：入手済みフラグ（所持0でも表示するため）
  // =========================

  const _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    _Game_System_initialize.call(this);
    // CHANGED: カード入手済み管理（防具IDをキーにする）
    this._cardObtainedFlags = this._cardObtainedFlags || {};
  };

  Game_System.prototype.isCardObtained = function (armorId) {
    this._cardObtainedFlags = this._cardObtainedFlags || {};
    return !!this._cardObtainedFlags[String(armorId)];
  };

  Game_System.prototype.markCardObtained = function (armorId) {
    this._cardObtainedFlags = this._cardObtainedFlags || {};
    this._cardObtainedFlags[String(armorId)] = true;
  };

  // CHANGED: 既存セーブ救済用（現在の所持・装備から入手済みを補完）
  function bootstrapObtainedFlagsFromCurrentState() {
    if (!$gameSystem || !$gameParty) return;
    for (const armorId of CARD_ARMOR_IDS) {
      if ($gameSystem.isCardObtained(armorId)) continue;
      const armor = safeGetArmor(armorId);
      if (!armor) continue;

      const inInventory = $gameParty.numItems(armor) > 0;
      const equipped = $gameParty.members().some(actor =>
        actor && actor.equips && actor.equips().some(eq => eq && eq.id === armorId)
      );

      if (inInventory || equipped) {
        $gameSystem.markCardObtained(armorId);
      }
    }
  }

  // CHANGED: 入手時に入手済みを記録（装備で0になっても表示維持）
  const _Game_Party_gainItem = Game_Party.prototype.gainItem;
  Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
    _Game_Party_gainItem.call(this, item, amount, includeEquip);

    // item が防具かつ対象カードで，増加したときだけ入手済みにする
    if (amount > 0 && DataManager.isArmor(item) && item && isCardArmorId(item.id)) {
      if ($gameSystem) $gameSystem.markCardObtained(item.id);
    }
  };

  // =========================
  // 追加：メモ欄 <addSkill:...> を特徴へ変換（装備中だけ有効）
  // =========================

  let _cardSkillTagInjected = false;

  function parseAddSkillIds(note) {
    if (!note) return [];
    // <addSkill:67> / <addSkill:67,68> / 空白混在OK
    const m = note.match(/<addSkill:([^>]+)>/i);
    if (!m) return [];
    return m[1]
      .split(",")
      .map(s => Number(String(s).trim()))
      .filter(n => Number.isFinite(n) && n > 0);
  }

  function hasSkillAddTrait(armor, skillId) {
    if (!armor || !armor.traits) return false;
    const code = Game_BattlerBase.TRAIT_SKILL_ADD;
    return armor.traits.some(t => t && t.code === code && t.dataId === skillId);
  }

  function injectAddSkillTagsToTraits() {
    if (_cardSkillTagInjected) return;
    if (!$dataArmors) return;

    for (const armorId of CARD_ARMOR_IDS) {
      const armor = $dataArmors[armorId];
      if (!armor) continue;

      const ids = parseAddSkillIds(armor.note);
      if (ids.length === 0) continue;

      armor.traits = armor.traits || [];
      for (const skillId of ids) {
        if (!hasSkillAddTrait(armor, skillId)) {
          armor.traits.push({
            code: Game_BattlerBase.TRAIT_SKILL_ADD,
            dataId: skillId,
            value: 1,
          });
        }
      }
    }

    _cardSkillTagInjected = true;
  }

  const _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function () {
    const loaded = _DataManager_isDatabaseLoaded.call(this);
    if (loaded) {
      injectAddSkillTagsToTraits(); // CHANGED: DBロード後に一度だけ注入
    }
    return loaded;
  };

  // =========================
  // メニューにカードコマンド追加
  // =========================

  const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
  Window_MenuCommand.prototype.addOriginalCommands = function () {
    _Window_MenuCommand_addOriginalCommands.call(this);
    this.addCommand("カード", "card", true);
  };

  const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function () {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("card", this.commandCard.bind(this));
  };

  Scene_Menu.prototype.commandCard = function () {
    SceneManager.push(Scene_Card);
  };

  // =========================
  // カード一覧シーン
  // =========================

  class Scene_Card extends Scene_MenuBase {
    create() {
      super.create();
      this._fixedDescription = false; // 決定後に固定するフラグ

      // CHANGED: 既存セーブや装備中カードの救済
      bootstrapObtainedFlagsFromCurrentState();

      this.createHelpWindow();
      this.createCardWindow();
      this.createPictureWindow();
    }

    createHelpWindow() {
      const rect = this.helpWindowRect();
      this._helpWindow = new Window_Help(rect);
      this.addWindow(this._helpWindow);
    }

    helpWindowRect() {
      const wx = 0;
      const wy = 0;
      const ww = Graphics.boxWidth;
      const wh = this.calcWindowHeight(2, false);
      return new Rectangle(wx, wy, ww, wh);
    }

    createCardWindow() {
      const wy = this._helpWindow.height;
      const wh = Graphics.boxHeight - wy;
      const rect = new Rectangle(0, wy, Graphics.boxWidth / 2, wh);
      this._cardWindow = new Window_CardList(rect, this);
      this._cardWindow.setHelpWindow(this._helpWindow);
      this._cardWindow.setHandler("ok", this.onCardOk.bind(this));
      this._cardWindow.setHandler("cancel", this.popScene.bind(this));
      this.addWindow(this._cardWindow);
      this._cardWindow.activate();
      this._cardWindow.select(0);
    }

    createPictureWindow() {
      const wx = Graphics.boxWidth / 2;
      const wy = this._helpWindow.height;
      const ww = Graphics.boxWidth / 2;
      const wh = Graphics.boxHeight - wy;
      const rect = new Rectangle(wx, wy, ww, wh);
      this._pictureWindow = new Window_CardPicture(rect);
      this.addWindow(this._pictureWindow);
    }

    onCardOk() {
      const armor = this._cardWindow.itemAt(this._cardWindow.index());
      if (!armor) return;

      // CHANGED: 所持数ではなく入手済みで判定
      const obtained = $gameSystem && $gameSystem.isCardObtained(armor.id);

      if (obtained) {
        this._pictureWindow.setPicture("card" + armor.id);
        this._helpWindow.setItem(armor); // 説明を固定表示
        this._fixedDescription = true;
      } else {
        this._pictureWindow.setPicture(null);
        this._helpWindow.setText("？？？");
        this._fixedDescription = true;
      }

      this._cardWindow.activate();
    }

    isDescriptionFixed() {
      return this._fixedDescription;
    }
  }

  // =========================
  // カードリスト
  // =========================

  class Window_CardList extends Window_Selectable {
    constructor(rect, scene) {
      super(rect);
      this._scene = scene;
      this.refresh();
    }

    maxItems() {
      return CARD_ARMOR_IDS.length;
    }

    itemAt(index) {
      const armorId = CARD_ARMOR_IDS[index];
      return $dataArmors[armorId]; // 防具参照
    }

    drawItem(index) {
      const armor = this.itemAt(index);
      const rect = this.itemLineRect(index);
      if (!armor) return;

      const number = String(index + 1).padStart(3, "0");
      const qtyWidth = 48;
      const nameWidth = rect.width - qtyWidth - 8;

      const obtained = $gameSystem && $gameSystem.isCardObtained(armor.id);
      const have = $gameParty ? $gameParty.numItems(armor) : 0;

      if (obtained) {
        const stars = "★".repeat(cardRarityStars(armor));

        // 番号
        this.changeTextColor(ColorManager.normalColor());
        this.drawText(number, rect.x, rect.y, 50, "left");

        // 星（黄色）
        this.changeTextColor(ColorManager.textColor(17));
        this.drawText(stars, rect.x + 50, rect.y, 60, "left");

        // 名前（通常色）
        this.resetTextColor();
        this.drawText(armor.name, rect.x + 120, rect.y, nameWidth - 120);

        // 所持数（右寄せ，0も表示）
        this.drawText("x" + have, rect.x + nameWidth, rect.y, qtyWidth, "right");
      } else {
        this.changePaintOpacity(false);
        this.drawText(number + " ？？？", rect.x, rect.y, nameWidth);
        this.changePaintOpacity(true);
      }
    }

    // カーソル移動時に説明更新（固定されていない場合のみ）
    updateHelp() {
      if (this._scene.isDescriptionFixed()) return;
      const armor = this.itemAt(this.index());
      if (!armor) {
        this._helpWindow.setText("？？？");
        return;
      }

      // CHANGED: 所持数ではなく入手済みで判定
      const obtained = $gameSystem && $gameSystem.isCardObtained(armor.id);
      if (obtained) {
        this._helpWindow.setItem(armor);
      } else {
        this._helpWindow.setText("？？？");
      }
    }

    isCurrentItemEnabled() {
      return true;
    }
  }

  // =========================
  // カード画像表示ウィンドウ
  // =========================

  class Window_CardPicture extends Window_Base {
    constructor(rect) {
      super(rect);
      this._pictureName = null;
    }

    setPicture(name) {
      this._pictureName = name;
      this.refresh();
    }

    refresh() {
      this.contents.clear();
      if (this._pictureName) {
        const bitmap = ImageManager.loadPicture(this._pictureName);
        bitmap.addLoadListener(() => {
          this.contents.clear();
          const scale = Math.min(
            this.contents.width / bitmap.width,
            this.contents.height / bitmap.height,
            1
          );
          const dw = bitmap.width * scale;
          const dh = bitmap.height * scale;
          const dx = (this.contents.width - dw) / 2;
          const dy = (this.contents.height - dh) / 2;
          this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, dx, dy, dw, dh);
        });
      }
    }
  }
})();
