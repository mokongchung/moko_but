let PoolManager = cc.Class({
    extends: cc.Component,

    statics: {
        _instance: null,

        getInstance() {
            return this._instance;
        }
    },

    properties: {
    Player0Prefab: cc.Prefab,
    Player1Prefab: cc.Prefab,
    Player2Prefab: cc.Prefab,
    Player3Prefab: cc.Prefab,

    Enemy0Prefab: cc.Prefab,
    Enemy1Prefab: cc.Prefab,
    Enemy2Prefab: cc.Prefab,
    Enemy3Prefab: cc.Prefab,
    Enemy4Prefab: cc.Prefab,

    BulletPrefab: [cc.Prefab],

},

    onLoad() {
    if (PoolManager._instance) {
        this.node.destroy();
        return;
    }

    PoolManager._instance = this;
    cc.game.addPersistRootNode(this.node);

    // Tạo pool map
    this.playerPools = {};
    this.enemyPools = {};
    this.bulletPools = {};


    for (let i = 0; i < 4; i++) {
    this.playerPools[i] = new cc.NodePool();
    }
    for (let i = 0; i < 5; i++) {
        this.enemyPools[i] = new cc.NodePool();
    }
    for (let i = 0; i < this.BulletPrefab.length; i++) {
        this.bulletPools[i] = new cc.NodePool();
    }

    },


    getBullet(index, holder) {
        const prefab = this.BulletPrefab[index];
        const pool = this.bulletPools[index];
        return this._getNode(prefab, pool, holder);
    },
    putBullet(index, node) {
        const pool = this.bulletPools[index];
        this._putNode(node, pool);
    },



    getPlayer(index,holder) {
    const prefab = this[`Player${index}Prefab`];
    const pool = this.playerPools[index];
    return this._getNode(prefab, pool, holder);
    },

    putPlayer(index, node) {
        const pool = this.playerPools[index];
        this._putNode(node, pool);
    },

    getEnemy(index,holder) {
        const prefab = this[`Enemy${index}Prefab`];
        const pool = this.enemyPools[index];
        return this._getNode(prefab, pool, holder);
    },

    putEnemy(index, node) {
        const pool = this.enemyPools[index];
        this._putNode(node, pool);
    },


    _getNode(prefab, pool, holder) {
        let node = pool.size() > 0 ? pool.get() : cc.instantiate(prefab);
        holder.addChild(node);
        node.active = true;
        return node;
    },

    _putNode(node, pool) {
        node.active = false;
        pool.put(node);
    },

    clearAllPools() {
    for (let i in this.playerPools) {
        this.playerPools[i].clear();
    }
    for (let i in this.enemyPools) {
        this.enemyPools[i].clear();
    }
    }
    
});

module.exports = PoolManager;
