// Fill a binary number with zeros until reach size
function bin(n, size) {
	let b = (n>>>0).toString(2)
	for (let i = b.length; i < size; i++) {
		b = `0${b}`
	}
	return b
}

// This is an object that poorly output pseudorandom numbers that are
// generating by applying a series of bitwise XOR operations on the
// seed value. This is a reversible process so it's used mostly for
// cryptography, for instance the enigma machine.
// What is the difference between random and what you can't understand?
function Inspiration() {
  this.keys = [7084988, 1837988, 4423282, 8337972, 15521021, 11913996, 1654571, 7162002, 13481653, 989385, 9126442, 8998970, 15518285, 4995124, 353539, 1836608, 11968258, 13030286, 15230666, 8551056, 4564218, 1130925, 1705691, 6048634];
  this.cycle = 0;
  this.seed = 0;
  this.random = function() {
    this.seed = this.seed ^ this.keys[this.cycle%this.keys.length];
    this.cycle++;
    if (this.cycle > this.keys.length) {
      this.keys = this.shuffle(this.keys)
    }
    return this.seed;
  }
  // Fisher–Yates shuffle
  this.shuffle = function(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
}

let vera
function setup() {
  vera = new Inspiration();
  smooth();
  createCanvas(windowHeight, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background('#fdfdff');
  fill('#1f191e');
  stroke('#1f191e');
  for(let i = 0; i < 24; i++) {
    let number = vera.random();
    let digits = bin(number, 24);
    for(let j = 0; j < 24; j++) {
      push();
      let x = map(j, 0, 24, height*0.1, height*0.9);
      let y = map(i, 0, 24, height*0.1, height*0.9);
      translate(x, y);
      rotate(digits[j]=='0'?45:90);
      rect(0, 0, height/31, height/31);
      pop();
    }
  }
  noLoop()
}

function mouseClicked() {
  redraw();
}
