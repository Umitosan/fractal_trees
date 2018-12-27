/*jshint esversion: 6 */

var sizeRatio = 0.7;
var treeAngle = 15;
var treeAngleVel = 0.01;

function resetTreeExtras() {
  sizeRatio = 0.7;
  treeAngle = 15;
  treeAngleVel = 0.01;
}

function Tree(x,y) {
  this.seedX = x;
  this.seedY = y;
  this.size = 200; // pixel size of main trunk
  this.sizeRatio = 0.6;
  this.treeAngle = 10;
  this.reeAngleVel = 0.1;

  this.init = function() {
    console.log('tree init');
  };


  this.draw = function() {
    // middle
    ctx.save();
    ctx.translate(this.seedX,this.seedY);
    ctx.beginPath();
    ctx.strokeStyle = myColors.green;
    ctx.lineWidth = 2;
    ctx.moveTo(0,0);
    ctx.lineTo(0,0-this.size);
    ctx.stroke();
    ctx.restore();

    // right
    drawBranch(this.seedX,this.seedY-this.size,this.size*sizeRatio,treeAngle);
    // left
    drawBranch(this.seedX,this.seedY-this.size,this.size*sizeRatio,-treeAngle);
  };

  this.update = function() {
    // bounce between max and min angles
    if ( ((treeAngle + treeAngleVel) > 180) || ((treeAngle + treeAngleVel) < 0) ) {
      treeAngleVel *= -1;
    }
    treeAngle += treeAngleVel;
  };

} // TREE


function drawBranch(startX,startY,length,angleFromCenter) {

  ctx.save();
  ctx.translate(startX,startY);
  ctx.rotate(  getRadianAngle(angleFromCenter) );
  ctx.beginPath();
  ctx.strokeStyle = myColors.black;
  ctx.lineWidth = 1;
  ctx.moveTo(0,0);
  ctx.lineTo(0,0-length);
  ctx.stroke();
  ctx.restore();

  // ctx.beginPath();
  // ctx.fillStyle = myColors.red;
  // ctx.fillRect(startX-1,startY-1,3,3);

  let newX = length * Math.cos(getRadianAngle(90-angleFromCenter));
  let newY = length * Math.sin(getRadianAngle(90-angleFromCenter));
  if (length > 4) { // drawBranch(startX,startY,length,angleFromCenter)
    drawBranch(startX+newX,startY-newY,length*sizeRatio,angleFromCenter+treeAngle);
    drawBranch(startX+newX,startY-newY,length*sizeRatio,angleFromCenter-treeAngle);
  } else {
    // just stop loop
  }

}
