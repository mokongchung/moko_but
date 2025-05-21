let AudioController = require("AudioCtrl");
let GameController = require('GameCtrl');
cc.Class({
    extends: cc.Component,

    properties: {
        BtnLv: [cc.Button],
         FadePanel: cc.Node,
    },

    

    onEnable () {
        this.ButtonTween();
         AudioController.getInstance().PlayBgMusic(AudioController.getInstance().bgMusicMapSelect);
    },

    ButtonTween()
    {
        for (let i = 0; i < this.BtnLv.length; i++) {
            let btn = this.BtnLv[i].node;
            btn.scale = 0.1;
            console.log("btn"+btn);

            //Tạo tween phóng to lên scale 1 (100%) trong 0.5 giây
            cc.tween(btn)
            .delay(i * 0.2) 
            .to(1.5, { scale: 1 }, { easing: 'backOut' }) // easing 'backOut' giúp hiệu ứng phóng to có độ "nẩy"
            .call(() => {
                this.UnlockedCheck(this.BtnLv[i], i);
            })
            .start();
                    }
    },

    UnlockedCheck(button, index) {
        const levelIndex = index + 1;
        const levelData = GameController.getInstance().getLevel(levelIndex); 
        
        if (levelData.Unlocked) {
            console.log(`Level ${levelIndex} is Unlocked`);
            button.interactable = true;
        } else {
            console.log(`Level ${levelIndex} is Locked`);
            button.interactable = false;
        }

        const lvSelectBtn = button.node.getComponent("LvSelectBtn");
        if (lvSelectBtn) {
            lvSelectBtn.StartTween(levelIndex); // Lưu level vào button
        } else {
            console.warn("LvSelectBtn component not found on button.node");
        }
    },




    CheckBtnLv(node) {
        let btn = node.getComponent(cc.Button);
    },
    // update (dt) {},
    LvSelectBtn(event, index) {
        console.log("so la"+index);
        GameController.getInstance().Level = index;
        cc.director.loadScene("GamePlay");
    },

     BackToMainMenu() {
        const audio = AudioController.getInstance();
        audio.PlaySoundEffect(audio.soundEffectButton);

        // Hiện panel đen lên
        this.FadePanel.active = true;
        this.FadePanel.opacity = 0;

        // Tween để làm tối dần trong 0.5s
        cc.tween(this.FadePanel)
            .to(0.5, { opacity: 255 })
            .call(() => {
                // Khi tối xong thì chuyển scene
                cc.director.loadScene("MainMenu");
            })
            .start();
    }
});
