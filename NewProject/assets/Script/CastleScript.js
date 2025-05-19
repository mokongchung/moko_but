let GameController = require('GameCtrl');
cc.Class({
    extends: cc.Component,

    properties: {
        Spawner: cc.Node,
        Skill1Btn: cc.Button,
        Skill2Btn: cc.Button,
        SummonBtn: [cc.Button],
        SummonPrice: [cc.Integer],
        Skill1Charge: 40,
        Skill2Charge: 80,
        MoneySpeed: 0,
        ManaRegenSpeed: 0,
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
        for (let i = 0; i < this.SummonBtn.length; i++) {
        let btn = this.SummonBtn[i];

        let labelNode = btn.node.getChildByName('PriceTxt');
        if (labelNode) {
            let label = labelNode.getComponent(cc.Label);
            if (label) {
                label.string = this.SummonPrice[i];
            }
        }
    }
    },
    CastleIdle() 
    {
        this.animation.play('CastlesIdle');
    },
     update (dt) 
     {
        this.MoneynManaGain(dt);
     },

     update(dt) {
    this.MoneynManaGain(dt);
    },

   MoneynManaGain(dt) {
    this.Money += dt * this.MoneySpeed;
    const moneyInt = Math.floor(this.Money);
    if (moneyInt !== this.lastMoneyInt) {
        GameController.getInstance().MoneyGain(moneyInt);
        this.lastMoneyInt = moneyInt;
    }

    this.Spell += dt * this.ManaRegenSpeed;
    const spellInt = Math.floor(this.Spell);
    if (spellInt !== this.lastSpellInt) {
        GameController.getInstance().SpellGain(spellInt);
        this.lastSpellInt = spellInt;
    }

    this.Skill1Btn.interactable = this.Spell >= this.Skill1Charge;
    this.Skill2Btn.interactable = this.Spell >= this.Skill2Charge;

    for (let i = 0; i < this.SummonBtn.length; i++) {
        this.SummonBtn[i].interactable = this.Money >= this.SummonPrice[i];
    }
},




     Skill1Activate()
     {
        this.Spell -= this.Skill1Charge;
     },
     Skill2Activate()
     {
         this.Spell -= this.Skill2Charge;
     },

});
