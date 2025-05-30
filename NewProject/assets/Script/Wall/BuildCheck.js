
cc.Class({
    extends: cc.Component,

    properties: {
        ProgressBar: cc.ProgressBar,

        BuildBtn: cc.Node,

        childNode: [cc.Node],

    },
    onLoad() {
        this.HaveBuilding = false;
        this.node.on('BuildingInfo', this.onBuildingInfo, this);
    },

    onBuildingInfo(event) {
        const hasBuilding = event.detail.HaveBuilding;
        this.HaveBuilding = hasBuilding;

        cc.log('Updated HaveBuilding:', this.HaveBuilding);
    },

    onCollisionExit: function (other, self) {

        let otherName = other.node.group;

        if (otherName === 'a_hitbox' && !this.HaveBuilding) {
            console.log("Quân ta Qua đồn");

            this.TweenProgress();
        }
        else {

            // for (let i = 0; i < this.BuildBtn.children.length; i++) {
            //     this.BuildBtn.children[i].active = false;
            // }
            for (let i = 0; i < this.childNode.length; i++) {
                this.childNode[i].active = false;
            }
            this.BuildBtn.active = false;
            this.StopProgressTween();
            this.ProgressBar.node.active = false;
            console.log("Quân địch Qua đồn");

        }
    },

    StopProgressTween() {
        if (this._progressTween) {
            this._progressTween.stop();
            this._progressTween = null;
        }
    },

    TweenProgress() {
        this.ProgressBar.node.active = true;
        this.ProgressBar.progress = 0;

        this._progressTween = cc.tween(this.ProgressBar)
            .to(5, { progress: 1 })
            .call(() => {
                this.BuildBtn.active = true;
                this.ProgressBar.node.active = false;
            })
            .start();
    },

    onDestroy() {
        console.log("disable Runed");

        this.node.off('BuildingInfo', this.onBuildingInfo, this);
    },

});
