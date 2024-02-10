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
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  // call a method on the instance
  myInstance.myMethod();

  // Put drawings here
  // imitate: https://openprocessing.org/sketch/1162440
  orbitControl(); // allows the use of the mouse to orbit in 3D
  scale(0.3); // scale the drawing
  background(50); // set the background to black
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

// keyPressed() function is called once after every time a keyboard key is pressed
function keyPressed() {
  save("pix.jpg");
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
