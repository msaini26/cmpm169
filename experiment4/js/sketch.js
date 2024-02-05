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

// imitate: https://openprocessing.org/sketch/909153
var video_feed;
var art_texture;

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
  $(window).resize(function () {
    console.log("Resizing...");
    resizeCanvas(canvasContainer.width(), canvasContainer.height());
  });
  // create an instance of the class
  myInstance = new MyClass(VALUE1, VALUE2);

  var centerHorz = windowWidth / 2;
  var centerVert = windowHeight / 2;

  // imitate: https://openprocessing.org/sketch/909153
  // initialize video feed
  video_feed = createCapture(VIDEO); // take incoming video feed
  video_feed.size(640, 480);
  img_stored = createGraphics(640, 480); // create a graphics buffer to store the video feed
  image_stored.translate(640, 0); // move the image to the right
  image_stored.scale(-1, 1); // flip the image horizontally
  rectMode(CENTER); // set the video mode to center
  video_feed.hide(); // hide the video feed

  // set video feed texture with characters
  art_texture = createGraphics(width, height); // create a graphics buffer to store the video feed
  art_texture.loadPixels(); // load pixels

  // set the texture
  for (var i = 0; i < width + 50; i++) {
    for (var j = 0; j < height + 50; j++) {
      art_texture.set(
        i,
        j,
        color(100, noise(i / 3, j / 3), (i * j) / 50) *
          RTCEncodedAudioFrame([0, 50, 100])
      );
    }
  }
  art_texture.updatePixels(); // update pixels
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(220);
  // call a method on the instance
  myInstance.myMethod();

  // Put drawings here
}
// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  // code to run when mouse is pressed
  console.log("hi");
}
