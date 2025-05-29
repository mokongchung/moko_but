
cc.Class({
    extends: cc.Component,

    properties: {
        BuildBtn: cc.Node,

        childNode: [cc.Node],
        
    },
    onLoad () {
        this.HaveBuilding = false;
        this.node.on('BuildingInfo', this.onBuildingInfo, this);
    },

    onBuildingInfo (event) {
        const hasBuilding = event.detail.HaveBuilding;
        this.HaveBuilding = hasBuilding;

        cc.log('Updated HaveBuilding:', this.HaveBuilding);
    },

    onCollisionExit: function (other, self) {

        let otherName =other.node.group;

        if (otherName === 'a_hitbox' && !this.HaveBuilding) {
            console.log("Quân ta Qua đồn");
            this.BuildBtn.active=true;
            
        }
        else {
            
            // for (let i = 0; i < this.BuildBtn.children.length; i++) {
            //     this.BuildBtn.children[i].active = false;
            // }
            for (let i = 0; i < this.childNode.length; i++) {
                this.childNode[i].active = false;
            }
            this.BuildBtn.active=false;
            console.log("Quân địch Qua đồn");

        }
    },


    onDestroy () {
        console.log("disable Runed");
     
        this.node.off('BuildingInfo', this.onBuildingInfo, this);
    },
 
});
