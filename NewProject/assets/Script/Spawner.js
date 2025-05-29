let PoolManager = require('PoolingManager');
let AudioController = require("AudioCtrl");
cc.Class({
    extends: cc.Component,

    properties: {
        Spawner: cc.Node,
        CastleScript: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
       this.Money = this.CastleScript.getComponent('CastleScript') 
          || this.CastleScript.getComponent('EnemyCastle');
        
    },
    RandomPosition() {
        // Get Spawner's size (width & height)
        const size = this.Spawner.getContentSize();

        // Get Spawner's anchor point (usually 0.5,0.5 but confirm)
        const anchor = this.Spawner.getAnchorPoint ? this.Spawner.getAnchorPoint() : cc.v2(0.5, 0.5);

        // Calculate min and max coordinates inside Spawner's local space
        const minX = -size.width * anchor.x;
        const maxX = size.width * (1 - anchor.x);
        const minY = -size.height * anchor.y;
        const maxY = size.height * (1 - anchor.y);

        // Random position inside rectangle in local space
        const randX = Math.random() * (maxX - minX) + minX;
        const randY = Math.random() * (maxY - minY) + minY;

        // Return new position (Vec2 or Vec3)
        return cc.v2(randX, randY);
    },
    
    SpawnPlayer(event, Index) {
        console.log("so la"+Index);
        //spaw musie eff
            AudioController.getInstance().PlayMinionSoundEffect(AudioController.getInstance().MinionSound[Index]);
        //if(this.Money.Money < this.Money.SummonPrice[Index]) return;

            this.Money.Money -= this.Money.SummonPrice[Index];
             const player = PoolManager.getInstance().getPlayer(Index,this.Spawner);
            //player.getComponent("unit_combat").Index = Index;
            let comp = player.getComponent("BaseUnitCombat") || enemy.getComponent("UnitRangeCombat");
            comp.Index=Index;
            player.setPosition(this.RandomPosition());
            //player.node.active = true;
            if(this.Money.Money < this.Money.SummonPrice[Index])
            {
                this.Money.SummonBtn[Index].interactable= false;
            }
            
            

        
    },
    SpawnEnemy(Index, holder, level){

        // - monny enemy
        const enemy = PoolManager.getInstance().getEnemy(Index,holder);

        let comp = enemy.getComponent("BaseUnitCombat") || enemy.getComponent("UnitRangeCombat");

        if (comp) {
            comp.Index = Index; 
            comp.isPlayer = false; 
            comp.level = level;// gán Index nếu component tồn tại
            enemy.setPosition(this.RandomPosition());
        } 

        // enemy.getComponent("unit_combat").Index = Index;
        // enemy.getComponent("unit_combat").isPlayer = false;
        // enemy.getComponent("unit_combat").level = level;
        // enemy.setPosition(this.RandomPosition());
        //enemy.node.active = true;
        
    },
    pushBackPlayer(event){

        PoolManager.getInstance().putPlayer( Index, )
    }
    // SpawnPlayer2() {
    //         this.Money.Money -= this.Money.SummonPrice[1];
    //         const player = PoolManager.getInstance().getPlayer2();
    //         player.setPosition(this.RandomPosition());
    //         if(this.Money.Money < this.Money.SummonPrice[1])
    //         {
    //             this.Money.SummonBtn[1].interactable = false;
    //         }
        
    // },
    // SpawnPlayer3() {
    //         this.Money.Money -= this.Money.SummonPrice[2];
    //         const player = PoolManager.getInstance().getPlayer3();
    //         player.setPosition(this.RandomPosition());
    //         if(this.Money.Money < this.Money.SummonPrice[2])
    //         {
    //             this.Money.SummonBtn[2].interactable = false;
    //         }
        
    // },
    // SpawnPlayer4() {
    //         this.Money.Money -= this.Money.SummonPrice[3];
    //         const player = PoolManager.getInstance().getPlayer4();
    //         player.setPosition(this.RandomPosition());
    //         if(this.Money.Money < this.Money.SummonPrice[3])
    //         {
    //             this.Money.SummonBtn[3].interactable = false;
    //         }
        
    // },
    


    // update (dt) {},
});
