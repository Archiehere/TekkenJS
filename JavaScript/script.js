const BGcanvas = document.getElementById('myCanvas');
const BGctx = BGcanvas.getContext('2d');
BGcanvas.width = window.innerWidth;
BGcanvas.height = window.innerHeight;
let prevposition = 0;
let prevposition2 = 0;
let position;
let position2;
let keyamt1 = 0, keyamt2 = 0;

let x = 0;
const staggerFrames = 5;
let y = 0;
let velocityX = 150; //should be same as initial position of player for smooth start
let velocityY = 380;
let velocityX2 = 1000; //should be same as initial position of player for smooth start
let velocityY2 = 380;
let gravity = 380;
let canJump = true;
let canJump2 = true;
let canKickOne = true;
let canKickTwo = true;
let canPunchOne = true;
let canPunchTwo = true;
let maxSpeed = 2;
let keysPressed = [];
let gameStartFlag = false; // for 3 sec in starting

let readyWinText = document.getElementById('ready-win-text');
let pauseText = document.getElementById('pause-text');
let startPage = document.getElementById('start-page');

// Temporary variable for player one health
let playerOne = {
    health: 100,
    healthBar: document.getElementById('health-one')
}

let playerTwo = {
    health: 100,
    healthBar: document.getElementById('health-two')
}

let isPlay = true;


// Timer
let matchTimeInterval;
function startTimer() {
    let timer = document.getElementById('timer');
    let time = 1;
    prevtimeInterval = setInterval(function () {
        // pauseText.style.display = 'none';
        readyWinText.style.display = 'block';
        time--;
        if (time === 0) {
            clearInterval(prevtimeInterval);
            time = 60;
            matchTimeInterval = setInterval(function () {
                // pauseText.style.display = 'none';
                readyWinText.style.display = 'none';
                time = Math.max(time, 0);
                timer.innerText = time;
                gameStartFlag = true;
                if (isPlay) {
                    time--;
                }
                if (time === -1) {
                    gameStartFlag = false;
                    winner();
                    clearInterval(matchTimeInterval);
                }
            }, 1000);
        }
    }, 1000);
}




// Event Listeners

window.addEventListener('keydown', function (event) {
    if (isPlay) {
        switch (event.key.toLocaleLowerCase()) {
            case 'w':
                keysPressed[event.key] = true;
                break;
            case 'a':
                keysPressed[event.key] = true;
                break;
            case 's':
                keysPressed[event.key] = true;
                break;
            case 'd':
                keysPressed[event.key] = true;
                break;
            case 'j':
                keysPressed[event.key] = true;
                break;
            case 'l':
                keysPressed[event.key] = true;
                break;
            case 'i':
                keysPressed[event.key] = true;
                break;
            case 'k':
                keysPressed[event.key] = true;
                break;
            case 'h':
                keyamt2++;
                // if (keyamt2 > 1)
                    keysPressed[event.key] = true;
                break;
            case 'f':
                keyamt1++;
                // if (keyamt1 > 1)
                    keysPressed[event.key] = true;
                break;
            case 'r':
                keyamt1++;
                // if (keyamt1 > 1)
                    keysPressed[event.key] = true;
                break;
            case 'u':
                keyamt2++;
                // if (keyamt2 > 1)
                    keysPressed[event.key] = true;
                break;
        }
    }
    if(event.key.toLocaleLowerCase() == 'enter' && gameStartFlag == true) {
        if(isPlay) {
            isPlay = false;
            pauseText.style.display = 'block';
            console.log(pauseText);
        } else {
            isPlay = true;
            pauseText.style.display = 'none';
        }
    }
})

window.addEventListener('keyup', function (event) {

    switch (event.key.toLowerCase()) {
        case 'w':
            keysPressed[event.key] = false;
            playerState = "idle";
            break;
        case 'a':
            keysPressed[event.key] = false;
            playerState = "idle";
            break;
        case 's':
            keysPressed[event.key] = false;
            playerState = "idle";
            break;
        case 'd':
            keysPressed[event.key] = false;
            playerState = "idle";
            break;
        case 'f':
            keyamt1 = 0;
            keysPressed[event.key] = false;
            playerState = "idle";
            playerState2 = "idle";
            break;
        case 'r':
            keyamt1 = 0;
            keysPressed[event.key] = false;
            playerState = "idle";
            playerState2 = "idle";
            break;
        case 'j':
            keysPressed[event.key] = false;
            playerState2 = "idle";
            break;
        case 'l':
            keysPressed[event.key] = false;
            playerState2 = "idle";
            break;
        case 'i':
            keysPressed[event.key] = false;
            playerState2 = "idle";
            break;
        case 'k':
            keysPressed[event.key] = false;
            playerState2 = "idle";
            break;
        case 'h':
            keyamt2 = 0;
            keysPressed[event.key] = false;
            playerState2 = "idle";
            playerState = 'idle';
            break;
        case 'u':
            keyamt2 = 0;
            keysPressed[event.key] = false;
            playerState = "idle";
            playerState2 = "idle";
            break;
    }
});



