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

        lblMoney: cc.Label,
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
        this.currentMoney;
    },

    initShop() {
        //read Json form Json
        this.currentMoney = parseInt(cc.sys.localStorage.getItem("Money") || "0");
        this.showMoney();

        this.unitItemData = this.itemNode.getComponent("UnitItemData");
        this.unitItemData.init();
        this.skillItemData = this.itemNode.getComponent("SkillItemData");
        this.skillItemData.init();
        //this.subDefItemData = this.itemNode.getComponent("SubDefItemData");

       
        if (this.unitItemData) {
            for(let i = 0 ; i < this.unitItemData.getLengthList(); i++){
                let newItem = this.unitItemData.getItembyIndex(i);
                if(newItem){
                    this.ItemUnitShopContent.addChild(newItem);
                }
            }
        }

        
        if (this.skillItemData) {
            for(let i = 0 ; i < this.skillItemData.getLengthList(); i++){
                let newItem = this.skillItemData.getItembyIndex(i);
                if(newItem){
                    this.ItemSkillShopContent.addChild(newItem);
                }
            }
        }
/*
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

        //check có đủ tiền mua không 
        if(this.currentMoney < event.detail.currentCostUpdate) return;
        this.currentMoney -= event.detail.currentCostUpdate;
        cc.sys.localStorage.setItem("Money", this.currentMoney);
        this.showMoney();

        ItemUpLevelNode.emit( 'updateItemLevel' , event);
        if (parentNode === this.ItemUnitShopContent) {
                    this.unitItemData.saveListData(event.detail.data);
        } else if (parentNode === this.ItemSkillShopContent) {
                   this.skillItemData.saveListData(event.detail.data);
        }  else {
            cc.log("Không thuộc 2 node trên");
        }
        

        




        // Chặn không cho sự kiện lan tiếp
        event.stopPropagation();
    },
    showMoney (){
        this.lblMoney.string = this.currentMoney;
    },
    onDestroy() {
        this.node.of('updateLevel', this.upLevel, this);
    }

    // update (dt) {},
});
