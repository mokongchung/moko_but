
let BaseItemData = require('BaseItemData');
cc.Class({
    extends: BaseItemData,


    getListFormData(){
        try{
         return this.dataItem.json.UnitData;
        }catch(err){
            console.log("Error when get Unit data json  "+ err);
            return null;
        }
    },
    getItembyIndex(index){
        let newItem = super.getItemByIndex(index);
        if (!newItem) return;

        let newItemScript = newItem.getComponent("itemScript");
        newItemScript.init(this.dataJson.id, this.getSpriteByIdthis.dataJson.id, this.dataJson.name, this.lvListSaveLocal[index], this.dataJson.costUpdate);
        return newItem;
    },
    start() {

        this.dataJson = this.unitDataJson.json.UnitData;
    },

    
});
