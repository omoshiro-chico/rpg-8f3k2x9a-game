/*:
 * @target MZ
 * @plugindesc 装備比較ウィンドウで最大HPと最大MPも比較表示できるようにするプラグイン v1.0
 * @author ChatGPT
 *
 * @help
 * RPGツクールMZ用プラグインです．
 *
 * 【機能】
 * 装備画面のステータス比較ウィンドウで，
 * 標準の能力値に加えて最大HP・最大MPも比較表示します．
 *
 * 【表示順】
 * 1. 最大HP
 * 2. 最大MP
 * 3. 攻撃力
 * 4. 防御力
 * 5. 魔法力
 * 6. 魔法防御
 * 7. 敏捷性
 * 8. 運
 *
 * 【使い方】
 * このファイルを js/plugins に保存し，
 * プラグイン管理で ON にしてください．
 *
 * 【注意】
 * Window_EquipStatus を改造する他プラグインと競合する可能性があります．
 */

(() => {
    "use strict";

    // 表示する能力値ID
    // 0: 最大HP
    // 1: 最大MP
    // 2: 攻撃力
    // 3: 防御力
    // 4: 魔法力
    // 5: 魔法防御
    // 6: 敏捷性
    // 7: 運
    const PARAM_IDS = [0, 1, 2, 3, 4, 5, 6, 7];

    // 表示行数を増やす
    Window_EquipStatus.prototype.numVisibleRows = function() {
        return PARAM_IDS.length + 1; // 先頭1行はアクター名
    };

    // ステータス比較ウィンドウ再描画
    Window_EquipStatus.prototype.refresh = function() {
        this.contents.clear();

        if (!this._actor) {
            return;
        }

        const nameRect = this.itemLineRect(0);
        this.drawActorName(this._actor, nameRect.x, nameRect.y, nameRect.width);

        for (let i = 0; i < PARAM_IDS.length; i++) {
            const paramId = PARAM_IDS[i];
            this.drawParamRow(i + 1, paramId);
        }
    };

    // 1行分の描画
    Window_EquipStatus.prototype.drawParamRow = function(row, paramId) {
        const rect = this.itemLineRect(row);
        const paramX = rect.x;
        const currentX = rect.x + 140;
        const arrowX = rect.x + 188;
        const newX = rect.x + 222;
        const y = rect.y;

        this.drawParamName(paramX, y, paramId);
        this.drawCurrentParam(currentX, y, paramId);

        if (this._tempActor) {
            this.drawRightArrow(arrowX, y);
            this.drawNewParam(newX, y, paramId);
        }
    };
})();