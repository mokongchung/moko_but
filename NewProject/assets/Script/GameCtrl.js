
let GameController = cc.Class({
    extends: cc.Component,

    statics: {
        _instance: null,

        getInstance() {
            return this._instance;
        }
    },

    cachedDataList: null,

    async onLoad() {
        if (GameController._instance) {
            this.node.destroy();
            return;
        }
        GameController._instance = this;

        cc.game.addPersistRootNode(this.node);
        this._init(); 

        this.unitInit();

        this.Level = 0; 

    },


    properties: {
        UnitDataJson: cc.JsonAsset,
    },

    _init() {
        this.data = this._loadData();
        if (!this.data.levels[1]) {
            console.log("Khởi tạo dữ liệu level 1");
        this.data.levels[1] = { Unlocked: true, stars: 0 };
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

        // Lưu lại thông tin level hiện tại
        this.data.levels[level] = {
            Unlocked: true,
            stars: Math.max(stars, current.stars) // luôn giữ số sao cao nhất
        };

        // ✅ Nếu level hiện tại có ít nhất 1 sao, unlock level tiếp theo
        if (stars > 0) {
            const nextLevel = parseInt(level) + 1;
            const next = this.data.levels[nextLevel] || { Unlocked: false, stars: 0 };

            if (!next.Unlocked) {

                this.data.levels[nextLevel] = {
                    Unlocked: true,
                    stars: next.stars || 0
                };
            }
        }

        this._saveData();
    },

    getLevel(level) {
        return this.data.levels[level] || { Unlocked: false, stars: 0 };
    },

    resetAll() {
        this.data = { levels: {} };
         this.data.levels[1] = { Unlocked: true, stars: 0 };
        this._saveData();
    },
    ///////UNIT DATA////////
    // unitInit() {
    //     return new Promise((resolve, reject) => {
    //         cc.resources.load("GameData/UnitDataJson", cc.JsonAsset, (err, jsonAsset) => {
    //             if (err) {
    //                 reject(err);
    //                 return;
    //             }
    //             this.cachedDataList = jsonAsset.json;
    //             console.log("Load Json OK LA");
    //             resolve();
    //         });
    //     });
    // },
unitInit() {

                const rawData = this.UnitDataJson.json;

                this.cachedDataList = rawData.UnitData;
                console.log("JSon OK Load XOng:", this.cachedDataList);
         

    },

GetCharInfo(name) {
    if (!this.cachedDataList) {
        console.warn("cachedDataList Null");
        return null;
    }

    return this.cachedDataList.find(item => item.name === name) || null;
},

});
module.exports = GameController;