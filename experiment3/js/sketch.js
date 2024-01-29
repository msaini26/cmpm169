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
// let myInstance;
// let canvasContainer;

var max_particles = 200;
var variation_one = [];
var variation_two = [];
var variation_three = [];
var noise_scale;

let c1, c2, c3;


class MyClass {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.colors = colors;
    // integrate: randomizing noise level
    noise_scale = random(5, 100); 
    // generate initial particles
    for (var i = 0; i < max_particles; i++) {
      // define particle objects
      variation_one[i] = new Particle(random(0, width), random(0, height));
      variation_two[i] = new Particle(random(0, width), random(0, height));
      variation_three[i] = new Particle(random(0, width), random(0, height));
    }

    c1 = random(this.colors);
    c2 = random(this.colors);
    c3 = random(this.colors);

    loop();
  }

  display() {
    noStroke();
    smooth(); // smooth edges for lines
  
    // traverse particles
    for (var i = 0; i < max_particles; i++) {
      // particle design
      var r = map(i, 0, max_particles, 1, 2); // define size/radius of particle
      var a = map(i, 0, max_particles, 0, 250); // define transparency/alpha of a particle

  
      // varation one particle design
      fill(c1);
      variation_one[i].movement(); // begin drawing variation one's particle design
      variation_one[i].shape_movement(r); // particle size
      variation_one[i].reach_edge(); // keep particles within boundaries
  
      // variation two particle design
      fill(c2);
      variation_two[i].movement();
      variation_two[i].shape_movement(r);
      variation_two[i].reach_edge();
  
      // variation three particle design
      fill(c3);
      variation_three[i].movement();
      variation_three[i].shape_movement(r);
      variation_three[i].reach_edge();
    }
  }

}

/**
 * Goal: define particle with a specified direction, speed, and angle
 * @param {*} posX
 * @param {*} posY
 */
// imitate: https://openprocessing.org/sketch/494102
// learning how to initialize particle with given constraints
function Particle(x, y) {
  // initialize particle
  this.velocity = createVector(0, 0); // initialize with no velocity
  this.direction = createVector(0, 0); // init direction
  this.position = createVector(x, y); // define initial position
  this.speed = 0.4;

  // particle movement
  this.movement = function () {
    var particle_angle =
      noise(this.position.x / noise_scale, this.position.y / noise_scale) *
      TWO_PI *
      noise_scale;

    // position
    this.direction.x = cos(particle_angle); // start x scale with cos movement
    this.direction.y = sin(particle_angle); // start y scale with sin movement

    // velocity
    // velocity carries both magnitude and direction; speed in a given direction
    // need to update velocity based on displacement and speed
    this.velocity = this.direction.copy();
    this.velocity.mult(this.speed);
    this.position.add(this.velocity);
  };

  // edge case: keep particles within boundaries
  this.reach_edge = function () {
    // outside left and right canvas boundaries
    // or outside up and down canvas boundaries
    if (
      this.position.x > width ||
      this.position.x < 0 ||
      this.position.y < 0 ||
      this.position.y > height
    ) {
      // set random particle beginning point
      this.position.x = random(50, width);
      this.position.y = random(50, height);
    }
  };

  // particle movement in ellipse fashion
  this.shape_movement = function (radius) {
    ellipse(this.position.x, this.position.y, radius, radius);
  };
}
