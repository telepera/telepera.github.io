// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Common = Matter.Common,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    Svg = Matter.Svg,
    Render = Matter.Render,
    Runner = Matter.Runner,
    MouseConstraint = Matter.MouseConstraint;
    

var engine;
var world;
var circles = [];
var polygons = [];
var cagedown, cageup, cageleft, cageright;
var polygon;

var mConstraint;
var limitscategory = 0x0001, objectscategory = 0x0002;


var img;



function preload() {
    img = loadImage('http://i.imgur.com/Pp8ZOm5.png');
  
}

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    engine.timing.timeScale = 0.05;
    engine.world.gravity.y = -0.5;

    //world
    world = engine.world;
    Matter.World.gravity = 0;
    
    
    
    Engine.run(engine);
    
        
    circles.push(new Circle(random(50, width), random(50, height), 100));
    circles.push(new Circle(random(50, width), random(50, height), 100));
    circles.push(new Circle(random(50, width), random(50, height), 100));
    circles.push(new Circle(random(50, width), random(50, height), 100));
    circles.push(new Circle(random(50, width), random(50, height), 100));
    circles.push(new Circle(random(50, width), random(50, height), 100));
    circles.push(new Circle(random(50, width), random(50, height), 100));
    
    
    
    //limits
    var options = {
        isStatic: true,
        collisionFilter: {
            category: limitscategory,
            mask: objectscategory,
            restitution: 20
        }
    };
    cagedown = Bodies.rectangle(windowWidth / 2, windowHeight+200, windowWidth, 10, options);
    cageup = Bodies.rectangle(windowWidth / 2, -50, windowWidth, 10, options);
    cageleft = Bodies.rectangle(-200, windowHeight / 2, 10, windowHeight, options);
    cageright = Bodies.rectangle(windowWidth+200, windowHeight / 2, 10, windowHeight, options);
    World.add(world, cagedown);
    World.add(world, cageup);
    World.add(world, cageleft);
    World.add(world, cageright);



    var w = screen.width;
    
    if (w > 600) {
    //canvasmouse
    var canvasmouse = Mouse.create(canvas.elt);
    canvasmouse.pixelRatio = pixelDensity();
    var options = {
        mouse: canvasmouse,
    }
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
    canvasmouse.element.removeEventListener("mousewheel", canvasmouse.mousewheel);
canvasmouse.element.removeEventListener("DOMMouseScroll", canvasmouse.mousewheel);
    
    }
    
}


function draw() {
    background('rgba(253,253,253)');
    Engine.update(engine);
    for (var i = 0; i < circles.length; i++) {
        circles[i].show();
    } 
   
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
