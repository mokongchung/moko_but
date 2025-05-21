let GameController = require('GameCtrl');
let PoolingManager = require('PoolingManager');

cc.Class({
    
    
    extends: cc.Component,

    properties: {
        Star1: cc.Node,
        Star2: cc.Node,
        Star3: cc.Node,
    },

    onLoad() {
        this.PlayerHP = 0;
        console.log("onLoad" + this.PlayerHP);
        // Ẩn và reset scale ban đầu
        
        
    },
    StarCall() {
      
        console.log("StarCall" + this.PlayerHP);
        this.ShowStars(this.PlayerHP);
       
    },

    resetStars() {


        this.Star1.active = false;
        this.Star2.active = false;
        this.Star3.active = false;
    },

    BtnMainMenu() 
    {
        cc.director.resume();
        PoolingManager.getInstance().clearAllPools();
        cc.director.loadScene("MainMenu");
    },
    BtnNextLevel()
    {
        cc.director.resume();
        PoolingManager.getInstance().clearAllPools();
        cc.director.loadScene("LevelSelect");
    },

    ShowStars() {
        let hp =this.PlayerHP;
       
        this.resetStars();

        let count = 1;
        if (hp >= 100) {
            count = 3;
        } else if (hp >= 50) {
            count = 2;
        }
             console.log("ShowStars" + count);
        let gameController = GameController.getInstance();
        gameController.saveLevel(gameController.Level, count);
        // Hiển thị từng sao có Tween
        if (count >= 1) this.showStarWithTween(this.Star1, 0);
        if (count >= 2) this.showStarWithTween(this.Star2, 0.2);
        if (count >= 3) this.showStarWithTween(this.Star3, 0.4,true);
    },

    showStarWithTween(starNode, delay, isLastStar) {
    starNode.active = true;
    starNode.scale = 0.1;

    cc.tween(starNode)
        .delay(delay)
        .to(0.3, { scale: 1 }, { easing: 'backOut' })
        .call(() => {
            if (isLastStar) {
                cc.director.pause(); // ✅ chỉ pause sau khi tween cuối cùng xong
                
            }
        })
        .start();
    },

});
