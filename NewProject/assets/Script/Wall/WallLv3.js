let wall = require('WallLv2');
cc.Class({
    extends: wall,

    properties: {
       
        AcherNode: cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    AcherReady() {
        this.AcherNode.active = true;
        this.AcherNode.getComponent(cc.Animation).play("ArcherW3Idle");
    },

     takeDmg(event) 
     {
        this._super(event);
        if(this.hp <= 0 )
        {
            this.AcherNode.active=false;
        }
     },



});
