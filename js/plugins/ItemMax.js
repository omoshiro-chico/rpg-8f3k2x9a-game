/*:
 * @target MZ
 * @plugindesc 全アイテム（アイテム・武器・防具）の所持上限を変更する v1.0
 * @author YOU
 *
 * @param MaxItemCount
 * @text 所持上限数
 * @type number
 * @min 1
 * @default 10000
 *
 * @help
 * 全てのアイテム（通常アイテム・武器・防具）の
 * 所持上限数を一律で変更します．
 *
 * セーブデータ互換あり．
 * 既存の所持数はそのまま維持されます．
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.match(/([^\/]+)\.js$/)[1];
    const params = PluginManager.parameters(pluginName);
    const MAX_ITEM_COUNT = Number(params.MaxItemCount || 10000);

    Game_Party.prototype.maxItems = function(item) {
        return MAX_ITEM_COUNT;
    };

})();
