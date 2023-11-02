class Pacman {
  constructor(x, y, diameter) {
    this.x = x + (w / 2);
    this.y = y + (w / 2);
    this.d = diameter;
    this.theta = 0;
    
  }
  
  touch_wall(x,y,dir) {
    
    if(dir == 1){
      if(!cell.arr[floor((x - w / 2) / w)][floor((y - w / 2) / w)] || 
         floor((x - w / 2)) % w != 0) {
        return true;
      }
    }
    else if(dir == 2){
      if(!cell.arr[floor((x - w / 2) / w)][ceil((y - w / 2) / w)] || 
         floor((x - w / 2)) % w != 0) {
        return true;
      }
    }
    else if(dir == 3){
      if(!cell.arr[ceil((x - w / 2) / w)][floor((y - w / 2) / w)] || 
         floor((y - w / 2)) % w != 0) {
        return true;
      }
    }
    else if(dir == 4){
      if(!cell.arr[floor((x - w / 2) / w)][floor((y - w / 2) / w)] || 
         floor((y - w / 2)) % w != 0) {
        return true;
      }
    }
    
    return false;
  }
  
  count_score(x, y){
    if(cell.arr[floor((x - w / 2) / w)][floor((y - w / 2) / w)] == 1){
      cell.arr[floor((x - w / 2) / w)][floor((y - w / 2) / w)] = 2;
      score ++;
    }
  }
  get_tools(x,y) {
    if(cell.arr[floor((x - w / 2) / w)][floor((y - w / 2) / w)] == -1){
      cell.arr[floor((x - w / 2) / w)][floor((y - w / 2) / w)] = 2;
      power_mode = true;
      power_mode_time = 400;
    }
  }
  
  move(speedX,speedY,dir) {
    if(!this.touch_wall(this.x+speedX,this.y+speedY,dir)) {
      this.x += speedX;
      this.y += speedY;
      return true;
    }
    return false;
    
  }
  
  show() {
    colorMode(RGB);
    stroke(220, 220, 50);
    fill(220, 220, 50);
    let moving_matrix = [[0,0],[0,-w/10],[0,w/10],[w/10,0],[-w/10,0]]
    let moving_theta = [0,3/2 * PI,1/2*PI,0,PI];
    if(!explode && ready){
      if(this.move(moving_matrix[next_dir][0],moving_matrix[next_dir][1],next_dir)) {
        this.theta = moving_theta[next_dir];
        prev_dir = next_dir;
      }
      else {
        this.move(moving_matrix[prev_dir][0],moving_matrix[prev_dir][1],prev_dir);
      }
      arc(this.x, this.y, this.d, this.d, this.theta + rad, this.theta - rad);
      
      this.count_score(this.x, this.y);
      this.get_tools(this.x, this.y);
    }
  }
}