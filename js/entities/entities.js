game.CivilianEntity = me.ObjectEntity.extend({
    
    init: function(x,y,settings) {
        this.parent(x,y,settings);
        this.gravity = 0;
        this.renderable.addAnimation('down',[17,18,19]);
        this.renderable.addAnimation('up',[21,22,23]);
        this.renderable.addAnimation('left',[25,26,27]);
        this.renderable.addAnimation('right',[29,30,31]);
        this.collidable = true;
    },

    update: function() {
        //Civ AI here
    }
});

game.ZombieEntity = me.ObjectEntity.extend({
    
    init: function(x,y,settings) {
        this.parent(x,y,settings);
        this.gravity = 0;
        this.renderable.addAnimation('down',[17,18,19]);
        this.renderable.addAnimation('up',[21,22,23]);
        this.renderable.addAnimation('left',[25,26,27]);
        this.renderable.addAnimation('right',[29,30,31]);
        this.collidable = true;
    },

    update: function() {
        //Zombie AI here
    }
});


/*------------------- 
a player entity
-------------------------------- */
game.PlayerEntity = me.ObjectEntity.extend({
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
 
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 3);
        
        this.gravity = 0;
 
        this.renderable.addAnimation('down',[17,18,19]);
        this.renderable.addAnimation('up',[21,22,23]);
        this.renderable.addAnimation('left',[25,26,27]);
        this.renderable.addAnimation('right',[29,30,31]);
    
        this.collidable = true;
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 
    },

    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
 
        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            if( this.renderable.isCurrentAnimation('left') == false ) {
                this.renderable.setCurrentAnimation('left');
            }
            
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            if( this.renderable.isCurrentAnimation('right') == false ) {
                this.renderable.setCurrentAnimation('right');
            }
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }
        
        if (me.input.isKeyPressed('up')) {
            if( this.renderable.isCurrentAnimation('up') == false ) {
                this.renderable.setCurrentAnimation('up');
            }
            // update the entity velocity
            this.vel.y -= (3+this.accel.y) * me.timer.tick;
        } else if (me.input.isKeyPressed('down')) {
            if( this.renderable.isCurrentAnimation('down') == false ) {
                this.renderable.setCurrentAnimation('down');
            }
            // update the entity velocity
            this.vel.y += (3+this.accel.y) * me.timer.tick;
        } else {
            this.vel.y = 0;
        }
 
        // check & update player movement
        this.updateMovement();
 
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
         
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }
 
});
