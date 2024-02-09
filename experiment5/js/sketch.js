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
  let canvas = createCanvas(
    canvasContainer.width(),
    canvasContainer.height(),
    WEBGL
  );
  canvas.parent("canvas-container");
  // resize canvas is the page is resized
  $(window).resize(function () {
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
  scale(0.6); // scale the drawing
  background(0); // set the background to black
  translate(0, 0, -150); // use z-axis to move the drawing back

  // rotate the drawing along the y and z-axis
  rotateY(frameCount / 2.0);
  rotateZ(frameCount / 6.0);

  // add lighting
  ambientLight(30);

  // define lighting point locations
  pointLight(30, 20, 100, 0, 0, 0);
  pointLight(220, 50, 100, 0, 300, 200);

  // imitate: https://openprocessing.org/sketch/1162440
  // create spirals of points
  push();
  for (let pt = 0; pt < num_points; pt++) {
    rotateZ((360 * 4.0) / num_points); //spiral 4 times
    rotateX(pt / 4.0);
    push(); // each individual point of the spiral

    for (let pt_length = 150 - pt; pt_length > 10; pt_length /= 1.5) {
      translate(pt_length * 1.25, 0, 0);
      rotateZ(15);
      rotateX(pt * 2);
      shininess(10);
      specularMaterial(45 - pt_length, 80, 100);
      cylinder(pt_length, pt_length / 4, 24);
    }
    pop();
  }
  pop();

  // reflect the spiral  
  push();
  for (let pt = 0; pt < num_points; pt++) {
    rotateZ(-1440 / num_points); // swap directions bc we are reflecting the top
    rotateX(pt / 4);
    push(); // each individual point of the spiral
    for (let pt_length = 150 - pt; pt_length > 10; pt_length /= 1.5) {
      translate(pt_length * 1.25, 0, 0);
      rotateZ(-15); // negative bc we are reflecting the top
      rotateX(pt * 2);
      shininess(10);
      specularMaterial(45 - pt_length, 80, 100);
      cylinder(pt_length, pt_length / 4, 24);
    }
    pop(); // end of individual point
  }
  pop(); // end of spiral
}

// keyPressed() function is called once after every time a keyboard key is pressed
function keyPressed() {
  save('pix.jpg');
}

