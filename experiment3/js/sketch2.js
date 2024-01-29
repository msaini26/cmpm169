// const VALUE1 = 1;
// const VALUE2 = 2;

let palette;
let graphics;
let sketch;

let drawBackground = false;

// Globals
let myInstance;
let canvasContainer;

class MyBackgroundClass {
    constructor(param1, param2) {
      this.property1 = param1;
      this.property2 = param2;
    }
  
    myMethod() {
      // code to run when method is called
    }
  }

function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(600, 600);
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function () {
        console.log("Resizing...");
        resizeCanvas(600, 600);
    });
    // create an instance of the class
    myInstance = new MyBackgroundClass(this.property1, this.property2);

    var centerHorz = windowWidth / 2;
    var centerVert = windowHeight / 2;


	// createCanvas(800, 800);

	// colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	graphics.noStroke();

	for (let i = 0; i < (width * height * 10) / 100; i++) {
		graphics.fill(0, 0, 100, 5);
		let x = random(width);
		let y = random(height);
		let w = random(3);
		let h = random(3);
		graphics.ellipse(x, y, w, h);
	}
	noLoop();

    sketch = new MyClass(1, 2);
}

function display() {
	let rs = random(10000);
	clear();
	background(240);
	palette = shuffle(chromotome.get().colors);

	let angle = int(random(12)) * 360 / 12;
	let iMax = palette.length;
	for (let i = 0; i < iMax; i++) {
		let g = createGraphics(width, height);
		g.angleMode(DEGREES);
		let c1 = palette[i % palette.length];
		let c2 = palette[(i + 1) % palette.length];
		let c3 = palette[(i + 2) % palette.length];
		let r = sqrt(sq(width) + sq(height)) / 2;
		let x1 = width / 2 + cos(angle) * r;
		let y1 = height / 2 + sin(angle) * r;
		let x2 = width / 2 + cos(angle + 180) * r;
		let y2 = height / 2 + sin(angle + 180) * r;
		let arr = shuffle([c1, c2, c3]);
		let nStep = 1 / int(random(3, 10));

		let gradient = g.drawingContext.createLinearGradient(x1, y1, x2, y2);
		let m = 0;
		for (let n = 0; n < 1; n += nStep) {
			gradient.addColorStop(n, arr[m++ % arr.length]);
		}
		g.drawingContext.fillStyle = gradient;
		g.noStroke();

		let offset = 0;
		let x = offset;
		let y = offset;
		let w = width - offset * 2;
		let h = width - offset * 2;

		g.rectMode(CORNER);
		g.rect(x, y, w, h);

		if (i != 0) {
			randomSeed(rs);
			let cells = int(random(2, 10));
			let off = width / 15;
			let margin = 0;
			let d = int((width - off * 2 - margin * (cells - 1)) / cells);
			let dw = d * sqrt(2) + d / 5 / 2;
			let dh = d / 5;

			g.push();
			g.erase(255, 255);
			g.noStroke();
			for (let k = 0; k < cells; k++) {
				for (let j = 0; j < cells; j++) {
					let shape_num = int(random(2));
					let dx = int(off + j * (d + margin) + d / 2);
					let dy = int(off + k * (d + margin) + d / 2);
					g.push();
					g.translate(dx, dy);

					g.rotate((int(random(4)) * 360) / 4);
					switch (shape_num) {
						case 0:
							g.translate(-d / 2, -d / 2);
							g.scale(i / (iMax - 1));
							g.arc(0, 0, d * 2, d * 2, 0, 90);
							break;
						case 1:
							g.translate(-d / 2, -d / 2);
							g.scale(i / (iMax - 1));
							g.triangle(0, 0, d, 0, d, d);
							break;
						case 2:
							g.rectMode(CORNER);
							g.translate(-d / 2, -d / 2);
							g.scale(i / (iMax - 1));
							g.rect(0, 0, d, d);
							break;
						case 3:
							g.rectMode(CENTER);
							g.scale(i / (iMax - 1));
							g.rect(0, 0, d, d);
							break;
						case 4:
							g.rectMode(CORNER);
							g.translate(-d / 2, -d / 2);
							g.scale(i / (iMax - 1), 1);
							g.rect(0, 0, d, d);
							break;
					}

					g.pop();
				}
			}
			g.noErase();
			g.pop();
		}
		blendMode(BURN);
		drawingContext.shadowColor = color(0, 0, 0, 33);
		drawingContext.shadowBlur = width / 10;
		image(g, 0, 0);

	}
	blendMode(ADD);
	image(graphics, 0, 0);
	blendMode(BLEND);
}

function draw() {
    if(!drawBackground){
        display();
        drawBackground = true;
    }
    sketch.display();
}