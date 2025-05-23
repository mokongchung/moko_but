// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
let GameController = require('GameCtrl');

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
        this.LV = GameController.getInstance().Level;
        this.hpMax = this.hpMax + this.LV * 700;
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
        //console.log(" nhận take dmg "+ event.detail.dmg);
        this.ShakeHpBar();
        let dmgTake = event.detail.dmg;
        (this.hp -= dmgTake) < 0 ? this.hp = 0 : this.hp; 
        //console.log("hp castle"+ this.hp + " % " + (this.hp  / this.hpMax) );

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

    AIWhoWillPlaythisGame() {
    let spawnRates = [50, 25, 15, 7, 3]; // tỷ lệ spawn cho các Index 0-4
    let totalRate = spawnRates.reduce((a, b) => a + b, 0);

    // Hàm chọn index theo tỉ lệ
    function getRandomIndex() {
        let rand = Math.random() * totalRate;
        let sum = 0;
        for(let i = 0; i < spawnRates.length; i++) {
            sum += spawnRates[i];
            if(rand < sum) return i;
        }
        return spawnRates.length - 1;
    }
    setInterval(() => {

        this.SpawnerScript.SpawnEnemy(4, this.spawHolder, this.LV);

    }, 20000); 
    setInterval(() => {

        this.SpawnerScript.SpawnEnemy(3, this.spawHolder, this.LV);

    }, 10000); 
    setInterval(() => {

        this.SpawnerScript.SpawnEnemy(0, this.spawHolder, this.LV);
        this.SpawnerScript.SpawnEnemy(1, this.spawHolder, this.LV);
        this.SpawnerScript.SpawnEnemy(2, this.spawHolder, this.LV);
        this.SpawnerScript.SpawnEnemy(3, this.spawHolder, this.LV);
        this.SpawnerScript.SpawnEnemy(4, this.spawHolder, this.LV);

    }, 30000); 



    // Hàm spawn liên tục với delay ngẫu nhiên
    let spawnEnemyLoop = () => {
        let index = getRandomIndex();
        this.SpawnerScript.SpawnEnemy(index, this.spawHolder, this.LV);

        let delay = 4000 + Math.random() * 2000; // từ 4000ms (4s) đến 6000ms (6s)


        this.scheduleOnce(() => {
            spawnEnemyLoop();
        }, delay / 1000);
    }

    // Bắt đầu spawn
    spawnEnemyLoop();
    },

    
});
