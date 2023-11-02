// function setup(){
//   stage = createVector(windowWidth, windowWidth);
//   createCanvas(stage.x, stage.y);
//   rectMode(CENTER);
//   frameRate(60);
  
//   explode_module = new Explosion('blue');
  
//   displayFlag = false;
// }

// function draw(){
//   if(mouseIsPressed){
//     explode_module.init();
//     displayFlag = true;
//   }
  
//   if(displayFlag){
//     clear();
//     explode_module.display(); 
//   }
// }

class Explosion{
  constructor(plotColor){
    this.plotColor = plotColor;
  }
  
  init(posX, posY){
    switch(this.plotColor){
      case 'red':
        this.hue_ = 0;
        break;
      case 'yellow':
        this.hue_ = 60;
        break;
      case 'green':
        this.hue_ = 120;
        break;
      case 'blue':
        this.hue_ = 200;
        break
      default:
        this.hue_ = 300;
        break;
    }
    
    this.numWalkers = 300;
    
    this.walkers = [];
    for(let i = 0; i < this.numWalkers; i++){
      this.walkers[i] = new RunningRect(posX, posY, this.hue_);
    }
  }
  
  display(){
    var notDone = false;
    
    for(let i = 0; i < this.numWalkers; i++){
      this.walkers[i].display();
      this.walkers[i].update();
      
      if(!notDone){
        if(!this.walkers[i].out_of_bound()){
          notDone = true;
        }
      }
    }
    
    if(!notDone){
      return true; // done display
    } else{
      return false;
    }
  }
}

class RunningRect{
  constructor(posX, posY, hue_){
    this.hue_ = hue_;
    this.pos = createVector(posX, posY);
    this.vel = createVector(0, 0);
    this.acc = createVector(random(random(-0.05, 0.05), random(-0.3, 0.3)), random(random(-0.05, 0.05), random(-0.3, 0.3)));
    this.rate = random(1.2, 2);
    this.colorAngle = hue_ + random(-15, 0);
    this.sat = random(80, 90);
    this.light = random(70, 90);
    this.size = random(width * 0.005, width * 0.01);
    this.speed = random(width * 0.0032, width * 0.012);
  }
  
  update(){
    var randomWalk = createVector(random(-this.speed, this.speed), random(-this.speed, this.speed));
    this.vel.add(this.acc.mult(1.015));
    this.pos.add(this.vel);
    this.pos.add(randomWalk);
    this.size += this.rate ** 2;
    this.colorAngle += random(-0.5, 0.5);
    
    if(this.colorAngle <= 0){
      this.colorAngle += 360;
    } else if(this.colorAngle >= 360){
      this.colorAngle -= 360;
    }
    
    this.light += 0.03;
    this.sat += 0.03;
  }
  
  display(){
    if(this.size <= 0){
      return;
    } else{
      colorMode(HSB);
      fill(this.colorAngle, this.sat, this.light);
      noStroke();
      ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
  }
  
  out_of_bound(){
    if((this.pos.x < -this.size / 2) || (this.pos.x > canvasSize + this.size / 2)){
       return true;
    }
    if((this.pos.y < -this.size / 2) || (this.pos.y > canvasSize + this.size / 2)){
       return true;
    }
    return false;
  }
}