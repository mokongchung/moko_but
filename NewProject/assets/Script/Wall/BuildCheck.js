
cc.Class({
    extends: cc.Component,

    properties: {
        BuildBtn: cc.Node,
    },

    onCollisionExit: function (other, self) {

        let otherName =other.node.group;

        if (otherName === 'a_hitbox' ) {
            console.log("Quân ta Qua đồn");
            this.BuildBtn.active=true;
            
        }
        else {
            this.BuildBtn.active=false;
            console.log("Quân địch Qua đồn");

        }
    },

 
});
