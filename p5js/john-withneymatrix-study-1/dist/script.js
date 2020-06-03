function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  rectMode(CENTER);
  ellipseMode(CENTER);
  noStroke();
  noFill();
  stroke(255);
  // fill(255);
}

function draw() {
  t = frameCount/4
  background(0);
  translate(width/2, height/2);
  let b = 360*map(sin(t), -1, 1, 0, 1); // Body distance
  let g = 20*map(sin(t), -1, 1, 0, 1); // Ghost distance
  for(let a = 0; a < 4; a++) { // bodies
    for(let i = 0; i < 6; i++) { // ghosts
      let x = cos( -3*(i*g + a*360/4 + t*3) ) * width/4;
      let y = sin( -2*(i*g + a*360/4 + t*2) ) * height/4;
      
      let _t = t%(360*6)/360
      let s = 20+(10*sin(i*(360/12)+t))
      let _s = s+s*sin(i*20 + t*4)
     
      if (_t < 1) {
        circle(x, y, s);
      } else if (_t < 2) {
        polygon(x, y, s*0.7, 6)
      } else if (_t < 3) {
        polygon(x, y, s, 4)
      } else if (_t < 4) {
        circle(x, y, _s)
      } else if (_t < 5) {
        polygon(x, y, _s*0.7, 6)
      } else {
        polygon(x, y, _s, 4)
      }
      
    }
  }
}


function polygon(x, y, radius, npoints) {
  let angle = 360 / npoints;
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}