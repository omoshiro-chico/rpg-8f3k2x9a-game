/*:
 * @target MZ
 * @plugindesc カード装備枠（装備画面から3枚）＋タグ効果（パラメータ加算，常時ステート，スキル追加）＋装備UI強化（カード①②③，★表示）．統合修正版
 * @author チェコ
 *
 * @help
 * ■概要
 * アクターにカード装備枠を追加して装備画面から3枚セットできます．
 * カードは「防具（Armor）」として作成してください．
 * 効果は装備しているアクターのみに適用されます．
 *
 * ■重要仕様
 * ・カード枠の総数は常に CardSlotCount 枚になるように調整します．
 *   もし元々同じ装備タイプ（etypeId）の枠が既に存在する場合は，追加する枠数を減らします．
 *   例：既存にカードetype枠が1つあるなら，追加は2つだけ行い，合計3枠にします．
 *
 * ■前提
 * 1) データベース「タイプ」→「装備タイプ」に「カード」等を追加し，そのIDを CardEquipTypeId に指定してください．
 * 2) カード防具の装備タイプ（etypeId）を CardEquipTypeId に設定してください．
 *
 * ■メモ欄タグ（防具＝カード）例
 * <rarity:3>
 * <cardParams:mhp+50,atk+5,def-2>
 * <cardStates:10,12>
 * <cardSkills:25,30>
 *
 * cardParams 対応キー：
 * mhp,mmp,atk,def,mat,mdf,agi,luk
 *
 * ■画像（任意）
 * img/pictures/card<防具ID>.png を置くと図鑑や表示側で使えます（このプラグイン自体は画像処理しません）．
 *
 * @param CardEquipTypeId
 * @text カード装備タイプID（etypeId）
 * @type number
 * @min 1
 * @default 6
 *
 * @param CardSlotCount
 * @text カード枠数
 * @type number
 * @min 1
 * @max 10
 * @default 3
 */

