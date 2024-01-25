// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;

var max_particles = 200;
var variation_one = [];
var variation_two = [];
var variation_three = [];
var noise_scale = 800; // experiment with this - todo


class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
    // create an instance of the class
    myInstance = new MyClass(VALUE1, VALUE2);

    var centerHorz = windowWidth / 2;
    var centerVert = windowHeight / 2;

    background(21, 8, 50);   // background color

    // imitate
    // I am imitating the following: https://openprocessing.org/sketch/494102
    

    // generate initial particles
    for (var i = 0; i < max_particles; i++) {
        // TODO: define particle objects
    }

}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    
    // call a method on the instance
    myInstance.myMethod();

    // Put drawings here
    

    // imitate
    // I am imitating this design: https://openprocessing.org/sketch/494102

    
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}

/**
 * Goal: define particle with a specified direction, speed, and angle
 * @param {*} posX 
 * @param {*} posY 
 */
// imitate: https://openprocessing.org/sketch/494102
// learning how to initialize particle with given constraints
function Particle(posX, posY) {

    // initialize particle
    this.position = createVector(posX, posY); // define initial position
    this.velocity = createVector(0, 0); // initialize with no velocity
    this.direction = createVector(0, 0); // init direction
    this.speed = 0.4; 
    
    // particle movement
    this.movement = function() {
        var particle_angle = noise(this.position.posX/noise_scale, this.position.posY/noise_scale)* TWO_PI*noise_scale;

        // position
        this.direction.posX = cos(particle_angle); // start x scale with cos movement
        this.direction.posY = sin(particle_angle); // start y scale with sin movement

        // velocity
        // velocity carries both magnitude and direction; speed in a given direction
        // need to update velocity based on displacement and speed
        this.velocity = this.direction.copy(); 
        this.velocity.mult(this.speed); 
        this.position.add(this.velocity);
    }
}