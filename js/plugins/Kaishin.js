/*:
 * @target MZ
 * @plugindesc 会心ダメージ２倍に変更
 * @author ケイジェイ 
 *
 * @help
 * 会心ダメージ２倍に変更
 */

(() => {
  "use strict";

Game_Action.prototype.applyCritical = function(damage) {
    return damage * 2;
};

})();