let grid = []
let gridSize = 50
let size = 0

// Populating the grid with empty values
for (let i = 0; i < gridSize; i++) {
  grid[i] = []
  for (let j = 0; j < gridSize; j++) {
    grid[i][j] = null
  }
}

// This class represents a robot that poops a thread
// It will wait the thread ahead to be placed to go over
function Robot({pos, direction, over, color}) {
  this.pos = pos // position on grid
  this.direction = direction
  this.over = over
  this.color = color
  this.size = size
  
  // Place robot on the grid immediately
  grid[pos.x][pos.y] = this.color 
  
  this.forward = function() {
    // Stop if it's out of bounds
    if (this.pos.x >= gridSize || this.pos.y >= gridSize) {
      return
    }
    // Otherwise move forward twice, one for the next and one for
    // the row/column jumped when placing the threads
    for(let i = 0; i < 2; i++) {
      this.pos.add(this.direction)
      try {
        grid[this.pos.x][this.pos.y] = this.color  
      } catch(e) { /* out of bounds */}
    }
  }
  // Check if there is any thread in the grid position ahead
  this.front = function() {
    let newPos = p5.Vector.add(this.pos, this.direction)
    try {
      return grid[newPos.x][newPos.y] 
    } catch(e) { 
      /* out of bounds */
    }
  }
  this.walk = function() {
    if (this.over) {
      // wait until forward tile is filled to go over it
      if (this.front()) {
        this.forward()
        this.over = !this.over
      }
    } else {
      // under: just move forward
      this.forward()
      this.over = !this.over
    }
  }
}

// 2 arrays to store the robots
let warpThreads = []
let weftThreads = []

function setup() {
  createCanvas(600, 600)
  background(200)
  frameRate(10)
  rectMode(CENTER)
  
  // Calculate thread size
  size = (width-100)/gridSize
  
  // Add robots to array of threads
  // Always skip a line or row before adding another one
  // Alternate between over and under
  for (let i = 0; i < gridSize/2; i++) {
    for (let j = 0; j < gridSize/2; j++) {
      warpThreads.push(
        new Robot({
          pos: createVector(1+(i*2), 0),
          direction: createVector(0, 1),
          over: i%2,
          color: 1
        })
      )
      weftThreads.push(
        new Robot({
          pos: createVector(0, 1+(i*2)),
          direction: createVector(1, 0),
          over: !(i%2),
          color: 255
        })
      )
    }
  }
  
}

function draw() {
  // draw grid
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let x = map(i, 0, gridSize, 50, width-50)
      let y = map(j, 0, gridSize, 50, height-50)
      if (grid[i][j]) {
        push()
        noStroke()
        fill(grid[i][j])
        rect(x, y, size)
        pop()
      }
    }
  }
  
  // Walk threads
  warpThreads.forEach(t => t.walk())
  weftThreads.forEach(t => t.walk())
}