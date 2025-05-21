let GameController = require('GameCtrl');
cc.Class({
    extends: cc.Component,

    properties: {
        CastSpellsprite: cc.Node,
        HpBar: cc.ProgressBar,
        SkillBar: cc.ProgressBar,
        MoneyDisplay: cc.Label,
        Spawner: cc.Node,
        Skill1Btn: cc.Button,
        Skill2Btn: cc.Button,
        Skill1Prefab: cc.Prefab,
        Skill2Prefab: cc.Prefab,
        SummonBtn: [cc.Button],
        SummonPrice: [cc.Integer],
        Skill1Charge: 40,
        Skill2Charge: 80,
        hpMax: 100,
        MoneySpeed: 0,
        ManaRegenSpeed: 0,

        GamePlay: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    
    this.Money = 0;
    this.Hp = this.hpMax;
    this.Spell = 0;

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
    CastleIdle() 
    {
        this.animation.play('CastlesIdle');
    },


    update(dt) {
    this.MoneynManaGain(dt);

    
    },
    takeDmg(event){
        if (!event || !event.detail) {
            console.warn('Lỗi: không có event hoặc event.detail');
            return;
        }
        console.log(" nhận take dmg "+ event.detail.dmg);
        this.ShakeHpBar();
        let dmgTake = event.detail.dmg;
        (this.Hp -= dmgTake) < 0 ? this.Hp = 0 : this.Hp; 
        console.log("hp castle"+ this.Hp + " % " + (this.Hp  / this.hpMax) );

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
        this.MoneyDisplay.string = moneyInt;
        //GameController.getInstance().MoneyGain(moneyInt);
        this.lastMoneyInt = moneyInt;
    }

    this.Spell += dt * this.ManaRegenSpeed;
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
        this.SummonBtn[i].interactable = this.Money >= this.SummonPrice[i];
    }
},


    onMouseMove(event) {
    this.mousePosition = event.getLocation();

   
        // Lấy vị trí chuột từ màn hình về local node cha của sprite
        let localPos = this.CastSpellsprite.parent.convertToNodeSpaceAR(this.mousePosition);

        // Di chuyển sprite theo trục X
        this.CastSpellsprite.x = localPos.x;
        
    },

    onGlobalClick(event) {
        // Nếu đang di chuyển và click bất cứ đâu → tắt di chuyển
        cc.Canvas.instance.node.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        cc.Canvas.instance.node.off(cc.Node.EventType.TOUCH_START, this.onGlobalClick, this);

            this.CastSpellsprite.active = false;
           
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
          newNode.setPosition(this.CastSpellsprite);
          const canvas = cc.find('Canvas');
            canvas.addChild(newNode);
          console.log("this.Skill2Prefab");
     },
     spawnAtCenter(prefab) {
        // Tạo instance từ prefab truyền vào
        const newNode = cc.instantiate(prefab);

        // Lấy node Canvas (nơi chứa UI)
        const canvas = cc.find('Canvas');

        // Thêm node mới vào Canvas
        canvas.addChild(newNode);

        // Đặt vị trí node mới tại trung tâm (0, 0)
        newNode.setPosition(0, 0);

       
    },
    onDestroy() {
        cc.director.off("RequestHP", this._onRequestHP, this);
    }

});
