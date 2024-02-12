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

// particles
var particles = [];

class MyClass {
  constructor(param1, param2) {
    this.property1 = param1;
    this.property2 = param2;
  }

  myMethod() {
    // code to run when method is called
  }
}

var seed = Math.random() * 15283;
var t;
var num, vNum;
var radius, mySize, margin;
var sizes = [];

let colors = [];
let colors0 = "281914-1a1a1a-202020-242e30".split("-").map((a) => "#" + a);
let colors22 = "ffffff-171F26-4A5259-7B848C-AEB7BF".split("-").map((a) => "#" + a);
let colors23 = "D94389-4D578C-3791A6-3DF2D1-F28080".split("-").map((a) => "#" + a);
let colors24 = "F28D35-D96A29-A66641-D9B0A7-F2DAD8".split("-").map((a) => "#" + a);
let colors25 = "F2A7D8-473959-655A8C-9F8FD9-5979D9".split("-").map((a) => "#" + a);
let colors26 = "025951-012623-21BF92-73D9BC-0D0D0D".split("-").map((a) => "#" + a);
let colors7 = "fefefe-fffffb-fafdff-fef9fb-f7fcfe".split("-").map((a) => "#" + a);
let colors8 = "8c75ff-c553d2-2dfd60-2788f5-23054f-f21252-8834f1-c4dd92-184fd3-f9fee2-2E294E-541388-F1E9DA-FFD400-D90368-e9baaa-ffa07a-164555-ffe1d0-acd9e7-4596c7-6d8370-e45240-21d3a4-3303f9-cd2220-173df6-244ca8-a00360-b31016".split("-").map((a) => "#" + a);
let colors11 = "025159-3E848C-7AB8BF-C4EEF2-A67458".split("-").map((a) => "#" + a);
let colors12 = "10454F-506266-818274-A3AB78-BDE038".split("-").map((a) => "#" + a);
let colors13 = "D96690-F28DB2-F2C9E0-89C2D9-88E8F2".split("-").map((a) => "#" + a);
var color_setup1, color_setup2;
let color_bg;
let v_planet = [];

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
  for (var i = 0; i < 1000; i++) {
    particles.push(new particle());
  }
  noStroke();

  randomSeed(seed);
	mySize = min(windowWidth, windowHeight);
	margin = mySize / 100;
	color_setup1 = colors7;
	color_setup2 = random([colors22, colors23, colors24, colors25, colors26, colors11, colors12, colors13]);
	color_bg = "#a3a3a3";
	background(color_bg);
	num = int(random(50, 30));
	radius = mySize * 0.75;
	for (let a = 0; a < TAU; a += TAU / num) {
		sizes.push(random(0.1, 0.5))
	}
	t = 0;
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  // call a method on the instance
  myInstance.myMethod();
  drawBackground();
  angleMode(DEGREES);

  // Put drawings here
  // imitate: https://openprocessing.org/sketch/1162440
  orbitControl(); // allows the use of the mouse to orbit in 3D
  scale(0.3); // scale the drawing
  translate(0, 0, -150); // use z-axis to move the drawing back
  

  // rotate the drawing along the y and z-axis
  rotateX(frameCount / 2.0);
  rotateZ(-frameCount / 6.0);

  // add lighting
  ambientLight(40);

  // define lighting point locations
  pointLight(30, 20, 100, 0, 0, 0);

  // integrate: dynamic lighting based on mouse position
  let lightX = mouseX - width / 2;
  let lightY = mouseY - height / 2;
  pointLight(100, 300, 250, lightX, lightY, 500);

  // imitate: https://openprocessing.org/sketch/1162440
  // create spirals of points
  push();
  for (let pt = 0; pt < num_points; pt++) {
    rotateZ((360 * 10.0) / num_points); //spiral 4 times
    rotateX(pt / random(1, 4));
    push(); // each individual point of the spiral

    for (let pt_length = 150 - pt; pt_length > 10; pt_length /= 1.5) {
      translate(pt_length * 1.25, 0, 0);
      rotateZ(15);
      rotateX(pt * 2);
      // integrate: extreme lighting
      shininess(20); // integrate: increased shininess
      specularMaterial(145 - pt_length, 80, 100);
      cone(pt_length, pt_length / 4, 24);
      translate(50, 50, 50); // integrate: firework animation
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
      cone(pt_length, pt_length / 4, 24);
      torus(50, 20, 24, 16);
    }
    pop(); // end of individual point
  }
  pop(); // end of spiral

  push();
  rotateX(-mouseY);
  rotateY(mouseX);
  offset = 0;
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
  }
  for (var i = 0; i < particles.length; i++) {
    if (particles[i + offset].ded) {
      particles.splice(i + offset, 1);
      offset--;
      i++;
    }
  }
  pop();
}

