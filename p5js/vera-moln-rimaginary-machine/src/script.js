// https://hyperallergic.com/wp-content/uploads/2018/04/MOLNAR-1747.JPG-1080x862.jpg

const MOLNAR = ['I 4', 'I 1', 'II 1', 'II 2', 'III 5', 'II 2', 'I 3', 'I 6', 'IV 4', 'III 4', 'IV 2', 'II 5', 'I 2', 'IV 5', 'I 6', 'I 3', 'I 2', 'I 5', 'I 6', 'IV 5', 'IV 6', 'III 2', 'III 6', 'III 4', 'III 6', 'III 4', 'II 1', 'II 5', 'I 6', 'IV 2', 'IV 4', 'III 6', 'III 5', 'III 1', 'I 6', 'II 3', 'IV 4', 'III 5', 'I 5', 'III 1', 'II 5', 'IV 5', 'IV 3', 'I 3', 'IV 4', 'I 1', 'IV 4', 'I 5', 'II 2', 'IV 5', 'III 2', 'IV 2', 'IV 6', 'I 6', 'IV 5', 'III 4', 'II 1', 'IV 6', 'II 6', 'I 6', 'I 4', 'III 1', 'IV 5', 'IV 1', 'I 6', 'IV 3', 'III 5', 'II 1', 'III 2', 'II 1', 'III 3', 'IV 4', 'I 5', 'II 5', 'IV 4', 'I 6', 'IV 5', 'I 1', 'IV 6', 'III 4', 'IV 5', 'I 2', 'III 6', 'I 3', 'I 4', 'IV 3', 'IV 1', 'I 5', 'IV 1', 'I 5', 'III 4', 'I 6', 'II 6', 'IV 6', 'I 1', 'II 3', 'III 2', 'II 5', 'IV 3', 'III 5', 'I 4', 'II 5', 'IV 4', 'IV 5', 'III 3', 'IV 5', 'II 2', 'III 5', 'I 1', 'III 3', 'I 5', 'III 4', 'I 2', 'I 6', 'III 1', 'IV 2', 'I 6', 'II 3', 'IV 5', 'III 3', 'IV 5', 'II 5', 'II 6', 'III 1', 'I 5', 'I 4', 'IV 6', 'IV 3', 'III 4', 'II 5', 'III 3', 'III 2', 'IV 1', 'III 4', 'III 3', 'III 2', 'I 1', 'IV 2', 'I 6', 'IV 2', 'IV 4', 'II 4', 'II 5', 'I 2']

const W = 24; // grid with in squares
const T = parseInt(W/2);
let sqSize = 1;
let halfSq = sqSize/2;
let matrix = [];
for (let i = 0; i < W; i++) {
  matrix[i] = [];
  for (let j = 0; j < W; j++) {
    matrix[i][j] = 0;
  }
}

function getGroup(name) {
  const romanMap = { 'I': 1, 'II': 2, 'III': 3, 'IV': 4 }
  // Pattern for second line
  const secondLines = [[2,1,1,1], [3,3,2,2], [4,4,4,3]]
  // Possible lines
  let lines = [1, 2, 3, 4] 
  // Split roman and arabic parts of name
  let info = name.split(' ');
  let roman = info[0]
  let arabic = parseInt(info[1])
  // First line is defined by the roman number
  let group = []
  group[0] = romanMap[roman]
  // Second line depends on both roman and arabic
  let i = Math.floor((arabic-1)/2)
  group[1] = secondLines[i][romanMap[roman]-1]
  // // Removing the lines already used
  let index = lines.indexOf(group[0])
  lines.splice(index, 1)
  index = lines.indexOf(group[1])
  lines.splice(index, 1)
  console.log(group, lines, index)
  // The third line changes if the arabic number is odd/even
  if ((arabic%2) == 0) {
    group[2] = lines[0]
    group[3] = lines[1]
  } else {
    group[2] = lines[1]
    group[3] = lines[0]
  }
  return group
}

// Populate matrix
MOLNAR.forEach(function(name, i) {
  let group = getGroup(name);
  let col = i % T;
  let row = Math.floor( i / T );
  let x = col * 2;
  let y = row * 2;
  
  matrix[x][y] = group[0]
  matrix[x+1][y] = group[1]
  matrix[x][y+1] = group[2]
  matrix[x+1][y+1] = group[3]
})


function setup() {
  createCanvas(600, 600);
  smooth();
  sqSize = width / W;
  halfSq = sqSize/2;
}

function draw() {
  drawGraphPaper();
  for (let x = 0; x < W; x++) {
    for (let y = 0; y < W; y++) {
      if (!matrix[x]) continue;
      push();
      translate(
        x*sqSize + halfSq, 
        y*sqSize + halfSq
      );
      strokeWeight(2.5);
      drawLine(matrix[x][y]);
      pop();
    }
  }
  noLoop();
}

function drawLine(n) {
  stroke('#5e56ab');
  switch(n) {
    case 1:
      line(
        0, -halfSq,
        0, halfSq
      );
      break;
    case 4:
      line(
        halfSq, -halfSq,
        -halfSq, halfSq
      );
      break;
    case 2:
      line(
        halfSq, 0,
        -halfSq, 0
      );
      break;
    case 3:
      line(
        -halfSq, -halfSq,
        halfSq, halfSq
      );
      break;
    default:
      
  }
}

function drawGraphPaper() {
  background('#e1d9c6');
  stroke('#d6cdbc');
  for (let i = 0; i < width; i+= sqSize) {
    line(i, 0, i, height);
  }
  for (let i = 0; i < height; i+= sqSize) {
    line(0, i, height, i);
  }
}
