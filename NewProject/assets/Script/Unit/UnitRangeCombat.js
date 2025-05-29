
let BaseUnitCombat = require("BaseUnitCombat");
cc.Class({
    extends: BaseUnitCombat,



    createBullet() {
        //console.log("create bullet");
        if (!this.bulletPrefab) return;

        if (this.checkEnemy()) {
            console.log("ko có enemy nào");
        } else {
            //console.log("tạo mới");
            let newBullet = cc.instantiate(this.bulletPrefab);
            newBullet.setPosition(this.node.getPosition());
            let Bullet_combat = newBullet.getComponent("BaseBullet");
            if (this.enemy && this.enemy.length > 0) {
                Bullet_combat.TargetEnemy  = this.enemy[0];
                
            }
            
            //console.log("add child");
            this.node.parent.addChild(newBullet);
            //console.log("add child done");
        }


    },
});
