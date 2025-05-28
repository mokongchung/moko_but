
cc.Class({
    extends: cc.Component,

    properties: {
        BulletPrefab: cc.Prefab,
        enemy: cc.Node, // node enemy
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () 
     {
        this.node.on('see_enemy', this.seeEnemy, this);
        this.node.on('enemy_exit', this.exitEnemy, this);

        this._firstEnemy = null;
     },

    start () {
        this.animation = this.node.getComponent(cc.Animation);
    },

    createBullet() {
        if (!this.BulletPrefab) {
            cc.error("BulletPrefab is not assigned");
            return;
        }

        let newBullet = cc.instantiate(this.BulletPrefab);
        newBullet.setPosition(this.node.getPosition());

        let bulletCombat = newBullet.getComponent("TowerBullet"); // tên script gắn trên prefab
        if (bulletCombat) {
            bulletCombat.enemy = this._firstEnemy.node || null; // đảm bảo enemy được gán hoặc null
        }

        this.node.parent.addChild(newBullet);
    },


    seeEnemy(event) {
        let enemyNode = event.detail.node;

        if (!this._firstEnemy) {
            this._firstEnemy = enemyNode;
            this.animation.play("ArcherW3Atack");

        }
    },

    exitEnemy(event) {
        let enemyNode = event.detail.node;

        if (this._firstEnemy === enemyNode) {
            this.animation.play("AcherW3Idle");
            this._firstEnemy = null;
        } 
    },

    onDisable() {
        this.node.off('see_enemy', this.seeEnemy, this);
        this.node.off('enemy_exit', this.exitEnemy, this);
    },
});
