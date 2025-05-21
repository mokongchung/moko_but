let AudioController = require("AudioCtrl");
let GameController = require('GameCtrl');
cc.Class({
    extends: cc.Component,

    properties: {
        SettingUI: cc.Node,
        FadePanel: cc.Node,

        MusicSlider: cc.Slider,
        SfxSlider: cc.Slider,   
        MasterSlider: cc.Slider,


        BtnPlay: cc.Button,
        BtnSetting: cc.Button,
        BtnExit: cc.Button,
    },

    onLoad() {
        _originalMusicVolume: 1.0;
        _originalSfxVolume: 1.0;
        _originalMasterVolume: 1.0;
        // Nếu đã có instance rồi, tự hủy node này để tránh duplicate
        

    },
    start () {
        this.Setvolume();
    },
    onEnable() {
        this.BtnTwening();
        this.FadePanelTween();
        AudioController.getInstance().PlayBgMusic(AudioController.getInstance().bgMusicMainMenu);
    },
    BtnTwening() {
        let btnGroup = [this.BtnPlay, this.BtnSetting, this.BtnExit];
        for (let i = 0; i < btnGroup.length; i++) {
            let btn = btnGroup[i].node;
            btn.scale = 0.1;
            console.log("btn" + btn);

            //Tạo tween phóng to lên scale 1 (100%) trong 0.5 giây
            cc.tween(btn)
                .delay(i * 0.2)
                .to(1.0, { scale: 1 }, { easing: 'backOut' }) // easing 'backOut' giúp hiệu ứng phóng to có độ "nẩy"
                .start();
        }
        

    },
    FadePanelTween() {
        this.FadePanel.active = true;
        // Tween để làm tối dần trong 0.5s
        cc.tween(this.FadePanel)
            .to(0.5, { opacity: 0 })
            .call(() => {
                 this.FadePanel.active = false;
            })
            .start();
        },
                // Khi tối xong thì chuyển scene

    Setvolume() {
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
        cc.director.loadScene("LevelSelect");
    },

    PlayBtnSetting() {
        this.playClickSound();
        this.SettingUI.active = true;
        this.SettingUI.scale = 0.1;
        cc.tween(this.SettingUI)
                
                .to(0.5, { scale: 1 }, { easing: 'backOut' }) // easing 'backOut' giúp hiệu ứng phóng to có độ "nẩy"
                .start();
        
        
    },

    PlayBtnExit() {
        this.playClickSound();
        cc.game.end();
    },
    // ===== SETTING UI =====
    PlayBtnCloseSetting() {
    this.playClickSound();

    cc.tween(this.SettingUI)
        .to(0.5, { scale: 0.1 }, { easing: 'backIn' }) // dùng backIn thì đẹp hơn khi đóng
        .call(() => {
            this.SettingUI.active = false;
        })
        .start();
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


    ClearDataBtn() {
        GameController.getInstance().resetAll();
        cc.sys.localStorage.clear();


    },

});
