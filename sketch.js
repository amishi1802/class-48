var backgroundImg, balloonImg, balloonsGrpImg, bomb1Img, bomb2Img, bomb3Img, brickImg, coinImg, gameOverImg,restartImg;
var bg;
var balloon;
var coinGrp;
var obstacleGroup;
var bkGroup;
var gameStates="play";
var gameOver;
var restart;
var distance,count;

function preload(){
backgroundImg=loadImage("Images/backgroundImg.jpg");
balloonImg=loadImage("Images/balloonImg.png");
balloonsGrpImg=loadImage("Images/balloonsGrpImg.png");
bomb1Img=loadImage("Images/bomb1img.png");
bomb2Img=loadImage("Images/bomb2Img.png");
bomb3Img=loadImage("Images/bomb3Img.png");
brickImg=loadImage("Images/brickImg.png");
coinImg=loadImage("Images/coinImg.png");
gameOverImg=loadImage("Images/gameOver image.png");
restartImg=loadImage("Images/restartImg.png");
}

function setup(){
  createCanvas(displayWidth,displayHeight);

  distance=0;
  count=0;

  touches=[];

    bg=createSprite(width/2,height/2,width+50,height+50);
    bg.addImage(backgroundImg);
    bg.scale=3;
    bg.y=bg.height/2+70;
    bg.velocityY=-2;

    balloon=createSprite(width/2,height/2);
  balloon.addImage(balloonImg);
  balloon.scale=0.5;
  balloon.setCollider("rectangle",0,-100,120,200);
  balloon.debug=true;

  gameOver=createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;

  restart=createSprite(width/2,height/2-80);
  restart.addImage(restartImg);
  restart.scale=0.3;

  coinGrp=new Group();
  obstacleGroup=new Group();
  bkGroup=new Group();

}

function draw(){
 background(0);

if(gameStates === "play"){
  gameOver.visible=false;
  restart.visible=false;
  distance= distance + Math.round(getFrameRate() / 60);
  bg.velocityY=-(2 + 3 * distance / 100);

 if(bg.y < width/4){
   bg.y=bg.height/2+70;
 }

 if(keyDown(RIGHT_ARROW) || touches.length > 0){
   balloon.velocityX=2;
   touches=[];
 }

 if(keyDown(LEFT_ARROW)|| touches.length > 0){
   balloon.velocityX=-2;
   touches=[];
 }

 if(keyDown(DOWN_ARROW) || touches.length > 0){
   balloon.velocityY=2;
   touches=[];
 }

 if(keyDown(UP_ARROW) || touches.length > 0){
   balloon.velocityY=-2;
   touches=[];
 }
  coins();
  ob();
  brick();

  if(coinGrp.isTouching(balloon)){
    count=count+1;
    coinGrp.destroyEach();
  }

  if(obstacleGroup.isTouching(balloon) || bkGroup.isTouching(balloon)){
   gameStates="end";
  
  }

}
if(gameStates === "end"){
  gameOver.visible=true;
  restart.visible=true;
  obstacleGroup.setVelocityYEach(0);
  bkGroup.setVelocityYEach(0);
  coinGrp.setVelocityYEach(0);
  balloon.visible=false;
  balloon.setVelocity(0,0);
  bg.velocityY=0;
  if(mousePressedOver(restart)){
    reset();
  }

}
drawSprites();
textSize(20);
fill("black");
text("Distance travelled by balloon:"+ distance + "m",width-300,50);
text("Coins earned:"+ count,width-300,80);
}

  function reset(){
   gameStates="play";
   obstacleGroup.destroyEach();
   bkGroup.destroyEach();
   coinGrp.destroyEach();
   count=0;
   distance=0;
   balloon.visible=true;
  }

function coins(){
  if(frameCount % 100 === 0){
    var coin=createSprite(random(20,width-20),0);
    coin.addImage(coinImg);
    coin.velocityY=(2 + 3 * distance / 100);
    coin.scale=0.3;
    coin.lifetime=800;
    balloon.depth=coin.depth;
    balloon.depth=balloon.depth+1;
    coinGrp.add(coin);
  }
}

function ob(){
  if(frameCount % 80 === 0){
    var obstacle=createSprite(random(20,width-20),0);
    var rand=Math.round(random(1,3));
    if(rand === 1){
      obstacle.addImage(bomb1Img);
    }
    if(rand === 2){
      obstacle.addImage(bomb2Img);
    }
    if(rand === 3){
      obstacle.addImage(bomb3Img);
    }
    
    obstacle.velocityY=(2 + 3 * distance / 100);
    obstacle.scale=0.5;
    obstacle.lifetime=800;
    balloon.depth=obstacle.depth;
    balloon.depth=balloon.depth+1;
    obstacleGroup.add(obstacle);
  } 
}

function brick(){
  if(frameCount % 200 === 0){
    var bk=createSprite(random(20,width-20),0);
    bk.addImage(brickImg);
    bk.velocityY=(2 + 3 * distance / 100);
    bk.scale=0.3;
    bk.lifetime=800;
    balloon.depth=bk.depth;
    balloon.depth=balloon.depth+1;
    bkGroup.add(bk);
  }
}