function drawBackground() {
  background(color_bg);
  randomSeed(seed);
  angleMode(RADIANS);

	for (let i = 0; i < num; i++) {
		let a = (TAU / num) * i;
		let x = radius * sin(a + t) / random(5, 3) / 1.0;
		let y = radius * cos(a + t) / random(3, 5) / 1.0;
		v_planet[i] = createVector(x, y);
	}
	push();

	for (let q = 0; q < 1 / 5; q += 2 * random(0.01, 0.02)) {
		for (let j = 0; j < 1; j++) {
			let n = noise(q*t, j*t,frameCount*0.01);
			rotateX(random(TAU)+sin(-t) / 5 + q );
			rotateY(random(TAU)+cos(t) / 5 + q );
			rotateZ(random(TAU)+sin(-t) / 5 + q );
			noFill();
			stroke(random(color_setup2));
			strokeWeight(random(1));

			for (let i = 0; i < num; i += 2) {
				let d = random(radius / 2, radius / 1) / 1;
				push();
				rotateX( random(TAU)+sin(t));
				rotateY(random(TAU)+cos(-t)+n/100 );
				rotateZ( random(TAU)+2 * sin(2*t) );
				let x_plus = 5 * random(-d, d) / 1;
				let y_plus =  5 * random(-d, d) / 1;
				let z_plus =5 * random(-d, d) / 1;
				line(-x_plus,-y_plus,-z_plus,x_plus,y_plus,z_plus);
				pop();
			}
			for (let i = 0; i < num; i += 1) {
				let d = (1.5 + sin(t)) * random(radius / 2, radius / 4);
				let x_plus = 0.5 * random(-d, d) / 1;
				let y_plus = 0.5 * random(-d, d) / 1;
				let z_plus = 0.75 * random(-d, d) / 1;
				fill(random(color_setup2));
				noStroke();
				push();
				translate(v_planet[i].x + x_plus, v_planet[i].y + y_plus, z_plus);
				rotateX(random(TAU)+t);
				rotateY(random(-TAU)+t);
				rotateZ(random(PI)+t);
				sphere(random(8));
				pop();
			}
		}
	}
	pop();

	t += random(2, 1) * random(0.001, 0.0025) / 1;
}

class particle {
  constructor() {
    // directions
    this.direction_x = 0;
    this.direction_y = 0;
    this.direction_z = 0;
    this.to_destroy = false; // particle destroy flag
    this.particle_velocity = [random(-1, 1), random(-1, 1), random(-1, 1)];
    this.total =
      0.5 /
      (sqrt(
        this.particle_velocity[0] * this.particle_velocity[0] +
          this.particle_velocity[1] * this.particle_velocity[1] +
          this.particle_velocity[2] * this.particle_velocity[2]
      ) +
        random(-0.9, -0.3));
    this.particle_velocity = [
      this.particle_velocity[0] * this.total,
      this.particle_velocity[1] * this.total,
      this.particle_velocity[2] * this.total,
    ];
    this.color = random(0, 255);
    this.particle_lifespan = 0;
  }
  update() {
    // particle movement
    this.particle_lifespan += random(0.2, 2);
    if (this.to_destroy === false && 150 < this.particle_lifespan) {
      this.to_destroy = true;
    }
    // set more particles with a set velocity
    this.particle_velocity = [
      this.particle_velocity[0] * random(0.99, 1.001),
      this.particle_velocity[1] * random(0.99, 1.001),
      this.particle_velocity[2] * random(0.99, 1.001),
    ];
    this.direction_x += this.particle_velocity[0];
    this.direction_y += this.particle_velocity[1];
    this.direction_z += this.particle_velocity[2];
    if (this.color < 240) {
      fill(255, this.color, 0);
    } else {
      fill(this.color);
    }
    translate(this.direction_x, this.direction_y, this.direction_z);
    sphere(10, 8, 4);
    translate(-this.direction_x, -this.direction_y, -this.direction_z);
  }
}


// add more particles
function mouseReleased() {
  for (var i = 0; i < 500; i++) {
    particles.push(new particle());
  }
}
