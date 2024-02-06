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
var img_stored;
let art_texture;
var angle =0.0;


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
  img_stored.translate(640, 0); // move the image to the right
  img_stored.scale(-1, 1); // flip the image horizontally
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
        color(100, noise(i / 3, j / 3), (i * j) / 50) * random([0, 50, 100])
      );
    }
  }
  art_texture.updatePixels(); // update pixels
}

let art_mode = 1; // set the art mode to 1

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(0);
  // call a method on the instance
  myInstance.myMethod();

  // Put drawings here
  img_stored.image(video_feed, 0, 0); // draw the video feed to the buffer

  // imitate: https://openprocessing.org/sketch/909153
  // generating the pixels based on the image stored
  push();
  noStroke(); // set no stroke
  // integrate: switching up the feed scale
  scale(1.5); // set scale to
  // integrate: switching the radius generation
  radius = max(mouseX + 100, 100) / 10 + 20; // set radius

  for (var i = 0; i < img_stored.height; i += radius) {
    for (var j = 0; j < img_stored.width; j += radius) {
      var draw_pixel = img_stored.get(j, i); // get the pixel from the video feed
      var red = draw_pixel[0];
      var green = draw_pixel[1];
      var blue = draw_pixel[2];

      // imitate: https://openprocessing.org/sketch/909153
      // setting the background values
      let background = (red + green + blue) / 3; // set the background to the average of the red, green, and blue values
      let backgroundIndex = 10 - int(background / 25.5); // set the background index to 10 minus the integer value of the background divided by 25.5

      // imitate: https://openprocessing.org/sketch/909153
      if (art_mode == 1) {
        let txt = "کنمजदगपकनमद天四五田";
        fill(red + 50, blue + 50, green + 50); // set text color
        textSize(radius); // set text size
        textStyle(BOLD); // set text style to bold
        text(txt[backgroundIndex], j, i); // set the text to the background index
      } else if (art_mode == 2) {
        ellipse(j, i, radius / 3 + blue / 15, radius / 3 + blue / 15); // draw an ellipse
      } else if (art_mode == 3) {
        push();
        translate(j, i);
        rotate(blue / 20);
        colorMode(HSB);
        fill(red, 100, 100);
        rect(0, 0, radius / 2.5 + red / 20, radius / 2.5 + red / 20);
        fill(0);
        ellipse(0, 0, 5);
        pop()
      }
    }
  }


  if (keyIsDown(32) || frameCount < 130){
    let videoFrame = createImage(video_feed.width, video_feed.height);
    videoFrame.copy(video_feed, 0, 0, video_feed.width, video_feed.height, 0, 0, videoFrame.width, videoFrame.height);
	  translate(300, 200);
    imageMode(CENTER);
	  rotate(angle);
    tint(157, 132, 227);
    videoFrame.filter(POSTERIZE, 3);
    image(videoFrame, 0, 0, 200, 200);
	  angle += 0.05;
	}
  

  // pop()

  // push()
  // blendMode(MULTIPLY);
  // image(art_texture, 0, 0);
  // pop()
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  // code to run when mouse is pressed
  art_mode += 1; // increment the art mode
  if (art_mode > 3) {
    art_mode = 1; // reset art mode
  }
}

// keyPressed() function is called once after every time a key is pressed
function keyPressed() {
  // code to run when key is pressed
  // setting art modes
  if (key == "1") {
    art_mode = 1; // set art mode to 1
  }
  if (key == "2") {
    art_mode = 2; // set art mode to 2
  }
  if (key == "3") {
    art_mode = 3; // set art mode to 3
  }
}
