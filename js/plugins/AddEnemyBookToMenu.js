/*:
 * @target MZ
 * @plugindesc v1.0 メニューに「図鑑」を追加してABMZ_EnemyBookを開くぞ．
 * @author You
 *
 * @param MenuName
 * @text メニュー表示名
 * @type string
 * @default 図鑑
 *
 * @help
 * メニューに「図鑑」コマンドを追加して，ABMZ_EnemyBookを開く．
 * まず MZ 標準のプラグインコマンド呼び出し
 *   PluginManager.callCommand(this, 'ABMZ_EnemyBook', 'open', {});
 * を試す．無ければ MV 互換のシーン名推定で SceneManager.push を試す．
 * どちらも失敗したらブザー．
 *
 * 使い方：
 * 1．このファイルを AddEnemyBookToMenu.js として js/plugins/ に置く．
 * 2．プラグイン管理で ABMZ_EnemyBook を有効化．その下に本プラグインを有効化．
 * 3．ゲーム中のメニューに「図鑑」が出て押すと図鑑が開く．
 *
 * 必要プラグイン：ABMZ_EnemyBook.js
 */
(() => {
  const PLUGIN_NAME = document.currentScript
    ? document.currentScript.src.split('/').pop().replace(/\.js$/,'')
    : 'AddEnemyBookToMenu';
  const params = PluginManager.parameters(PLUGIN_NAME);
  const MENU_NAME = String(params['MenuName'] || '図鑑');

  // メニューに項目を追加
  const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
  Window_MenuCommand.prototype.addOriginalCommands = function() {
    _Window_MenuCommand_addOriginalCommands.call(this);
    this.addCommand(MENU_NAME, 'enemyBook', true);
  };

  // ハンドラ登録
  const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('enemyBook', this.commandEnemyBook.bind(this));
  };

  // 図鑑を開く本体
  Scene_Menu.prototype.commandEnemyBook = function() {
    // 1) MZ形式のプラグインコマンド（推奨）
    try {
      if (PluginManager.callCommand) {
        PluginManager.callCommand(this, 'ABMZ_EnemyBook', 'open', {});
        // callCommand は非同期UI遷移を内部でやることがあるので，ここでreturn
        return;
      }
    } catch (e) {
      // 続行してフォールバック
      console.warn('ABMZ_EnemyBook callCommand failed:', e);
    }

    // 2) シーン名に直接遷移（MV互換／独自実装向けの保険）
    const candidates = [
      () => window.Scene_EnemyBook,
      () => window.Scene_ABMZ_EnemyBook,
      () => (window.ABMZ_EnemyBook && window.ABMZ_EnemyBook.Scene) ? window.ABMZ_EnemyBook.Scene : undefined,
    ];
    let SceneCtor = undefined;
    for (const get of candidates) {
      const v = get();
      if (v) { SceneCtor = v; break; }
    }
    if (SceneCtor) {
      SceneManager.push(SceneCtor);
    } else {
      SoundManager.playBuzzer();
    }
  };
})();
