//https://www.youtube.com/watch?v=2alp5Vxztag

let img, buff, disp
let size = 5

let colors = [
  '#000000', // 0
  '#fec549', // 1
  '#1899c9', // 2
  '#f38f91'  // 3
]

function preload() {
  img = loadImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAABpCAYAAAA5gg06AAADYUlEQVR4Xu2dQU4cMRBFDfvscxMWnICTsIxyEsSSk3ACFrlJ9uyTqCMZmZLLLndPC//xmw2C6XZ76rnqlXuQ+ial9DfxmjoCNxnSn7eHdHv/OvVkV53cB6QtABsoXnNEoEyYT5DmmB6zyAmTQZFJk66JaibhpElppZTIpEnZ4KRJwZTTKisbmTQpMJw0KRhvWmTSpMBw0qRgcJIAmHKKOEkMGE6aFBhOmhQMThIAg5PEIJXTxUmTwsNJk4LBSQJgcJIYJJwkAAwnCUDi+yQBSNy7E4CEkwQg4SQBSDhJABJOEoCEkwQg4SQBSDhJABJOEoCEkwQg4SQBSDhJABJOEoCEkwQg4SQBSDhJABJOEoCEkwQg4SQBSDhJABJOEoCEkwQg4SQBSDhJABJOEoCEkwQg4SQBSDhJABJOEoCEkwQg4SQBSDhJABJOEoCEkwQg4SQBSDhJABJOEoCEkwQg4SQBSDhJABJOEoCEkwQg4SQBSDhJABJOEoCEkwQg4SQBSDhJABJOEoCEkwQg4SQBSK6TBOZ+lVOsPSmbTJoIdc4Y+/P96Tl9+/nj/0zlHqu99/ns5co8ymhkDr3repC+v/xKvx/v9CAdear0kXNLqKPj9I73IMk6qfeBWxly5Nw8bm+MMsPKDGqdB6SCWi1QI2WrXAC1EmbH7/1uwXuw5JzUW8kjmbRnrAjoVga1ujggpZQiAfYg28Db4/L7vWu0mojlIXmuiHZ5Pad4pXAkW4H09vARx201j7qo10Zvg5dA7Pgj51tYSzgpB6yEEwlaNMtse55/b5XA2tjLZlL5wW3w9kCwGePtn0YzyWZhXlAZtNQdh5Ea3wroUUDR0haZr9eql38H0gAxD87e7s7rBskkB4p1V2TDmrM12t1FyuByjUOk3LQ6Mwuq14r3NrKRhgVIlSxqSbvVcXkdWq1BiS6WcsHgJOee3pE7Bp7aRgABqeEiT/y10jPQZ1RvRfXOX7bcjbrkEnuq0QzK11wOku2+oh1bGbDeyvfejzQJ9tyaH7djltgneQ3A3tW+F1zrPG9Tuwwke/vmEuXskqBam9rlIB1tBC4JxjqoVfquutxFnHRG4KNjRhuaq4fklbpoIM88LvJN7dWXuzMDfPbYsnccbPk6O1BfOT7/ZvyV0d9x7X+AiKIuwzLXNAAAAABJRU5ErkJggg==')
}

function setup() {
  createCanvas(img.width*size, img.height*size)
  background(0)
  noStroke()
  // frameRate(30)

  buff = []
  img.loadPixels()
  for(let x = 0; x < img.width; x++) {
    buff[x] = []
    for(let y = 0; y < img.height; y++) {
      buff[x][y] = color(img.get(x, y)).toString('#rrggbb')
    }
  }
  img.updatePixels()
  // Print initial state on screen
  disp = buff.map(b => b.slice())
}
let generation = 0
function draw() { // celular automata
  background(0, 0, 0, 20)
  // if (keyIsPressed) {
    // generation++
    updateBuffer()
  // }
  drawDisplay()
  fill(255)
  // text(generation, 10, 10)
}

function updateBuffer() {
  let [empty, conductor, tail, head] = colors
  for(let x = 1; x < img.width-1; x++) {
    for(let y = 1; y < img.height-1; y++) {
      // get color from display to process
      let c = color(disp[x][y])
      c = c.toString('#rrggbb')
      switch (c) {
        case conductor:
          if(
               count(disp, x, y, head) == 1
            || count(disp, x, y, head) == 2
          ) {
            buff[x][y] = head
          } else {
            buff[x][y] = conductor
          }
          break;
        case colors[2]: // tail
          buff[x][y] = conductor
          break;
        case colors[3]: // head
          buff[x][y] = tail
          break;
        case colors[0]: // empty, do nothing
        default:
          buff[x][y] = empty
      }
    }
  }
  disp = buff.map(b => b.slice())
}

function count(arr, x, y, c) {
  let sum = 0
  if (arr[x-1][y-1] == c) sum += 1
  if (arr[x][y-1] == c) sum += 1
  if (arr[x+1][y-1] == c) sum += 1
  if (arr[x-1][y+1] == c) sum += 1
  if (arr[x][y+1] == c) sum += 1
  if (arr[x+1][y+1] == c) sum += 1
  if (arr[x-1][y] == c) sum += 1
  if (arr[x+1][y] == c) sum += 1
  return sum
}

function drawDisplay() {
  for(let x = 0; x < img.width; x++) {
    for(let y = 0; y < img.height; y++) {
      if (disp[x][y] === colors[1]) {
        fill(30)
      } else {
        fill(disp[x][y])
      }
      rect(x*size, y*size, size, size)
    }
  }
}

function getIndex(image, x, y) {
  return (x + y * image.width) * 4;
}
function getCoord(image, i) {
  return [
    i % image.width,
    parseInt(i / image.width)
  ]
}

function keyPressed() {

}
