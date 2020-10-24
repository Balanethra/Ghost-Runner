var PLAY=1;
var END=0;
var gameState=PLAY;

var tower,towerImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost,ghostImg;
var invisibleBlock;
var invisibleBlocksGroup;
var spookySound;

function preload() {
towerImg=loadImage("tower.png");
doorImg=loadImage("door.png");
climberImg=loadImage("climber.png");  
ghostImg=loadImage("ghost-standing.png"); 
spookySound=loadSound("spooky.wav");
}

function setup() {
createCanvas(600,600);  
 
 
   
  
tower=createSprite(300,300);
tower.addImage("tower",towerImg);
tower.velocityY=1;

ghost=createSprite(300,300);
ghost.addImage("ghost",ghostImg);
ghost.scale=0.3;
  
  
doorsGroup=new Group();
climbersGroup=new Group();
invisibleBlocksGroup=new Group();
}

function draw() {
background(0);
spookySound.play();
  
if(gameState===PLAY) {
if(tower.y>400) {
 tower.y=300; 
}
  
if(keyDown("left_arrow")) {
ghost.x-=3;
}
 if(keyDown("right_arrow")) {
ghost.x+=3;
} 
if(keyDown("space")) {
ghost.velocityY=-6;
}
ghost.velocityY+=0.8;

if(climbersGroup.isTouching(ghost)) {
ghost.velocityY=0; 
}

 
if(invisibleBlocksGroup.isTouching(ghost)||ghost.y>600) {
ghost.destroy();
gameState=END;
doorsGroup.destroyEach();
climbersGroup.destroyEach();
}
  
spawnDoors();  
} 
drawSprites();  
if(gameState===END) {
textSize(45);
fill("red");
stroke("red");
  text("GAME OVER",180,300);
tower.destroy();
}
}

function spawnDoors() {
if(frameCount %240===0) {
door=createSprite(Math.round(random(150,400)),-10) ;
door.addImage("door",doorImg);
door.velocityY=1;
door.lifetime=600;

doorsGroup.add(door);
  
climber=createSprite(door.x,40);
climber.addImage("climber",climberImg);
climber.velocityY=1;
  climber.lifetime=600;
  
climbersGroup.add(climber);
ghost.depth=door.depth+1; 
  
invisibleBlock=createSprite(door.x,60,80,10);
invisibleBlock.velocityY=1;
invisibleBlock.visible=false;
  
 
invisibleBlocksGroup.add(invisibleBlock);
}
  
  
  
  
}
