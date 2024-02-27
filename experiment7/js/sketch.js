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

let input_data, tax_data, gas_data; // store input data

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
    // "./data/bcsnowdepthswetrendsbystation1950-2014.csv",
    // "csv",
    // "header"
    "./data/greenhouse-gas-emissions-industry-and-household-september-2023-quarter.csv",
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
  data_value = input_data.getColumn("Data_value");
  period = input_data.getColumn("Period");
  anzsic = input_data.getColumn("Anzsic");
  // change_in_snow_depth = input_data.getColumn("slope_percentperyear");
  // console.log(min(latitude))
  // iterate through the data rows
  let nameColors = {
    "AAZ": "#fc4976",
    "BB1": "#9d65f7",
    "CCZ": "#6596f7",
    "DD1": "#65f7f2",
    "EE1": "#65f7a2",
    "HH1": "#72f765",
    "HH2": "#e4f765",
    "HH3": "#f7cc65",
    "HHD": "#f7a065",
    "II1": "#f77b65",
    "ZGZ": "#e63a37",
    "ZSX": "#199fd4",
    "ZSZ": "#d5b0f5",
    "ZZ9": "#f7abde",
    "ZZZ": "#6c57c9",
    "ZPZ": "#e0ab24",
};

  for (let r = 0; r < input_data.getRowCount(); r++) {
    let data_row = input_data.getRow(r);
    let row = input_data.getRow(r);
    // console.log(row);
    let x = map(
      row.get("Data_value") * random(1, 2),
      min(data_value),
      max(data_value),
      10,
      width - 10
    );
    let y = map(
      row.get("Period"),
      min(period),
      max(period),
      10,
      height - 10
    );
    let diam = map(
      row.get("Data_value"),
      min(data_value),
      max(data_value),
      3,
      11
    );
    //AAZ, BB1, CCZ, DD1, EE1, HH1, HH2, HH3, HHD, II1, ZGZ, ZSX, ZSZ, ZZ9, ZZZ, ZPZ,
    let c = nameColors[row.get("Anzsic")]; //180,230

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
  // text("BC Snow Depth Trends", 600, 450);
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
        sin(this.t) * 0.5 - 0.03, //n2  //use cos and sin to oscillate shape
        cos(this.t) * 0.1 - 0.01 // n3
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
      pow(abs(cos((m * theta) / 6.0) / a), n2) +
        pow(abs(sin((m * theta) / 6.0) / b), n3),
      -1.0 / n1
    );
  }
} // end of class


