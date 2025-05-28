let PoolManager = require('PoolingManager');

cc.Class({
    extends: cc.Component,

    properties: {
        BtnBuild: [cc.Button],
        BtnOpen: cc.Button,
    },

    onLoad() {
        this.OpenBuildMenu = false;

        // Lưu vị trí mặc định ban đầu của từng nút BtnBuild
        this.BtnBuildStartPos = [];
        for (let btn of this.BtnBuild) {
            this.BtnBuildStartPos.push(btn.node.position.clone());
            // ẩn nút BtnBuild ban đầu
            btn.node.active = false;
        }
    },

    Buildbtn(event, customEventData) {
        let index = parseInt(customEventData);
        console.log("INDEX WALL" + index)  // convert từ string sang số nếu cần
        const Wall = PoolManager.getInstance().getWall(index, this.node.parent);
        this.node.active = false;
    },


    OpenBtn() {
     //   console.log("tralalerotralala");
        this.OpenBuildMenu = !this.OpenBuildMenu; // bật/tắt menu

        if (this.OpenBuildMenu) {
            // Hiện nút và tween từ vị trí BtnOpen đến vị trí mặc định
            for (let i = 0; i < this.BtnBuild.length; i++) {
                let btn = this.BtnBuild[i];
                btn.node.active = true;

                // Đặt vị trí bắt đầu bằng vị trí BtnOpen
                btn.node.position = this.BtnOpen.node.position.clone();

                // Tween di chuyển về vị trí mặc định
                cc.tween(btn.node)
                    .to(0.3, { position: this.BtnBuildStartPos[i] }, { easing: 'backOut' })
                    .start();
            }
        } else {
            // Ẩn các nút BtnBuild (hoặc tween thu nhỏ/thoát nếu muốn)
            for (let btn of this.BtnBuild) {
                // ví dụ tween nhỏ dần rồi ẩn
                cc.tween(btn.node)
                    .to(0.2, { scale: 0 })
                    .call(() => {
                        btn.node.active = false;
                        btn.node.scale = 1; // reset scale
                    })
                    .start();
            }
        }
    },


});
