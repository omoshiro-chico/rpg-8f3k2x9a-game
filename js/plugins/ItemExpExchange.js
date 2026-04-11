/*:
 * @target MZ
 * @plugindesc アイテムを金売却とは別に経験値へ交換する専用画面を追加 v1.0
 * @author ChatGPT
 *
 * @command OpenExpExchange
 * @text 経験値交換画面を開く
 * @desc アイテムを消費して味方全員に経験値を与える専用画面を開きます．
 *
 * @help
 * 【概要】
 * 通常のショップ売却とは別に，
 * アイテム・武器・防具を経験値へ交換する専用画面を追加します．
 *
 * 【通常ショップ】
 * - 金になるだけです
 * - 経験値は入りません
 *
 * 【経験値交換画面】
 * - 指定アイテムを消費して，味方全員に経験値を付与します
 * - 金は増えません
 *
 * 【メモ欄】
 * 経験値交換したいデータのメモ欄に以下を書いてください．
 *
 * <SellExp: 50>
 *
 * 例：
 * 1個交換するごとに，味方全員へ50経験値を付与します．
 *
 * 【開き方】
 * イベントコマンドの「プラグインコマンド」で
 * 「経験値交換画面を開く」を実行してください．
 *
 * 【対象】
 * - アイテム
 * - 武器
 * - 防具
 *
 * 【注意】
 * - 所持数0のものは表示されません
 * - SellExp未設定のものは表示されません
 * - 経験値は交換成立時に味方全員へ付与されます
 */

