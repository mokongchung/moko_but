
cc.Class({
    extends: cc.Component,

    properties: {
        
        speed: 50,
        atk: 10,
        aoe : true,
        TargetEnemy: cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.enemy = [];
        this.dealDmg = true;
        this.moveTween;
        this.node.on('see_enemy', this.seeEnemy, this);
        this.animation = this.node.getComponent(cc.Animation);

        cc.director.getCollisionManager().enabled = true;
     },

    start () {
        //console.log("bullet start");
        if ( this.enemy.length == 0) {
            this.move();
        }
        
        
    },
    // initBullet(atk = 10, speed = 50 , aoe = false){
    //     this.atk = atk;
    //     this.speed = speed;
    //     this.aoe = aoe;
    // },

    seeEnemy (event) {
        //console.log("bullet enemy");
        let enemyNode = event.detail.node;
        
        this.enemy.push( enemyNode.node) ;
        // Chặn không cho sự kiện lan tiếp
        event.stopPropagation();
    },
    exitEnemy(event){
        let enemyNode = event.detail.node;
        let index = this.enemy.indexOf(enemyNode);
        if (index !== -1) {
            this.enemy.splice(index, 1);
        }
        
    },
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

    move(){
        //console.log("bullet move");
        this.moveTween = cc.tween(this.node)
            .by(1, { position: cc.v2(this.speed, 0) })
            .repeatForever()
            .start();
        this.animation.play('run');
    },
    stopMove(){
        if(this.moveTween){
            this.moveTween.stop();
            this.moveTween=null;
        }
    },
    detroyBullet(){
        //console.log("bullet detroy");
        this.node.active = false;
        this.node.off('see_enemy', this.seeEnemy, this);
    },
    onCollisionEnter (other, self) {
        if(!this.dealDmg)  return;
        //this.node.getComponent(cc.BoxCollider).enabled = false;
        this.dealDmg = false;
        if(this.aoe){
            this.dealDmgAOE();
        }else{
            this.dealDmgToTarget(other);
        }
        
    },

    // update (dt) {},
});
