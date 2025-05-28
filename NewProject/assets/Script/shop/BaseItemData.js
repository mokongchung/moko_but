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
        SpriteList: [cc.SpriteFrame],
        IdList: [cc.Integer],
        lvListSaveLocal : [cc.Integer],
        dataItem: cc.JsonAsset,
        itemPrefab : cc.Prefab,


    },
    getSpriteById(id) {
        let index = this.IdList.indexOf(id);

        if (index >= 0 && (index < this.SpriteList.length) ) {
            return this.SpriteList[index];
        } else {
            console.log("không tìm thấy unit theo ID "+ id);
            return null;
        }
    },
    getLengthList(){
        let ListData = getListFormData();
        if (ListData && Array.isArray(ListData)) {
            return ListData.length;
        } else {
            return -1;
        }
    },
    getListFormData(){
         //overwrite this func
    },
    getItembyIndex(index){
        if(index == null) return;
        let newItem = cc.instantiate(this.itemPrefab);

        return newItem;
    },
    onLoad(){
        this.dataJson;
    },
    start() {
        //overwrite  this  =>   this.dataJson = this.unitDataJson.json.UnitData;

        
    
        
    },


});