(() => {
    "use strict";

    const PLUGIN_NAME = "ItemExpExchange";

    //--------------------------------------------------------------------------
    // 共通関数
    //--------------------------------------------------------------------------

    function getSellExp(item) {
        if (!item || !item.meta) {
            return 0;
        }
        const raw = item.meta.SellExp;
        if (raw === undefined || raw === null || raw === "") {
            return 0;
        }
        const value = Number(raw);
        if (!Number.isFinite(value)) {
            console.warn(`${PLUGIN_NAME}: SellExp の値が不正です．`, item);
            return 0;
        }
        return Math.max(0, Math.floor(value));
    }

    function isExpExchangeItem(item) {
        return getSellExp(item) > 0;
    }

    function gainExpToAllMembers(exp) {
        if (!Number.isFinite(exp) || exp <= 0) {
            return;
        }
        const members = $gameParty.members();
        for (const actor of members) {
            if (actor) {
                actor.gainExp(exp);
            }
        }
    }

    function allPartyPossessionObjects() {
        const result = [];

        for (const item of $dataItems) {
            if (item && $gameParty.numItems(item) > 0 && isExpExchangeItem(item)) {
                result.push(item);
            }
        }
        for (const weapon of $dataWeapons) {
            if (weapon && $gameParty.numItems(weapon) > 0 && isExpExchangeItem(weapon)) {
                result.push(weapon);
            }
        }
        for (const armor of $dataArmors) {
            if (armor && $gameParty.numItems(armor) > 0 && isExpExchangeItem(armor)) {
                result.push(armor);
            }
        }

        return result;
    }

    function itemKindOrder(item) {
        if (DataManager.isItem(item)) return 0;
        if (DataManager.isWeapon(item)) return 1;
        if (DataManager.isArmor(item)) return 2;
        return 3;
    }

    //--------------------------------------------------------------------------
    // Plugin Command
    //--------------------------------------------------------------------------

    PluginManager.registerCommand(PLUGIN_NAME, "OpenExpExchange", () => {
        SceneManager.push(Scene_ExpExchange);
    });

    //--------------------------------------------------------------------------
    // Window_ExpExchangeHelp
    //--------------------------------------------------------------------------

    class Window_ExpExchangeHelp extends Window_Help {
        setExchangeInfo(item, amount) {
            if (!item) {
                this.setText("経験値に交換するアイテムを選択してください．");
                return;
            }

            const expPerOne = getSellExp(item);
            const totalExp = expPerOne * amount;
            const text = `1個 ${expPerOne} EXP ／ ${amount}個で合計 ${totalExp} EXP を味方全員に付与`;
            this.setText(text);
        }
    }

    //--------------------------------------------------------------------------
    // Window_ExpExchangeItem
    //--------------------------------------------------------------------------

    class Window_ExpExchangeItem extends Window_Selectable {
        initialize(rect) {
            super.initialize(rect);
            this._data = [];
            this.refresh();
            this.select(0);
            this.activate();
        }

        maxItems() {
            return this._data ? this._data.length : 0;
        }

        item() {
            return this._data[this.index()] || null;
        }

        isCurrentItemEnabled() {
            const item = this.item();
            return !!item && $gameParty.numItems(item) > 0 && getSellExp(item) > 0;
        }

        refresh() {
            this.makeItemList();
            this.createContents();
            this.drawAllItems();
        }

        makeItemList() {
            this._data = allPartyPossessionObjects().sort((a, b) => {
                const kindDiff = itemKindOrder(a) - itemKindOrder(b);
                if (kindDiff !== 0) return kindDiff;
                return a.id - b.id;
            });
        }

        drawItem(index) {
            const item = this._data[index];
            if (!item) return;

            const rect = this.itemLineRect(index);
            const numberWidth = this.textWidth("0000");
            const expTextWidth = this.textWidth("000000 EXP");
            const nameWidth = rect.width - numberWidth - expTextWidth - 24;

            this.changePaintOpacity(this.isEnabled(item));
            this.drawItemName(item, rect.x, rect.y, nameWidth);

            const expText = `${getSellExp(item)} EXP`;
            this.drawText(expText, rect.x + nameWidth + 8, rect.y, expTextWidth, "right");

            const countTextX = rect.x + nameWidth + expTextWidth + 16;
            this.drawText(`:${$gameParty.numItems(item)}`, countTextX, rect.y, numberWidth, "right");

            this.changePaintOpacity(true);
        }

        isEnabled(item) {
            return !!item && $gameParty.numItems(item) > 0 && getSellExp(item) > 0;
        }

        updateHelp() {
            if (this._helpWindow) {
                this._helpWindow.setExchangeInfo(this.item(), 1);
            }
        }
    }

    //--------------------------------------------------------------------------
    // Window_ExpExchangeNumber
    //--------------------------------------------------------------------------

    class Window_ExpExchangeNumber extends Window_Selectable {
        initialize(rect) {
            super.initialize(rect);
            this._item = null;
            this._max = 1;
            this._number = 1;
            this.hide();
            this.deactivate();
        }

        setup(item, max) {
            this._item = item;
            this._max = Math.max(1, max);
            this._number = 1;
            this.refresh();
            this.show();
            this.activate();
            this.select(0);
        }

        item() {
            return this._item;
        }

        number() {
            return this._number;
        }

        maxItems() {
            return 1;
        }

        refresh() {
            this.contents.clear();
            if (!this._item) return;

            const rect = this.itemLineRect(0);
            const expPerOne = getSellExp(this._item);
            const totalExp = expPerOne * this._number;

            this.drawText(this._item.name, rect.x, rect.y, rect.width, "left");
            this.drawText(`所持数 ${this._max}`, rect.x, rect.y + this.lineHeight(), rect.width, "left");
            this.drawText(`交換数 ${this._number}`, rect.x, rect.y + this.lineHeight() * 2, rect.width, "left");
            this.drawText(`獲得EXP ${totalExp}`, rect.x, rect.y + this.lineHeight() * 3, rect.width, "left");
        }

        update() {
            super.update();
            if (!this.active) return;

            let lastNumber = this._number;

            if (Input.isRepeated("right")) {
                this.changeNumber(1);
            }
            if (Input.isRepeated("left")) {
                this.changeNumber(-1);
            }
            if (Input.isRepeated("up")) {
                this.changeNumber(10);
            }
            if (Input.isRepeated("down")) {
                this.changeNumber(-10);
            }

            if (this._number !== lastNumber) {
                this.refresh();
                this.callUpdateHelp();
            }
        }

        changeNumber(amount) {
            const newValue = (this._number + amount).clamp(1, this._max);
            if (newValue !== this._number) {
                this._number = newValue;
                SoundManager.playCursor();
            }
        }

        setHelpWindow(helpWindow) {
            this._helpWindow = helpWindow;
            this.callUpdateHelp();
        }

        callUpdateHelp() {
            if (this._helpWindow) {
                this._helpWindow.setExchangeInfo(this._item, this._number);
            }
        }
    }

    //--------------------------------------------------------------------------
    // Window_ExpExchangeStatus
    //--------------------------------------------------------------------------

    class Window_ExpExchangeStatus extends Window_Base {
        initialize(rect) {
            super.initialize(rect);
            this._item = null;
            this.refresh();
        }

        setItem(item) {
            if (this._item === item) return;
            this._item = item;
            this.refresh();
        }

        refresh() {
            this.contents.clear();

            if (!this._item) {
                this.drawText("対象アイテムなし", 0, 0, this.contentsWidth(), "left");
                return;
            }

            const exp = getSellExp(this._item);
            const count = $gameParty.numItems(this._item);

            let y = 0;
            this.drawText(`種別 ${this.itemTypeName(this._item)}`, 0, y, this.contentsWidth(), "left");
            y += this.lineHeight();
            this.drawText(`所持数 ${count}`, 0, y, this.contentsWidth(), "left");
            y += this.lineHeight();
            this.drawText(`1個あたり ${exp} EXP`, 0, y, this.contentsWidth(), "left");
        }

        itemTypeName(item) {
            if (DataManager.isItem(item)) return "アイテム";
            if (DataManager.isWeapon(item)) return "武器";
            if (DataManager.isArmor(item)) return "防具";
            return "不明";
        }
    }

    //--------------------------------------------------------------------------
    // Scene_ExpExchange
    //--------------------------------------------------------------------------

    class Scene_ExpExchange extends Scene_MenuBase {
        create() {
            super.create();
            this.createHelpWindow();
            this.createItemWindow();
            this.createStatusWindow();
            this.createNumberWindow();
        }

        helpAreaHeight() {
            return this.calcWindowHeight(2, false);
        }

        itemWindowRect() {
            const wx = 0;
            const wy = this.mainAreaTop();
            const ww = Math.floor(Graphics.boxWidth * 0.62);
            const wh = this.mainAreaHeight();
            return new Rectangle(wx, wy, ww, wh);
        }

        statusWindowRect() {
            const itemRect = this.itemWindowRect();
            const wx = itemRect.x + itemRect.width;
            const wy = this.mainAreaTop();
            const ww = Graphics.boxWidth - wx;
            const wh = Math.floor(this.mainAreaHeight() * 0.42);
            return new Rectangle(wx, wy, ww, wh);
        }

        numberWindowRect() {
            const statusRect = this.statusWindowRect();
            const wx = statusRect.x;
            const wy = statusRect.y + statusRect.height;
            const ww = statusRect.width;
            const wh = this.mainAreaHeight() - statusRect.height;
            return new Rectangle(wx, wy, ww, wh);
        }

        createHelpWindow() {
            const rect = this.helpWindowRect();
            this._helpWindow = new Window_ExpExchangeHelp(rect);
            this.addWindow(this._helpWindow);
        }

        createItemWindow() {
            const rect = this.itemWindowRect();
            this._itemWindow = new Window_ExpExchangeItem(rect);
            this._itemWindow.setHelpWindow(this._helpWindow);
            this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
            this._itemWindow.setHandler("cancel", this.popScene.bind(this));
            this._itemWindow.setHelpWindow(this._helpWindow);
            this._itemWindow.setHandler("select", this.onItemSelect?.bind(this));
            this.addWindow(this._itemWindow);

            this._itemWindow.setHelpWindow(this._helpWindow);
            this._itemWindow.callUpdateHelp();

            this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
            this._itemWindow.setHandler("cancel", this.popScene.bind(this));

            this._itemWindow.select(0);
        }

        createStatusWindow() {
            const rect = this.statusWindowRect();
            this._statusWindow = new Window_ExpExchangeStatus(rect);
            this.addWindow(this._statusWindow);
            this.updateStatusWindow();
        }

        createNumberWindow() {
            const rect = this.numberWindowRect();
            this._numberWindow = new Window_ExpExchangeNumber(rect);
            this._numberWindow.setHelpWindow(this._helpWindow);
            this._numberWindow.setHandler("ok", this.onNumberOk.bind(this));
            this._numberWindow.setHandler("cancel", this.onNumberCancel.bind(this));
            this.addWindow(this._numberWindow);
        }

        update() {
            super.update();
            this.updateStatusWindow();
        }

        updateStatusWindow() {
            if (this._statusWindow && this._itemWindow) {
                this._statusWindow.setItem(this._itemWindow.item());
            }
        }

        onItemOk() {
            const item = this._itemWindow.item();
            if (!item) {
                SoundManager.playBuzzer();
                return;
            }

            const max = $gameParty.numItems(item);
            if (max <= 0) {
                SoundManager.playBuzzer();
                return;
            }

            this._itemWindow.deactivate();
            this._numberWindow.setup(item, max);
            this._helpWindow.setExchangeInfo(item, this._numberWindow.number());
        }

        onNumberOk() {
            const item = this._numberWindow.item();
            const number = this._numberWindow.number();

            if (!item || number <= 0) {
                SoundManager.playBuzzer();
                return;
            }

            const exp = getSellExp(item) * number;

            $gameParty.loseItem(item, number, false);
            gainExpToAllMembers(exp);

            SoundManager.playShop();

            this._itemWindow.refresh();
            this._statusWindow.setItem(this._itemWindow.item());

            this._numberWindow.hide();
            this._numberWindow.deactivate();
            this._itemWindow.activate();

            if (this._itemWindow.maxItems() > 0) {
                const index = Math.min(this._itemWindow.index(), this._itemWindow.maxItems() - 1);
                this._itemWindow.select(Math.max(index, 0));
            } else {
                this._itemWindow.select(-1);
                this._helpWindow.setText("交換できるアイテムがありません．");
            }
        }

        onNumberCancel() {
            this._numberWindow.hide();
            this._numberWindow.deactivate();
            this._itemWindow.activate();
            this._helpWindow.setExchangeInfo(this._itemWindow.item(), 1);
        }
    }

    window.Scene_ExpExchange = Scene_ExpExchange;
})();