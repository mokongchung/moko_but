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
        moveSpeed: 50,
        atk: 10,
        dmgRateCombo : {
            default: [],
            type: [cc.Integer],  
        },
        atkSpeed: 1000,
        lvUp: 1,
        bulletSpeed: 100,

        bulletPrefab : cc.Prefab,
        hpBar : cc.ProgressBar,
    },



    onLoad () {
        this.moveTween;
        this.enemy = [];
        this.loopAtkID;
        this.hp = this.hpMax;
        this.node.on('see_enemy', this.seeEnemy, this);
        this.node.on('takeDmg', this.takeDmg, this);
        this.node.on('enemy_exit', this.exitEnemy, this);

        this.animation = this.node.getComponent(cc.Animation);
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
        this.checkEnemyListEmpty();
        console.log("hp deddddd "+ this.hp + " % " + (this.hp  / this.hpMax) );
    },
    checkEnemyListEmpty(){
        if(this.enemy.length == 0){
            this.move();
            clearInterval(this.loopAtkID);
            console.log("da stop loop atk +" +this.loopAtkID)
            this.loopAtkID = null;
        }
    },
    move(){
        this.moveTween = cc.tween(this.node)
            .by(1, { position: cc.v2(this.moveSpeed, 0) })
            .repeatForever()
            .start();
            this.animation.play('run');
    },

    loopAtk(){
        if ( this.enemy.length == 0) return;
        if (this.loopAtkID != null) return;
        console.log("atk enemy ");
        
        this.loopAtkID = setInterval(() => {
            

            if(  !this.enemy[0] || (this.enemy[0].active == false)){
                this.enemyDead();
            }else{
                let event = new cc.Event.EventCustom('takeDmg', true); // bubbling = true
                event.detail = { 
                    dmg: this.atk ,
                    
                };

                this.enemy[0].emit( 'takeDmg' , event);
            }

            
            
        }, this.atkSpeed); 

        //change animation atk
        this.animation.play('attack');

        console.log("loopAtk ID"+ this.loopAtkID ); 
    },
    takeDmg(event){
        if (!event || !event.detail) {
            console.warn('Lỗi: không có event hoặc event.detail');
            return;
        }
        if(this.hp <= 0 ) return;
        console.log(" nhận take dmg "+ event.detail.dmg);
        
        let dmgTake = event.detail.dmg;
        (this.hp -= dmgTake) < 0 ? this.hp = 0 : this.hp; 
        console.log("hp "+ this.hp + " % " + (this.hp  / this.hpMax) );

        this.hpBar.progress = (this.hp  / this.hpMax);

        if(this.hp <= 0 ){
            console.log("unit dead");
            this.animation.play('death');
            clearInterval(this.loopAtkID);
            
            
            
        }
    },
    dealDmg( comboHit = 0 , aoe = false){
        let dmgDeal = this.atk;
        if((dmgRateCombo.length > 0) || (this.dmgRateCombo[comboHit - 1] !== undefined) ){
            dmgDeal = this.dmgRateCombo[comboHit - 1];
        }

        if(  !this.enemy[0] || (this.enemy[0].active == false)){
            this.enemyDead();
        }else{
            let event = new cc.Event.EventCustom('takeDmg', true); // bubbling = true
            event.detail = { 
                dmg: dmgDeal,
                
            };

            if(aoe){
                this.enemy.forEach((nodeIndex, index) => {
                    nodeIndex.emit( 'takeDmg' , event);
                });
            }else{
                this.enemy[0].emit( 'takeDmg' , event);
            }
            
        }
         
    },
    createBullet(){
        if(! this.bulletPrefab) return;
        let newBullet = cc.instantiate(this.bulletPrefab);
        newBullet.setPosition(this.node.getPosition());
        let Bullet_combat = newNode.getComponent("Bullet_combat"); // tên script gắn trên prefab
            if (Bullet_combat) {
                Bullet_combat.initBullet(this.atk, this.bulletSpeed);
            }
        this.node.parent.addChild(newBullet);
    },
    dead(){
        this.node.active = false;
    },


    // update (dt) {},
});
