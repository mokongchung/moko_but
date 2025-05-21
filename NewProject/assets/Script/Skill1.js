cc.Class({
    extends: cc.Component,

    properties: {
        Animation: cc.Animation,
        Sprite: cc.Node, 
    },

    EndAnimation () {
        cc.tween(this.Sprite&& this.node)
        .to(1.75, { opacity: 0 })
        .call(() => this.node.parent.destroy())
        .start();

    },

    AnimationStart () {
        cc.tween(this.Sprite)
        .to(0.5, { opacity: 255/3 })
        //.call(() => this.Sprite.destroy())
        .start();

    },

    start () {},
});
