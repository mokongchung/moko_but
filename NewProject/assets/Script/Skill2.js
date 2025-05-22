
cc.Class({
    extends: cc.Component,
    
    properties: {
        firstAnimation: cc.Animation,
        secondAnimation: cc.Animation,
        dmg : 50,
        level : 1,
        dmgRateLevel : {
            default: [],
            type: [cc.Integer],  
        },
    },
    onLoad(){
        cc.director.getCollisionManager().enabled = true;
        this.arrayEnemy = [];
    },
    init(level = 1){
        this.level = level;
        if(level > (this.dmgRateLevel.length -1) )
            this.level  = this.dmgRateLevel.length -1;
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
                dmg:  this.dmgRateLevel[level], 
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
