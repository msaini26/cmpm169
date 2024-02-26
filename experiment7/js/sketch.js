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
    "./data/bcsnowdepthswetrendsbystation1950-2014.csv",
    "csv",
    "header"
  );
  console.log(input_data);
}

// data fields
let longitude;
let latitude;
let elevation;
let change_in_snow_depth;

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
  longitude = input_data.getColumn("longitude");
  elevation = input_data.getColumn("elevation");
  change_in_snow_depth = input_data.getColumn("slope_percentperyear");

  // iterate through the data rows
  for (let r = 0; r < input_data.getRowCount(); r++) {
    let data_row = input_data.getRow(r);
    let row = input_data.getRow(r);
    let x = map(
      row.get("latitude"),
      min(latitude),
      max(latitude),
      10,
      width - 10
    );
    let y = map(
      row.get("longitude"),
      min(longitude),
      max(longitude),
      10,
      height - 10
    );
    let diam = map(
      row.get("slope_percentperyear"),
      min(change_in_snow_depth),
      max(change_in_snow_depth),
      3,
      11
    );
    let c = map(row.get("elevation"), min(elevation), max(elevation), 30, 255); //180,230

    noFill();

    // draw the data points
    data_points.push(new Spot(x, y, diam, c));
  }
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(220);
  // call a method on the instance
  myInstance.myMethod();

  // Put drawings here
  for (let i = 0; i < data_points.length; i++) {
    data_points[i].render();
  }

  push();
  stroke(255);
  noFill();
  strokeWeight(1);
  textSize(32);
  text("BC Snow Depth Trends", 600, 450);
  //textSize(18);
  //text('Mapped by : location',330,60);
  //text('elevation',330,90);
  //text('& slope',330,120);
  pop();
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  // code to run when mouse is pressed
}

class Spot {
  constructor(x, y, diam, c) {
    this.x = x;
    this.y = y;
    this.diam = diam;
    this.c = c;
    this.t = random(2 * PI);
  }

  render() {
    stroke(this.c);
    strokeWeight(random(2, 5));
    //strokeWeight(2);
    push();
    translate(this.x, this.y);
    beginShape();
    for (let theta = 0.01; theta <= 2 * PI; theta += 0.01) {
      // theta increment for resolution

      //adding vertices (the superformula)
      let rad = this.delta(
        theta,
        1, //a
        1, //b
        this.diam * 10, //m
        0.6 * 10, //n1
        sin(this.t) * 0.2 - 0.01, //n2  //use cos and sin to oscillate shape
        cos(this.t) * 0.2 - 0.01 // n3
      ); // these parameters make a circle
      let x1 = rad * cos(theta) * 50;
      let y1 = rad * sin(theta) * 50;
      vertex(x1, y1);
    }

    endShape();
    pop();
    this.t += 0.1;
  } // end of render

  delta(theta, a, b, m, n1, n2, n3) {
    return pow(
      pow(abs(cos((m * theta) / 4.0) / a), n2) +
        pow(abs(sin((m * theta) / 4.0) / b), n3),
      -1.0 / n1
    );
  }
} // end of class


