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
        dataItem: cc.JsonAsset,
        itemPrefab : cc.Prefab,

        jsonData : null,
        DataArray : null,


    },
    init(){
        this.node.on('saveData', this.saveListData, this);
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
        this.getListFormData();

        if (this.DataArray && Array.isArray(this.DataArray)) {
            return this.DataArray.length;
        } else {
            return -1;
        }
    },

    getItembyIndex(index){
        if(index == null) return;
        this.newItem = cc.instantiate(this.itemPrefab);
        
        return this.newItem;
    },
    getListFormData() {
        try {
            let jsonInventory = cc.sys.localStorage.getItem("InventoryData");
            this.jsonData = jsonInventory ? JSON.parse(jsonInventory) : this.dataItem.json;
            return this.checkDataArray();

        } catch (err) {
            console.log("Error when get Unit data json  " + err);
            return null;
        }
    },
    checkDataArray(){

    },
    saveListData(){
        if (this.jsonData) {
            cc.sys.localStorage.setItem("InventoryData", JSON.stringify(this.jsonData));
        } else {
            cc.log("Không có dữ liệu để lưu");
        }
    },
    updateItemArrayById(Id , data ){
        if(!this.DataArray) return;
        this.DataArray[Id] = data;

    },
    onDestroy(){
        this.node.on('saveData', this.saveListData, this);
    }



});
