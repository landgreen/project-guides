// WARNING: DO NOT READ THIS CODEBASE.
// Any violations to the stated warning above removes me from any liabliity to the resulting physical and/or psychological harm one may inflict on themselves.

// WORLD RECORD HOLDER FOR WOSRT CODEBASE iN eXISTENCE :0

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

var SCALE = 5;

var x = canvas.width/2;
var y = canvas.height/2;
var points = 0;

function randint(min, max) {
  return Math.floor(Math.random() * (max-min)) + min;
}

// Define the height of the left and right corners of the floor
let floor_heighties = new Array(2).fill().map(function () { 
  return randint(window.innerHeight * 0.4, window.innerHeight * 0.5);
});

// Linear interpolation (y=mx+b) between the two corners of the floor. Used to bound the pig to the dimensions of the floor.
let floor_slope = (floor_heighties[1] - floor_heighties[0]) / window.innerWidth;

function floor_height (x) {
  return floor_slope * x + floor_heighties[0];
}

var red = 155+45*(Math.random()*Math.random());
var green = 205+35*(Math.random()*Math.random());
var blue = 220+35*(Math.random()*Math.random());

var redd = 220+35*(Math.random()*Math.random());
var greenn = 195+40*(Math.random()*Math.random());
var bluee = 170+40*(Math.random()*Math.random());

// var angleIncreaseValue = 161;
var flap = 0;
let flappy = true;
var walk = 0;
// let walky = true;
var angle = Math.random()*10;
var increasy = 0
var ground = false;

var a = canvas.width*3/2;
var b = canvas.height*3;
var rcceleration = 0;
var lcceleration = 0;
var ucceleration = 0;
var dcceleration = 0;
  
let isUp = false;
let isDown = false;
let isRight = false;
let isLeft = false;
let Space = false;
var spacey = 0;

var righteye = 0;
var lefteye = 0;
var upeye = 0;
var downeye = 0;

ctx.lineWidth = 7;
ctx.lineCap = "round";

let drops = [];

function start() {
red = 155+45*(Math.random()*Math.random());
green = 205+35*(Math.random()*Math.random());
blue = 220+35*(Math.random()*Math.random());

redd = 220+35*(Math.random()*Math.random());
greenn = 195+40*(Math.random()*Math.random());
bluee = 170+40*(Math.random()*Math.random());

// var angleIncreaseValue = 161;
flap = 0;
flappy = true;
angle = Math.random()*10;
increasy = 0
ground = false;

a = canvas.width*5/2;
b = canvas.height*3;
  
isUp = false;
isDown = false;
isRight = false;
isLeft = false;

ctx.lineWidth = 7;
ctx.lineCap = "round";

drops.length = 0;
  
}

start()

//_____________animation loop _______________