(() => {
  "use strict";

  const scriptName = document.currentScript
    ? decodeURIComponent(document.currentScript.src.split("/").pop().replace(/\.js$/, ""))
    : "CardCategory";

  const params = PluginManager.parameters(scriptName);

  const CardEquipTypeId = Number(params["CardEquipTypeId"] || 6);
  const CardSlotCount = Math.max(1, Number(params["CardSlotCount"] || 3));

  const CIRCLED = ["①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩"];

  function rarityStars(armor) {
    if (!armor || !armor.note) return 0;
    const m = armor.note.match(/<rarity:(\d+)>/i);
    if (!m) return 0;
    return Math.min(Number(m[1]), 5);
  }

  function parseIdList(note, tagName) {
    if (!note) return [];
    const re = new RegExp(`<${tagName}:([^>]+)>`, "i");
    const m = note.match(re);
    if (!m) return [];
    return m[1]
      .split(",")
      .map(s => Number(String(s).trim()))
      .filter(n => Number.isFinite(n) && n > 0);
  }

  function parseCardParams(note) {
    // <cardParams:mhp+50,atk+5,def-2>
    if (!note) return new Map();
    const m = note.match(/<cardParams:([^>]+)>/i);
    if (!m) return new Map();

    const keyToParamId = new Map([
      ["mhp", 0],
      ["mmp", 1],
      ["atk", 2],
      ["def", 3],
      ["mat", 4],
      ["mdf", 5],
      ["agi", 6],
      ["luk", 7],
    ]);

    const out = new Map();
    const parts = m[1].split(",").map(s => String(s).trim()).filter(Boolean);

    for (const part of parts) {
      const mm = part.match(/^([a-z]+)\s*([+\-])\s*(\d+)$/i);
      if (!mm) continue;

      const key = mm[1].toLowerCase();
      const sign = mm[2];
      const val = Number(mm[3]);
      if (!keyToParamId.has(key)) continue;

      const pid = keyToParamId.get(key);
      const delta = sign === "-" ? -val : val;
      out.set(pid, (out.get(pid) || 0) + delta);
    }
    return out;
  }

  function isCardArmor(item) {
    return DataManager.isArmor(item) && item && item.etypeId === CardEquipTypeId;
  }

  /* ------------------------------------------------------------
   * 1) equipSlots：カード枠の総数が常に CardSlotCount になるように調整
   * ------------------------------------------------------------ */
  const _Base_equipSlots = Game_Actor.prototype.equipSlots;
  Game_Actor.prototype.equipSlots = function () {
    const base = _Base_equipSlots.call(this).slice();
    const existing = base.filter(s => s === CardEquipTypeId).length;
    const addCount = Math.max(0, CardSlotCount - existing);
    for (let i = 0; i < addCount; i++) base.push(CardEquipTypeId);
    return base;
  };

  /* ------------------------------------------------------------
   * 2) _equips 長さを slots と同期（再帰しない形）
   * ------------------------------------------------------------ */
  Game_Actor.prototype._syncEquipsWithSlots = function () {
    const need = this.equipSlots().length;
    this._equips = this._equips || [];

    while (this._equips.length < need) {
      const gi = new Game_Item();
      gi.setEquip(false, 0);
      this._equips.push(gi);
    }

    if (this._equips.length > need) {
      this._equips.length = need;
    }
  };

  const _initEquips = Game_Actor.prototype.initEquips;
  Game_Actor.prototype.initEquips = function (equips) {
    _initEquips.call(this, equips);
    this._syncEquipsWithSlots();
  };

  const _onAfterLoad = Game_Actor.prototype.onAfterLoad;
  Game_Actor.prototype.onAfterLoad = function () {
    if (_onAfterLoad) _onAfterLoad.call(this);
    this._syncEquipsWithSlots();
  };

  const _changeEquip = Game_Actor.prototype.changeEquip;
  Game_Actor.prototype.changeEquip = function (slotId, item) {
    this._syncEquipsWithSlots();
    _changeEquip.call(this, slotId, item);
  };

  const _forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
  Game_Actor.prototype.forceChangeEquip = function (slotId, item) {
    this._syncEquipsWithSlots();
    _forceChangeEquip.call(this, slotId, item);
  };

  /* ------------------------------------------------------------
   * 3) カードスロット判定と番号（カード①②③）
   *    slotIdまでに出現した CardEquipTypeId の回数で番号を決める
   * ------------------------------------------------------------ */
  function cardSlotIndex(actor, slotId) {
    const slots = actor.equipSlots();
    if (slots[slotId] !== CardEquipTypeId) return -1;

    let k = 0;
    for (let i = 0; i <= slotId; i++) {
      if (slots[i] === CardEquipTypeId) k++;
    }
    return k; // 1-based
  }

  /* ------------------------------------------------------------
   * 4) 装備候補フィルタ：カード枠はカード防具のみ．通常枠はカード防具を混入させない
   * ------------------------------------------------------------ */
  const _includes = Window_EquipItem.prototype.includes;
  Window_EquipItem.prototype.includes = function (item) {
    const ok = _includes.call(this, item);
    if (!ok) return false;

    const actor = this._actor;
    if (!actor) return ok;

    const etypeId = actor.equipSlots()[this._slotId];

    if (etypeId === CardEquipTypeId) {
      return isCardArmor(item);
    } else {
      if (isCardArmor(item)) return false;
      return ok;
    }
  };

  /* ------------------------------------------------------------
   * 5) 装備スロット名：カード①②③
   * ------------------------------------------------------------ */
  const _slotName = Window_EquipSlot.prototype.slotName;
  Window_EquipSlot.prototype.slotName = function (index) {
    const actor = this._actor;
    if (actor) {
      const slots = actor.equipSlots();
      if (slots[index] === CardEquipTypeId) {
        const n = cardSlotIndex(actor, index);
        const c = CIRCLED[n - 1] || String(n);
        return "カード" + c;
      }
    }
    return _slotName.call(this, index);
  };

  /* ------------------------------------------------------------
   * 6) 装備候補表示：カード枠の候補は名前左に★（黄色）を描画
   * ------------------------------------------------------------ */
  const _EquipItem_drawItem = Window_EquipItem.prototype.drawItem;
  Window_EquipItem.prototype.drawItem = function (index) {
    const actor = this._actor;
    if (!actor) {
      _EquipItem_drawItem.call(this, index);
      return;
    }

    const slotId = this._slotId;
    const etypeId = actor.equipSlots()[slotId];
    const item = this.itemAt(index);
    const rect = this.itemLineRect(index);

    if (etypeId === CardEquipTypeId && isCardArmor(item)) {
      this.changePaintOpacity(this.isEnabled(item));
      this.resetTextColor();

      const stars = "★".repeat(rarityStars(item));
      const starW = 64;

      this.changeTextColor(ColorManager.textColor(17));
      this.drawText(stars, rect.x, rect.y, starW, "left");

      this.resetTextColor();
      this.drawItemName(item, rect.x + starW, rect.y, rect.width - starW);

      this.changePaintOpacity(true);
      return;
    }

    _EquipItem_drawItem.call(this, index);
  };

  /* ------------------------------------------------------------
   * 7) 装備スロット側の表示も★付きにしたいので drawItem を拡張（任意要望対応）
   * ------------------------------------------------------------ */
  const _EquipSlot_drawItem = Window_EquipSlot.prototype.drawItem;
  Window_EquipSlot.prototype.drawItem = function (index) {
    const actor = this._actor;
    if (!actor) {
      _EquipSlot_drawItem.call(this, index);
      return;
    }

    const slots = actor.equipSlots();
    const etypeId = slots[index];

    if (etypeId !== CardEquipTypeId) {
      _EquipSlot_drawItem.call(this, index);
      return;
    }

    const rect = this.itemLineRect(index);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(this.slotName(index), rect.x, rect.y, 120);

    const item = actor.equips()[index];
    const nameX = rect.x + 120;
    const nameW = rect.width - 120;

    if (isCardArmor(item)) {
      const stars = "★".repeat(rarityStars(item));
      const starW = 64;

      this.changeTextColor(ColorManager.textColor(17));
      this.drawText(stars, nameX, rect.y, starW, "left");

      this.resetTextColor();
      this.drawItemName(item, nameX + starW, rect.y, nameW - starW);
    } else {
      this.resetTextColor();
      this.drawText("－－", nameX, rect.y, nameW, "left");
    }
  };

  /* ------------------------------------------------------------
   * 8) 効果反映：カード枠に装備されている防具だけを対象にする
   * ------------------------------------------------------------ */
  Game_Actor.prototype.cardArmors = function () {
    this._syncEquipsWithSlots();
    const slots = this.equipSlots();
    const eq = this.equips();
    const out = [];
    for (let i = 0; i < slots.length; i++) {
      if (slots[i] !== CardEquipTypeId) continue;
      const it = eq[i];
      if (isCardArmor(it)) out.push(it);
    }
    return out;
  };

  // パラメータ加算（タグ cardParams）
  const _paramPlus = Game_Actor.prototype.paramPlus;
  Game_Actor.prototype.paramPlus = function (paramId) {
    let v = _paramPlus.call(this, paramId);
    for (const armor of this.cardArmors()) {
      const mp = parseCardParams(armor.note);
      v += (mp.get(paramId) || 0);
    }
    return v;
  };

  // スキル追加（タグ cardSkills）
  Game_Actor.prototype.cardSkillIds = function () {
    const set = new Set();
    for (const armor of this.cardArmors()) {
      for (const id of parseIdList(armor.note, "cardSkills")) set.add(id);
    }
    return Array.from(set);
  };

  const _skills = Game_Actor.prototype.skills;
  Game_Actor.prototype.skills = function () {
    const base = _skills.call(this);
    const extraIds = this.cardSkillIds();
    if (!extraIds.length) return base;

    const out = base.slice();
    const has = new Set(out.map(s => (s ? s.id : 0)).filter(Boolean));

    for (const sid of extraIds) {
      const sk = $dataSkills[sid];
      if (sk && !has.has(sid)) {
        out.push(sk);
        has.add(sid);
      }
    }
    return out;
  };

  // 常時ステート（タグ cardStates）
  Game_Actor.prototype.cardStateIds = function () {
    const set = new Set();
    for (const armor of this.cardArmors()) {
      for (const id of parseIdList(armor.note, "cardStates")) set.add(id);
    }
    return Array.from(set);
  };

  Game_Actor.prototype._ensureCardGrantedStates = function () {
    if (!this._cardGrantedStateIds) this._cardGrantedStateIds = [];
  };

  Game_Actor.prototype._syncCardStates = function () {
    this._ensureCardGrantedStates();

    const desired = new Set(this.cardStateIds());
    const current = new Set(this._cardGrantedStateIds);

    for (const sid of desired) {
      if (sid === this.deathStateId()) continue; // 事故防止
      if (!this.isStateAffected(sid)) this.addState(sid);
    }

    for (const sid of current) {
      if (!desired.has(sid) && this.isStateAffected(sid)) {
        this.removeState(sid);
      }
    }

    this._cardGrantedStateIds = Array.from(desired).filter(sid => sid !== this.deathStateId());
  };

  const _refresh = Game_Actor.prototype.refresh;
  Game_Actor.prototype.refresh = function () {
    _refresh.call(this);
    this._syncEquipsWithSlots();
    this._syncCardStates();
  };

})();
