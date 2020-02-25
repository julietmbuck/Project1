var rSlider, gSlider, bSlider, opacitySlider; //slider variables



//shape arrays 
var balls = [];
var squares = [];

// state machine
var state;
var stateInitial;
var stateBalls = 1;
var stateSquares = 2;

var counter;

//timing for color change
var startMillis;

function setup() {
  createCanvas(900, 800);
  state = stateInitial;
  generateSliders();
  textFont('Varela Round');


  startMillis = millis();

  //create number of objects
  for (var i = 0; i < 30; i++) {
    balls[i] = new Ball();
    squares[i] = new Square();
  }


}

function draw() {
  background(255);

  stateMachine();



}

function stateMachine() {

  if (state == stateInitial) {
    beginPage();
  } else if (state == stateBalls) {
    for (var i = 0; i < balls.length; i++) {
      balls[i].create();
      balls[i].move();
    }
    drawSliders();

  } else if (state == stateSquares) {
    for (var i = 0; i < squares.length; i++) {
      squares[i].create();
      squares[i].move();
    }
    drawSliders();
  }

}

function beginPage() {

  textSize(45);
  text('Press Enter to Begin', width / 2 - 200, height / 2)

}

function generateSliders() {


  // create sliders
  rSlider = createSlider(0, 255, 100);
  rSlider.position(20, height - 180);
  gSlider = createSlider(0, 255, 0);
  gSlider.position(20, height - 135);
  bSlider = createSlider(0, 255, 255);
  bSlider.position(20, height - 85);
  opacitySlider = createSlider(0, 255);
  opacitySlider.position(20, height - 35);


}

function drawSliders() {

  //background 
  fill(255);
  ellipse(120, 755, 400, 400);

  //label
  fill(224, 45, 45);
  noStroke();
  textSize(25);
  text('red', rSlider.x * 2 + rSlider.width, height - 166);
  fill(123, 214, 13);
  text('green', gSlider.x * 2 + gSlider.width, height - 118);
  fill(18, 148, 255);
  text('blue', bSlider.x * 2 + bSlider.width, height - 68);
  fill(0);
  text('opacity', opacitySlider.x * 2 + opacitySlider.width, height - 20);
}

function keyPressed() {

  if (keyCode === ENTER) {
    state = stateBalls;
  }
  
  if (keyCode === '1') {
    state = stateBalls; 
  }
  
  if (keyCode === '2') {
    state = stateSquares; 
  }

}


function Ball() {
  this.rd = random(20, 30);
  this.x = random(this.rd * 2, width - this.rd * 2);
  this.y = random(this.rd * 2, height - this.rd * 2);
  this.spx = random(-4, 7);
  this.spy = random(-4, 7);


  this.move = function() {
    this.x += this.spx;
    this.y += this.spy;


    if (this.x > width - this.rd * 2 || this.x < this.rd * 2) {
      this.spx *= -1;
    }

    if (this.y > height - this.rd * 2 || this.y < this.rd * 2) {
      this.spy *= -1;
    }
  }


  this.create = function() {
    const r = rSlider.value();
    const g = gSlider.value();
    const b = bSlider.value();
    const o = opacitySlider.value();

    fill(r, g, b, o);
    ellipse(this.x, this.y, this.rd * 5, this.rd * 5);
  }
}

function Square() {
  this.rd = random(20, 30);
  this.x = random(this.rd * 2, width - this.rd * 2);
  this.y = random(this.rd * 2, height - this.rd * 2);
  this.spx = random(0, 7);
  this.spy = random(0, 7);


  this.move = function() {
    this.x += this.spx;
    this.y += this.spy;


    if (this.x > width - this.rd * 2 || this.x < this.rd * 2) {
      this.spx *= -1;
    }

    if (this.y > height - this.rd * 2 || this.y < this.rd * 2) {
      this.spy *= -1;
    }
  }


  this.create = function() {
    const r = rSlider.value();
    const g = gSlider.value();
    const b = bSlider.value();
    const o = opacitySlider.value();

    fill(r, g, b, o);
    rect(this.x, this.y, this.rd * 5, this.rd * 5);
  }
}