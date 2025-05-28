let BaseWall = require('BaseWalll');
cc.Class({
    extends: BaseWall,

    properties: {
        
    },


    takeDmg(event){
        this._super(event);
        let attacker = event.detail.attacker;
        this.Revenge(attacker);
    },
     Revenge(enemy ){
        let dmgDeal = this.atk;
            let event = new cc.Event.EventCustom('takeDmg', true); 
            event.detail = { 
                dmg: dmgDeal,
                attacker: this.node,
            };
                enemy.emit( 'takeDmg' , event);   
    },


});
