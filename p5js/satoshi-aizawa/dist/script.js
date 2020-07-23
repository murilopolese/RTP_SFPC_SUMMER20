function Particle(x, y, path) {
	this.initialPos = createVector(x, y)
	this.pos = createVector(x, y)
	this.path = path || [createVector(0, 0)]
	this.currentStep = 0
	this.disabled = false

	this.draw = function() {
		push()
		noStroke()
		fill(0)
		ellipse(this.pos.x, this.pos.y, 8, 8)
		pop()
	}

	this.update = function() {
		let vector = this.path[floor(this.currentStep)].copy()
		this.pos.add(vector)
		this.currentStep += 1;
		this.currentStep %= this.path.length;
		if (this.currentStep == 0) {
			particles.shift()
		}
	}

}

let particles = []
let long = 5
let short = 4.69
let path = []
let steps = 25
let t = 0

function setup() {
  createCanvas(600, 600)
	ellipseMode(CENTER)
	frameRate(20)
	for (let i = 0; i < 7; i++) {
		for (let j = 0; j < steps; j++) {
			path.push(createVector(-long, -long))
		}
		for (let j = 0; j < steps; j++) {
			path.push(createVector(long, -long))
		}
		for (let j = 0; j < steps; j++) {
			path.push(createVector(short, short))
		}
		for (let j = 0; j < steps; j++) {
			path.push(createVector(-short, short))
		}
	}
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < steps; j++) {
			path.push(createVector(-long, -long))
		}
		for (let j = 0; j < steps; j++) {
			path.push(createVector(-short, short))
		}
		for (let j = 0; j < steps; j++) {
			path.push(createVector(short, short))
		}
		for (let j = 0; j < steps; j++) {
			path.push(createVector(long, -long))
		}
	}
	for (let j = 0; j < steps; j++) {
		path.push(createVector(-long, -long))
	}
	particles.push(new Particle(0, 0, path))
  
  // Run it a little bit so we hide the secret
  for (let i = 0; i < steps*path.length; i++) {
    t += 1
  
    for (let p in particles) {
      const particle = particles[p]
      particle.update()
    }
    if (t % ((steps*2)-1) == 0) {
      particles.push(new Particle(0, 0, path))
    }
  }
  
}

function draw() {
  t += 1
  t %= 49
	background(250)
	translate(width*0.6, height*0.75)

	stroke(200);
	beginShape()
		let p = createVector(0, 0)
		vertex(p.x, p.y)
		for (let l in path) {
			const vector = path[l]
			p.add(vector)
			vertex(p.x, p.y)
		}
	endShape(LINES)

	for (let p in particles) {
		const particle = particles[p]
		particle.draw()
		particle.update()
	}

	if (t % ((steps*2)-1) == 0) {
		particles.push(new Particle(0, 0, path))
	}
}