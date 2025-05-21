let GameController = require('GameCtrl');

cc.Class({
    extends: cc.Component,

    properties: {
        Star:[ cc.Node], 
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable () {
        for (let i = 0; i < this.Star.length; i++) {
            this.Star[i].active = false; // Ẩn sao
        }
       

    },

    StartTween(Lv) {
        let maxStar = GameController.getInstance().getLevel(Lv).stars;

        for (let i = 0; i < maxStar; i++) {
            let star = this.Star[i];
            this.Star[i].active = true; // Kích hoạt sao
            star.scale = 0.1;
            console.log("btn"+star);

            //Tạo tween phóng to lên scale 1 (100%) trong 0.5 giây
            cc.tween(star)
                .delay(i * 0.2) 
                .to(1.5, { scale: 1 }, { easing: 'backOut' }) // easing 'backOut' giúp hiệu ứng phóng to có độ "nẩy"
                .start();
        }
    },
});
