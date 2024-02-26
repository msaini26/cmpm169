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

let input_data; // store input data

let data_points = []; // store data points

// data fields
let longtitude;
let latitude;
let elevation;
let change_in_snow_depth;

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
  input_data = loadTable(
    "bcsnowdepthswetrendsbystation1950-2014.csv",
    "csv",
    "header"
  );
  console.log(input_data);
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

  // acquire data points
  latitude = input_data.getColumn("latitude");
  longtitude = input_data.getColumn("longtitude");
  elevation = input_data.getColumn("elevation");
  change_in_snow_depth = input_data.getColumn("slope_percentperyear");

  // iterate through the data rows
  for (let row = 0; row < input_data.getRowCount(); row++) {
    let data_row = input_data.getRow(row);
    let x = map(data_row.get('latitude'), min(latitude), max(latitude), 10, width-10);
    let y = map(data_row.get('longtitude'), min(longtitude), max(longtitude), 10, height-10);
    let diameter = map(row.get('slope_percentperyear'), min(change_in_snow_depth), max(change_in_snow_depth), 3, 11);
    let color = map(data_row.get('elevation'), min(elevation), max(elevation), 30, 255);

    noFill();

    // draw the data points
    data_points.push(new DataPoint(x, y, diameter, color));
  }
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(220);
  // call a method on the instance
  myInstance.myMethod();

  // Put drawings here
  var centerHorz = canvasContainer.width() / 2 - 125;
  var centerVert = canvasContainer.height() / 2 - 125;
  fill(234, 31, 81);
  noStroke();
  rect(centerHorz, centerVert, 250, 250);
  fill(255);
  textStyle(BOLD);
  textSize(140);
  text("p5*", centerHorz + 10, centerVert + 200);
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  // code to run when mouse is pressed
}
