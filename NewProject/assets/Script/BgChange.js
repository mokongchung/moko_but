let GameController = require('GameCtrl');

cc.Class({
    extends: cc.Component,

    properties: {
        BgLv: [cc.SpriteFrame],    // Danh sách background theo level
        BgSprite: [cc.Sprite],     // Danh sách sprite cần đổi hình nền
    },

    start () {
        let gameController = GameController.getInstance();
        let level = gameController.Level;

        for (let i = 0; i < this.BgSprite.length; i++) {
            this.BgSprite[i].spriteFrame = this.BgLv[level - 1];
        }
    },
});
