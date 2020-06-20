let values = [20, 30, 20.5, 10, 21]
let current = 0

function setup() {
  createCanvas(600, 600)
  background('#ddd')
}

function draw() {
  let t = frameCount
  
  if (t % (2*width) == 0) {
    current = (current+1)%values.length
  }
  
  // Warp threads
  let y = t%(height*2)
  fill(0)
  stroke(0)
  for (let i = 0; i < width/20; i++) {
    rect(i*20, y-values[current]*i, 10, 10)
  }
  
  // Weft thread
  let x = t%(width*2)
  fill(255)
  stroke(255)
  for (let i = 0; i < height/20; i++) {
    rect(x-values[current]*i, i*20, 10, 10)
  }
}