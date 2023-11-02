class Ghost {
  constructor(x, y, img, ghostColor) {
    this.x = x;
    this.y = y;
    this.r = int(random(4));
    this.moving_matrix = [[0,-w/10],[0,w/10],[w/10,0],[-w/10,0]];
    this.img = img;
    this.speedX = w/10;
    this.speedY = 0;
    this.ghostColor = ghostColor;
    this.explode = false;
    this.ghost_stop = 10;
    this.explode_module = new Explosion(this.ghostColor);
    
  }
  
  
  touch_wall(x,y,dir) {
    if(dir == 1){
      if(!cell.arr[floor((x) / w)][floor((y) / w)] || 
         floor((x)) % w != 0) {
        return true;
      }
    }
    else if(dir == 2){
      if(!cell.arr[floor((x) / w)][ceil((y) / w)] || 
         floor((x)) % w != 0) {
        return true;
      }
    }
    else if(dir == 3){
      if(!cell.arr[ceil((x) / w)][floor((y) / w)] || 
         floor((y)) % w != 0) {
        return true;
      }
    }
    else if(dir == 4){
      if(!cell.arr[floor((x) / w)][floor((y) / w)] || 
         floor((y)) % w != 0) {
        return true;
      }
    }
    
    return false;
  }
  
  check_dir(speedX,speedY) {
    for(let i = 0;i < 4;i ++) {
      if(speedX == this.moving_matrix[i][0] && speedY == this.moving_matrix[i][1]) {
        return i;
      }
    }
  }
  
  change_dir() {
    let speedX = this.moving_matrix[this.r][0];
    let speedY = this.moving_matrix[this.r][1];
    let new_matrix = [];
    let matrix_len = 0;
    if(!this.touch_wall(this.x+speedX,this.y+speedY,this.r+1)) {
      new_matrix.push([speedX,speedY]);
      matrix_len ++;
    }
    if(!this.touch_wall(this.x+speedY,this.y+speedX,this.check_dir(speedY,speedX)+1)) {
      new_matrix.push([speedY,speedX]);
      matrix_len ++;
    }
    if(!this.touch_wall(this.x-speedY,this.y-speedX,this.check_dir(-speedY,-speedX)+1)) {
      new_matrix.push([-speedY,-speedX]);
      matrix_len ++;
    }
    if(matrix_len != 0) {
      let new_r = int(random(matrix_len));
      speedX = new_matrix[new_r][0];
      speedY = new_matrix[new_r][1];
    }
    else{
      speedX = -speedX;
      speedY = -speedY;
    }
    this.r = this.check_dir(speedX,speedY);
  }
  
  show(){
    
    // detect collision
    if((abs(pacman.x - this.x) <= w) && 
       (abs(pacman.y - this.y) <= w) && 
       !explode){
      if(!power_mode) {
        this.explode = true;
        this.explode_module.init(pacman.x, pacman.y, this.ghostColor);
      }
      else {
        this.x = cell.ghostRoomArr[0] * w;
        this.y = (num / 2 - 1) * w;
        this.ghost_stop = 20;
      }
    }
    if(!explode && ready){
      if(!power_mode) {
        image(this.img, this.x, this.y, w, w);
      }
      else {
        image(weakGhostImg, this.x, this.y, w, w);
      }
      if(this.ghost_stop == 0) {
        this.change_dir();
        this.x += this.moving_matrix[this.r][0];
        this.y += this.moving_matrix[this.r][1];
      }
      else {
        this.ghost_stop --;
      }
    } else if(this.explode){
      done = this.explode_module.display() || done;
    }
    explode = this.explode || explode;
  }
}