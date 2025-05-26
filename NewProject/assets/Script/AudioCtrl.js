let AudioController = cc.Class({
    extends: cc.Component,

    statics: {
        _instance: null,

        getInstance() {
            return this._instance;
        }
    },

    onLoad() {
        if (AudioController._instance) {
            // Nếu đã có instance rồi, tự hủy node này để tránh duplicate
            this.node.destroy();
            return;
        }
        AudioController._instance = this;

        // Giữ node này tồn tại xuyên scene
        cc.game.addPersistRootNode(this.node);
        this.SelectedMinionAudio=0;
        this._originalMusicVolume = parseFloat(cc.sys.localStorage.getItem("MusicVolume")) || 1;
        this._originalSfxVolume = parseFloat(cc.sys.localStorage.getItem("SfxVolume")) || 1;
        this._masterVolume = parseFloat(cc.sys.localStorage.getItem("MasterVolume")) || 1;
    },

    properties: {
        // ===== Audio Source =====
        MusicAudioSource: cc.AudioSource,
        SoundEffectAudioSource: cc.AudioSource,
        MinionAudioSource: [cc.AudioSource],
        MinonSingleAudioSource: cc.AudioSource,

        // ===== 🎵 BG MUSIC =====
        bgMusicMainMenu: cc.AudioClip,
        bgMusicGamePlay: cc.AudioClip,
        bgMusicGameOver: cc.AudioClip,
        bgMusicMapSelect: cc.AudioClip,
        bgMinionMusic: cc.AudioClip,

        // ===== 🔊 SOUND EFFECT =====
        soundEffectButton: cc.AudioClip,
        Skill1: cc.AudioClip,
        Skill2: cc.AudioClip,
        // ===== 🐭 MINION SOUND EFFECT ====
        MinionSound: [cc.AudioClip],
    },

    start() {
        this.PlayBgMusic(this.bgMusicMainMenu);
    },

    PlayBgMusic(musicClip) {
        if (!musicClip || !this.MusicAudioSource) return;

        if (this.MusicAudioSource.clip) {
            this.MusicAudioSource.stop();
        }

        this.MusicAudioSource.clip = musicClip;
        this.MusicAudioSource.play();
    },

    PlaySoundEffect(sfxClip) {
        if (sfxClip && this.SoundEffectAudioSource) {
            this.SoundEffectAudioSource.stop();
            this.SoundEffectAudioSource.clip = sfxClip;
            this.SoundEffectAudioSource.play();
        }
    },

    PlayMinionSoundEffect(sfxClip) {
       this.MinionAudioSource[this.SelectedMinionAudio].stop();
        this.MinionAudioSource[this.SelectedMinionAudio].clip = sfxClip;
         this.MinionAudioSource[this.SelectedMinionAudio].play();
         this.SelectedMinionAudio=(this.SelectedMinionAudio + 1 )% 3;

         
    },

    applyVolumes() {
        this.MusicAudioSource.volume = this._originalMusicVolume * this._masterVolume;
        this.SoundEffectAudioSource.volume = this._originalSfxVolume * this._masterVolume;

        for (let i = 0; i < this.MinionAudioSource.length; i++) {
            this.MinionAudioSource[i].volume = this._originalSfxVolume * this._masterVolume;
        }
    },

    setMusicVolume(value) {
        value = Math.max(0, Math.min(1, value));
        this._originalMusicVolume = value;
        this.applyVolumes();
        cc.sys.localStorage.setItem("MusicVolume", value);
    },

    setSfxVolume(value) {
        value = Math.max(0, Math.min(1, value));
        this._originalSfxVolume = value;
        this.applyVolumes();
        cc.sys.localStorage.setItem("SfxVolume", value);
    },

    setMasterVolume(value) {
        value = Math.max(0, Math.min(1, value));
        this._masterVolume = value;
        this.applyVolumes();
        cc.sys.localStorage.setItem("MasterVolume", value);
    },

       


});

module.exports = AudioController;
