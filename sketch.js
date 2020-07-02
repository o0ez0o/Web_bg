var bug;  // Declare object
// var img;
var bg;
var ss_list = ["Find somewhere suiable.", "Find somewhere suiable.", ".........", "Well.", "Follow your instinct.", "......", "Alright...", "Maybe try something big?", "hmmmmm....", "Okay...", "We're almost there.", "...I wish.", ".....", "Could you please tell Yi,", "Don't make this game that hard?", "By the way...", "I saw you've just past that spot...", "....", "Seriously."];
var last_t;
var current_t;
var idx;
// function preload() {
//   // img = loadImage('aaa');
// }
function setup() {
  createCanvas(1900, 500);
  bg = new Map();
  bug = new Siren();
  last_t = second();
  idx = 0;
}

function draw() {
  background(0, 0, 0);

  bug.move();
  //center squarea
  var c = color(180,20,20);
  var d = dist(bug.x, bug.y, bg.target[0], bg.target[1]);
  current_t = second();
  console.log(current_t, last_t);
  if (current_t > last_t && current_t - last_t >= 5 || current_t < last_t && last_t + 60 - current_t >= 5) {
    idx++;
    last_t = current_t;
  }
  idx = idx % ss_list.length
  var ss = ss_list[idx];
  

  if (d < 60) {
    c = color(250,70,70);
    ss = "You've found it! :)";
    text(ss, width / 2, height / 3, 250,0,0)
  }
  bg.display(c);
  bug.display();
  textAlign(CENTER);
  textSize(32);
  text(ss, width / 2, height / 3);
}
 

function Map() {
  this.w = 3 * width;
  this.h = 3 * height;
  this.elt = [];
  for (var i = 0; i < 500; i ++) {
    this.elt.push([random(-width / 2, this.w + width/2), random(-height/2, this.h + height / 2), random(80), random(80,250)]);
  }
  this.target = [random(this.w), random(this.h)];
  // this.target = [width, height];

  this.display = function(co) {
    for (var i = 0; i < this.elt.length; i++) {
      //[i][5]all white for the rest 2, idk.
      fill(color(this.elt[i][3], 20, 20));
      //variable value of boxes square
      var r = this.elt[i][3] / 150.0;
      rect( r * (this.elt[i][0] - bug.x + width / 2), r*(this.elt[i][1] - bug.y + height / 2), this.elt[i][2], this.elt[i][2]);
    }
    fill(co);
    rectMode(CENTER);
    rect(this.target[0] - bug.x + width / 2, this.target[1] + height / 2 - bug.y, 100, 100);
  }

}

// Jitter class
function Siren() {
  this.x = random(width);
  this.y = random(height);
  this.diameter = [100];
  for (var i = 0 ; i < 10; i ++) {
    this.diameter.push(this.diameter[i] + 0.5);
  }
  for (var i = 0; i < 10; i ++) {
    this.diameter.push(this.diameter[10+i] - 0.5);
  }
  this.step = 0;
  this.img1 = createImg("heart.png");
  this.img1.hide();

  this.move = function() {
    var v = 0.07;
    this.x += (mouseX - width / 2) * v;
    this.y += (mouseY - height / 2) * v;
    if (this.x > bg.w) {
      this.x = bg.w;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y > bg.h) {
      this.y = bg.h;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    
    this.step += 1;
    this.step = this.step % this.diameter.length;
    // this.
  }

  this.display = function() {
    var c = color(255, 255, 255);
    fill(c);
    image(this.img1, width /2 - this.diameter[this.step] / 2, height / 2 - this.diameter[this.step] / 2, this.diameter[this.step], this.diameter[this.step]);
    // ellipse(width / 2, height / 2, this.diameter[this.step], this.diameter[this.step]);
  }
};


