/*:
 * @target MZ
 * @plugindesc 戦闘をじゃんけん専用に切り替えるプラグイン（HP0になるまで毎ターン続行、ダメージポップアップあり） 
 * @author あなた
 *
 * @command EnableJanken
 * @text じゃんけんモードON
 * @desc この戦闘をじゃんけん専用にする
 *
 * @command DisableJanken
 * @text じゃんけんモードOFF
 * @desc 通常戦闘に戻す
 */

(() => {
  let jankenMode = false;

  const pluginName = "JankenModeBattle";
  PluginManager.registerCommand(pluginName, "EnableJanken", () => { jankenMode = true; });
  PluginManager.registerCommand(pluginName, "DisableJanken", () => { jankenMode = false; });

  // === パーティコマンド（たたかう・にげる）封印 ===
  const _makePartyCommandList = Window_PartyCommand.prototype.makeCommandList;
  Window_PartyCommand.prototype.makeCommandList = function() {
    if (!jankenMode) {
      _makePartyCommandList.call(this);
    }
  };

  // === アクターコマンド封印 ===
  const _makeActorCommandList = Window_ActorCommand.prototype.makeCommandList;
  Window_ActorCommand.prototype.makeCommandList = function() {
    if (!jankenMode) {
      _makeActorCommandList.call(this);
    }
  };

  // === バトルシーンにじゃんけんウィンドウを追加 ===
  const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function() {
    _Scene_Battle_createAllWindows.call(this);
    this.createJankenWindow();
  };

  Scene_Battle.prototype.createJankenWindow = function() {
    this._jankenWindow = new Window_Janken(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._jankenWindow.setHandler("ok", this.onJankenResult.bind(this));
    this._jankenWindow.deactivate();
    this._jankenWindow.hide();
    this.addWindow(this._jankenWindow);
  };

  // === 入力開始時に強制でじゃんけんを出す ===
  const _BattleManager_startInput = BattleManager.startInput;
  BattleManager.startInput = function() {
    _BattleManager_startInput.call(this);
    if (jankenMode && SceneManager._scene._jankenWindow) {
      SceneManager._scene._jankenWindow.show();
      SceneManager._scene._jankenWindow.activate();
    }
  };

  // === じゃんけんの勝敗判定と処理 ===
  Scene_Battle.prototype.onJankenResult = function() {
    const p = this._jankenWindow.playerHand;
    const e = this._jankenWindow.enemyHand;
    let txt = "";

    if (p === e) {
      txt = "あいこ！ ダメージなし";
    } else if (
      (p === 0 && e === 2) || // グー vs パー
      (p === 1 && e === 0) || // チョキ vs グー
      (p === 2 && e === 1)    // パー vs チョキ
    ) {
      txt = "まけた！ ダメージなし";
    } else {
      txt = "かった！ ダメージ1！";
      const target = $gameTroop.randomTarget();
      if (target && target.isAlive()) {
        target.gainHp(-1);
        target.startDamagePopup();
        if (target.hp <= 0) {
          BattleManager.processVictory();
          return;
        }
      }
    }

    // 下のメッセージウィンドウに結果表示
    $gameMessage.add(txt);

    // じゃんけんウィンドウを閉じる
    this._jankenWindow.deactivate();
    this._jankenWindow.hide();

    // ★ダメージポップアップが見えるように少し待ってから次のターンへ
    setTimeout(() => {
      if (BattleManager._phase !== "battleEnd") {
        BattleManager._phase = "input";
        BattleManager.startInput();
      }
    }, 800); // 0.8秒待機
  };

  // === じゃんけん選択ウィンドウ ===
  class Window_Janken extends Window_Command {
    constructor(x, y, w, h) {
      super(new Rectangle(x, y, w, h));
      this.playerHand = null;
      this.enemyHand = null;
    }

    makeCommandList() {
      this.addCommand("グー", "ok", true, 0);
      this.addCommand("チョキ", "ok", true, 1);
      this.addCommand("パー", "ok", true, 2);
    }

    callOkHandler() {
      this.playerHand = this.currentExt();
      this.enemyHand = Math.floor(Math.random() * 3);
      this.callHandler("ok");
    }
  }
})();
