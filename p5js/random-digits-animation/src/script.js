let seed = 0;
let mode = 0;

function setup() {
  createCanvas(600, 600);
  background(255);
  randomSeed(seed);
}

function draw() {
  if (frameCount % 512 == 0) {
    mode++;
    mode %= 3;
  }
  background(0);
  fill(255);
  let n = 15 * 40;
  let spacing = noise(0, seed/100);
  for(let i = 0; i < n; i++) {
    textAlign(RIGHT);
    text(
      int(random(0, n*6)), 
      (width/20)+((parseInt(i/spacing)*width/20)%width), 
      12+(i%40)*15
    )
  }
  switch(mode) {
    case 0:
      if (frameCount % 128 == 0) {
        randomSeed(seed++);
      }
      break;
    case 1:
      if (frameCount % 5 == 0) {
        seed++
      }
      break;
    case 2:
      if (frameCount % 56 == 0) {
        seed = sin(frameCount*0.5)*width;
      }
      break;
  }
  
}

function mouseClicked() {
  randomSeed(seed++);
  mode++;
  mode %= 3;
}
