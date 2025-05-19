// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        cc.director.getCollisionManager().enabled = true;
        
     },

    start () {

    },

    onCollisionEnter (other, self) {
        //if (other.node.group === 'e') {
        //this.emitToAllParents(, );
        let event = new cc.Event.EventCustom('see_enemy', true); // bubbling = true
        event.detail = { node: other  };
        this.node.dispatchEvent(event);
        console.log('Chạm node2 loại ' + other.node.group);
            //cc.log('Chạm node2 loại ' + other.node.group);
            // xử lý gì đó
        //}
    },
    onCollisionExit (other, self) {
        //exit
        let event = new cc.Event.EventCustom('enemy_exit', true); // bubbling = true
        event.detail = { node: other  };
        this.node.dispatchEvent(event);
        console.log('Chạm node2 loại ' + other.node.group);
        console.log('exit node2 loại ' + other.node.group);
    },


    // update (dt) {},
});
