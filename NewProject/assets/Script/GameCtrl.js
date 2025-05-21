
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
        this._init(); 

        this.Level = 0; // Mặc định là level 0

    },

    properties: {

    },

    _init() {
        this.data = this._loadData();
        if (!this.data.levels[1]) {
        this.data.levels[1] = { Unlocked: true, stars: 3 };
        this._saveData();
    }
    },

    _loadData() {
        let json = cc.sys.localStorage.getItem("levelData");
        return json ? JSON.parse(json) : { levels: {} };
    },

    _saveData() {
        cc.sys.localStorage.setItem("levelData", JSON.stringify(this.data));
    },

    saveLevel(level, stars) {
        const current = this.data.levels[level] || { Unlocked: false, stars: 0 };

        this.data.levels[level] = {
            Unlocked: true,
            stars: Math.max(stars, current.stars) // luôn giữ số sao cao nhất
        };

        this._saveData();
    },

    getLevel(level) {
        return this.data.levels[level] || { Unlocked: false, stars: 0 };
    },

    resetAll() {
        this.data = { levels: {} };
        this._saveData();
    }



    

});
module.exports = GameController;