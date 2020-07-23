// https://www.youtube.com/watch?v=5yz5QE0_hTU&feature=emb_title

function setup() {
  createCanvas(600, 600)
  background(0)
  angleMode(DEGREES)
}

function draw() {
  background('#d93025')
  // push()
  // guidelines()
  // pop()
  push()
    fantasiaExata()
  pop()
}

function fantasiaExata() {
  noFill()
  stroke('#e1d7cd')
  strokeWeight(width/100)
  arc(
    width/4, height/2,
    width/4, width/4,
    0, 180
  )
  line(
    width/4, height/2,
    width/4+width/8, height/2
  )
  arc(
    width/2, height/2,
    width/2, width/2,
    180, -90
  )
  arc(
    width*0.75, height/2,
    width*0.70, height*0.70,
    180, -3*(360/8)
  )
  line(
    width*0.5-width*0.1, height/2,
    width*0.75, height/2,
  )
  arc(
    width/2, height/2,
    width*0.5, height*0.5,
    0, 150
  )
}

function guidelines() {
  verticalLines()
  horizontalLines()
  diagonalLines()
}

function verticalLines() {
  // vertical guide lines
  for(let x = 0; x < 4; x++) {
    stroke('#cccccc')
    line(
      x*(width/4), 0,
      x*(width/4), height
    )
  }
  line(width/8, 0, width/8, height)
}

function horizontalLines() {
  for(let y = 0; y < 4; y++) {
    stroke('#cccccc')
    line(
      0, y*(height/4),
      width, y*(height/4)
    )
  }
}

function diagonalLines() {
  stroke('#cccccc')
  line(
    0, 0,
    width, height
  )
  line(
    width, 0,
    0, height
  )
}