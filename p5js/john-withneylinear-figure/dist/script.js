function KeyFrame({value, handles=[]}) {
	this.value = value
	this.handles = []
	this.handles[0] = handles[0] || createVector(0, 0) // future
	this.handles[1] = handles[1] || createVector(0, 0) // past
}

function Timeline(size) {
	this.frames = []
	this.size = size
	for (let i = 0; i < this.size; i++) {
		frames[i] = null
	}
	this.addKeyFrame = function(frame, keyFrame) {
		this.frames[frame] = keyFrame
	}
	this.getPreviousKeyFrame = function(frame) {
		let previous = null
		let i
		for (i = frame; i >= 0; i--) {
			let frame = this.frames[i]
			if (frame) {
				previous = frame
				break
			}
		}
		return { index: i, frame: previous }
	}
	this.getNextKeyFrame = function(frame) {
		let next = null
		let i
		for (i = frame+1; i < this.frames.length; i++) {
			let frame = this.frames[i]
			if (frame) {
				next = frame
				break
			}
		}
		return { index: i, frame: next }
	}
	this.getValue = function(frame) {
		let previous = this.getPreviousKeyFrame(frame)
		let next = this.getNextKeyFrame(frame)

		let previousFrame = previous.frame
		let nextFrame = next.frame

		if (!previousFrame) return null
		if (!nextFrame) return previousFrame.value

		let t = map(
			frame,
			previous.index, next.index,
			0, 1
		)

		return bezierPoint(
			previousFrame.value,

			previousFrame.value +
			previousFrame.handles[0].y,

			nextFrame.value +
			nextFrame.handles[1].y,

			nextFrame.value,

			t
		)
	}
}

// Array of points
let groupA = [];
let groupB = [];
// Vectors
let posA, sizeA;
let posB, sizeB;
// Numbers
let maxScreen, maxSize; // Max screen size and max ellipse size
let angleA, phaseA;
let angleB, phaseB;

// Timelines
let f = 10
let animationLength = 48*f+24*f;
let tposA = new Timeline(animationLength);
let tangleA = new Timeline(animationLength);
let tsizeAx = new Timeline(animationLength);
let tsizeAy = new Timeline(animationLength);
let tposB = new Timeline(animationLength);
let tangleB = new Timeline(animationLength);
let tsizeBx = new Timeline(animationLength);
let tsizeBy = new Timeline(animationLength);

function setup() {
  createCanvas(800, 800);
  background(55);
  stroke(200);
  angleMode(DEGREES);
  // Initialize group a
  for (let i = 0; i < 31; i++) {
    let v = p5.Vector.fromAngle(radians(-180/30*i))
    groupA.push(v);
    groupB.push(v.copy());
  }
  posA = createVector(0, 0);
  sizeA = createVector(1, 1);
  angleA = 0;
  phaseA = 0;
  posB = createVector(0, 0);
  sizeB = createVector(1, 1);
  angleB = 0;
  phaseB = 0;
  maxScreen = width/3;
  maxSize = width/4;

  // CREATE VALUE TIMELINES
	let posAValues = [0,-0.2,0.2,-0.5,0.8,-0.8,0.8,-0.5,0.2,-0.2,0];
	let angleAValues = [0*180,1*180,2*180,3*180,4*180,5*180,6*180,7*180,8*180,9*180,10*180];
	let sizeAxValues = [400/2000,800/2000,950/2000,400/2000,80/2000,700/2000,1800/2000,670/2000,100/2000,700/2000,400/2000];
	let sizeAyValues = [400/2000,1000/2000,1600/2000,1000/2000,400/2000,1100/2000,2000/2000,1080/2000,500/2000,1160/2000,400/2000];
	let posBValues = [0,-0.5,0.9,-0.6,0.2,-0.5,0.9,-0.3,0.1,-0.1,0];
	let angleBValues = [0*720,1*720,2*720,3*720,4*720,5*720,6*720,7*720,8*720,9*720,10*720];
	let sizeBxValues = [1600/2000,600/2000,100/2000,620/2000,1600/2000,700/2000,100/2000,450/2000,1200/2000,900/2000,1600/2000];
	let sizeByValues = [750/2000,1000/2000,440/2000,1080/2000,1560/2000,560/2000,500/2000,1120/2000,1600/2000,1120/2000,750/2000];

	addFrames(tposA, posAValues);
	addFrames(tangleA, angleAValues);
	addFrames(tsizeAx, sizeAxValues);
	addFrames(tsizeAy, sizeAyValues);
	addFrames(tposB, posBValues);
	addFrames(tangleB, angleBValues);
	addFrames(tsizeBx, sizeBxValues);
	addFrames(tsizeBy, sizeByValues);
	frameRate(25);
}

function addFrames(timeline, values) {
  values.forEach(function(v, i) {
    timeline.addKeyFrame((48*i)+(20*i), new KeyFrame({ value: v }))
    timeline.addKeyFrame((48*i)+(20*(i+1)), new KeyFrame({ value: v }))
  })
}

