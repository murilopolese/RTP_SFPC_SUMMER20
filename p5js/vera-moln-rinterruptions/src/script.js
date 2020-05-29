// https://en.calameo.com/read/004507328b088d5d3f3f8

const W = 56;
let l
let shades = []
// Initialize all line colors as white
for (let i = 0; i < W; i++) {
  shades[i] = []
  for (let j = 0; j < W; j++) {
    shades[i][j] = 255
  }
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  l = width / W; // line length
  stroke(155);
}

function draw() {
  randomSeed(169);
  background(255);
  for(let i = 0; i < 56; i++) {
    for(let j = 0; j < 56; j++) {
      push();
      translate(
        map(l*i, 0, width, l, width-l), 
        map(l*j, 0, height, l, height-l)
      );
      rotate(
        map(noise(i, j), 0, 1, -90, 90) // noise 2d
        + (45*sin(frameCount+pow(i,j))) // erradic oscilation
        + (25*sin(frameCount+i*j)) // small wavy oscilation
      );
      // Fade color in and out
      if(noise(i*0.1, j*0.1, frameCount/1000) > 0.65) {
        shades[i][j] = lerp(shades[i][j], 255, 0.1)
      } else {
        shades[i][j] = lerp(shades[i][j], 155, 0.1)
      }
      stroke(shades[i][j])
      line(-l*0.7, 0, l*0.7, 0);
      pop();
    }
  }
}