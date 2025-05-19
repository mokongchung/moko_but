// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        hpMax : 100,
        speed: 50,
        atk: 10,
        atkSpeed: 1000,
        lvUp: 1,


        hpBar : cc.ProgressBar,
    },



    onLoad () {
        this.moveTween;
        this.enemy = [];
        this.loopAtk;
        this.hp = this.hpMax;
        this.node.on('see_enemy', this.seeEnemy, this);
        this.node.on('takeDmg', this.takeDmg, this);
        this.node.on('enemy_exit', this.exitEnemy, this);
     },

    start () {
        this.move();
    },

    seeEnemy (event) {
        console.log("seee enemy");
        let enemyNode = event.detail.node;
        this.moveTween.stop();
        cc.log('Cha nhận node:', enemyNode.node.group);
        // Thử thay đổi màu node
        this.enemy.push( enemyNode.node) ;
        this.loopAtk();
        

        // Chặn không cho sự kiện lan tiếp
        event.stopPropagation();
    },
    exitEnemy(event){
        let enemyNode = event.detail.node;
        let index = this.enemy.indexOf(enemyNode);
        if (index !== -1) {
            this.enemy.splice(index, 1);
        }
        this.checkEnemyListEmpty();
    },

    enemyDead(){
        console.log("enemy dead");
        this.enemy.shift();
        
        console.log("hp deddddd "+ this.hp + " % " + (this.hp  / this.hpMax) );
    },
    checkEnemyListEmpty(){
        if(this.enemy.length == 0){
            this.move();
            clearInterval(this.loopAtk);
            this.loopAtk = null;
        }
    },
    move(){
        this.moveTween = cc.tween(this.node)
            .by(1, { position: cc.v2(this.speed, 0) })
            .repeatForever()
            .start();
    },

    loopAtk(){
        if ( this.enemy.length == 0) return;
        
        console.log("atk enemy ");
        
        this.loopAtk = setInterval(() => {

            if(this.enemy[0].active == false){
                this.enemyDead();
            }else{
                let event = new cc.Event.EventCustom('takeDmg', true); // bubbling = true
                event.detail = { 
                    dmg: this.atk ,
                    
                };

                this.enemy[0].emit( 'takeDmg' , event);
            }

            
            
        }, this.atkSpeed); 
    },
    takeDmg(event){
        if (!event || !event.detail) {
            console.warn('Lỗi: không có event hoặc event.detail');
            return;
        }
        console.log(" nhận take dmg "+ event.detail.dmg);
        
        let dmgTake = event.detail.dmg;
        (this.hp -= dmgTake) < 0 ? this.hp = 0 : this.hp; 
        console.log("hp "+ this.hp + " % " + (this.hp  / this.hpMax) );

        this.hpBar.progress = (this.hp  / this.hpMax);

        if(this.hp <= 0 ){
            console.log("unit dead");
            clearInterval(this.loopAtk);
            
            
            this.node.active = false;
        }
    }


    // update (dt) {},
});
