// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        spriteItem: cc.Sprite,
        spriteLevel: cc.Sprite,
        nameItem: "name Item",
        id: 0,
        level: 0, // 0 -> 4
        currentCostUpdate: 0,
        costUpdate: {
            default: [],
            type: [cc.Integer],
        },



        lblname: cc.Label,
        lblCostUpdate: cc.Label,
        spriteLvList: {
            default: [],
            type: [cc.SpriteFrame],
        },

        Data: null,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on('updateItemLevel', this.upLevel, this);
    },
    init(id, SpriteItem, data) {

        this.nameItem = data.name;
        this.level = data.level;
        this.costUpdate = data.costUpdate;

        this.spriteItem.spriteFrame = SpriteItem;
        this.lblname.string = this.nameItem;
        this.id = id;
        this.Data = data;
        
        this.checkCurrentUpdate();
    },
    buttonUpdateOnClick() {
        let event = new cc.Event.EventCustom('updateLevel', true); // bubbling = true
        event.detail = { node: this.node , data: this.Data , costUpdate: this.currentCostUpdate};
        this.node.dispatchEvent(event);

    },
    upLevel() {
        this.level += 1;
        this.Data.level = this.level;
        this.checkCurrentUpdate();
    },
    checkCurrentUpdate() {
        if (this.level >= 0) {
            if (this.level >= this.spriteLvList.length) {
                this.spriteLevel.spriteFrame = this.spriteLvList[this.spriteLvList.length - 1];
                this.currentCostUpdate = -1;
                this.lblCostUpdate.string = "Max";
            }
            else {
                this.spriteLevel.spriteFrame = this.spriteLvList[this.level - 1];
                this.currentCostUpdate = this.costUpdate[this.level - 1];
                this.lblCostUpdate.string = this.currentCostUpdate;
            }

        }

    },
    start() {

    },
    onDestroy() {
        this.node.of('updateItemLevel', this.upLevel, this);
    }
    // update (dt) {},
});
