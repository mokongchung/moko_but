cc.Class({
    extends: cc.Component,

    properties: {
        Star1: cc.Node,
        Star2: cc.Node,
        Star3: cc.Node,
    },

    onLoad() {
        this.PlayerHP = 0;

        // Ẩn và reset scale ban đầu
        this.resetStars();
         this.ShowStars(this.PlayerHP);
    },

    resetStars() {
        this.Star1.scale = 0;
        this.Star2.scale = 0;
        this.Star3.scale = 0;

        this.Star1.active = false;
        this.Star2.active = false;
        this.Star3.active = false;
    },

    ShowStars(hp) {
        this.PlayerHP = hp;
        this.resetStars();

        let count = 1;
        if (hp >= 100) {
            count = 3;
        } else if (hp >= 50) {
            count = 2;
        }

        // Hiển thị từng sao có Tween
        if (count >= 1) this.showStarWithTween(this.Star1, 0);
        if (count >= 2) this.showStarWithTween(this.Star2, 0.2);
        if (count >= 3) this.showStarWithTween(this.Star3, 0.4);
    },

    showStarWithTween(starNode, delay) {
        starNode.active = true;
        starNode.scale = 0;

        cc.tween(starNode)
            .delay(delay)
            .to(0.3, { scale: 1 }, { easing: 'backOut' }) // hiệu ứng bung ra đẹp
            .start();
    }
});
