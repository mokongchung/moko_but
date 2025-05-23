let AudioController = require("AudioCtrl");
cc.Class({
    extends: cc.Component,

    properties: {
        edgeScrollThreshold: 20, // Khoảng cách đến rìa màn hình để bắt đầu cuộn
        edgeScrollSpeed: 200,    // Tốc độ cuộn rìa tính theo px/s
        dragSpeed: 0.1, // Tốc độ kéo camera


        backgroundNode: cc.Node, // Node nền để kéo camera
        cameraNode: cc.Node, // Node camera để di chuyển

        GameOverUI: cc.Node, // Node GameOver UI
        GameWinUI: cc.Node, // Node GameWin UI
        GamePauseUI: cc.Node, // Node GamePause UI

        SfxSlider: cc.Slider,
        MusicSlider: cc.Slider,
        MasterSlider: cc.Slider,
        
        BlackPanel: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    this._isDragging = false;
    this._lastTouchPos = null;
    this._mousePos = null; // 👈 thêm dòng này


    this._originalMusicVolume = 1.0;
    this._originalSfxVolume = 1.0;
    this._originalMasterVolume = 1.0;

    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

    this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);

},



    start () {
        const audio = AudioController.getInstance();
        audio.PlayBgMusic(audio.bgMusicGamePlay);
         //this.requestHPFromPlayer();
         this.Setvolume();
             console.log('BlackPanel node:', this.BlackPanel);

       //  this.BlackPanelTween();
    },


 update(dt) {
        if (!this.cameraNode || !this.backgroundNode || !this._mousePos) return;

        const mousePos = this._mousePos;
        const screenWidth = cc.view.getVisibleSize().width;
        const halfViewWidth = screenWidth / 2;

        const bgLeft = this.backgroundNode.x - this.backgroundNode.width / 2;
        const bgRight = this.backgroundNode.x + this.backgroundNode.width / 2;

        const minX = bgLeft + halfViewWidth;
        const maxX = bgRight - halfViewWidth;

        let newX = this.cameraNode.x;

        if (mousePos.x <= this.edgeScrollThreshold) {
            newX -= this.edgeScrollSpeed * dt;
        } else if (mousePos.x >= screenWidth - this.edgeScrollThreshold) {
            newX += this.edgeScrollSpeed * dt;
        }

        newX = Math.max(minX, Math.min(newX, maxX));
        this.cameraNode.setPosition(newX, this.cameraNode.y);
    },
    onMouseMove(event) {
        this._mousePos = event.getLocation();
    },



    requestHPFromPlayer(callback) {
    cc.director.emit("RequestHP", (hp) => {
        callback(hp); // Gửi HP về callback
    });
    },


   onGameOver() {
    this.requestHPFromPlayer((HP) => {
        cc.log("GameWinScript HP:", HP);

        if (HP <= 0) {
            this.GameOverUI.active = true;
        } else {
            this.GameWinUI.active = true;
            let GameWinScript = this.GameWinUI.getComponent("GameWinScript");
            GameWinScript.PlayerHP = HP;
            GameWinScript.StarCall();
        }

       // cc.director.pause();
    });
    },

    onTouchStart(event) {
        this._isDragging = true;
        this._lastTouchPos = event.getLocation();
    },

    onTouchMove(event) {
        if (!this._isDragging || !this.cameraNode || !this.backgroundNode) return;

        const currentPos = event.getLocation();
        const delta = currentPos.sub(this._lastTouchPos);
        const deltaX = delta.x * this.dragSpeed;

        // Tính vị trí mới
        let newX = this.cameraNode.x - deltaX;

        // === TÍNH GIỚI HẠN ===
        
        const halfViewWidth = (cc.view.getVisibleSize().width / 2);

        const bgLeft = this.backgroundNode.x - this.backgroundNode.width / 2;
        const bgRight = this.backgroundNode.x + this.backgroundNode.width / 2;

        const minX = bgLeft + halfViewWidth;
        const maxX = bgRight - halfViewWidth;

        // Clamp lại trong khoảng cho phép
        newX = Math.max(minX, Math.min(newX, maxX));

        // Cập nhật vị trí camera
        this.cameraNode.setPosition(newX, this.cameraNode.y);

        this._lastTouchPos = currentPos;
    },

    onTouchEnd(event) {
        this._isDragging = false;
    },
    //=====Gameover Ui  
    BtnRestart() {
        cc.director.resume();
        cc.director.loadScene("GamePlay");
        this.GameOverUI.active = false;
    },
    BtnExit() {
        cc.director.resume();
        cc.director.loadScene("MainMenu");
        this.GameOverUI.active = false;
    },

    //====GamePause UI
    BtnResume() {
        cc.director.resume();
        this.GamePauseUI.active = false;
    },
   
    BtnPause() {
        cc.director.pause();
        this.GamePauseUI.active = true;
    },

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
            for (let i = 0; i < audio.MinionAudioSource.length; i++) {
                audio.MinionAudioSource[i].volume = sliderVol.progress;
            }
            cc.sys.localStorage.setItem("SfxVolume", sliderVol.progress);// Lưu giá trị âm lượng vào localStorage
        },
    
        MasterSliderCtr(sliderVol) {
        const audio = AudioController.getInstance();
        const masterVolume = sliderVol.progress;
    
        audio.MusicAudioSource.volume = audio._originalMusicVolume * masterVolume;
        audio.SoundEffectAudioSource.volume = audio._originalSfxVolume * masterVolume;
        cc.sys.localStorage.setItem("MasterVolume", masterVolume);// Lưu giá trị âm lượng vào localStorage
        },
    // update (dt) {},
});
