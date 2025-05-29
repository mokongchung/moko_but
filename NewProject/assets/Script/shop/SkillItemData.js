
let BaseItemData = require('BaseItemData');
cc.Class({
    extends: BaseItemData,


    checkDataArray(){
        if (!this.jsonData) return;
        return this.DataArray = this.jsonData.SkillData;
    },

    getItembyIndex(index) {
        this._super(index);
        //let newItem = BaseItemData.prototype.getItemByIndex.call(this, index);
        if (!this.newItem) return;

        let newItemScript = this.newItem.getComponent("itemScript");

        let id = this.DataArray[index].id;

        let indexId = this.IdList.indexOf(id);
        if (indexId < 0) return null;

        newItemScript.init(id, this.getSpriteById(id), this.DataArray[index]);
        return this.newItem;
    },



});
