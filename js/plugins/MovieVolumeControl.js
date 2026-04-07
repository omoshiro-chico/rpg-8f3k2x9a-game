/*:
 * @target MZ
 * @plugindesc ムービー再生音量をイベント直前に変更できるプラグイン v1.0
 * @author ChatGPT
 *
 * @command SetMovieVolume
 * @text 動画音量を変更
 * @desc 次回以降に再生する動画の音量を変更します．
 *
 * @arg volume
 * @text 音量
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @desc 動画音量を 0～100 で指定します．
 *
 * @help
 * RPGツクールMZ用プラグインです．
 *
 * 【機能】
 * イベントのプラグインコマンドから，
 * ムービー再生音量を直前に変更できます．
 *
 * 【使い方】
 * イベントで以下の順に実行してください．
 *
 * 1．プラグインコマンド「動画音量を変更」
 * 2．イベントコマンド「ムービーの再生」
 *
 * 例：
 * ・動画の直前で 30 に設定 → 小さめで再生
 * ・別の動画の直前で 80 に設定 → 大きめで再生
 *
 * 【注意】
 * このプラグインはムービー音声専用です．
 * BGM，BGS，ME，SE の音量は変更しません．
 */

(() => {
    "use strict";

    const pluginName = "MovieVolumeControl";

    // 現在の動画音量．0.0～1.0 で管理
    let movieVolume = 1.0;

    function clampVolume100(value) {
        const num = Number(value);
        if (Number.isNaN(num)) {
            return 100;
        }
        return Math.max(0, Math.min(100, num));
    }

    function applyMovieVolume() {
        if (Video._element) {
            Video._element.volume = movieVolume;
        }
    }

    PluginManager.registerCommand(pluginName, "SetMovieVolume", args => {
        const volume100 = clampVolume100(args.volume);
        movieVolume = volume100 / 100;
        applyMovieVolume();
    });

    const _Video_play = Video.play;
    Video.play = function(src) {
        _Video_play.call(this, src);
        applyMovieVolume();
    };

    const _Video__onLoad = Video._onLoad;
    Video._onLoad = function() {
        _Video__onLoad.call(this);
        applyMovieVolume();
    };
})();