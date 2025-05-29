
cc.Class({
    extends: cc.Component,

    properties: {
        BuildBtn: cc.Node,
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
            this.BuildBtn.active=false;
            console.log("Quân địch Qua đồn");

        }
    },

    onDestroy () {
        this.node.off('BuildingInfo', this.onBuildingInfo, this);
    },
 
});
