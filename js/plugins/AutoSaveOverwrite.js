/*:
 * @target MZ
 * @plugindesc オートセーブ枠（ID 0）に強制上書き保存するプラグイン v1.0
 * @author ChatGPT
 *
 * @command AutoSaveNow
 * @text 今すぐオートセーブ
 * @desc オートセーブ枠（ID 0）に強制上書き保存します．
 *
 * @help
 * 【概要】
 * RPGツクールMZで，オートセーブ枠（セーブID 0）に強制上書き保存するプラグインです．
 *
 * 【使い方】
 * 1．プラグインコマンド
 *   「今すぐオートセーブ」
 *
 * 2．スクリプト
 *   AutoSaveOverwrite.save();
 *
 * 【注意】
 * ・手動セーブ枠には保存しません．
 * ・セーブ禁止中やイベントテスト中は保存しません．
 * ・保存中の連打は無視します．
 */

(() => {
    "use strict";

    const pluginName = "AutoSaveOverwrite";

    const AutoSaveOverwrite = {
        _saving: false,

        canAutoSave() {
            if (this._saving) {
                return false;
            }
            if (DataManager.isEventTest()) {
                return false;
            }
            if (!$gameSystem) {
                return false;
            }
            if (!$gameSystem.isSaveEnabled()) {
                return false;
            }
            return true;
        },

        save() {
            if (!this.canAutoSave()) {
                console.warn("AutoSaveOverwrite: autosave skipped");
                return Promise.resolve(false);
            }

            this._saving = true;

            // 念のため最新情報を更新
            $gameSystem.onBeforeSave();

            return DataManager.saveGame(0)
                .then(() => {
                    console.log("AutoSaveOverwrite: autosave success to slot 0");
                    return true;
                })
                .catch(error => {
                    console.error("AutoSaveOverwrite: autosave failed", error);
                    return false;
                })
                .finally(() => {
                    this._saving = false;
                });
        }
    };

    window.AutoSaveOverwrite = AutoSaveOverwrite;

    PluginManager.registerCommand(pluginName, "AutoSaveNow", () => {
        AutoSaveOverwrite.save();
    });
})();