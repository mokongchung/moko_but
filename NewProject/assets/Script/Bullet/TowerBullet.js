cc.Class({
    extends: cc.Component,

    properties: {
        enemy: cc.Node,
        atk: 20, // Sát thương của viên đạn
    },

    onEnable () {
        this.flyToEnemy();
        this.animation = this.node.getComponent(cc.Animation).play("AcheryBullet");

    },

    flyToEnemy () {
        if (!this.enemy) {
            cc.error("Enemy node is not assigned!");
            return;
        }

        let enemyWorldPos = this.enemy.convertToWorldSpaceAR(cc.v2(0, 0));
        let targetPosLocal = this.node.parent.convertToNodeSpaceAR(enemyWorldPos);

        this.node.runAction(
            cc.sequence(
                cc.jumpTo(1, targetPosLocal, 100, 1),
                cc.callFunc(() => {
                    this.dealDmgToTarget(this.enemy)
                }, this),
                cc.callFunc(() => {
                    this.node.active=false;
                }, this),
            )
        );

    },

    dealDmgToTarget(other){
        console.log("bullet dmg target");
        let event = new cc.Event.EventCustom('takeDmg', true); // bubbling = true
        event.detail = { 
            dmg: this.atk ,    
        };
        other.emit('takeDmg' , event);
    },
});
