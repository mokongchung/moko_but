let AudioController = require("AudioCtrl");

cc.Class({
    extends: cc.Component,

    properties: {
        dmg: 50,
        level: 1,

        dmgRateLevel: {
            default: [],
            type: [cc.Integer],
        },
    },
    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        this.arrayEnemy = [];
    },

    start() {


    },
    init(level = 1) {
        this.level = level;
        if (level > (this.dmgRateLevel.length - 1))
            this.level = this.dmgRateLevel.length - 1;
    },

    AnimationStart() {
    },

    EndAnimation() {
        this.dealSKillEff();

        this.node.parent.destroy();
    },

    dealSKillEff() {


    },
    onCollisionEnter(other, self) {
        console.log("add enemy to skill 1")
        this.arrayEnemy.push(other.node);
    }
    ,
    onCollisionExit(other, self) {
        let enemyNode = other.node;
        let index = this.arrayEnemy.indexOf(enemyNode);
        if (index !== -1) {
            this.arrayEnemy.splice(index, 1);
        }
    },




    // update (dt) {},
});
