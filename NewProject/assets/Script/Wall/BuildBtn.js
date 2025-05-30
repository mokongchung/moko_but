let PoolManager = require('PoolingManager');

cc.Class({
    extends: cc.Component,

    properties: {
        BtnBuild: [cc.Button],
        Pricelabel: [cc.Label],
        BtnOpen: cc.Button,
        BasePrice: 75,
        MoneySprite: cc.Node,
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

    start()
    {
        this.MoneyCall=this.MoneySprite.getComponent("CastleScript");
        this.SetMoney();
    },
    Buildbtn(event, customEventData) {
        let index = parseInt(customEventData);
        console.log("INDEX WALL" + index)  // convert từ string sang số nếu cần
        if(this.MoneyCall.Money>= this.BasePrice*(index+1))
        {
            this.MoneyCall.Money-= this.BasePrice*(index+1);
            const Wall = PoolManager.getInstance().getWall(index, this.node.parent);
            this.node.active = false;
        }
        else
        {
            this.NotEnoughMoney(this.Pricelabel[index]);
        }
    },

    SetMoney() {
        for (let i = 0; i < this.Pricelabel.length; i++) {
            this.Pricelabel[i].string = this.BasePrice * (i + 1);
        }
    },


     NotEnoughMoney(Label) {
        // Nếu tiền không đủ, label CastlePrice chớp đỏ rồi trở lại trắng
        let label = Label.node.getComponent(cc.Label);
        cc.tween(Label.node)
            .to(0.1, { color: cc.Color.RED })
            .to(0.1, { color: cc.Color.WHITE })
            .to(0.1, { color: cc.Color.RED })
            .to(0.1, { color: cc.Color.WHITE })
            .start();
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
