let groupSize = 12;
let angle = 360;
let groupA = [];
let groupB = [];
let offsetA, offsetB;
let radiusA, radiusB;
let rotationA = 1;
let rotationB = 1.25;
let maxSize = 300;

function setup() {
  createCanvas(windowWidth, windowHeight);
  maxSize = height/2;
  colorMode(HSB);
  smooth();
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
  // Create scaling factors for the ellipses
  radiusA = createVector(1, 1);
  radiusB = createVector(1, 1);
  // Line style
  stroke(200);
  strokeWeight(4);
}

function draw() {
  let t = frameCount;
  // if (t/360 > 4) return
  blendMode(MULTIPLY);
  noStroke();
  fill(200, 100, 100);
  rect(0, 0, width, height);
  blendMode(BLEND);
  push();
  translate(width/2, height/2);
  groupA.forEach(function(vec, i) {
    if (i==0) return;
    let sizeB = radiusB.copy();
    sizeB.mult(maxSize);
    let sizeA = radiusA.copy();
    sizeA.mult(maxSize);
    stroke(100);
    line(
      map(offsetB.x + groupB[i].x, -2, 2, -sizeB.x, sizeB.x), 
      map(offsetB.y + groupB[i].y, -2, 2, -sizeB.y, sizeB.y),
      map(offsetA.x + vec.x, -2, 2, -sizeA.x, sizeA.x), 
      map(offsetA.y + vec.y, -2, 2, -sizeA.y, sizeA.y)
    );
  })
  pop();
  
  offsetA.x = sin(t);
  offsetA.y = sin(180+t*0.5);
  
  offsetB.x = sin(t*1.5);
  offsetB.y = sin(t);
  
  radiusA.x = map(sin(t*1.5), -1, 1, 0.5, 1);
  radiusA.y = map(sin(t), -1, 1, 0.5, 1);
  
  radiusB.x = map(sin(t), -1, 1, 0.5, 1);
  radiusB.y = map(sin(t*1.5), -1, 1, 0.5, 1);
  
  groupA.forEach(function(v) {
    v.rotate(rotationA);
  })
  groupB.forEach(function(v) {
    v.rotate(rotationB);
  })
}
