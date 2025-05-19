// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
        MoneySpeed: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.Money =0;
        this.Hp=100;
    },

    start () {
        this.SpawnerScript = this.node.getComponent('Spawner');
    },

    update (dt) {
        this.MoneyGain(dt);
    },
    MoneyGain(dt)
    {
        let Moneygain=0
        Moneygain += dt * this.MoneySpeed;
        this.Money += Math.floor(Moneygain);
        
    },

    AIWhoWillPlaythisGame()
    {
        
    }
    
});
