
cc.Class({
    extends: cc.Component,

    properties: {
        firstAnimation: cc.Animation,
        secondAnimation: cc.Animation,
    },

    PlayTheBoom()
    {
        this.secondAnimation.play('Skill2Bloom');
        this.node.active = false;
    },

    EndAnimation () {
        this.node.parent.destroy();
    },



    // update (dt) {},
});
