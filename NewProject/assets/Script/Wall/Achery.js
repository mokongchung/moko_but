cc.Class({
    extends: cc.Component,

    properties: {
        BulletPrefab: cc.Prefab,
        enemy: cc.Node,
    },

    onEnable () {
        this.node.on('see_enemy', this.seeEnemy, this);
        this.node.on('enemy_exit', this.exitEnemy, this);
        this.ListEnemy = [];
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

        let bulletCombat = newBullet.getComponent("TowerBullet");
        if (bulletCombat) {
            let firstEnemy = this.ListEnemy[0].node;

            if (
              firstEnemy &&
              firstEnemy.active
            ) {
                console.log("Truyền Enemy to Arrow");
                bulletCombat.enemy = firstEnemy;
            } else {
                console.warn("Lỗi không truyền được enemy:", firstEnemy);
                bulletCombat.enemy = firstEnemy;
                this.ListEnemy.shift(); // xóa phần tử lỗi ra khỏi danh sách
            }
        }

        this.node.parent.addChild(newBullet);
    },

    seeEnemy(event) {
        let enemyNode = event.detail.node;

        if (!this.ListEnemy.includes(enemyNode)) {
            this.ListEnemy.push(enemyNode);
            if (this.ListEnemy.length === 1) {
                this.animation.play("ArcherW3Atack");
            }
        }
    },

    exitEnemy(event) {
        let enemyNode = event.detail.node;

        let index = this.ListEnemy.indexOf(enemyNode);
        if (index !== -1) {
            this.ListEnemy.splice(index, 1);
        }

        if (this.ListEnemy.length === 0) {
            this.animation.play("AcherW3Idle");
        }
    },

    onDisable() {
        this.node.off('see_enemy', this.seeEnemy, this);
        this.node.off('enemy_exit', this.exitEnemy, this);
    },
});
