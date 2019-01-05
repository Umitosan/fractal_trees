/*jshint esversion: 6 */

var sizeRatio = 0.8;
var treeAngle = 18;
var treeAngleVel = 0.01;
var lineWidthReductionCoef = 0.8;

function resetTreeExtras() {
  sizeRatio = 0.8;
  treeAngle = 25;
  treeAngleVel = 0.01;
  lineWidthReductionCoef = 0.8;
}

function Tree(x,y) {
  this.seedX = x;
  this.seedY = y;
  this.size = 160; // pixel size of main trunk
  this.treeAngleVel = 0.3;
  this.animOn = false;
  this.drawOnce = true;
  this.drawnFlag = undefined;

  this.init = function() {
    console.log('tree init');
    this.drawnFlag = false;
  };


  this.draw = function() {
    let baseLineWidth = 14;
    let randomLengthCoef = getRandomIntInclusive(8,9)/10 + 0.07;
    let randomAngleCoef = getRandomIntInclusive(8,9)/10;
    let rand3branch = getRandomIntInclusive(1,2);

    // middle
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
    drawBranch(this.seedX,this.seedY-this.size,this.size*sizeRatio*randomLengthCoef,treeAngle*randomAngleCoef,baseLineWidth*lineWidthReductionCoef);
    // left
    drawBranch(this.seedX,this.seedY-this.size,this.size*sizeRatio*randomLengthCoef,-treeAngle*randomAngleCoef,baseLineWidth*lineWidthReductionCoef);
    // 3rd
    if (rand3branch === 1) {
      drawBranch(this.seedX,this.seedY-this.size,this.size*sizeRatio*randomLengthCoef,-treeAngle*randomAngleCoef/2,baseLineWidth*lineWidthReductionCoef);
    }
  };

  this.update = function() {
    // bounce between max and min angles
    if (this.animOn) {
      if ( ((treeAngle + treeAngleVel) > 180) || ((treeAngle + treeAngleVel) < 0) ) {
        treeAngleVel *= -1;
      }
      treeAngle += treeAngleVel; // animation on / off
    }
  };

} // TREE


function drawBranch(startX,startY,length,angleFromCenter,lineW) {
  let randomLengthCoef = getRandomIntInclusive(8,9)/10 + 0.07;
  let randomAngleCoef = getRandomIntInclusive(8,9)/10;
  let rand3branch = getRandomIntInclusive(1,2);


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
  if (length > 6) { // drawBranch(startX,startY,length,angleFromCenter)
    drawBranch(startX+newX,startY-newY,length*sizeRatio*randomLengthCoef,angleFromCenter+treeAngle*randomAngleCoef,lineW*lineWidthReductionCoef);
    drawBranch(startX+newX,startY-newY,length*sizeRatio*randomLengthCoef,angleFromCenter-treeAngle*randomAngleCoef,lineW*lineWidthReductionCoef);
    if (rand3branch === 1) {
      drawBranch(startX+newX,startY-newY,length*sizeRatio*randomLengthCoef,angleFromCenter-treeAngle*randomAngleCoef/2,lineW*lineWidthReductionCoef);
    }
  } else {
    // just stop loop
  }

}
