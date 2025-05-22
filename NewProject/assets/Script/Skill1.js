cc.Class({
    extends: cc.Component,
    
    properties: {
        Animation: cc.Animation,
        Sprite: cc.Node, 
        spawnerNode : cc.Node,

        slowRate : 0.5,
        slowTime : 10,

        level : 1,
        slowTimeByLevel : {
            default: [],
            type: [cc.Integer],  
        },
        slowRateByLevel : {
            default: [],
            type: [cc.Float],  
        },
    },

    init(spawner, level = 1){
        if(spawner){
            this.spawnerNode = spawner;
        }
        this.level = level;
        if(level > (this.slowTimeByLevel.length -1) )
            this.level  = this.slowTimeByLevel.length -1;

    },
    EndAnimation () {

        let children = this.spawnerNode.children;

        children.forEach(child => {
            if (child.group === "e_hitbox") {
                let enemy = child.getComponent("unit_combat");
                if (enemy && enemy.slowUnit) {
                    enemy.slowUnit(this.slowRateByLevel[level], this.slowTimeByLevel[level]); 
                }
            }
        });


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
