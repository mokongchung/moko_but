let AudioController = require("AudioCtrl");
let GameController = require('GameCtrl');
cc.Class({
    extends: cc.Component,

    properties: {
        SettingUI: cc.Node,
        FadePanel: cc.Node,
        ShopUI: cc.Node,

        MusicSlider: cc.Slider,
        SfxSlider: cc.Slider,
        MasterSlider: cc.Slider,


        BtnPlay: cc.Button,
        BtnSetting: cc.Button,
        BtnExit: cc.Button,
    },

    onLoad() {

    },
    start() {
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
        // Lấy giá trị string từ localStorage => cần convert sang số bằng parseFloat
        let musicVol = cc.sys.localStorage.getItem("MusicVolume");
        if (musicVol !== null) {
            this._originalMusicVolume = parseFloat(musicVol);
            this.MusicSlider.progress = this._originalMusicVolume;
            AudioController.getInstance().setMusicVolume(this._originalMusicVolume);

        }

        let sfxVol = cc.sys.localStorage.getItem("SfxVolume");
        if (sfxVol !== null) {
            this._originalSfxVolume = parseFloat(sfxVol);
            this.SfxSlider.progress = this._originalSfxVolume;
            AudioController.getInstance().setSfxVolume(this._originalSfxVolume);

        }

        let masterVol = cc.sys.localStorage.getItem("MasterVolume");
        if (masterVol !== null) {
            this._originalMasterVolume = parseFloat(masterVol);
            this.MasterSlider.progress = this._originalMasterVolume;
            AudioController.getInstance().setMasterVolume(this._originalMasterVolume);

        }

        AudioController.getInstance().applyVolumes();
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
    buttonShopOnClick() {
        if (this.ShopUI) this.ShopUI.active = !this.ShopUI.active;
    },




    MusicSliderCtr(slider) {
        AudioController.getInstance().setMusicVolume(slider.progress);
    },

    SfxSliderCtr(slider) {
        AudioController.getInstance().setSfxVolume(slider.progress);
    },

    MasterSliderCtr(slider) {
        AudioController.getInstance().setMasterVolume(slider.progress);
    }

});
