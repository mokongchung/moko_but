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
        itemPrefab: cc.Prefab,


    },

    init() {
        this.node.on('saveData', this.saveListData, this);
        this.DataArray = []; // tạo mới mỗi lần
        this.jsonData = null;
    },
    getSpriteById(id) {
        let index = this.IdList.indexOf(id);

        if (index >= 0 && (index < this.SpriteList.length)) {
            return this.SpriteList[index];
        } else {
            console.log("không tìm thấy unit theo ID " + id);
            return null;
        }
    },
    getLengthList() {
        this.getListFormData();

        if (this.DataArray && Array.isArray(this.DataArray)) {
            return this.DataArray.length;
        } else {
            return -1;
        }
    },

    getItembyIndex(index) {
        if (index == null) return;
        this.newItem = cc.instantiate(this.itemPrefab);

        return this.newItem;
    },
    getListFormData() {
        try {
            let jsonInventory = cc.sys.localStorage.getItem("InventoryData");
            if (jsonInventory) {
                this.jsonData = JSON.parse(jsonInventory);
            } else {
                this.jsonData = this.dataItem.json;
            }


            return this.checkDataArray();

        } catch (err) {
            console.log("Error when get Unit data json  " + err);
            return null;
        }
    },
    checkDataArray() {

    },
    saveListData(newData) {
        if (this.jsonData) {
            cc.log("Lưu data");
            this.DataArray[this.findIndexById(this.DataArray , newData.id)] = newData;


            cc.sys.localStorage.setItem("InventoryData", JSON.stringify(this.jsonData));
        } else {
            cc.log("Không có dữ liệu để lưu");
        }
    },
    findIndexById(array, id) {
        if (!Array.isArray(array)) return -1;
        return array.findIndex(item => item.id === id);
    },

    onDestroy() {
        this.node.on('saveData', this.saveListData, this);
    }



});
