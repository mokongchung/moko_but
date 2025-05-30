let pool = require('PoolingManager');
cc.Class({
    extends: cc.Component,

    properties: {
        hpBar: cc.ProgressBar,
        atk : 10,
        lv : 1,
    },

    onLoad () 
    {
        this.isdead=false;
        //this.animation = this.getComponent(cc.Animation);

    },
    onEnable () 
    {
        this.isdead=false;
        cc.director.getCollisionManager().enabled = true;
        this.animation = this.getComponent(cc.Animation);
        this.animation.play("BuildW");    
        this.hpMax = 1000 * this.lv;
        this.hp = this.hpMax ;

        this.node.on('takeDmg', this.takeDmg, this);
        this.hpBar.progress = (this.hp  / this.hpMax);
        this.SendBuildInfo(true);
    },

    SendBuildInfo(bool)
    {
            const event = new cc.Event.EventCustom('BuildingInfo', true); 
            event.detail = {
                HaveBuilding: bool
            };
            this.node.dispatchEvent(event);
    },
    takeDmg(event){
        if (!event || !event.detail) {
            console.warn('Lỗi: không có event hoặc event.detail');
            return;
        }
        // if(this.hp <= 0 ) {
        //     this.dead();
        //     return;
        // }
        //console.log(" nhận take dmg "+ event.detail.dmg);
        if(!this.isdead)
        { 
            let dmgTake = event.detail.dmg;
          //  console.log("take dmg " + dmgTake + " hp " + this.hp);
            (this.hp -= dmgTake) < 0 ? this.hp = 0 : this.hp; 
            //console.log("hp "+ this.hp + " % " + (this.hp  / this.hpMax) );
         //   console.log("hp " + this.hp + " / " + this.hpMax + " % " + (this.hp  / this.hpMax) );
            this.hpBar.progress = (this.hp  / this.hpMax);

            if(this.hp <= 0 ){
                this.isdead=true;
                console.log("DesTroyW");
                //cc.director.getCollisionManager().enabled = false;
                this.animation.play("DesTroyW");    
                //this.node.active = false;  
                    // this.dead();
            }
        }
    },
    dead(index) {
        this.SendBuildInfo(false);
        console.log("dead wall" + index);
        this.node.off('takeDmg', this.takeDmg, this);
        pool.getInstance().putWall(index, this.node);
    },

    // update (dt) {},
});