function cycle() {
  
  const keys = [];
document.onkeydown = event => {
	keys[event.keyCode] = true;
}

window.addEventListener("keydown", function(event) {
       switch (event.code) {
        case "ArrowRight":
            isRight = true
            break;
        case "ArrowLeft":
            isLeft = true
            break;
        case "ArrowUp":
            isUp = true
            break;
        case "ArrowDown":
            isDown = true
            break;
         case "Space":
           Space = true
           break;
    }
})
window.addEventListener("keyup", function(event) {
    switch (event.code) {
        case "ArrowRight":
            isRight = false
            break;
        case "ArrowLeft":
            isLeft = false
            break;
        case "ArrowUp":
            isUp = false
            break;
        case "ArrowDown":
            isDown = false
            break;
    }
});  
  
  if (isRight) {
    rcceleration++;
    a += 22 + rcceleration;
    walk = 3;
    righteye = 3;
  }
  if (isLeft) {
    lcceleration++;
    a -= 22 + lcceleration;
    walk = 3;
    lefteye = 3;
  }
  if (isUp) {
    ucceleration++;
    b -= 22 + ucceleration;
    walk = 3;
    upeye = 3;
  }
  if (isDown) {
    dcceleration++;
    b += 22 + dcceleration;
    walk = 3;
    downeye = 3;
  }
  if (Space) {
    spacey += .1;
  }
  
  if (!isRight) {
    rcceleration = 0;
    righteye = 0;
  }
  if (!isLeft) {
    lcceleration = 0;
    lefteye = 0;
  }
  if (!isUp) {
    ucceleration = 0;
    upeye = 0;
  }
  if (!isDown) {
    dcceleration = 0;
    downeye = 0;
  }
  if (spacey == 1) {
    spacey = 0;
  }
  // if (!Space || spacey == 0) {
  //   spacey = 0;
  // }
  
  SCALE = 5 - spacey;
  
    if (!isRight && !isLeft && !isUp && !isDown) {
    walk = 0;
  }
  
  ctx.fillStyle = `rgb(${red},${green},${blue})`;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(-7000, canvas.height - 50);
    ctx.lineTo(canvas.width+550, canvas.height - 300);
    ctx.lineTo(canvas.width+550, canvas.height + 50);
   ctx.closePath();
  
  increasy++;
  if (flap == 15) {
    flappy = false;
  } else if (flap == 0) {
    flappy = true;
  }
  if (flappy) {
    flap++;
  } else if(!flappy) {
    flap--;
    flappy = flappy;
  } 
  
  if (increasy % (40) == 0) {
    drops.push({
    x: (canvas.width*(4/3)) * Math.random(),
    y: -50,
    angle: 4+2*Math.random(),
    w: 0,
  });
  }
  
  ctx.beginPath();
    ctx.fillStyle = `rgb(${redd},${greenn},${bluee})`;
    ctx.moveTo(window.innerWidth, floor_heighties[1]);
     ctx.lineTo(window.innerWidth, canvas.height);
  ctx.lineTo(0, canvas.height);
    ctx.lineTo(0, floor_heighties[0]);
    ctx.fill(); 
  ctx.closePath();
  
  ctx.beginPath();
ctx.moveTo(window.innerWidth, canvas.height * 0.5);
     ctx.lineTo(window.innerWidth, canvas.height);
  ctx.lineTo(0, canvas.height);
    ctx.lineTo(0, canvas.height * 0.6);
    for(drop of drops){
      if(drop.y >= floor_heighties[0] * .8){
      drop.w = 1;
      drop.y += 3;
}
    }
  ctx.closePath();
  //calling the floorheight function to set boundaries
  if (b <= 4.5*floor_height(a)-130) {
    b = 4.5*floor_height(a)-130;
  }
  if (b >= canvas.height*SCALE*.79) {
    b = canvas.height*SCALE*.79;
  }
  if (a >= canvas.width*5-500) {
    a = canvas.width*5-500;
  }
  if (a <= -150) {
    a = -150;
  }
  
  ctx.beginPath();
  ctx.ellipse((a+322.5)/SCALE, (b+403)/SCALE, 180/SCALE, 187/SCALE, 0, 0, 2 * Math.PI);
  for(drop of drops){
      if(ctx.isPointInPath(drop.x, drop.y)){
        points = 0;
      start();
} else if(ctx.isPointInPath(drop.x - 52 + 44*drop.w, drop.y + 10 - flap - 10 - 44*drop.w)) {
      points = 0;
      start();
}
  }
      //Pig drawing 
  ctx.globalAlpha = 1
  ctx.strokeStyle = "black";
  ctx.fillStyle = "#66FF00";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse((a+260)/SCALE+flappy*walk, (b+550)/SCALE, 50/SCALE, 50/SCALE, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = "#66FF00";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse((a+385)/SCALE+flappy*walk, (b+550)/SCALE, 50/SCALE, 50/SCALE, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();

  //add collisions to this circle vvv
  ctx.fillStyle = "#66FF00";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse((a+322.5)/SCALE, (b+403)/SCALE, 180/SCALE, 187/SCALE, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = "#66FF00";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse((a+390)/SCALE + righteye - lefteye, (b+335)/SCALE + downeye - upeye+flappy*walk, 50/SCALE, 50/SCALE, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = "#66FF00";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse((a+255)/SCALE + righteye - lefteye, (b+335)/SCALE + downeye - upeye+flappy*walk, 50/SCALE, 50/SCALE, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = "#66FF00";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse((a+322.5)/SCALE + righteye - lefteye, (b+420)/SCALE + downeye - upeye+flappy*walk, 120/SCALE, 120/SCALE, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = "green";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse((a+322.5)/SCALE + righteye - lefteye, (b+450)/SCALE + downeye - upeye+flappy*walk, 50/SCALE, 40/SCALE, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  ctx.fillStyle = "black";

  //nose
  ctx.lineWidth = 1;
  ctx.fillStyle = "#black";
  ctx.beginPath();
  ctx.arc((a+340)/SCALE + righteye - lefteye, (b+450)/SCALE + downeye - upeye+flappy*walk, 8/SCALE, 0/SCALE, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();

  //nose
  ctx.fillStyle = "#black";
  ctx.beginPath();
  ctx.arc((a+305)/SCALE + righteye - lefteye, (b+450)/SCALE + downeye - upeye+flappy*walk, 8/SCALE, 0/SCALE, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  
  //eye
  ctx.fillStyle = "#black";
  ctx.beginPath();
  ctx.arc((a+265)/SCALE + 2*(righteye - lefteye*.6), (b+366)/SCALE + 2*(downeye - upeye)+flappy*walk, 18/SCALE, 0/SCALE, 2 * Math.PI);
   ctx.stroke();
  ctx.fill();
  ctx.closePath();

  //eye
    ctx.fillStyle = "#black";
  ctx.beginPath();
  ctx.arc((a+380)/SCALE + 2*(righteye*.6 - lefteye), (b+366)/SCALE + 2*(downeye - upeye)+flappy*walk, 8/SCALE, 0/SCALE, 2 * Math.PI);
   ctx.stroke();
  ctx.fill();
  
  for(const [i, drop] of drops.entries()){
      if(ctx.isPointInPath(drop.x, drop.y)){
        // drop.angle = 180*Math.random();
        // drop.angle = - 0.6;
        drop.x = drop.prevX - 5.8;
        drop.y = drop.prevY + 3;
        drop.w = 1;
      };
      drop.prevY = drop.y;
    drop.prevX = drop.x + 5.8;

    drop.x -= Math.cos(drop.angle);
    drop.y -= Math.sin(drop.angle) + 0.02*Math.random();
    
    if (
      drop.x > canvas.width + 1000 ||
      drop.x < - 300 ||
      drop.y < -200
   ) {
      if (drop.y > window.innerHeight) {
        drops.splice(i, 1)
      }
    }
    	
    
    if (
      drop.y > canvas.height+200
   ) {
      if (drop.y > window.innerHeight) {
        drops.splice(i, 1)        
        points++;
      }
    }
    
    ctx.font = "30px Arial";
	ctx.fillStyle = "white";
	ctx.fillText(points, canvas.width - 40, 45);
	ctx.fillStyle = "#17202A";
    
      ctx.lineWidth = 9;
    
    ctx.strokeStyle = "#505050";
    ctx.beginPath();
    ctx.moveTo(drop.prevX + 52 - 44*drop.w, drop.prevY + 10 - 10 -flap - 44*drop.w);
    ctx.lineTo(drop.x, drop.y);
    ctx.stroke();
    ctx.closePath();
    
    ctx.strokeStyle = "#505050";
    ctx.beginPath();
    ctx.moveTo(drop.prevX - 52 + 44*drop.w, drop.prevY + 10 - flap - 10 - 44*drop.w);
    ctx.lineTo(drop.x, drop.y);
    ctx.stroke();
    ctx.closePath();
    
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(drop.prevX  - 5*drop.w, drop.prevY + 5);
    ctx.lineTo(drop.x + 4 - 3.5*drop.w, drop.y);
    ctx.stroke();
    ctx.closePath();
      };
  ctx.closePath();
  
  setTimeout(requestAnimationFrame(cycle), 1000000000000); 
}
requestAnimationFrame(cycle);