let backgroundImage = new Image();
backgroundImage.src = "images/background/backgroundSprite.png"

let backgroundImageOver = new Image();
backgroundImageOver.src = "images/background/backgroundSprite-removebg.png"

let backgroundImage2 = new Image();
backgroundImage2.src = "images/background/background2.jpeg";

let backgroundImage3 = new Image();
backgroundImage3.src = "images/background/background3.jpeg";


function background(bgImage, isASprite) {
    if (isASprite) {
        BGctx.drawImage(backgroundImage, 10, 8, 419, 224, 0, 0, BGcanvas.width, BGcanvas.height);
        BGctx.drawImage(backgroundImage, 205, 255, 672, 33, 0, 570, BGcanvas.width, BGcanvas.height - 570);
        BGctx.drawImage(backgroundImageOver, 18, 340, 672, 200, 0, 0, BGcanvas.width, 580);
    } else {
        BGctx.drawImage(bgImage, 0, 0, BGcanvas.width, BGcanvas.height + 40);
    }
}

let playerState = 'intro';
let playerState2 = 'intro';
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
const CANVAS_WIDTH = canvas.width = canvas2.width = 250;
const CANVAS_HEIGHT = canvas.height = canvas2.height = 350;
const playerImage = new Image();
const playerImage2 = new Image();
playerImage.src = 'images/Ryu.gif';
playerImage2.src = 'images/Cammy.png';
let spriteWidth = 62;
let spriteHeight = 115;
let spriteWidth2 = 62;
let spriteHeight2 = 115;
let gameFrame = 0;

const spriteAnimations = [];
const spriteAnimations2 = [];

