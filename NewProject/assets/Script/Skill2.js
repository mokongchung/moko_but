
cc.Class({
    extends: cc.Component,
    name: "Skill",
    properties: {
        firstAnimation: cc.Animation,
        secondAnimation: cc.Animation,
        dmg : 50,
    },
    onLoad(){
        cc.director.getCollisionManager().enabled = true;
        this.arrayEnemy = [];
    },

    PlayTheBoom()
    {
        this.secondAnimation.play('Skill2Bloom');
        this.node.active = false;
    },

    EndAnimation () {
        this.dealDmg();

        this.node.parent.destroy();
    },
    
    dealDmg(){
        this.arrayEnemy.forEach((nodeIndex, index) => {
           
            let event = new cc.Event.EventCustom('takeDmg', true); // bubbling = true
            event.detail = { 
                dmg: this.dmg, 
            };
            try{
                nodeIndex.emit( 'takeDmg' , event);
            }catch (err){
                console.log("error when call emit take Dmg"+ err);
            }
            
        });
    }
    ,
    onCollisionEnter (other, self) {
        this.arrayEnemy.push(other.node);
    }
    ,
    onCollisionExit (other, self) {
        let enemyNode = other.node;
        let index = this.arrayEnemy.indexOf(enemyNode);
        if (index !== -1) {
            this.arrayEnemy.splice(index, 1);
        }
    },



    // update (dt) {},
});
