// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
let GameController = require('GameCtrl');
let BaseCastle = require('BaseCastle');
cc.Class({
    extends: BaseCastle,



    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this._super();
        this.LV = GameController.getInstance().Level;
        this.hpMax = this.hpMax + this.LV * 700;
        this.hp = this.hpMax;
    },

    start () {
        this._super();
        this.SpawnerScript = this.node.getComponent('Spawner');
        
        this.AIWhoWillPlaythisGame();
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
    /*
    setInterval(() => {

        this.SpawnerScript.SpawnEnemy(4, this.spawHolder, this.LV);

    }, 40000); 
    setInterval(() => {

        this.SpawnerScript.SpawnEnemy(3, this.spawHolder, this.LV);

    }, 10000); 
    */
    setInterval(() => {

        this.SpawnerScript.SpawnEnemy(0, this.Spawner, this.LV);
        this.SpawnerScript.SpawnEnemy(1, this.Spawner, this.LV);
        this.SpawnerScript.SpawnEnemy(2, this.Spawner, this.LV);
        this.SpawnerScript.SpawnEnemy(3, this.Spawner, this.LV);
        this.SpawnerScript.SpawnEnemy(4, this.Spawner, this.LV);

    }, 60000); 



    // Hàm spawn liên tục với delay ngẫu nhiên
    let spawnEnemyLoop = () => {
        let index = getRandomIndex();
        this.SpawnerScript.SpawnEnemy(index, this.Spawner, this.LV);

        let delay = 4000 + Math.random() * 2000; // từ 4000ms (4s) đến 6000ms (6s)


        this.scheduleOnce(() => {
            spawnEnemyLoop();
        }, delay / 1000);
    }

    // Bắt đầu spawn
    spawnEnemyLoop();
    },

    
});