const animationStates2 = [
    {
        name: 'intro',
        frames: 6,
        framexposition: [75, 75, 158, 158, 241, 241, 326, 322, 322, 391, 391, 466, 466, 536, 536],
        frameswidth: [69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69],
        framesheight: [110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110],
        frameyposition: 240,
    },
    {
        name: 'idle',
        frames: 6,
        framexposition: [74, 164, 252, 340, 427, 507],
        frameswidth: [73, 73, 73, 73, 73, 73],
        framesheight: [110, 110, 110, 110, 110, 110],
        frameyposition: 240 + spriteHeight * 2,
    },
    {

        name: 'forward',
        frames: 10,
        framexposition: [72, 150, 229, 308, 375, 440, 510, 590, 668, 737, 536, 536],
        frameswidth: [78, 78, 78, 73, 68, 73, 73, 73, 73, 73, 73, 73],
        framesheight: [110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110],
        frameyposition: 240 + spriteHeight * 3,
    },
    {
        name: 'backward',
        frames: 5,
        framexposition: [110, 191, 265, 332, 391, 470],
        frameswidth: [55, 55, 55, 55, 55, 55],
        framesheight: [110, 110, 110, 110, 110, 110],
        frameyposition: 240 + spriteHeight * 4 + 10,
    },
    {
        name: 'jump',
        frames: 5,
        framexposition: [165, 237, 298, 360, 432, 432, 425, 504],
        frameswidth: [60, 60, 60, 60, 60, 73, 73],
        framesheight: [110, 110, 110, 110, 110, 110, 110],
        frameyposition: 240 + spriteHeight * 6 + 10,
    },
    {
        name: 'punch',
        frames: 4,
        framexposition: [358, 358, 450, 450, 450, 402, 517, 504],
        frameswidth: [80, 80, 140, 140, 80],
        framesheight: [110, 110, 110, 110, 110, 110, 110],
        frameyposition: 240 + spriteHeight * 12 + 7,
    },
    {
        name: 'kick',
        frames: 4,
        framexposition: [45, 45, 137, 223, 269, 342, 455, 535],
        frameswidth: [73, 73, 73, 130, 101, 73, 73],
        framesheight: [110, 110, 110, 110, 110, 110, 110],
        frameyposition: 240 + spriteHeight * 14 + 39,
    },
    {
        name: 'crouch',
        frames: 6,
        framexposition: [199, 199, 279, 279, 279, 279],
        frameswidth: [70, 70, 70, 70, 70, 70],
        framesheight: [110, 110, 110, 110, 110, 110],
        frameyposition: 240 + spriteHeight * 5 + 10,
    },
    {
        name: 'gethit',
        frames: 4,
        framexposition: [18, 18, 96, 96, 398, 88, 425, 504],
        frameswidth: [73, 73, 73, 73, 73, 73],
        framesheight: [110, 110, 110, 110, 110, 110],
        frameyposition: 240 + spriteHeight * 30 + 39,
    },
    {
        name: 'ko',
        frames: 1,
        framexposition: [9, 111, 240, 88, 425, 504],
        frameswidth: [90, 120, 110, 73, 73, 73],
        framesheight: [110, 110, 110, 110, 110, 110],
        frameyposition: 240 + spriteHeight * 34 + 25,
    }
];
const animationStates = [
    {
        name: 'intro',
        frames: 12,
        framexposition: [18, 92, 167, 246, 322, 322, 391, 391, 466, 466, 536, 536],
        frameswidth: [69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69],
        framesheight: [110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110],
        frameyposition: 0,
    },
    {
        name: 'idle',
        frames: 6,
        framexposition: [109, 189, 269, 349, 425, 504],
        frameswidth: [73, 73, 73, 73, 73, 73],
        framesheight: [110, 110, 110, 110, 110, 110],
        frameyposition: spriteHeight * 1,
    },
    {

        name: 'forward',
        frames: 6,
        framexposition: [63, 144, 226, 307, 376, 453],
        frameswidth: [70, 70, 70, 70, 70, 70],
        framesheight: [110, 110, 110, 110, 110, 110],
        frameyposition: spriteHeight * 2 - 8,
    },
    {
        name: 'backward',
        frames: 6,
        framexposition: [64, 140, 219, 292, 368, 455],
        frameswidth: [70, 70, 70, 70, 70, 70],
        framesheight: [110, 110, 110, 110, 110, 110],
        frameyposition: spriteHeight * 3 - 8,
    },
    {
        name: 'jump',
        frames: 7,
        framexposition: [36, 109, 189, 269, 349, 425, 504],
        frameswidth: [73, 73, 73, 73, 73, 73, 73],
        framesheight: [110, 110, 110, 110, 110, 110, 110],
        frameyposition: spriteHeight * 4,
    },
    {
        name: 'punch',
        frames: 6,
        framexposition: [25, 106, 189, 309, 402, 517, 504],
        frameswidth: [80, 80, 108, 80, 108, 80, 80],
        framesheight: [110, 110, 110, 110, 110, 110, 110],
        frameyposition: spriteHeight * 7 + 5,
    },
    {
        name: 'kick',
        frames: 6,
        framexposition: [5, 96, 175, 269, 342, 455, 535],
        frameswidth: [73, 73, 90, 73, 101, 73, 73],
        framesheight: [110, 110, 110, 110, 110, 110, 110],
        frameyposition: spriteHeight * 8,
    },
    {
        name: 'crouch',
        frames: 4,
        framexposition: [8, 8, 88, 88, 425, 504],
        frameswidth: [73, 73, 73, 73, 73, 73],
        framesheight: [100, 100, 100, 100, 100, 100],
        frameyposition: spriteHeight * 5,
    },
    {
        name: 'gethit',
        frames: 3,
        framexposition: [222, 309, 398, 88, 425, 504],
        frameswidth: [73, 73, 73, 73, 73, 73],
        framesheight: [110, 110, 110, 110, 110, 110],
        frameyposition: spriteHeight * 21,
    },
    {
        name: 'ko',
        frames: 1,
        framexposition: [25, 156, 293, 88, 425, 504],
        frameswidth: [130, 130, 130, 73, 73, 73],
        framesheight: [110, 110, 110, 110, 110, 110],
        frameyposition: spriteHeight * 23,
    }
];

