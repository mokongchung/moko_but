let AudioController = require("AudioCtrl");
cc.Class({
    extends: cc.Component,

    properties: {
        backgroundNode: cc.Node, // Node nền để kéo camera
        cameraNode: cc.Node, // Node camera để di chuyển
        dragSpeed: 0.1, // Tốc độ kéo camera
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._isDragging = false;
        this._lastTouchPos = null;

        // Gắn sự kiện kéo cho node hiện tại (thường là canvas hoặc một node overlay full màn hình)
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    },


    start () {
        const audio = AudioController.getInstance();
        audio.PlayBgMusic(audio.bgMusicGamePlay);
    },

    
    onTouchStart(event) {
        this._isDragging = true;
        this._lastTouchPos = event.getLocation();
    },

    onTouchMove(event) {
        if (!this._isDragging || !this.cameraNode || !this.backgroundNode) return;

        const currentPos = event.getLocation();
        const delta = currentPos.sub(this._lastTouchPos);
        const deltaX = delta.x * this.dragSpeed;

        // Tính vị trí mới
        let newX = this.cameraNode.x - deltaX;

        // === TÍNH GIỚI HẠN ===
        
        const halfViewWidth = (cc.view.getVisibleSize().width / 2);

        const bgLeft = this.backgroundNode.x - this.backgroundNode.width / 2;
        const bgRight = this.backgroundNode.x + this.backgroundNode.width / 2;

        const minX = bgLeft + halfViewWidth;
        const maxX = bgRight - halfViewWidth;

        // Clamp lại trong khoảng cho phép
        newX = Math.max(minX, Math.min(newX, maxX));

        // Cập nhật vị trí camera
        this.cameraNode.setPosition(newX, this.cameraNode.y);

        this._lastTouchPos = currentPos;
    },

    onTouchEnd(event) {
        this._isDragging = false;
    },

    // update (dt) {},
});
