cc.Class({
    extends: cc.Component,

    properties: {
        Unit: cc.Prefab, // Kéo prefab vào từ Editor
    },

    start () {
        // Tạo một instance của prefab
        let spawnedUnit = cc.instantiate(this.Unit);

        // Đặt vị trí spawn (ví dụ tại vị trí gốc)
        spawnedUnit.setPosition(cc.v2(0, 0));

        // Thêm node này vào node hiện tại (hoặc node cha mong muốn)
        this.node.addChild(spawnedUnit);
    },
});
