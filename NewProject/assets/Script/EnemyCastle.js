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
        spawHolder : cc.Node,


        hpBar : cc.ProgressBar,
        GamePlay: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.Money =0;
        this.hp = this.hpMax;
    },

    start () {
        this.SpawnerScript = this.node.getComponent('Spawner');

       // this.AIWhoWillPlaythisGame();
        this.node.on('takeDmg', this.takeDmg, this);
        this.AIWhoWillPlaythisGame();
    },

    update (dt) {
        this.MoneyGain(dt);
        //this.loopSpam;
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
        this.ShakeHpBar();
        let dmgTake = event.detail.dmg;
        (this.hp -= dmgTake) < 0 ? this.hp = 0 : this.hp; 
        console.log("hp castle"+ this.hp + " % " + (this.hp  / this.hpMax) );

        this.hpBar.progress = (this.hp  / this.hpMax);

        if(this.hp <= 0 ){
            console.log("castle enemy dead");
            let GamePlayScript = this.GamePlay.getComponent('GamplayScript');
            GamePlayScript.onGameOver();
            
            
            this.node.active = false;
        }
    },

    ShakeHpBar() {
        const originalPos = this.hpBar.node.getPosition();

        cc.tween(this.hpBar.node)
            .repeat(5, // lặp 5 lần lắc trái phải
                cc.tween()
                    .to(0.03, { x: originalPos.x + 5 })
                    .to(0.03, { x: originalPos.x - 5 })
            )
            .to(0.03, { x: originalPos.x }) // trở lại vị trí ban đầu
            .start();
    },

    AIWhoWillPlaythisGame()
    {
         //for (let i = 0; i < 10; i++) {
         //       this.SpawnerScript.SpawnEnemy(null, 1); 
         //  }
        //auto spam
        this.SpawnerScript.SpawnEnemy(null, 1,this.spawHolder); 
        this.SpawnerScript.SpawnEnemy(null, 0,this.spawHolder); 
        
        this.SpawnerScript.SpawnEnemy(null, 2,this.spawHolder); 
        this.SpawnerScript.SpawnEnemy(null, 3,this.spawHolder); 
        this.SpawnerScript.SpawnEnemy(null, 4,this.spawHolder); 

            return;
         this.loopSpam = setInterval(() => {
             this.SpawnerScript.SpawnEnemy(null, 0); 
         }, 10000); 
         this.loopSpam = setInterval(() => {
            this.SpawnerScript.SpawnEnemy(null, 2); 
        }, 10050); 
        this.loopSpam = setInterval(() => {
            this.SpawnerScript.SpawnEnemy(null, 3); 
        }, 10100); 
        this.loopSpam = setInterval(() => {
            this.SpawnerScript.SpawnEnemy(null, 3); 
        }, 100000); 
    }
    
});
