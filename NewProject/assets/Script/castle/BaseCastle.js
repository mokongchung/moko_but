let GameController = require('GameCtrl');
cc.Class({
    extends: cc.Component,

    properties: {
        CastSpellsprite: cc.Node,
        HpBar: cc.ProgressBar,
        SkillBar: cc.ProgressBar,
        MoneyDisplay: cc.Label,
        Spawner: cc.Node,
        EnemySpawner : cc.Node,
        Skill1Btn: cc.Button,
        Skill2Btn: cc.Button,
        Skill1Prefab: cc.Prefab,
        Skill2Prefab: cc.Prefab,
        SkillHolder: cc.Node,
        Skill2Holder: cc.Node,

        SummonBtn: [cc.Button],
        SummonPrice: [cc.Integer],
        Skill1Charge: 40,
        Skill2Charge: 80,
        hpMax: 100,
        MoneySpeed: 0,
        ManaRegenSpeed: 0,

        Skill1Level : 1,
        Skill2Level : 1,

        GamePlay: cc.Node,
        ManaBoostLabel: cc.Label,
        MoneyBoostLabel: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    
    this.Money = 0;
    this.Hp = this.hpMax;
    this.Spell = 0;
    this.CastleLv=0;


    this.mousePosition = null;
    this.node.on('takeDmg', this.takeDmg, this);
    this.callback();
    
       
    },

    callback() {
    // Định nghĩa hàm callback để dễ off sau này
        this._onRequestHP = (callback) => {
            if (typeof callback === "function") {
                callback(this.Hp); // gửi HP
            }
            // Off luôn listener sau lần phản hồi đầu tiên
            cc.director.off("RequestHP", this._onRequestHP, this);
        };

        cc.director.on("RequestHP", this._onRequestHP, this);
   
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
    CastleIdle(Number) 
    {
        if(Number == 0)
        this.animation.play('CastlesIdle');
        else
        this.animation.play('Idle'+Number);
    },


    update(dt) {
    this.MoneynManaGain(dt);

    
    },
    takeDmg(event){
        if (!event || !event.detail) {
            console.warn('Lỗi: không có event hoặc event.detail');
            return;
        }
        //console.log(" nhận take dmg "+ event.detail.dmg);
        this.ShakeHpBar();
        let dmgTake = event.detail.dmg;
        (this.Hp -= dmgTake) < 0 ? this.Hp = 0 : this.Hp; 
        //console.log("hp castle"+ this.Hp + " % " + (this.Hp  / this.hpMax) );

        this.HpBar.progress = (this.Hp  / this.hpMax);

        if(this.Hp <= 0 ){
            console.log("castle enemy dead");
            let GamePlayScript = this.GamePlay.getComponent('GamplayScript');
            GamePlayScript.onGameOver();
            
            
            this.node.active = false;
        }
    },
     ShakeHpBar() {
        const originalPos = this.HpBar.node.getPosition();

        cc.tween(this.HpBar.node)
            .repeat(5, // lặp 5 lần lắc trái phải
                cc.tween()
                    .to(0.03, { x: originalPos.x + 5 })
                    .to(0.03, { x: originalPos.x - 5 })
            )
            .to(0.03, { x: originalPos.x }) // trở lại vị trí ban đầu
            .start();
    },

   
   MoneynManaGain(dt) {
    this.Money += dt * this.MoneySpeed;
    const moneyInt = Math.floor(this.Money);
    if (moneyInt !== this.lastMoneyInt) {
        //console.log("Money "+ this.Money + " " + this.MoneySpeed * dt );
        this.MoneyDisplay.string = moneyInt; 

        this.lastMoneyInt = moneyInt;
    }

    this.Spell += dt * this.ManaRegenSpeed;
    if (this.Spell > 100) {
        this.Spell = 100;
    }
    const spellInt = Math.floor(this.Spell);
    if (spellInt !== this.lastSpellInt) {
        this.SkillBar.progress = this.Spell / 100;
        // Update the spell value in GameController
       // GameController.getInstance().SpellGain(spellInt);
        this.lastSpellInt = spellInt;
    }

    this.Skill1Btn.interactable = this.Spell >= this.Skill1Charge;
    this.Skill2Btn.interactable = this.Spell >= this.Skill2Charge;

    for (let i = 0; i < this.SummonBtn.length; i++) {
        this.SummonBtn[i].interactable = this.Money >= this.SummonPrice[i] && this.CastleLv >= i;
    }
},


    onMouseMove(event) {
    this.mousePosition = event.getLocation();

        let canvas = cc.find("Canvas");
        let localPos = canvas.convertToNodeSpaceAR(this.mousePosition);

        // Lấy Y hiện tại của sprite
        let currentY = this.CastSpellsprite.y;

        // Chỉ cập nhật X, giữ nguyên Y
        this.CastSpellsprite.setPosition(localPos.x, currentY);



    },

    onGlobalClick(event) {

        // Nếu đang di chuyển và click bất cứ đâu → tắt di chuyển
        cc.Canvas.instance.node.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        cc.Canvas.instance.node.off(cc.Node.EventType.TOUCH_START, this.onGlobalClick, this);

            this.CastSpellsprite.active = false;
                console.log("Skill 2 Called");
                this.Skill2();
            
        
    },

     Skill1Activate()
     {
        this.Spell -= this.Skill1Charge;
        this.Skill1();
        
     },
     Skill2Activate()
     {
         this.Spell -= this.Skill2Charge;
         this.CastSpellsprite.active = true;

                // Lắng nghe sự kiện chuột di chuyển
        cc.Canvas.instance.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);

        // Bắt click toàn màn hình
        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START, this.onGlobalClick, this);

     },

     Skill1()
     {
        this.spawnAtCenter(this.Skill1Prefab);
        console.log("this.Skill1Prefab");
     },
     Skill2()
     {
         const newNode = cc.instantiate(this.Skill2Prefab);
         let newNodeScript = newNode.getComponentInChildren("Skill2");
         newNodeScript.init(this.Skill2Level);
         const worldPos = this.CastSpellsprite.convertToWorldSpaceAR(cc.v3(0, 0, 0));
            const localPos = this.Skill2Holder.convertToNodeSpaceAR(worldPos);
            newNode.setPosition(localPos);
            this.Skill2Holder.addChild(newNode);
          console.log("this.Skill2Prefab");
          

     },
     spawnAtCenter(prefab) {
        // Tạo instance từ prefab truyền vào
        const newNode = cc.instantiate(prefab);
        let newNodeScript = newNode.getComponentInChildren("Skill1");
        newNodeScript.init(this.EnemySpawner , this.Skill1Level);
        // Lấy node SkillHolder
        // hoặc cc.find('Canvas/SkillHolder') nếu cần tìm thủ công

        // Thêm node mới vào SkillHolder
        this.SkillHolder.addChild(newNode);

        // Đặt vị trí node mới tại trung tâm của SkillHolder
        newNode.setPosition(0, 0);
    },
    onDestroy() {
        cc.director.off("RequestHP", this._onRequestHP, this);
    },


    //========Shop=========
     MoneySpeedGainLV(level) {
        if(level>0)
        {
            this.MoneyBoostLabel.node.active = true;
            this.MoneyBoostLabel.string = "X" + (1 + 0.375 * level).toFixed(2);
        }
    let SpeedUp= 1 + 0.375 * level;
    this.MoneySpeed = SpeedUp;
    },
    ManaRegenSpeedGainLV(level) {
        if(level>0)
        {
            this.ManaBoostLabel.node.active = true;
            this.ManaBoostLabel.string = "X" + (1 + 0.375 * level).toFixed(2);
        }
        let SpeedUp= 1 + 0.375 * level;// Max là 2.5 Min là 1 => (2.5-1)/4 = 0.375
        this.ManaRegenSpeed = SpeedUp;
    },
    CastleLevel(level) {
        this.CastleLv = level;
        this.Hp+= 50 * this.CastleLv;
        this.hpMax+= 50 * this.CastleLv;
        this.UpgadeCastleAnimation(level);
    },
    UpgadeCastleAnimation(level) {
        this.animation.play('Update'+level);
    }


    


});
