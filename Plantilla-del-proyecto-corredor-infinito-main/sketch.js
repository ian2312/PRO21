//Otro Flappy Bird

//estados de juego


var serve = 0;
var play = 1;
var end = 2;
var aña_state = 3;
var no_aña = 4;
var añaSound;

var ConditionMed = false;

var gameState = serve 


var base, baseImg;
var tittle, tittleImg, play_button, play_buttonImg, devname, devnameImg;

var backgroundImage;

var bird, birdImg;

var gameOver, gameOverImg;

var barrier, barrierImg, barrierGroup;
var UPbarrier, UPbarrierImg, UPbarrierGroup;
var typebarrier;

var aña = no_aña;
var pankeiks, pankeiksImg, pankeiksSound;


function preload(){
    backgroundImage = loadImage("04.png");
    baseImg = loadImage("03.png");

    tittleImg = loadImage("real_tittle.png");

    play_buttonImg = loadImage("playbtn-op.png");

    birdImg = loadAnimation("bluebird-upflap.png", "bluebird-midflap.png", "bluebird-downflap.png");

    gameOverImg = loadImage("gameover.png");

    barrierImg = loadImage("pipe-green.png");

    UPbarrierImg = loadImage("pipe-green_up.png");

    pankeiksImg = loadImage("jijijija_easteregg.png");
    pankeiksSound = loadSound("jijijija.mp3");
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    base = createSprite(windowWidth/2, windowHeight*0.95, windowWidth, windowHeight*0.25)
    base.addImage("base", baseImg);
    base.scale = 2;

    tittle = createSprite(windowWidth/2, windowHeight*0.15, windowWidth*0.75, windowHeight*0.15);
    tittle.addImage("tittle", tittleImg);
    tittle.visible = false;
    
    play_button = createSprite(windowWidth/2, windowHeight/2, windowWidth*0.15, windowHeight*0.07);
    play_button.addImage("btn", play_buttonImg);
    play_button.scale = 0.5;
    play_button.visible = false;

    devname = createSprite(windowWidth*0.75, windowHeight*0.30, windowWidth*0.20, windowHeight*0.07);
    devname.visible = false;
    
    bird = createSprite(windowWidth*0.1, windowHeight/2, windowWidth*0.15, windowHeight*0.15);
    bird.addAnimation("bird_fly", birdImg);
    bird.scale = 2;
    bird.visible = false;

    gameOver = createSprite(windowWidth/2, windowHeight/2, windowWidth/2, windowHeight/2,);
    gameOver.scale = 2;
    gameOver.addImage("gameover", gameOverImg);
    gameOver.visible = false;

    //grupos de barriers
    barrierGroup = createGroup();
    UPbarrierGroup = createGroup(); 
    
    //aña
    pankeiks = createSprite(windowWidth/2, windowHeight/2, windowWidth/2, windowHeight/2,);
    pankeiks.addImage("jijijija", pankeiksImg);
    pankeiks.depth = gameOver.depth-5;
    pankeiks.scale = 0.9;
    pankeiks.visible = false;
    


 
}

function draw() {
    background(backgroundImage);

    console.log("estado de juego: ", gameState);
    console.log("esto es estado de aña", aña);
    añaSound = 5;
    

    if(gameState == serve){
        tittle.visible = true;
        play_button.visible = true;
        gameOver.visible = false;
        bird.visible = false;

        
        if(keyDown("j")) {
            aña = aña_state;
        }


        if(keyDown("space")){
            gameState = play;
    
    
        }

    }

    

    if(gameState == play){
25
        //cambio de visibiliadad para objetos de serve 
        tittle.visible = false;
        play_button.visible = false;
        devname.visible = false;

        bird.visible = true;

        spawnDownBarrier();
        spawnUpBarrier();
        

        //movimiento del suelo
        base.velocityX = -8;
        if (base.x < 350){
            base.x = base.width/2;
          }


        //salto del pajaro
        if(keyDown("space")){
            bird.velocityY = -15;
        }

        //gravedad del pajaro 

        bird.velocityY = bird.velocityY + 0.9;


        //cambio de estao a end
        if (bird.isTouching(base)) {
            gameState = end;
            
        }

        if(barrierGroup.isTouching(bird) || UPbarrierGroup.isTouching(bird)){
            gameState = end;
        }
        
        
    }

    if (gameState == end) {
        base.velocityX = 0;
        if(gameState == end && aña != aña_state){
            gameOver.visible = true;
        }
        UPbarrierGroup.setVelocityXEach(0);
        barrierGroup.setVelocityXEach(0);
        bird.velocityY = 0

        if (keyDown("a")) {
            gameState = serve;
            UPbarrierGroup.destroyEach();
            barrierGroup.destroyEach();
            pankeiks.visible = false;
            aña = no_aña;
        }

        if (aña == aña_state && !ConditionMed) {
           ConditionMed = true;
           gameOver.visible = false; 
           pankeiks.visible = true;
           pankeiksSound.play();
           
           
        }
            
          


    }

    
    bird.collide(base);
    drawSprites();
 
}

function spawnDownBarrier() {
var altura = Math.round(random(windowHeight/2, windowHeight)); 
    //aparecer los barrier a distintas alturas 
    if(frameCount % 130 === 0){
        barrier = createSprite(windowWidth*1.2, windowHeight*0.95, 50, altura); 
        barrier.velocityX = -8;
        barrier.scale = 2.5;
        barrier.depth = base.depth-1;
        barrier.lifetime = windowWidth;
        barrier.addImage("barrier", barrierImg);

        barrierGroup.add(barrier);

    }


    
}

function spawnUpBarrier() {
    if (frameCount % 180 === 0) {
        UPbarrier = createSprite(windowWidth*1.2, windowHeight-(windowHeight+100), 50, windowHeight*0.3);
        UPbarrier.velocityX = -8;
        UPbarrier.scale = 2.5;
        UPbarrier.depth = base.depth-1;
        UPbarrier.lifetime = windowWidth;
        UPbarrier.addImage("UpBarrier", UPbarrierImg);

        UPbarrierGroup.add(UPbarrier);
    }
}





