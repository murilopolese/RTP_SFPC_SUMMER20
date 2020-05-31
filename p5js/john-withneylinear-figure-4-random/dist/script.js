let groupSize = 30;
let angle = 180;
let dangle = angle/groupSize;
let groupA = [];
let groupB = [];
let offsetA, offsetB;
let radiusA, radiusB;
let rotationA = 0;
let rotationB = 0;
let angleA = 0;
let angleB = 0;
let maxSize = 300;

let a, b, c, d, e, f, g, h,
    i, j, k, l, m, n, o, p,
    q, u;

function setup() {
  a = random(-1, 1);
  b = random(-1, 1);
  c = random(-1, 1);
  d = random(-1, 1);
  e = random(-1, 1);
  f = random(-1, 1);
  g = random(-1, 1);
  h = random(-1, 1);
  i = random(-1, 1);
  j = random(-1, 1);
  k = random(-1, 1);
  l = random(-1, 1);
  m = random(-1, 1);
  n = random(-1, 1);
  o = random(-1, 1);
  p = random(-1, 1);
  q = random(-1, 1);
  u = random(-1, 1);
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
}

function draw() {
  update();
  render();
}

function update() {
  let t = frameCount;
  angleA = q*dangle*frameCount;
  angleB = u*dangle*frameCount;
  
  radiusA.x = sin(a+b*t);
  radiusA.y = sin(c+d*t);
  radiusB.x = sin(e+f*t);
  radiusB.y = sin(g+h*t);
  
  offsetA.x = sin(i+j*t)
  offsetA.y = sin(k+l*t)
  offsetB.x = sin(m+n*t)
  offsetB.y = sin(o+p*t)
}

function render() {
  background(55, 200);
  noFill();
  stroke(255);
  
  push();
  translate(width/2, height/2);
  for (let i = 0; i < groupSize; i++) {
    let va = createVector(
      map(offsetA.x + cos(angleA + i*dangle), -2, 2, -maxSize*radiusA.x, maxSize*radiusA.x), 
      -map(offsetA.y + sin(angleA + i*dangle), -2, 2, -maxSize*radiusA.y, maxSize*radiusA.y)
    )
    let vb = createVector(
      map(offsetB.x + cos(angleB + i*dangle), -2, 2, -maxSize*radiusB.x, maxSize*radiusB.x), 
      -map(offsetB.y + sin(angleB + i*dangle), -2, 2, -maxSize*radiusB.y, maxSize*radiusB.y)
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