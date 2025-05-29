// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        ItemUnitShopContent: cc.Node,
        ItemSkillShopContent: cc.Node,
        ItemSubDefShopContent: cc.Node,

        itemPrefab: cc.Prefab,
        itemDataPrefab: cc.Prefab,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.itemNode = cc.instantiate(this.itemDataPrefab);

        this.node.on('updateLevel', this.updateLevelItem, this);
        this.unitItemData;
        this.skillItemData;
        this.subDefItemData;
        this.initShop();
    },

    initShop() {
        //read Json form Json

        this.unitItemData = this.itemNode.getComponent("UnitItemData");
        this.unitItemData.init();
        this.skillItemData = this.itemNode.getComponent("SkillItemData");
        //this.subDefItemData = this.itemNode.getComponent("SubDefItemData");

       
        if (this.unitItemData) {
            for(let i = 0 ; i < this.unitItemData.getLengthList(); i++){
                let newItem = this.unitItemData.getItembyIndex(i);
                if(newItem){
                    this.ItemUnitShopContent.addChild(newItem);
                }
            }
        }
        /*
        if (skillItemData) {
            for(let i = 0 ; i < this.skillItemData.getLengthList(); i++){
                let newItem = this.skillItemData.getItembyIndex(i);
                if(newItem){
                    this.ItemSkillShopContent.addChild(newItem);
                }
            }
        }

        if (subDefItemData) {
            for(let i = 0 ; i < this.skillItemData.getLengthList(); i++){
                let newItem = this.skillItemData.getItembyIndex(i);
                if(newItem){
                    this.ItemSkillShopContent.addChild(newItem);
                }
            }
        }*/

    },
    updateLevelItem(event){
        let ItemUpLevelNode = event.detail.node;
        let parentNode = ItemUpLevelNode.parent;

        //check có đủ tiền mua không WIP

        if (parentNode === this.ItemUnitShopContent) {
            cc.log("Nằm trong ItemUnitShopContent"); // save local
        } else if (parentNode === this.ItemSkillShopContent) {
            cc.log("Nằm trong ItemSkillShopContent");
        }  else {
            cc.log("Không thuộc 3 node trên");
        }
        

        ItemUpLevelNode.emit( 'updateItemLevel' , event);



        // Chặn không cho sự kiện lan tiếp
        event.stopPropagation();
    },
    onDestroy() {
        this.node.of('updateLevel', this.upLevel, this);
    }

    // update (dt) {},
});
