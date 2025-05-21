// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
        speed: 50,
        atk: 10,

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.enemy = [];
        this.node.on('see_enemy', this.seeEnemy, this);
        this.animation = this.node.getComponent(cc.Animation);

        cc.director.getCollisionManager().enabled = true;
     },

    start () {
        this.move();

        
    },
    initBullet(atk = 10, speed = 50){
        this.atk = atk;
        this.speed = speed;
    },

    seeEnemy (event) {
        console.log("seee enemy");
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
    dealDmg( ){
        this.animation.play('dmg');
        this.enemy.forEach((nodeIndex, index) => {
           
            let event = new cc.Event.EventCustom('takeDmg', true); // bubbling = true
            event.detail = { 
                dmg: this.atk ,
                
            };
            nodeIndex.emit( 'takeDmg' , event);
        });
    },

    move(){
        this.moveTween = cc.tween(this.node)
            .by(1, { position: cc.v2(this.speed, 0) })
            .repeatForever()
            .start();
        this.animation.play('run');
    },
    detroyBullet(){
        this.node.active = false;
    },
    onCollisionEnter (other, self) {
        this.dealDmg();
    },

    // update (dt) {},
});
