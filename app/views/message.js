class Message{
  constructor(){
    
  }
  
  show(){
    if(explode && done){
      noLoop();
      textAlign(CENTER);
      textSize(40);
      textStyle(BOLD);
      colorMode(RGB);
      fill(255, 211, 0);
      text('READY!', canvasSize / 2, (canvasSize + scoreBound) / 2);
    } else if(!ready){
      // noLoop();
      textAlign(CENTER);
      textSize(40);
      textStyle(BOLD);
      colorMode(RGB);
      fill(255, 211, 0);
      text('PACMAN', canvasSize / 2, (canvasSize + scoreBound) / 2);
      textSize(20);
      text('Press Enter To Start', canvasSize / 2, (canvasSize + scoreBound + 80) / 2)
    } else{
      textAlign(RIGHT);
      textSize(20);
      textStyle(BOLD);
      colorMode(RGB);
      fill(255, 255, 255);
      text('SCORE', canvasSize / 2, canvasSize + scoreBound / 2);
      textAlign(LEFT);
      text('        ' + score, canvasSize / 2, canvasSize + scoreBound / 2);
    }
  }
}