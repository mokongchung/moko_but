// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        ItemUnitShop : cc.Node,
        ItemSkillShop : cc.Node,
        ItemSubDefShop : cc.Node,

        itemPrefab : cc.Prefab,
        itemDataPrefab : cc.Prefab,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let itemNode = cc.instantiate(this.itemDataPrefab);
        this.initShop();
    },

    initShop(){
        //read Json form Json

        for()
        this.node.parent.addChild(newBullet);

    },

    // update (dt) {},
});