function drawCharacter() {
    animationStates.forEach((state) => {
        let frames = {
            loc: [],
        }
        for (let j = 0; j < state.frames; j++) {
            let positionx = state.framexposition[j];
            let positiony = state.frameyposition;
            frames.loc.push({ x: positionx, y: positiony, framewidth: state.frameswidth[j], frameheight: state.framesheight[j] });
        }
        spriteAnimations[state.name] = frames;
    });
    animationStates2.forEach((state) => {
        let frames = {
            loc: [],
        }
        for (let j = 0; j < state.frames; j++) {
            let positionx = state.framexposition[j];
            let positiony = state.frameyposition;
            frames.loc.push({ x: positionx, y: positiony, framewidth: state.frameswidth[j], frameheight: state.framesheight[j] });
        }
        spriteAnimations2[state.name] = frames;
    });
    update();

}
drawCharacter();




function update() {

    if (gameStartFlag) {
        if (keysPressed['f']) {
            playerState = "kick";
            if (velocityX > velocityX2 - CANVAS_WIDTH) {
                if (canKickOne) {
                    canKickOne = false;
                    canPunchOne = false;
                    let hitState = setInterval(function () {
                        if(keyamt1>1){
                        let tempHealth = playerTwo.health;
                        playerTwo.health -= 15;
                        playerTwo.health = Math.max(0, playerTwo.health);
                        playerState2 = "gethit";
                        playerTwo.healthBar.style.width = playerTwo.health + '%';
                        playerTwo.healthBar.style.marginLeft = 100 - playerTwo.health + '%';
                        if (playerTwo.health <= tempHealth - 15) {
                            // keysPressed['f'] = false;
                            clearInterval(hitState);
                            setTimeout(function () {
                                canKickOne = true;
                                canPunchOne = true;
                            }, 1000);}
                        }
                    }, 100)
                }
            }
        }


        if (keysPressed['r']) {
            playerState = "punch";
            if (!keysPressed['k']) {
                if (velocityX > velocityX2 - CANVAS_WIDTH) {
                    if (canPunchOne) {
                        canPunchOne = false;
                        canKickOne = false;
                        let hitState = setInterval(function () {
                            if(keyamt1>1){
                            let tempHealth = playerTwo.health;
                            playerTwo.health -= 10;
                            playerTwo.health = Math.max(0, playerTwo.health);
                            playerState2 = "gethit";
                            playerTwo.healthBar.style.width = playerTwo.health + '%';
                            playerTwo.healthBar.style.marginLeft = 100 - playerTwo.health + '%';
                            if (playerTwo.health <= tempHealth - 10) {
                                // keysPressed['r'] = false;
                                clearInterval(hitState);
                                setTimeout(function () {
                                    canPunchOne = true;
                                    canKickOne = true;
                                }, 800);}
                            }
                        }, 100)
                    }
                }
            }
        }

        if (keysPressed['d']) {
            if (!keysPressed['s']) {
                playerState = "forward";
                velocityX += 30;
                velocityX = Math.min(velocityX, velocityX2 - CANVAS_WIDTH / 2);
                canvas.style.left = velocityX + 'px';
            }

        }
        if (keysPressed['a']) {
            if (!keysPressed['s']) {
                playerState = "backward";
                velocityX -= 30;
                velocityX = Math.max(velocityX, 0);
                canvas.style.left = velocityX + 'px';
            }

        }
        if (keysPressed['w']) {
            playerState = "jump";
            if (canJump) {
                canJump = false;
                let jumpUp = setInterval(function () {
                    if (velocityY < 320) {
                        clearInterval(jumpUp)
                        let jumpDown = setInterval(function () {
                            if (velocityY >= 370) {
                                clearInterval(jumpDown);
                                canJump = true;
                            }
                            velocityY += 10;
                            canvas.style.top = velocityY + 'px';
                        }, 30)
                    }
                    velocityY -= 20;
                    canvas.style.top = velocityY + 'px';
                }, 40)
            }
        }
        if (keysPressed['s']) {
            playerState = "crouch";
            keysPressed['d'] = false;
            keysPressed['a'] = false;

        }
        if (keysPressed['l']) {
            if (!keysPressed['k']) {
                playerState2 = "backward";
                velocityX2 += 30;
                velocityX2 = Math.min(velocityX2, BGcanvas.width - 300);
                canvas2.style.left = velocityX2 + 'px';
            }

        }
        if (keysPressed['j']) {
            if (!keysPressed['k']) {
                playerState2 = "forward";
                velocityX2 -= 30;
                velocityX2 = Math.max(velocityX2, velocityX + CANVAS_WIDTH / 2);
                canvas2.style.left = velocityX2 + 'px';
            }

        }

        if (keysPressed['h']) {
            playerState2 = "kick";
            if (velocityX2 < velocityX + CANVAS_WIDTH) {
                if (canKickTwo) {
                    canKickTwo = false;
                    canPunchTwo = false;
                    let hitState = setInterval(function () {
                        if(keyamt2>1){
                        let tempHealth = playerOne.health;
                        playerOne.health -= 15;
                        playerOne.health = Math.max(0, playerOne.health);
                        playerState = "gethit";
                        playerOne.healthBar.style.width = playerOne.health + '%';
                        // hitElement.style.display = 'none';
                        if (playerOne.health <= tempHealth - 15) {
                            // keysPressed['h'] = false;
                            clearInterval(hitState);
                            setTimeout(function () {
                                canKickTwo = true;
                                canPunchTwo = true;
                            }, 1000);}
                        }
                    }, 100)
                }
            }
        }
        if (keysPressed['u']) {
            playerState2 = "punch";
            if (!keysPressed['s']) {
                if (velocityX2 < velocityX + CANVAS_WIDTH) {
                    if (canPunchTwo) {
                        canPunchTwo = false;
                        canKickTwo = false;
                        let hitState = setInterval(function () {
                            if(keyamt2>1){
                            let tempHealth = playerOne.health;
                            playerOne.health -= 10;
                            playerOne.health = Math.max(0, playerOne.health);
                            playerState = "gethit";
                            playerOne.healthBar.style.width = playerOne.health + '%';
                            if (playerOne.health <= tempHealth - 10) {
                                // keysPressed['u'] = false;
                                clearInterval(hitState);
                                setTimeout(function () {

                                    canPunchTwo = true;
                                    canKickTwo = true;
                                }, 800);}
                            }
                        }, 100)
                    }
                }
            }
        }

        if (keysPressed['i']) {
            playerState2 = "jump";
            if (canJump2) {
                canJump2 = false;
                let jumpUp2 = setInterval(function () {
                    if (velocityY2 < 320) {
                        clearInterval(jumpUp2)
                        let jumpDown2 = setInterval(function () {
                            if (velocityY2 >= 370) {
                                clearInterval(jumpDown2);
                                canJump2 = true;
                            }
                            velocityY2 += 10;
                            canvas2.style.top = velocityY2 + 'px';
                        }, 30)
                    }
                    velocityY2 -= 20;
                    canvas2.style.top = velocityY2 + 'px';
                }, 40)
            }
        }
        if (keysPressed['k']) {
            playerState2 = "crouch";
            keysPressed['l'] = false;
            keysPressed['j'] = false;

        }
    }
    if (playerOne.health == 0 || playerTwo.health == 0) {
        winner();
    }

}


