// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        UnitSpriteList: [cc.SpriteFrame],
        UnitIdList: [cc.Integer],
        dataUnit: cc.JsonAsset,

        SpriteList: [cc.SpriteFrame],
        IdList: [cc.Integer],
        dataJson: cc.JsonAsset,



    },
    getSpriteById(id) {
        let index = this.IdList.indexOf(id);

        if (index >= 0 && (index < this.SpriteList.length) ) {
            return this.SpriteList[index];
        } else {
            console.log("không tìm thấy theo ID "+ id);
            return null;
        }
    },


    start() {

    },


});
