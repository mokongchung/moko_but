let AudioController = require("AudioCtrl");

cc.Class({
    extends: cc.Component,

    properties: {
        SettingUI: cc.Node,

        MusicSlider: cc.Slider,
        SfxSlider: cc.Slider,   
        MasterSlider: cc.Slider,
    },

    onLoad() {
        _originalMusicVolume: 1.0;
        _originalSfxVolume: 1.0;
        _originalMasterVolume: 1.0;
        // Nếu đã có instance rồi, tự hủy node này để tránh duplicate
        

    },
    start () {
        if (cc.sys.localStorage.getItem("MusicVolume") !== null) {
            this._originalMusicVolume = cc.sys.localStorage.getItem("MusicVolume");
            this.MusicSlider.progress = this._originalMusicVolume;
        }
        if (cc.sys.localStorage.getItem("SfxVolume") !== null) {
            this._originalSfxVolume = cc.sys.localStorage.getItem("SfxVolume");
            this.SfxSlider.progress = this._originalSfxVolume;
        }
        if (cc.sys.localStorage.getItem("MasterVolume") !== null) {
            this._originalMasterVolume = cc.sys.localStorage.getItem("MasterVolume");
            this.MasterSlider.progress = this._originalMasterVolume;
        }
    },

    // ===== COMMON FUNCTION =====
    playClickSound() {
        const audio = AudioController.getInstance();
        audio.PlaySoundEffect(audio.soundEffectButton);
    },

    // ===== BUTTON CALLBACKS =====
    PlayBtnClick() {
        this.playClickSound();
        cc.director.loadScene("GamePlay");
    },

    PlayBtnSetting() {
        this.playClickSound();
        this.SettingUI.active = true;
    },

    PlayBtnExit() {
        this.playClickSound();
        cc.game.end();
    },
    // ===== SETTING UI =====
    PlayBtnCloseSetting() {
        this.playClickSound();
        this.SettingUI.active = false;
    },

    MusicSliderCtr(sliderVol) {
    const audio = AudioController.getInstance();
    audio._originalMusicVolume = sliderVol.progress;
    audio.MusicAudioSource.volume = sliderVol.progress;

    cc.sys.localStorage.setItem("MusicVolume", sliderVol.progress);// Lưu giá trị âm lượng vào localStorage
    },

    SfxSliderCtr(sliderVol) {
        const audio = AudioController.getInstance();
        audio._originalSfxVolume = sliderVol.progress;
        audio.SoundEffectAudioSource.volume = sliderVol.progress;

        cc.sys.localStorage.setItem("SfxVolume", sliderVol.progress);// Lưu giá trị âm lượng vào localStorage
    },

    MasterSliderCtr(sliderVol) {
    const audio = AudioController.getInstance();
    const masterVolume = sliderVol.progress;

    audio.MusicAudioSource.volume = audio._originalMusicVolume * masterVolume;
    audio.SoundEffectAudioSource.volume = audio._originalSfxVolume * masterVolume;
    cc.sys.localStorage.setItem("MasterVolume", masterVolume);// Lưu giá trị âm lượng vào localStorage
    },

});
