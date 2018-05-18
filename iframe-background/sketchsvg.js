// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    World = Matter.World,
    Common = Matter.Common,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Svg = Matter.Svg,
    Vertices = Matter.Vertices;

var engine;
var world;
var render;
var circles = [];
var cagedown, cageup, cageleft, cageright;

var mConstraint;
var vertexSets = [];

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    engine = Engine.create(options);
    engine.timing.timeScale = 0.1;
    //world
    world = engine.world;

    


    //runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    //limits
    var options = {
        isStatic: true
    }
    cagedown = Bodies.rectangle(width / 2, height, width, 10, options);
    cageup = Bodies.rectangle(width / 2, 0, width, 10, options);
    cageleft = Bodies.rectangle(0, height / 2, 10, height, options);
    cageright = Bodies.rectangle(width, height / 2, 10, height, options);
    World.add(world, cagedown);
    World.add(world, cageup);
    World.add(world, cageleft);
    World.add(world, cageright);

    //canvasmouse
    var canvasmouse = Mouse.create(canvas.elt);
    canvasmouse.pixelRatio = pixelDensity();
    var options = {
        mouse: canvasmouse
    }
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);

}

//bodies
var svgs = [
        'pera.svg'
    ];

for (var i = 0; i < svgs.length; i += 1) {
    (function (i) {
            $.get(svgs).done(function (data) {
                vertexSets = [],
                    color = Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58']);

                $(data).find('pera.svg').each(function (i, path) {
                    var points = Svg.pathToVertices('pera.svg', 30);
                    vertexSets.push(Vertices.scale(points, 0.4, 0.4));
                });

                World.add(world, Bodies.fromVertices(mouseX, mouseY, [vertexSets], {
                render: {
                    fillStyle: (0, 255, 0),
                }
            }, true));
                
                //keypressed
                var value = 0;

                function keyPressed() {
                    if (value === 0) {
                        circles.push(new Bodies.fromVertices(mouseX, mouseY, [vertexSets]));
                    }
                }
    });
})(i);
}




function draw() {
    background(255,255,0);
    Engine.update(engine);
    for (var i = 0; i < circles.length; i++) {
        circles[i].show();
    }

    

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
