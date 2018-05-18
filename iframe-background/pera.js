function Circle(x, y, r) {
    var options = {
        restitution: 0.9,
        density: 1,
        friction: 1,
        frictionStatic: 0,
        force: {
            x: 1000,
            y: 1000
        },
        frictionAir: 0,
        setAngularVelocity: 100000,
        collisionFilter: {
            category: objectscategory,
            mask: limitscategory
        }
    }

    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        noStroke();
        noFill(131, 207, 122);
        translate(pos.x, pos.y);
        rotate(angle);
        //ellipse(0, 0, this.r * 2);
        imageMode(CENTER);
        image(img, this.x, this.y);
        
        pop();
    }

}

