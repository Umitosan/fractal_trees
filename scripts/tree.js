/*jshint esversion: 6 */


function Tree(x,y) {
  this.seedX = x;
  this.seedY = y;
  this.size = 300; // pixel size of main trunk

  this.init = function() {
    console.log('tree init');
  };


  this.draw = function() {
    // middle
    ctx.save();
    ctx.translate(this.seedX,this.seedY);
    ctx.beginPath();
    ctx.strokeStyle = myColors.black;
    ctx.lineWidth = 4;
    ctx.moveTo(0,0);
    ctx.lineTo(0,0-this.size);
    ctx.stroke();
    ctx.restore();

    // right
    drawBranch(this.seedX,this.seedY-this.size,this.size/2,25);
    drawBranch(this.seedX,this.seedY-this.size,this.size/2,-25);
  };

  this.update = function() {

  };

} // TREE


function drawBranch(startX,startY,length,angleFromCenter) {

  ctx.save();
  ctx.translate(startX,startY);
  ctx.rotate(  getRadianAngle(angleFromCenter) );
  ctx.beginPath();
  ctx.strokeStyle = myColors.green;
  ctx.lineWidth = 3;
  ctx.moveTo(0,0);
  ctx.lineTo(0,0-length);
  ctx.stroke();
  ctx.restore();

  ctx.beginPath();
  ctx.fillStyle = myColors.red;
  ctx.fillRect(startX-1,startY-1,3,3);

  let newX = length * Math.cos(getRadianAngle(90-angleFromCenter));
  let newY = length * Math.sin(getRadianAngle(90-angleFromCenter));
  if (length > 10) { // drawBranch(startX,startY,length,angleFromCenter)
    drawBranch(startX+newX,startY-newY,length/2,angleFromCenter+25);
    drawBranch(startX+newX,startY-newY,length/2,angleFromCenter-25);
  } else {
    // just stop loop
  }

}
