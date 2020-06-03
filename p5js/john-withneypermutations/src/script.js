function setup() {
  createCanvas(600, 600);
  background(0);
  angleMode(DEGREES);
  frameRate(20);
}

let t = 0;
function draw() {
  t += 0.001;
  translate(width/2, height/2);
  background(0);
  fill(255);
  stroke(255);
  
  for (let i = 0; i < 1040; i++) {
    push();
    let v = p5.Vector.fromAngle(i) 
    v.mult( cos(i*t) * width/3 );
    ellipse(v.x, v.y, 5, 5)
    pop();
  }
  // Phase clock
  let h = p5.Vector.fromAngle(t);
  h.setMag( 15 + width/3 );
  ellipse(h.x, h.y, 5, 5)
  
  if (t == 3/2) {
    wait = 100;
  }
}
