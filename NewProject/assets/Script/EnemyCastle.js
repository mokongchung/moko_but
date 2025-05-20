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
        hpMax : 100,


        hpBar : cc.ProgressBar,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.Money =0;
        this.hp = this.hpMax;
    },

    start () {
        this.SpawnerScript = this.node.getComponent('Spawner');

        //this.AIWhoWillPlaythisGame();
        this.node.on('takeDmg', this.takeDmg, this);
    },

    update (dt) {
        this.MoneyGain(dt);
        this.loopSpam;
    },
    MoneyGain(dt)
    {
        let Moneygain=0
        Moneygain += dt * this.MoneySpeed;
        this.Money += Math.floor(Moneygain);
        
    },
    takeDmg(event){
        if (!event || !event.detail) {
            console.warn('Lỗi: không có event hoặc event.detail');
            return;
        }
        console.log(" nhận take dmg "+ event.detail.dmg);
        
        let dmgTake = event.detail.dmg;
        (this.hp -= dmgTake) < 0 ? this.hp = 0 : this.hp; 
        console.log("hp castle"+ this.hp + " % " + (this.hp  / this.hpMax) );

        this.hpBar.progress = (this.hp  / this.hpMax);

        if(this.hp <= 0 ){
            console.log("castle enemy dead");
            
            
            
            this.node.active = false;
        }
    },

    AIWhoWillPlaythisGame()
    {
        //auto spam
        this.loopSpam = setInterval(() => {

            this.SpawnerScript.SpawnPlayer(null, 1); 
            

            
            
        }, 3); 
    }
    
});
