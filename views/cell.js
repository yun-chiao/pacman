class Cell {
  constructor(arr) {
    this.arr = arr;
    this.numRoadPixel = 0;
    this.roadArr = new Array(this.numRoadPixel);
    this.ghostRoadPixel = 0;
    this.ghostArr = new Array(this.ghostRoadPixel);
    this.ghostRoomArr = [num / 2 - 2, num / 2 - 1, num / 2, num / 2 + 1];
  }
  
  random_pos(numOfPos){
    let posArr = new Array(numOfPos);
    for (var i = 0; i < numOfPos; i++) {
      posArr[i] = createVector(-w, -w);
    }
    
    if(this.roadArr.length){
      var pacNumber = int(random(0, this.numRoadPixel));
      posArr[0] = this.roadArr[pacNumber];

      for(let i = 1; i < numOfPos; i++){
        var ghostNumber = int(random(0, this.numRoadPixel));
        while(ghostNumber == pacNumber){
          ghostNumber = int(random(0, this.numRoadPixel));
        }
        posArr[i] = this.roadArr[ghostNumber];
      }
    }
    
    return posArr;
  }
  
  create_map(){
    // reset whole the map
    for(let i = 0; i < num; i++) {
      for(let j = 0; j < num; j++) {
        this.arr[i][j] = 0;
      }
    }
    
    // create random road
    var numRoad = 50;
    for(let i = 0; i < numRoad; i++) {
      // random center & stretch along random direction (horizontal / vertical)
      var roadCenterA = int(random(1, num - 1));
      var roadCenterB = int(random(1, num - 1));
      var roadLen = int(random(3, num / 2));
      var roadDir = int(random(0, 2));
      
      // prevent two connected vertical road after symmetrize (reflection)
      if(roadDir && ((roadCenterB == num / 2) || (roadCenterB == num / 2 - 1))){
        continue;
      }
      
      for(let j=max(roadCenterA-roadLen, 1); j<min(roadCenterA+roadLen, num-1); j++){
        if(!roadDir){
          if(!this.arr[j][roadCenterB + 1] && !this.arr[j][roadCenterB - 1]){
            this.arr[j][roadCenterB] = 1;
          }
        } else{
          if(!this.arr[roadCenterB + 1][j] && !this.arr[roadCenterB - 1][j]){
            this.arr[roadCenterB][j] = 1;
          }
        }
      }
    }
    
    // truncate poor-connected roads (single point / end of the road)
    while(true){
      // do until all roads are well-connected
      var noEnd = true;
      
      for(let i = 1; i < num - 1; i++) {
        for(let j = 1; j < num - 1; j++) {
          if(this.arr[i][j]){
            var connectivity = this.arr[i][j - 1] + this.arr[i][j + 1] + this.arr[i - 1][j] + this.arr[i + 1][j];
            if(connectivity <= 1){
              this.arr[i][j] = 0;
              noEnd = false;
            }
          }
        }
      }
      
      if(noEnd){
        break;
      }
    }
    
    // get symmetry base
    var [largestRegion, largestNumPixel] = this.get_largest_region();
    
    // road pixels should account for at least 40% of whole the map
    // otherwise it re-generate one
    if(largestNumPixel / (num ** 2 / 2) < 0.4){
      this.create_map();
    }
    
    // do reflection
    this.reflect_region(largestRegion);
    
    // compute parameter used by other functions / classes
    this.numRoadPixel = 0;
    for(let i = 1; i < num - 1; i++) {
      for(let j = 1; j < num - 1; j++) {
        if(this.arr[i][j] && (abs(j - num / 2) > 5)){
          this.roadArr[this.numRoadPixel] = createVector(i * w, j * w);
          this.numRoadPixel ++;
        }
      }
    }
    
    this.set_ghost_road();
  }
  
  set_ghost_road(){
    this.ghostRoadPixel = 0;
    
    for(let i = 0; i < num / 2; i++){
      if(this.arr[i][num / 2]){
        for(let j = i; j < i + 2 * (num / 2 - i); j++){
          this.arr[j][num / 2] = 1;
          this.ghostArr[this.ghostRoadPixel] = createVector(j * w, (num / 2) * w);
          this.ghostRoadPixel ++;
        }
        break;
      }
    }
    
    for(let i = 0; i < this.ghostRoomArr.length; i++){
      this.arr[this.ghostRoomArr[i]][num / 2 - 1] = 1;
      this.ghostArr[this.ghostRoadPixel] = createVector(this.ghostRoomArr[i] * w, (num / 2 - 1) * w)
      this.ghostRoadPixel ++;
    }
  }
  
  reflect_region(baseRegion){
    if(baseRegion == 1){
      for(let i = 1; i < num / 2; i++){
        for(let j = 1; j < num - 1; j++){
          this.arr[num - i - 1][j] = this.arr[i][j];
        }
      }
    }
    else{
      for(let i = num / 2; i < num - 1; i++){
        for(let j = 1; j < num - 1; j++){
          this.arr[num - i - 1][j] = this.arr[i][j];
        }
      }
    }
  }
  
  get_largest_region(){
    var largestRegion = 1;
    var largestNumPixel = 0, countPixel = 0;
    
    // Region 1 (left)
    for(let i = 1; i < num / 2; i++){
      for(let j = 1; j < num - 1; j++){
        if(this.arr[i][j]){
          countPixel ++;
        }
      }
    }
    if(countPixel > largestNumPixel){
      largestRegion = 1;
      largestNumPixel = countPixel;
    }
    countPixel = 0;
    
    // Region 2 (right)
    for(let i = num / 2; i < num - 1; i++){
      for(let j = 1; j < num - 1; j++){
        if(this.arr[i][j]){
          countPixel ++;
        }
      }
    }
    if(countPixel > largestNumPixel){
      largestRegion = 2;
      largestNumPixel = countPixel;
    }
    
    return [largestRegion, largestNumPixel];
  }
  add_tools() {
    let leftUp = [num,num];
    let rightUp = [0,num];
    let leftDown = [num,0];
    let rightDown = [0,0];
    for(let i = 0;i < num;i ++) {
      for(let j = 0;j < num;j ++) {
        if(this.arr[i][j] == 1) {
          if(i <= leftUp[0] && j <= leftUp[1]) {
            leftUp = [i,j];
          }
          if(i >= rightUp[0] && j <= rightUp[1]) {
            rightUp = [i,j];
          }
          if(i <= leftDown[0] && j >= leftDown[1]) {
            leftDown = [i,j];
          }
          if(i >= rightDown[0] && j >= rightDown[1]) {
            rightDown = [i,j];
          }
        }
      }
    }
    this.arr[leftUp[0]][leftUp[1]] = -1;
    this.arr[leftDown[0]][leftDown[1]] = -1;
    this.arr[rightUp[0]][rightUp[1]] = -1;
    this.arr[rightDown[0]][rightDown[1]] = -1;
  }
  show() {
    for(let i = 0;i < num;i ++) {
      for(let j = 0;j < num;j ++) {
        if(this.arr[i][j]) {
          let c = color('gray');
          stroke('gray')
          fill(c);
          rect(i*w,j*w,w,w);
          if(this.arr[i][j] == 1){
            fill(color('white'));
            ellipse(i * w + w / 2, j * w + w / 2, 5, 5);
          }
          if(this.arr[i][j] == -1) {
            fill(color('blue'));
            ellipse(i * w + w / 2, j * w + w / 2, 10, 10);
          }
        }
      }
    }
    
    for(let i = 0; i < this.ghostRoadPixel; i++){
      let c = color('purple');
      stroke('purple');
      fill(c);
      rect(this.ghostArr[i].x, this.ghostArr[i].y, w, w);
    }
  }
}