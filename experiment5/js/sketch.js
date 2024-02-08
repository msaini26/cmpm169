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

// art results
let num_points = 100;

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
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
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

    // imitate: https://openprocessing.org/sketch/1162440
    // art setup
    angleMode(DEGREES);
    colorMode(HSB);
    noStroke();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {   
    // call a method on the instance
    myInstance.myMethod();

    // Put drawings here
    // imitate: https://openprocessing.org/sketch/1162440
    orbitControl(); // allows the use of the mouse to orbit in 3D
    scale(0.9); // scale the drawing
    background(0); // set the background to black
    translate(0, 0, -150); // use z-axis to move the drawing back
    
    // rotate the drawing along the y and z-axis
    rotateY(frameCount/2.0);
    rotateZ(frameCount/6.0); 

    // add lighting
    ambientLight(30);

    // define lighting point locations
    pointLight(30, 20, 100, 0, 0, 0);
    pointLight(220, 50, 100, 0, 300, 200);
    
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}