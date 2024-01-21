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

// drawing variables
var init_pattern;
var patternWidth;
var patternHeight;
var patternSize = 50;
var patternAngle = 0;
var diagonalMax;
var update_pattern_size = patternSize;

var patternCount = 10;
var pattern_size_mode = 0;

class MyClass {
  constructor(param1, param2) {
    this.property1 = param1;
    this.property2 = param2;
  }

  myMethod() {
    // code to run when method is called
  }
}

// load assets before drawing assets and shapes on the canvas
function preload() {
  patterns = []; // initialize patterns for experiment
  patterns.push(loadImage("assets/module_1.svg")); // load image type
  patterns.push(loadImage("assets/module_2.svg")); // load image type
  patterns.push(loadImage("assets/module_3.svg")); // load image type
  patterns.push(loadImage("assets/module_4.svg")); // load image type
  patterns.push(loadImage("assets/module_5.svg")); // load image type
  patterns.push(loadImage("assets/module_6.svg")); // load image typepatterns.push(loadImage('assets/module_1.svg')); // load image type
  patterns.push(loadImage("assets/module_7.svg")); // load image type
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
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

  imageMode(CENTER);

  // code credit (imitation step): https://editor.p5js.org/generative-design/sketches/ryklecq9Ty4
  // I learned how to set the initial number of lines that would fit in the window; needed to use the pythagorean theorem to determine the max number
  // initialize first pattern type
  init_pattern = patterns[0];
  patternWidth = width / patternCount; // include number of patterns that fit within window
  patternHeight = height / patternCount; // include number of patterns that fit within window
  diagonalMax = sqrt(pow(width, 2) + pow(height, 2)); // pythagorean theorem; diagonal is the max distance
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(220);
  // call a method on the instance
  myInstance.myMethod();

  // Put drawings here

  // code credit (imitation step): https://editor.p5js.org/generative-design/sketches/ryklecq9Ty4
  // I learned that I would need to use for loops to generate images along the x and y of the canvas itself. I learned the mathematics behind defining an angle of the shape itself.
  // go through all possible y values within the canvas
  for (var canvasY = 0; canvasY < patternCount; canvasY++) {
    // go through all the possible x values within the canvas
    for (var canvasX = 0; canvasX < patternCount; canvasX++) {
      var x = patternWidth * canvasX + patternWidth / 2; // x value of svg pattern image to add (need to have buffer for x size of the pattern image)
      var y = patternHeight * canvasY + patternWidth / 2; // canvas is a square; y value of svg pattern image to add

      var a = atan2(mouseY - y, mouseX - x) + patternAngle * (PI / 180); // define angle of svg shape (somewhere between 0-180)

      // code credit (imitation step): https://editor.p5js.org/generative-design/sketches/ryklecq9Ty4
      // I learned how to define certain size modes and switch around the shapes accordingly
      // changes shape size based on given size mode
      if (pattern_size_mode == 0) {
        update_pattern_size = patternSize; // set to inital pattern size
      }
      if (pattern_size_mode == 1) {
        // change pattern size relative to where mouse is
        // bigger shapes if closer to mouse, vice versa
        update_pattern_size =
          patternSize * 1.5 -
          map(dist(mouseX, mouseY, x, y), 0, 500, 5, patternSize);
      }
      if (pattern_size_mode == 2) {
        // change pattern size relative to where mouse is
        // smaller shapes if closer to mouse, vice versa
        update_pattern_size = map(
          dist(mouseX, mouseY, x, y),
          0,
          500,
          5,
          patternSize
        );
      }

      // code credit (imitation step): https://editor.p5js.org/generative-design/sketches/ryklecq9Ty4
      // I learned how to create and push states with the initial steps of creating animations
      push(); // push state of shapes onto canvas
      translate(x, y); // spread objects across canvas with buffer to prevent overlapping
      rotate(a); // rotate objects based on given angle
      noStroke(); // do not include a stroke on the canvas
      image(init_pattern, 0, 0, update_pattern_size, update_pattern_size); // display images of lines
      pop(); // remove given shape state
    }
  }
}

// code credit (imitation step): https://editor.p5js.org/generative-design/sketches/ryklecq9Ty4
// I learned how to create different user interactions based one single key input; I plan to include more functionalities as I continue to experiment
// keyReleased() function is called to switch options (shape style, size modes, etc)
function keyReleased() {
  // s key will save an image of the canvas with a timestamp
  if (key == "s" || key == "S") {
    saveCanvas(gd.timestamp(), "png");
  }

  // d key will change the size mode
  if (key == "d" || key == "D") {
    pattern_size_mode = (pattern_size_mode + 1) % 3;
  }

  // g key will update the pattern amount on screen with a relative width and height for the lines
  if (key == "g" || key == "G") {
    patternSize += 5; // increase number of patterns
    // when smallest distanced apart is reached, reduce to baseline
    if (patternSize > 20) {
      patternSize = 10;
    }
    patternWidth = width / patternSize; // set width relative to number existing
    patternHeight = height / patternSize; // set height relative to number existing
  }

  // code credit (imitation step): https://editor.p5js.org/generative-design/sketches/ryklecq9Ty4
  // I learned how to switch images displayed by storing the patterns in an array
  // set pattern style based on key given
  if (key == "1") {
    init_pattern = patterns[0];
  }
  if (key == "2") {
    init_pattern = patterns[1];
  }
  if (key == "3") {
    init_pattern = patterns[2];
  }
  if (key == "4") {
    init_pattern = patterns[3];
  }
  if (key == "5") {
    init_pattern = patterns[4];
  }
  if (key == "6") {
    init_pattern = patterns[5];
  }
  if (key == "7") {
    init_pattern = patterns[6];
  }

  // code credit (imitation step): https://editor.p5js.org/generative-design/sketches/ryklecq9Ty4
  // user shifting pattern size and angle
  // arrow keys switching options
  if (keyCode == UP_ARROW) {
    patternSize += 5; // make size bigger
  }

  if (keyCode == DOWN_ARROW) {
    patternSize = max(patternSize - 5, 5); // make size smaller
  }

  if (keyCode == LEFT_ARROW) {
    patternAngle += 5; // rotate objects clockwise
  }

  if (keyCode == RIGHT_ARROW) {
    patternAngle -= 5; // rotate objects counter clockwise
  }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  // code to run when mouse is pressed
}
