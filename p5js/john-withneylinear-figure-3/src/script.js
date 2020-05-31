let groupSize = 30;
let angle = 180;
let d = angle/groupSize;
let groupA = [];
let groupB = [];
let offsetA, offsetB;
let radiusA, radiusB;
let rotationA = 0;
let rotationB = 0;
let angleA = 0;
let angleB = 0;
let maxSize = 250;

function setup() {
  createCanvas(windowWidth, windowHeight);
  smooth();
  background(0);
  angleMode(DEGREES);
  // Create two groups of vector
  for (let i = 0; i < groupSize+1; i++) {
    let v = createVector(1, 0);
    v.rotate(-i*(angle/groupSize));
    groupA.push(v);
    groupB.push(v.copy());
  }
  // Create two positions for vector group origins
  offsetA = createVector();
  offsetB = createVector();
  radiusA = createVector(0.3, 0.3);
  radiusB = createVector(1, 1);
  rotationA = -0.25;
  rotationB = 1;
  stroke(200);
  strokeWeight(2);
  frameRate(12);
}

function draw() {
  update();
  render();
}
let i = 0;
function update() {
  let t = frameCount;
  angleA = d*frameCount;
  angleB = -2*d*frameCount;
  
  radiusA.x = sin(2*t);
  radiusA.y = sin(5*t);
  radiusB.x = sin(90+2*t);
  radiusB.y = sin(90+5*t);
  
  offsetA.x = sin(4*t)
  offsetA.y = sin(10*t)
  offsetB.x = sin(180+4*t)
  offsetB.y = sin(180+10*t)
}

function render() {
  background(55, 200);
  noFill();
  stroke(255);
  
  push();
  translate(width/2, height/2);
  for (let i = 0; i < groupSize; i++) {
    let va = createVector(
      map(offsetA.x + cos(angleA + i*d), -2, 2, -maxSize*radiusA.x, maxSize*radiusA.x), 
      -map(offsetA.y + sin(angleA + i*d), -2, 2, -maxSize*radiusA.y, maxSize*radiusA.y)
    )
    let vb = createVector(
      map(offsetB.x + cos(angleB + i*d), -2, 2, -maxSize*radiusB.x, maxSize*radiusB.x), 
      -map(offsetB.y + sin(angleB + i*d), -2, 2, -maxSize*radiusB.y, maxSize*radiusB.y)
    )
    line(va.x, va.y, vb.x, vb.y)
    ellipse(
      va.x, va.y, 1, 1
    )
    ellipse(
      vb.x, vb.y, 1, 1
    )
  }
  pop();
}

function mouseClicked() {
  i++;
}

function keyPressed() {
  i++;
}