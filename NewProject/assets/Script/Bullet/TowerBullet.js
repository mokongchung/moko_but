cc.Class({
    extends: cc.Component,

    properties: {
        enemy: cc.Node,
        atk: 20, 
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
                    if (this.enemy && this.enemy.active) {
                        this.dealDmgToTarget(this.enemy);
                        this.node.active = false;
                    } else {
                        this.scheduleOnce(() => {
                            this.node.active = false;
                        }, 1.5);
                    }
                }, this)
            )
        );


    },

    dealDmgToTarget(other){
        console.log("bullet dmg target");
        let event = new cc.Event.EventCustom('takeDmg', true); 
        event.detail = { 
            dmg: this.atk ,    
        };
        other.emit('takeDmg' , event);
    },
});
