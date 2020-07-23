function setup() {
  createCanvas(500, 500)
  rectMode(CENTER)
  angleMode(DEGREES)
  
  background('#e2e3dd')
  stroke(0)
  strokeWeight(width/200)
  fill('#e2e3dd')
  push()
  translate(width/2, height*1.2)
  rotate(90)
  rotate(45)
  for (let i = 1; i < 5; i++) {
    push()
    rotate(15+i*6)
    rect((width/16)*i, -(width/16)*i, width*2, width*2)
    pop()
    push()
    rotate(-i*6-15)
    rect((height/16)*i, (width/16)*i, width*2, width*2)
    pop()
  }
  pop()
  
  loadPixels()
  for (let y = 0; y < height/2; y++) {
    for (let x = 0; x < width; x++) {
      let c = get(x, y)
      set(width-x, height-y, c)
    }
  }
  updatePixels()
  
  line(0, height/2, width, height/2)
}
