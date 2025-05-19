
let GameController = cc.Class({
    extends: cc.Component,

    statics: {
        _instance: null,

        getInstance() {
            return this._instance;
        }
    },

    onLoad() {
        if (GameController._instance) {
            // Nếu đã có instance rồi, tự hủy node này để tránh duplicate
            this.node.destroy();
            return;
        }
        GameController._instance = this;

        // Giữ node này tồn tại xuyên scene
        cc.game.addPersistRootNode(this.node);
        this._timeAccum = 0;
        // Khởi tạo các biến cần thiết DATAGAME
            this.EnemyHp = 100;
            this.PlayerHp = 100;
            this.PlayerSpell = 0;
            this.PlayerMoney = 0;

    },

    properties: {
        MoneyGainSpeed: 1,

       EnemyHPBar: cc.ProgressBar,
       PlayerHpBar: cc.ProgressBar,
       PlayerSpellBar: cc.ProgressBar,
       PlayerMoneyLabel: cc.Label,
    },

    
    SpellGain(progress) 
    {
        this.PlayerSpell = progress;
        this.PlayerSpellBar.progress = this.PlayerSpell / 100;
        if (this.PlayerSpell >= 100) {
            this.PlayerSpell = 100;
            cc.log("Player Spell is full");
        }
    },

    MoneyGain (money) 
    {
        this.PlayerMoney = money;
        this.PlayerMoneyLabel.string = this.PlayerMoney;
    },

    DealDame (hp) {
        this.EnemyHp = hp;
        this.EnemyHPBar.progress = this.EnemyHp / 100;
        if (this.EnemyHp <= 0) {
            this.EnemyHp = 0;
            this.EndGame();
        }

    },
    receiveDame (hp) {
        this.PlayerHp = hp;
        this.PlayerHpBar.progress = this.PlayerHp / 100;
        if (this.PlayerHp <= 0) {
            this.PlayerHp = 0;
            this.EndGame();
        }
    },


    EndGame() {
        cc.director.pause();
        cc.log("End Game");
        // Xóa instance để có thể tạo lại khi cần
     
    }

});
module.exports = GameController;