function animate() {
    if (playerState == "gethit" || playerState == "ko") {
        canvas.style.transform = "scale(-1,1)";
    }
    else
        canvas.style.transform = "scale(1,1)";
    prevposition = position;
    prevposition2 = position2;
    position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
    position2 = Math.floor(gameFrame / staggerFrames) % spriteAnimations2[playerState2].loc.length;
    if (prevposition != position || prevposition2 != position2) {
        let framey = spriteAnimations[playerState].loc[position].y;
        let framex = spriteAnimations[playerState].loc[position].x;
        spriteWidth = spriteAnimations[playerState].loc[position].framewidth;
        spriteHeight = spriteAnimations[playerState].loc[position].frameheight;
        let framey2 = spriteAnimations2[playerState2].loc[position2].y;
        let framex2 = spriteAnimations2[playerState2].loc[position2].x;
        spriteWidth2 = spriteAnimations2[playerState2].loc[position2].framewidth;
        spriteHeight2 = spriteAnimations2[playerState2].loc[position2].frameheight;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        if(selimg=="sprite")
        background(backgroundImage3, true);
        else
        background(selimg, false);
        // ctx.drawImage(playerImage, framex, framey, spriteWidth, spriteHeight, 50, 50, spriteWidth*2.75, spriteHeight*2.75);
        ctx.drawImage(playerImage, framex, framey, spriteWidth, spriteHeight, 50, 50, CANVAS_WIDTH - 50, CANVAS_HEIGHT - 50);
        ctx2.drawImage(playerImage2, framex2, framey2, spriteWidth2, spriteHeight2, 50, 50, CANVAS_WIDTH - 50, CANVAS_HEIGHT - 50);
        canvas2.style.transform = "scale(-1,1)";

        update();
    }

    gameFrame++;

    let animater = requestAnimationFrame(animate);
};

