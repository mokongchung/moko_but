let GameController = require('GameCtrl');
cc.Class({
    extends: cc.Component,

    properties: {
        Spawner: cc.Node,
        Skill1Btn: cc.Button,
        Skill2Btn: cc.Button,
        MoneySpeed: 1,
        ManaRegenSpeed: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.Money =0;
        this.Hp = 100;
        this.Spell = 0;
    },

    start () {
        this.animation = this.node.getComponent(cc.Animation);
    },
    CastleIdle() 
    {
        this.animation.play('CastlesIdle');
    },
     update (dt) 
     {
        this.MoneynManaGain(dt);
     },

     MoneynManaGain (dt) 
     {
        this.Money += dt* this.MoneySpeed;
        GameController.getInstance().MoneyGain(Math.floor(this.Money));
        this.Spell += dt* this.ManaRegenSpeed;
        GameController.getInstance().SpellGain(this.Spell);
     },

     Skill1Btn()
     {

     },

});
