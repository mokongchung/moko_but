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
        nameItem : "name Item",
        level : 0, // 0 -> 4
        currentCostUpdate: 0,
        costUpdate: {
            default: [],
            type: [cc.Integer],
        },



        lblname : cc.Label,
        lblCostUpdate : cc.Label,
        spriteLvList: {
            default: [],
            type: [cc.SpriteFrame],
        },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    init(SpriteItem, name, level, costUpdate){
       
        this.nameItem = name;
        this.level = level;
        this.costUpdate = costUpdate;

        this.spriteItem.spriteFrame = SpriteItem;
        this.lblname.string = this.nameItem;

        if(this.level >=0){
            if(this.level >= this.spriteLv.length){
                this.spriteLevel.spriteFrame = this.spriteLvList[this.spriteLv.length -1];
            }
            else{
                this.spriteLevel.spriteFrame = this.spriteLvList[this.level];
            }

            if(this.level < this.costUpdate.length){
                this.currentCostUpdate = this.costUpdate[this.level];
            }
        }



        
    },
    buttonUpdateOnClick(){
            
    },
    start () {

    },

    // update (dt) {},
});
