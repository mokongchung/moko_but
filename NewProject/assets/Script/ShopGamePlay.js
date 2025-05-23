
cc.Class({
    extends: cc.Component,

    properties: {
        ShopUI: cc.Node,
        MoneyNode: cc.Node,

        CastlePrice: cc.Label,
        MoneyPrice: cc.Label,
        ManaPrice: cc.Label,
        Skill1Price: cc.Label,
        Skill2Price: cc.Label,

        CastleBtn: cc.Button,
        MoneyBtn: cc.Button,
        ManaBtn: cc.Button,
        Skill1Btn: cc.Button,
        Skill2Btn: cc.Button,

        LevelSPrite: [cc.SpriteFrame],
        MoneyLevel: cc.Sprite,
        ManaLevel: cc.Sprite,
        Skill1Level: cc.Sprite,
        Skill2Level: cc.Sprite,
        CastleLevel: cc.Sprite,


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.castleLevel = 0;
        this.moneyLevel = 0;
        this.manaLevel = 0;
        this.skill1Level = 0;
        this.skill2Level = 0;

        this.castlePrice= 10;
        this.moneyPrice= 10;
        this.manaPrice= 10;
        this.skill1Price= 100;
        this.skill2Price= 100;

        
    },

    start () {
        this.SetSpriteLevel();
        this.updatePrice();
        this.moneyScript = this.MoneyNode.getComponent("CastleScript");
    },

    SetSpriteLevel() {
        this.MoneyLevel.spriteFrame = this.LevelSPrite[this.moneyLevel];
        this.ManaLevel.spriteFrame = this.LevelSPrite[this.manaLevel];
        this.Skill1Level.spriteFrame = this.LevelSPrite[this.skill1Level];
        this.Skill2Level.spriteFrame = this.LevelSPrite[this.skill2Level];
        this.CastleLevel.spriteFrame = this.LevelSPrite[this.castleLevel];
    },
    updatePrice() {
        this.CastlePrice.string = this.castleLevel >= 4 ? "Max" : this.castlePrice;
        this.MoneyPrice.string = this.moneyLevel >= 4 ? "Max" : this.moneyPrice;
        this.ManaPrice.string = this.manaLevel >= 4 ? "Max" : this.manaPrice;
        this.Skill1Price.string = this.skill1Level >= 4 ? "Max" : this.skill1Price;
        this.Skill2Price.string = this.skill2Level >= 4 ? "Max" : this.skill2Price;
    },



    ShopUIShow() {
        this.ShopUI.active = !this.ShopUI.active;
        this.updatePrice();
    },

    UpgradeCastle() {
        if (this.castleLevel >= 4) {
        return;
    }
        if (this.moneyScript.Money >= this.castlePrice) {
            this.moneyScript.Money -= this.castlePrice;
            this.castleLevel++;
            this.castlePrice += 10;
            this.moneyScript.CastleLevel( this.castleLevel);
            this.updatePrice();
            this.SetSpriteLevel();
        } else {
            // Nếu tiền không đủ, label CastlePrice chớp đỏ rồi trở lại trắng
            this.NotEnoughMoney(this.CastlePrice);
        }
    }  ,
    UpgradeMoney() {
        if (this.moneyLevel >= 4) {
            return;
        }
        if (this.moneyScript.Money >= this.moneyPrice) {
            this.moneyScript.Money -= this.moneyPrice;
            this.moneyLevel++;
            this.moneyPrice += 10;
            this.moneyScript.MoneySpeedGainLV( this.moneyLevel);

            this.updatePrice();
            this.SetSpriteLevel();
        } else {
            // Nếu tiền không đủ, label MoneyPrice chớp đỏ rồi trở lại trắng
            this.NotEnoughMoney(this.MoneyPrice);
        }
    },
    UpgradeMana() {
        if (this.manaLevel >= 4) {
            return;
        }
        if (this.moneyScript.Money >= this.manaPrice) {
            this.moneyScript.Money -= this.manaPrice;
            this.manaLevel++;
            this.manaPrice += 10;
            this.moneyScript.ManaRegenSpeedGainLV( this.manaLevel);
            this.updatePrice();
            this.SetSpriteLevel();
        } else {
            // Nếu tiền không đủ, label ManaPrice chớp đỏ rồi trở lại trắng
            this.NotEnoughMoney(this.ManaPrice);
        }
    },
    UpgradeSkill1() {
        if (this.skill1Level >= 4) {
            return;
        }
        if (this.moneyScript.Money >= this.skill1Price) {
            this.moneyScript.Money -= this.skill1Price;
            this.skill1Level++;
            this.skill1Price += 100;
            this.updatePrice();
            this.SetSpriteLevel();
            this.moneyScript.Skill1Level = this.skill1Level;
        } else {
            // Nếu tiền không đủ, label Skill1Price chớp đỏ rồi trở lại trắng
            this.NotEnoughMoney(this.Skill1Price);
        }
    },
    UpgradeSkill2() {
        if (this.skill2Level >= 4) {
            return;
        }
        if (this.moneyScript.Money >= this.skill2Price) {
            this.moneyScript.Money -= this.skill2Price;
            this.skill2Level++;
            this.skill2Price += 100;
            this.updatePrice();
            this.SetSpriteLevel();
            this.moneyScript.Skill2Level = this.skill2Level;
        } else {
            // Nếu tiền không đủ, label Skill2Price chớp đỏ rồi trở lại trắng
            this.NotEnoughMoney(this.Skill2Price);
        }
    },
    NotEnoughMoney(Label) {
        // Nếu tiền không đủ, label CastlePrice chớp đỏ rồi trở lại trắng
        let label = Label.node.getComponent(cc.Label);
        cc.tween(Label.node)
            .to(0.1, { color: cc.Color.RED })
            .to(0.1, { color: cc.Color.WHITE })
            .to(0.1, { color: cc.Color.RED })
            .to(0.1, { color: cc.Color.WHITE })
            .start();
    },



    // update (dt) {},
});
