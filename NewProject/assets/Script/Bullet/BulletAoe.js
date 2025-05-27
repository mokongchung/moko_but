
let BaseBullet = require('BaseBullet');
cc.Class({
    extends: BaseBullet,


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},


    dealDmgAOE( ){
        console.log("bullet dmg aoe");
        this.stopMove();
        this.animation.play('dmg');
        this.enemy.forEach((nodeIndex, index) => {
           
            let event = new cc.Event.EventCustom('takeDmg', true); // bubbling = true
            event.detail = { 
                dmg: this.atk ,
                
            };
            try{
                nodeIndex.emit( 'takeDmg' , event);
            }catch (err){
                console.log("error when call emit take Dmg"+ err);
            }
        });
    },
    onCollisionEnter (other, self) {
        this._super();

        this.dealDmgAOE();

        
    },

    // update (dt) {},
});
