
let BaseBullet = require('BaseBullet');
cc.Class({
    extends: BaseBullet,


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},


    dealDmgToTarget(other){
        console.log("bullet dmg target");
        this.stopMove();
        this.animation.play('dmg');
        let event = new cc.Event.EventCustom('takeDmg', true); // bubbling = true
        event.detail = { 
            dmg: this.atk ,    
        };
        other.node.emit('takeDmg' , event);
    },

    onCollisionEnter (other, self) {
        this._super();

        this.dealDmgToTarget();

        
    },

    // update (dt) {},
});
