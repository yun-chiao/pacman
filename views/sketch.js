function setup() {
  canvasSize = 400;
  scoreBound = 50;
  createCanvas(canvasSize, canvasSize + scoreBound);
  ellipseMode(CENTER);
  // redGhostImg = loadImage("red_ghost.png");
  // blueGhostImg = loadImage("blue_ghost.png");
  // greenGhostImg = loadImage("green_ghost.png");
  // yellowGhostImg = loadImage("yellow_ghost.png");
  redGhostImg = loadImage("https://cdn.glitch.global/f2b961a6-31f7-40ab-98b5-5709a111598f/red_ghost.png?v=1698398221464");
  blueGhostImg = loadImage("https://cdn.glitch.global/f2b961a6-31f7-40ab-98b5-5709a111598f/blue_ghost.png?v=1698398182152");
  greenGhostImg = loadImage("https://cdn.glitch.global/f2b961a6-31f7-40ab-98b5-5709a111598f/green_ghost.png?v=1698398218477");
  yellowGhostImg = loadImage("https://cdn.glitch.global/f2b961a6-31f7-40ab-98b5-5709a111598f/yellow_ghost.png?v=1698398224391");
  weakGhostImg = loadImage("https://cdn.glitch.global/f2b961a6-31f7-40ab-98b5-5709a111598f/weak_ghost.png?v=1698680611354")
  
  w = 20;
  rad = PI/4;
  ready = false;
  power_mode = false;
  power_mode_time = 400;
  num = canvasSize / w;
  arr = new Array(num);
  for (var i=0; i<num; i++) {
    arr[i]=new Array(num);
  }
  cell = new Cell(arr);
  
  init();
  // noLoop();
  rate = 40;
  frameRate(rate);
}


function init(){
  score = 0;
  prev_dir = 0;
  next_dir = 0;
  message = new Message();
  initPos = cell.random_pos(1);
  pacman = new Pacman(initPos[0].x, initPos[0].y, w);
  redGhost = new Ghost(cell.ghostRoomArr[0] * w, (num / 2 - 1) * w, redGhostImg, 'red');
  blueGhost = new Ghost(cell.ghostRoomArr[1] * w, (num / 2 - 1) * w, blueGhostImg, 'blue');
  greenGhost = new Ghost(cell.ghostRoomArr[2] * w, (num / 2 - 1) * w, greenGhostImg, 'green');
  yellowGhost = new Ghost(cell.ghostRoomArr[3] * w, (num / 2 - 1) * w, yellowGhostImg, 'yellow');
  [explode, done] = [false, false];
  loop();
}

function send_para() {
  
  //velocity = rate*2;
  //print(velocity);
  
  let pacmanPos = [pacman.x,pacman.y];
  let redGhostPos = [redGhost.x,redGhost.y];
  let blueGhostPos = [blueGhost.x,blueGhost.y];
  let greenGhostPos = [greenGhost.x,greenGhost.y];
  let yellowGhostPos = [yellowGhost.x,yellowGhost.y];
  let inPowerMode = power_mode;
  let gameReady = ready;
  /*
  print("speed: ",velocity);
  print("pacman pos: ", pacmanPos[0],pacmanPos[1]);
  print("redGhostPos: ",redGhostPos[0],redGhostPos[1]);
  print("blueGhostPos: ",blueGhostPos[0],blueGhostPos[1]);
  print("greenGhostPos: ",greenGhostPos[0],greenGhostPos[1]);
  print("yellowGhostPos: ",yellowGhostPos[0],yellowGhostPos[1]);
  print("Can eat ghost: ",inPowerMode);
  print("Game start: ",gameReady);
  */
}

function draw() {
  send_para();
  if(ready){
    if(rate < 60) {
      rate += 0.01;
    }
    if(explode && done){
      cell.create_map();
      cell.add_tools();
      setTimeout(function(){
        init();
      }, 1500);
    } else if(explode){
      clear();
    }
    power_mode_time --;
    if(power_mode_time == 0) {
      power_mode = false;
    }
    background('black');
    cell.show();
    message.show();
    pacman.show();
    redGhost.show();
    blueGhost.show();
    greenGhost.show();
    yellowGhost.show();

    if(next_dir != 0) {
     rad += PI/25;
     rad %= PI/3; 
    }
  } else{
    background('black');
    message.show();
  }
}

function keyPressed() {
  switch(keyCode) {
    case UP_ARROW:
      next_dir = 1;
      break;
    case DOWN_ARROW:
      next_dir = 2;
      break;
    case RIGHT_ARROW:
      next_dir = 3;
      break;
    case LEFT_ARROW:
      next_dir = 4;
      break;
    case ENTER:
      if(explode){
        init();
      } else if(!ready){
        ready = true;
        explode = true;
        done = true;
      }
  }
}

// function keyReleased() {
//   dir = 0;
// }