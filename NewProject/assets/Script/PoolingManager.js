let PoolManager = cc.Class({
    extends: cc.Component,

    statics: {
        _instance: null,

        getInstance() {
            return this._instance;
        }
    },

    properties: {
    Player1Prefab: cc.Prefab,
    Player2Prefab: cc.Prefab,
    Player3Prefab: cc.Prefab,
    Player4Prefab: cc.Prefab,

    Enemy1Prefab: cc.Prefab,
    Enemy2Prefab: cc.Prefab,
    Enemy3Prefab: cc.Prefab,
    Enemy4Prefab: cc.Prefab,

    PlayerHolder: cc.Node,
    EnemyHolder: cc.Node,
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

    for (let i = 1; i <= 4; i++) {
        this.playerPools[i] = new cc.NodePool();
        this.enemyPools[i] = new cc.NodePool();
    }
    },



    getPlayer(index) {
    const prefab = this[`Player${index}Prefab`];
    const pool = this.playerPools[index];
    return this._getNode(prefab, pool, this.PlayerHolder);
    },

    putPlayer(index, node) {
        const pool = this.playerPools[index];
        this._putNode(node, pool);
    },

    getEnemy(index) {
        const prefab = this[`Enemy${index}Prefab`];
        const pool = this.enemyPools[index];
        return this._getNode(prefab, pool, this.EnemyHolder);
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

    
});

module.exports = PoolManager;
