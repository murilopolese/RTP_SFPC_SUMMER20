let groupA = [];
let groupB = [];
let angle = 180;
let groupSize = 31;
let dAngle = angle/groupSize;
let maxScreen, maxRadius;
let posA, posB;
let sizeA, sizeB;
let angleA, angleB;
  
function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
  background(0);
  angleMode(DEGREES);
  for (let i = 0; i < groupSize; i++) {
    let v = createVector(1, 0);
    v.rotate(i*dAngle);
    groupA.push(v);
    groupB.push(v.copy())
  }
  maxScreen = width/4;
  posA = createVector(0, 0);
  posB = createVector(0, 0);
  sizeA = createVector(1, 1);
  sizeB = createVector(1, 1);
  maxRadius = width/4;
  angleA = 0;
  angleB = 0;
}

function draw() {
  render();
  update();
  
}

function render() {
  background(10, 200);
  push();
  noStroke();
  translate(width/2, height/2);
  
  // drawEllipses();
  // drawSkeleton();
  stroke(0,0,255);
  strokeWeight(2);
  drawLines();
  
  stroke(255, 0, 0)
  translate(2, 1);
  update(360*sin(frameCount/5));
  drawLines();
  
  pop();
}

function update(phase) {
  phase = phase || 0;
  let t = frameCount/5;
  angleA -= 2/5;
  // angleB = 4;
  
  groupA.forEach((v, i) => {
    // v.set( p5.Vector.fromAngle( radians(phase + angleA + i*dAngle*map(sin(t), -1, 1, 0.4, 1)) ) )
    v.set( p5.Vector.fromAngle( radians(phase + angleA + i*dAngle ) ) )
  });
  
  groupB.forEach((v, i) => {
    // v.set( p5.Vector.fromAngle( radians(phase + t + angleB + i*dAngle*map(cos(t), -1, 1, 0.4, 1)) ) )
    v.set( p5.Vector.fromAngle( radians(phase + t + angleB + i*dAngle ) ) )
  });
  
  posA.x = maxScreen * sin(t/4) * sin(t*2);
  posA.y = maxScreen * sin(t/4) * sin(t*2);
  posB.x = -maxScreen * sin(t/4) * sin(t*3);
  posB.y = -maxScreen * sin(t/4) * sin(180+t*3);
  
  sizeA.x = map(sin(t*4), -1, 1, 0.6, 1);
  sizeA.y = map(sin(t*3), -1, 1, 0.6, 1);
  sizeB.x = map(sin(t*5), -1, 1, 0.6, 1);
  sizeB.y = map(sin(t*4), -1, 1, 0.6, 1);
}

function drawEllipses() {
  push();
  translate(posA.x, posA.y)
  fill(255);
  rotate(angleA);
  ellipse(0, 0, sizeA.x*maxRadius, sizeA.y*maxRadius)
  pop();
  
  push();
  translate(posB.x, posB.y)
  fill(155);
  rotate(angleB);
  ellipse(0, 0, sizeB.x*maxRadius, sizeB.y*maxRadius)
  pop();
}

function drawSkeleton() {
  stroke(255,0,0);
  line(0, 0, posA.x, posA.y);
  line(0, 0, posB.x, posB.y);
  
  groupA.forEach(function(p) {
    line(
      posA.x, posA.y,
      posA.x + p.x*sizeA.x*maxRadius/2,
      posA.y + p.y*sizeA.y*maxRadius/2
    )
  })
  
  groupB.forEach(function(p) {
    line(
      posB.x, posB.y,
      posB.x + p.x*sizeB.x*maxRadius/2,
      posB.y + p.y*sizeB.y*maxRadius/2
    )
  })
}

function drawLines() {
  groupA.forEach(function(p, i) {
    line(
      posB.x + groupB[i].x*sizeB.x*maxRadius/2,
      posB.y + groupB[i].y*sizeB.y*maxRadius/2,
      posA.x + p.x*sizeA.x*maxRadius/2,
      posA.y + p.y*sizeA.y*maxRadius/2
    )
  })
}