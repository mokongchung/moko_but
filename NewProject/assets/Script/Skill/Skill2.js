let AudioController = require("AudioCtrl");
let BaseSkill = require("BaseSkill");
cc.Class({
    extends: BaseSkill,

    properties: {

        firstAnimation: cc.Animation,
        secondAnimation: cc.Animation,

    },


    start() {
        AudioController.getInstance().PlaySoundEffect(AudioController.getInstance().Skill2);

    },


    PlayTheBoom() {
        this.secondAnimation.play('Skill2Bloom');
        this.node.active = false;
    },
    AnimationStart() {
        AudioController.getInstance().PlaySoundEffect(AudioController.getInstance().Skill2);
    },
    EndAnimation() {
        this._super();
    },


    dealSKillEff() {

        this.arrayEnemy.forEach((nodeIndex, index) => {

            let event = new cc.Event.EventCustom('takeDmg', true); // bubbling = true
            event.detail = {
                dmg: this.dmgRateLevel[this.level],
            };
            try {
                nodeIndex.emit('takeDmg', event);
            } catch (err) {
                console.log("error when call emit take Dmg" + err);
            }

        });
    }



    // update (dt) {},
});
