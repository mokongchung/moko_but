
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
        

        this.Level = 0; // Mặc định là level 0

    },

    properties: {
   
    },

    



    EndGame() {
        cc.director.pause();
        cc.log("End Game");
        // Xóa instance để có thể tạo lại khi cần
     
    }

});
module.exports = GameController;