let img, buff, disp
let size = 12

let colors = [
  '#000000', // 0
  '#fec549', // 1
  '#1899c9', // 2
  '#f38f91'  // 3
]

function preload() {
  // Load initial state
  img = loadImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAiCAYAAAAtZZsLAAABMklEQVRYR+2Yyw3CMAxAU+7cGYINWACmQWzABogjk3QCDjAICyCugIJw5Rq7jpukRRAu9OMkLy9Ok7Zyzj3cF/+qAhg5Or9t8H5cRfr5LD5Z1K2LvQ16OFpZClpabyfg7HByl/n21S6Gwebo9ZTnvl0R8Lrbu+lm3UiBnuEecsc0znpOR4EFxJVCATBD7VkBtHgVMCS3cpiT2m0Z5IKoTWzSH2tGrPdFgxIcN8Q5wFSD1p7miu/MQenx4Qvlnr2qQSDnHicUEPcytUl1FtPGaQ7SCkYBhKEOWcoGB6S5oMEODgj55v9v52Wz3ElJPAogzjPYMEjDPTqgtoUqgLEvTcVgMfh+dwlNBdNSp81gvEaHAmhxBVAzpN3/P4PcXpHbcFjel7HF3l8WQiZQipgCGGvxCetAcS7HEAsXAAAAAElFTkSuQmCC')
}

function setup() {
  createCanvas(img.width*size, img.height*size)
  background(0)
  noStroke()
  frameRate(12)

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

function draw() { // celular automata
  background(0, 0, 0, 20)
  // if (keyIsPressed) {
    updateBuffer()
  // }
  drawDisplay()
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
        case tail:
          buff[x][y] = conductor
          break;
        case head:
          buff[x][y] = tail
          break;
        case empty: // empty, do nothing
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
      // let c
      // switch(disp[x][y]) {
      //   case colors[0]:
      //   case colors[1]:
      //     c = color(colors[0])
      //     c.setAlpha(50)
      //     fill(c)
      //     break;
      //   default:
      // }
      fill(disp[x][y])
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
