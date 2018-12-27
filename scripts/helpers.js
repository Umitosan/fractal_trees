/*jshint esversion: 6 */


function clearCanvas() {
  ctx.clearRect(-1, -1, canvas.width+1, canvas.height+1); // offset by 1 px because the whole canvas is offset initially (for better pixel accuracy)
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getRadianAngle(degreeVal) {
  return (degreeVal * (Math.PI / 180));
}

function getDegreeAngle(radianVal) {
  return (radianVal * (180 / Math.PI));
}

function randColor(type, alphaSwitch = null) { // default alpha = 1
  // more muted colors example
      // return ( "#" + Math.round((getRandomIntInclusive(0,99999999) + 0x77000000)).toString(16) );
  // full spectum below
  let endAlpha;
  if (type === 'hex') {
    return ( "#" + Math.round((getRandomIntInclusive(0,0xffffff))).toString(16) );
  } else if (type === 'rgba') {
      if (alphaSwitch === null) {
        endAlpha = 1;
      } else if (alphaSwitch === 'rand') {
        endAlpha = getRandomIntInclusive(1,10) / 10;
      } else {
        endAlpha = alphaSwitch;
      }
      return ( 'rgba('+ getRandomIntInclusive(0,255) +','+ getRandomIntInclusive(0,255) +','+ getRandomIntInclusive(0,255) +','+endAlpha+')' );
  } else {
    console.log("Not valid option for randColor()");
    return undefined;
  }
}

function generalLoopReset() {
  if (State.myReq !== undefined) {  // reset game loop if already started
    cancelAnimationFrame(State.myReq);
  }
  softReset();
  myGame = new Game(State.simSpeed); // ms per update()
  myGame.init();
  State.myReq = requestAnimationFrame(gameLoop);
}
