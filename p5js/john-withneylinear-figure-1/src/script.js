let groupSize = 60;
let angle = 270;
let groupA = [];
let groupB = [];
let offsetA, offsetB;
let radiusA, radiusB;
let rotationA = 2;
let rotationB = 4;
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
  radiusA = createVector(1, 1);
  radiusB = createVector(1, 1);
  stroke(200);
  strokeWeight(2);
}

function draw() {
  let t = frameCount;
  background(55);
  push();
  translate(width/2, height/2);
  groupA.forEach(function(vec, i) {
    if (i==0) return
    let sizeB = radiusB.copy()
    sizeB.mult(maxSize)
    let sizeA = radiusA.copy()
    sizeA.mult(maxSize)
    line(
      map(offsetB.x + groupB[i].x, -2, 2, -sizeB.x, sizeB.x), 
      map(offsetB.y + groupB[i].y, -2, 2, -sizeB.y, sizeB.y),
      map(offsetA.x + vec.x, -2, 2, -sizeA.x, sizeA.x), 
      map(offsetA.y + vec.y, -2, 2, -sizeA.y, sizeA.y)
    )
  })
  pop();
  
  offsetA.x = sin(t)
  offsetB.x = sin(t/2)
  offsetA.y = sin(t/2)
  offsetB.y = sin(t)
  radiusA.x = map(sin(t/3), -1, 1, 0.2, 1)
  radiusA.y = map(sin(t/4), -1, 1, 0.2, 1)
  radiusB.x = map(sin(t/5), -1, 1, 0.2, 1)
  radiusB.y = map(sin(t/6), -1, 1, 0.2, 1)
  groupA.forEach(function(v) {
    v.rotate(rotationA);
  })
  groupB.forEach(function(v) {
    v.rotate(rotationB);
  })
}
