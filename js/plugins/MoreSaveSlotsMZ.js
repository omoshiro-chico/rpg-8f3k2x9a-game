/*:
 * @target MZ
 * @plugindesc セーブスロット数を任意の数に変更します（RMMZ用）
 * @author Custom
 *
 * @param MaxSaveFiles
 * @text 最大セーブスロット数
 * @type number
 * @min 1
 * @default 100
 * @desc 手動セーブの最大スロット数を指定します
 *
 * @help
 * セーブスロット数を指定した数に変更します。
 * オートセーブは別枠で1つ存在します（MZ標準仕様）。
 *
 * 例：
 * MaxSaveFiles = 99 にすると
 * 手動セーブが1～99まで使用可能になります。
 */

(() => {
    "use strict";

    const pluginName = "MoreSaveSlotsMZ";
    const parameters = PluginManager.parameters(pluginName);
    const maxSaveFiles = Number(parameters["MaxSaveFiles"] || 50);

    DataManager.maxSavefiles = function() {
        return maxSaveFiles;
    };

})();