function draw() {
  update();
  render();
}

function update() {
  let t = frameCount;
  let frame = floor(t) % animationLength;
  posA.x = tposA.getValue(frame);
  sizeA.x = tsizeAx.getValue(frame);
  sizeA.y = tsizeAy.getValue(frame);
  angleA = tangleA.getValue(frame);

  posB.x = tposB.getValue(frame);
  sizeB.x = tsizeBx.getValue(frame);
  sizeB.y = tsizeBy.getValue(frame);

  for(let i = 0; i < groupB.length; i++) {
    groupB[i] = p5.Vector.fromAngle(
      radians( tangleB.getValue(frame) + (-i*180/30) )
    );
  }
}

function render() {
  background('#333');
  push();
    translate(width/2, height/2);
    fill(255);
    stroke(255);
    strokeWeight(2);
    drawFingernailEllipses();
    // drawOriginToGroups();
    // drawFingers();
    drawLinearFigures();
  pop();
}

function drawOriginToGroups() {
  line(
    map(posA.x, -1, 1, -maxScreen, maxScreen),
    map(posA.y, -1, 1, -maxScreen, maxScreen),
    0, 0
  )
  line(
    map(posB.x, -1, 1, -maxScreen, maxScreen),
    map(posB.y, -1, 1, -maxScreen, maxScreen),
    0, 0
  )
}
function drawConnectGroups() {
  line(
    map(posA.x, -1, 1, -maxScreen, maxScreen),
    map(posA.y, -1, 1, -maxScreen, maxScreen),
    map(posB.x, -1, 1, -maxScreen, maxScreen),
    map(posB.y, -1, 1, -maxScreen, maxScreen)
  )
}
function drawFingernailEllipses() {
  // Draw fingernail ellipses
  groupA.forEach(function(v) {
    push()
    // move to position
    translate(
      map(posA.x, -1, 1, -maxScreen, maxScreen),
      map(posA.y, -1, 1, -maxScreen, maxScreen)
    );
    // rotate
    rotate(-angleA);
    // Draw ellipse
    ellipse(
      map(v.x, -1, 1, -maxSize*sizeA.x, maxSize*sizeA.x),
      map(v.y, -1, 1, -maxSize*sizeA.y, maxSize*sizeA.y),
      1, 1
    );
    pop();
  })
  // Draw fingernail ellipses
  groupB.forEach(function(v) {
    push()
    // move to position
    translate(
      map(posB.x, -1, 1, -maxScreen, maxScreen),
      map(posB.y, -1, 1, -maxScreen, maxScreen)
    );
    // rotate
    rotate(-angleB);
    // Draw ellipse
    ellipse(
      map(v.x, -1, 1, -maxSize*sizeB.x, maxSize*sizeB.x),
      map(v.y, -1, 1, -maxSize*sizeB.y, maxSize*sizeB.y),
      1, 1
    );
    pop();
  })
}
function drawFingers() {
  push();
  translate(
    map(posA.x, -1, 1, -maxScreen, maxScreen),
    map(posA.y, -1, 1, -maxScreen, maxScreen)
  );
  rotate(-angleA);
  for(let i = 0; i < groupA.length; i++) {
    let va = groupA[i].copy();
    line(
      0, 0,
      map(va.x, -1, 1, -maxSize*sizeA.x, maxSize*sizeA.x),
      map(va.y, -1, 1, -maxSize*sizeA.y, maxSize*sizeA.y)
    );
  }
  pop();
  push();
   translate(
    map(posB.x, -1, 1, -maxScreen, maxScreen),
    map(posB.y, -1, 1, -maxScreen, maxScreen)
  );
  rotate(-angleB);
  for(let i = 0; i < groupA.length; i++) {
    let vb = groupB[i].copy();
    line(
      0, 0,
      map(vb.x, -1, 1, -maxSize*sizeB.x, maxSize*sizeB.x),
      map(vb.y, -1, 1, -maxSize*sizeB.y, maxSize*sizeB.y)
    );
  }
  pop();
}

function drawLinearFigures() {
  push();
  let pa = createVector(
    map(posA.x, -1, 1, -maxScreen, maxScreen),
    map(posA.y, -1, 1, -maxScreen, maxScreen)
  )
  let pb = createVector(
    map(posB.x, -1, 1, -maxScreen, maxScreen),
    map(posB.y, -1, 1, -maxScreen, maxScreen)
  )
  for (let i = 0; i < groupA.length; i++) {
    let va = createVector(
      sizeA.x * maxSize * cos(degrees(-groupA[i].heading())),
      -sizeA.y * maxSize * sin(degrees(-groupA[i].heading())),
    );
    let vb = createVector(
      sizeB.x * maxSize * cos(degrees(-groupB[i].heading())),
      -sizeB.y * maxSize * sin(degrees(-groupB[i].heading())),
    );
    va.rotate(-angleA)
    vb.rotate(-angleB)
    line(pb.x+vb.x, pb.y+vb.y, pa.x+va.x, pa.y+va.y);
  }
  pop();
}
