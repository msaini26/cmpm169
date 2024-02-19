// sketch.js - purpose and description here
// Author: Mansi Saini & Rebecca Zhao
// Date: 2/19/2024

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;

// imitate: http://www.generative-gestaltung.de/2/sketches/?01_P/P_3_1_3_01
var characters = "ABCDEFGHIJKLMNORSTUVWYZÄÖÜß,.;!? ";
var input_text;
var freq = [];

// positioning
var x;
var y;

var display_letter = true;

class MyClass {
  constructor(param1, param2) {
    this.property1 = param1;
    this.property2 = param2;
  }

  myMethod() {
    // code to run when method is called
  }
}

// preload() function is called to load text before program starts
function preload() {
  // load text file
  input_text = loadStrings("data/poem.txt");
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

  // imitate: http://www.generative-gestaltung.de/2/sketches/?01_P/P_3_1_3_01
  noStroke(); // no border
  textFont("monospace", 18); // set font type

  input_text = input_text.join(" "); // join the array into a single string

  for (var i = 0; i < characters.length; i++) {
    freq[i] = 0;
  }
  total_char_count(); // count the characters in the text
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(255);
  // call a method on the instance
  myInstance.myMethod();

  // Put drawings here
  // set initial position
  x = 20;
  y = 40;

  // draw all the characters
  for (var i = 0; i < input_text.length; i++) {
    // get the current character
    var current_char = input_text.charAt(i).toUpperCase();
    var index = characters.indexOf(current_char);
    if (index < 0) {
      continue; // skip the character
    }

    // draw the character
    // imitate: http://www.generative-gestaltung.de/2/sketches/?01_P/P_3_1_3_01
    if (display_letter) {
      fill(87, 35, 129, freq[index] * 3); // update opacity based on frequency of letter
    } else {
      fill(87, 35, 129);
    }

    var sortY = index * 20 + 40; // sort the letters by frequency
    var mouse_path = map(mouseX, 50, width - 50, 0, 1); // map the mouse path
    mouse_path = constrain(mouse_path, 0, 1); // constrain the mouse path
    var interY = lerp(y, sortY, mouse_path); // lerp the mouse path

    text(input_text.charAt(i), x, interY); // draw the text

    x += textWidth(input_text.charAt(i)); // update the x position
    if (x >= width - 200 && current_char == " ") {
      // if the x position is greater than the width
      y += 30;
      x = 20;
    }
  }
}

// total_char_count() function is called to count the characters in the text
function total_char_count() {
  for (var i = 0; i < input_text.length; i++) {
    // get the current character
    var letter = input_text.charAt(i);
    var upperCaseChar = letter.toUpperCase();
    var index = characters.indexOf(upperCaseChar);
    if (index >= 0) {
      freq[index]++; // increment the frequency of the letter
    }
  }
}

// keyReleased() function is called once after every time a key is released
function keyReleased() {
    if (key == 's' || key == 'S') {
      save("image.png");
    }
    if (key == 'a' || key == 'A') {
        display_letter = !display_letter;
    }
}


// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  // code to run when mouse is pressed
}
