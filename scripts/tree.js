/*jshint esversion: 6 */

var sizeRatio = 0.7;
var treeAngle = 15;
var treeAngleVel = 0.01;
var lineWidthReductionCoef = 0.8;

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
  this.treeAngleVel = 0.3;

  this.init = function() {
    console.log('tree init');
  };


  this.draw = function() {
    // middle
    let baseLineWidth = 14;
    ctx.save();
    ctx.translate(this.seedX,this.seedY);
    ctx.beginPath();
    ctx.strokeStyle = myColors.treeBrown;
    ctx.lineWidth = baseLineWidth;
    ctx.moveTo(0,0);
    ctx.lineTo(0,0-this.size);
    ctx.stroke();
    ctx.restore();

    // right
    drawBranch(this.seedX,this.seedY-this.size,this.size*sizeRatio,treeAngle,baseLineWidth*lineWidthReductionCoef);
    // left
    drawBranch(this.seedX,this.seedY-this.size,this.size*sizeRatio,-treeAngle,baseLineWidth*lineWidthReductionCoef);
  };

  this.update = function() {
    // bounce between max and min angles
    if ( ((treeAngle + treeAngleVel) > 180) || ((treeAngle + treeAngleVel) < 0) ) {
      treeAngleVel *= -1;
    }
    treeAngle += treeAngleVel;
  };

} // TREE


function drawBranch(startX,startY,length,angleFromCenter,lineW) {

  ctx.save();
  ctx.translate(startX,startY);
  ctx.rotate(  getRadianAngle(angleFromCenter) );
  ctx.beginPath();
  if (length < 8) {
    ctx.strokeStyle = myColors.forestGreen;
  } else {
    ctx.strokeStyle = myColors.treeBrown;
  }
  ctx.lineWidth = lineW;
  ctx.moveTo(0,0);
  ctx.lineTo(0,0-length);
  ctx.stroke();
  ctx.restore();

  let newX = length * Math.cos(getRadianAngle(90-angleFromCenter));
  let newY = length * Math.sin(getRadianAngle(90-angleFromCenter));
  if (length > 4) { // drawBranch(startX,startY,length,angleFromCenter)
    drawBranch(startX+newX,startY-newY,length*sizeRatio,angleFromCenter+treeAngle,lineW*lineWidthReductionCoef);
    drawBranch(startX+newX,startY-newY,length*sizeRatio,angleFromCenter-treeAngle,lineW*lineWidthReductionCoef);
  } else {
    // just stop loop
  }

}