function winner() {
    gameStartFlag = false;
    clearInterval(matchTimeInterval);
    if (playerOne.health > playerTwo.health) {
        playerState = 'idle';
        playerState2 = 'ko';
        readyWinText.innerText = 'RYU WINS';
        readyWinText.style.display = 'block';
    } else if (playerOne.health < playerTwo.health) {
        playerState2 = 'idle';
        playerState = 'ko';
        readyWinText.innerText = 'CAMMY WINS';
        readyWinText.style.display = 'block';
    } else {
        playerState2 = 'idle';
        playerState = 'idle';
        readyWinText.innerText = 'DRAW';
        readyWinText.style.display = 'block';
    }
}

//Map Select Screen
let active1 = document.getElementById('map1');
let active2 = document.getElementById('map2');
let active3 = document.getElementById('map3');
let showcase=document.getElementById('showcase');
let curimg;
let selimg;
active1.addEventListener('mouseover', function(){
    curimg=active1.style.backgroundImage
    showcase.style.backgroundImage=curimg;
})
active2.addEventListener('mouseover', function(){
    curimg=active2.style.backgroundImage
    showcase.style.backgroundImage=curimg;
})
active3.addEventListener('mouseover', function(){
    curimg=active3.style.backgroundImage
    showcase.style.backgroundImage=curimg;
})
active1.addEventListener('click', function(){
    selimg=backgroundImage2;
    setTimeout(() => {
        propertiesDisplayNormal();
    }, 100);
    // showcase.style.backgroundImage=selimg;
})
active2.addEventListener('click', function(){
    
    selimg=backgroundImage3;
    setTimeout(() => {
        propertiesDisplayNormal();
    }, 100);
    // showcase.style.backgroundImage=selimg;
})
active3.addEventListener('click', function(){
    
    selimg="sprite";
    setTimeout(() => {
        propertiesDisplayNormal();
    }, 100);
    // showcase.style.backgroundImage=selimg;
})

//map select end


function propertiesDisplayNormal() {
    let healthContainerOne = document.getElementById('health-container-one');
    let healthContainerTwo = document.getElementById('health-container-two');
    let timerContainer = document.getElementById('timer-container');
    let playerOneName = document.getElementById('player-one-name');
    let playerTwoName = document.getElementById('player-two-name');
    let readyWinContainer = document.getElementById('ready-win-container');
    let pauseTextContainer = document.getElementById('pause-text-container');
    let options = document.getElementById('options');
    let showcase = document.getElementById('showcase');
    let mapbg = document.getElementById('mapbg');

    healthContainerOne.style.display = 'block';
    healthContainerTwo.style.display = 'block';
    timerContainer.style.display = 'block';
    playerOneName.style.display = 'block';
    playerTwoName.style.display = 'block';
    readyWinContainer.style.display = 'flex';
    startPage.style.display = 'none';
    pauseTextContainer.style.display = 'flex';
    canvas.style.display="block";
    canvas2.style.display="block";
    options.style.display = 'none';
    showcase.style.display = 'none';
    mapbg.style.display = 'none';
    animate();
    startTimer();
}
function mappage(){
    let healthContainerOne = document.getElementById('health-container-one');
    let healthContainerTwo = document.getElementById('health-container-two');
    let timerContainer = document.getElementById('timer-container');
    let playerOneName = document.getElementById('player-one-name');
    let playerTwoName = document.getElementById('player-two-name');
    let readyWinContainer = document.getElementById('ready-win-container');
    let pauseTextContainer = document.getElementById('pause-text-container')
    let options = document.getElementById('options');
    let showcase = document.getElementById('showcase');
    let mapbg = document.getElementById('mapbg');
    
    

    healthContainerOne.style.display = 'none';
    healthContainerTwo.style.display = 'none';
    timerContainer.style.display = 'none';
    playerOneName.style.display = 'none';
    playerTwoName.style.display = 'none';
    readyWinContainer.style.display = 'none';
    startPage.style.display = 'none';
    pauseTextContainer.style.display = 'none';
    options.style.display = 'flex';
    showcase.style.display = 'block';
    mapbg.style.display = 'block';
    canvas.style.display="none";
    canvas2.style.display="none";

}


startPage.addEventListener('click', (e) => {

    // propertiesDisplayNormal();
    mappage();
})


// animate();
