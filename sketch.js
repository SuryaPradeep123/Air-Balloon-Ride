var Myballoon,balloonImage1,balloonImage2;
var database , position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  Myballoon=createSprite(250,450,150,150);
  Myballoon.addAnimation("hotAirBalloon",balloonImage1);
  Myballoon.scale=0.5;

  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value",readHeight,showError)

}

// function to display UI
function draw() {
  background(bg);

  if(height !== undefined)
  if(keyDown(LEFT_ARROW)){
    Myballoon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    Myballoon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(10,0);
  }
  else if(keyDown(UP_ARROW)){
    Myballoon.addAnimation("hotAirBalloon",balloonImage2);
    Myballoon.scale += 0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    Myballoon.addAnimation("hotAirBalloon",balloonImage2);
    Myballoon.scale += -0.01;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}
function readHeight(data){
  height = data.val();
  Myballoon.x = height.x;
  Myballoon.y = height.y;
}
function showError(){
  console.log("Error in writing database");
}
