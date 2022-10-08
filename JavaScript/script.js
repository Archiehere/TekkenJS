// Ratnesh commit
//ARCHAS COMMIT 
//commit 2

const BGcanvas = document.getElementById('myCanvas');
const BGctx = BGcanvas.getContext('2d');
BGcanvas.width = window.innerWidth;
BGcanvas.height = window.innerHeight;
let speed=6,leftlocation=150;
let toplocation=380;
// Event Listeners
window.addEventListener('keydown', function (event) {
    switch (event.key.toLocaleLowerCase()) {
        case 'w':
            // Event
            playerState="jump"
            while(toplocation>300)
            {toplocation-=speed;
            canvas.style.top= toplocation + "px";}

            break;
        case 'a':
            // Event
            playerState="backward";
            if(leftlocation>10)
            leftlocation-=speed;
            canvas.style.left= leftlocation + "px" ;
            break;
        case 's':
            // Event
            playerState="crouch";
            break;
        case 'd':
            // Event
            playerState="forward";
            if(leftlocation<1200)
            leftlocation+=speed;
            canvas.style.left= leftlocation + "px" ;
            break;
        case 'z':
            // Event
            playerState="kick";
            break;
        case 'x':
            // Event
            playerState="punch"
            break;
        case 'arrowleft':
            // Event
            playerState="forward";
            break;
        case 'arrowright':
            // Event
            playerState="backward";
            break;
        case 'arrowup':
            // Event
            playerState="jump";
            break;
        case 'arrowdown':
            // Event
            playerState="crouch";
            break;
        case 'n':
            // Event
            break;
        case 'm':
            // Event
            break;
    }
})
window.addEventListener('keyup', function (){
playerState="idle";
    while(toplocation!=380)
    {
        toplocation+=speed;
        canvas.style.top=toplocation + "px";
    }
})

let backgroundImage = new Image();
backgroundImage.src = "images/background/backgroundSprite.png"

let backgroundImageOver = new Image();
backgroundImageOver.src = "images/background/backgroundSprite-removebg.png"

function background() {
    BGctx.drawImage(backgroundImage, 10, 8, 419, 224, 0, 0, BGcanvas.width, BGcanvas.height);
    BGctx.drawImage(backgroundImage, 205, 255, 672, 33, 0, 570, BGcanvas.width, BGcanvas.height - 570);
    BGctx.drawImage(backgroundImageOver, 18, 340, 672, 200, 0, 0, BGcanvas.width, 580);
}

let playerState = 'intro';
// const dropdown = document.getElementById('animations');
// dropdown.addEventListener('change', function(e){
// playerState = e.target.value;
// })
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 250;
const CANVAS_HEIGHT = canvas.height = 350;
const playerImage = new Image();
playerImage.src = 'images/Ryu.gif';
let spriteWidth = 62;
let spriteHeight =  115;
let gameFrame = 0;
const staggerFrames = 20;
const spriteAnimations = [];
const animationStates =[
    {
    name: 'intro',
    frames: 12,
    framexposition: [18 , 92 , 167 ,246 ,322,322 ,391 ,391,466 ,466 ,536, 536]  ,
    frameswidth:    [69 , 69 , 69  ,69  ,69 ,69  ,69  ,69 ,69  ,69  , 69, 69 ] ,
    framesheight:   [110, 110, 110 ,110 ,110,110 ,110, 110,110, 110 ,110, 110] ,
    frameyposition: 0,
    },
    {
    name: 'idle',
    frames: 6,
    framexposition: [109 , 189 , 269 ,349 ,425 ,504]  ,
    frameswidth:    [73  , 73  , 73  ,73  ,73  ,73 ] ,
    framesheight:   [110 , 110 , 110 ,110 ,110 ,110] ,
    frameyposition: spriteHeight*1,
    },
    {
    
    name: 'forward',
    frames: 6,
    framexposition: [63  , 144 , 226 ,307 ,376 ,453]  ,
    frameswidth:    [70  , 70  , 70  ,70  ,70  ,70 ] ,
    framesheight:   [110 , 110 , 110 ,110 ,110 ,110] ,
    frameyposition: spriteHeight*2,
    },
    {
        name: 'backward',
        frames: 6,
        framexposition: [64  , 140 , 219 ,292 ,368 ,455]  ,
        frameswidth:    [70  , 70  , 70  ,70  ,70  ,70 ] ,
        framesheight:   [110 , 110 , 110 ,110 ,110 ,110] ,   
        frameyposition: spriteHeight*3,
    },
    {
        name: 'jump',
        frames: 7,
        framexposition: [36  , 109 , 189 , 269 ,349 ,425 ,504]  ,
        frameswidth:    [73  , 73  , 73  , 73  ,73  ,73  ,73 ] ,
        framesheight:   [110 , 110 , 110 , 110 ,110 ,110 ,110] ,
        frameyposition: spriteHeight*4,
    },
    {
        name: 'punch',
        frames: 6,
        framexposition: [25  , 106 , 189 , 309 ,402 ,517 ,504]  ,
        frameswidth:    [80  , 80  , 108  , 80 ,108  ,80  ,80 ] ,
        framesheight:   [110 , 110 , 110 , 110 ,110 ,110 ,110] ,
        frameyposition: spriteHeight*7+5,
    },
    {
        name: 'kick',
        frames: 6,
        framexposition: [5  , 96  , 175 , 269 ,342 ,455 ,535]  ,
        frameswidth:    [73  , 73  , 90  , 73  ,101  ,73  ,73 ] ,
        framesheight:   [110 , 110 , 110 , 110 ,110 ,110 ,110] ,
        frameyposition: spriteHeight*8,
    },
    {
    name: 'crouch',
    frames: 4,
    framexposition: [8 , 8 , 88 ,88 ,425 ,504]  ,
    frameswidth:    [73  , 73  , 73  ,73  ,73  ,73 ] ,
    framesheight:   [110 , 110 , 110 ,110 ,110 ,110] ,
    frameyposition: spriteHeight*5,
    },
    {
        name: 'gethit',
        frames: 3,
        framexposition: [222 , 309 , 398 ,88 ,425 ,504]  ,
        frameswidth:    [73  , 73  , 73  ,73  ,73  ,73 ] ,
        framesheight:   [110 , 110 , 110 ,110 ,110 ,110] ,
        frameyposition: spriteHeight*21,
    },
    {
        name: 'ko',
        frames: 3,
        framexposition: [25 , 156 , 293 ,88 ,425 ,504]  ,
        frameswidth:    [130  , 130  , 130  ,73  ,73  ,73 ] ,
        framesheight:   [110 , 110 , 110 ,110 ,110 ,110] ,
        frameyposition: spriteHeight*23,
    }
    ];



animationStates.forEach((state, index) => {
        let frames = {
        loc: [],
        }
        for (let j = 0; j < state.frames; j ++){
        let positionx = state.framexposition[j];
        let positiony = state.frameyposition;
        frames.loc.push({x: positionx, y: positiony ,framewidth:state.frameswidth[j],frameheight:state.framesheight[j]});
        }
        spriteAnimations[state.name] = frames;
        });
        // console.log(spriteAnimations);
        // console.log(animationStates);
        function animate(){
            
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        background();
        let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
        // let framex = spacebeginning +(spriteWidth+spacebetween) * position;
        let framey = spriteAnimations[playerState].loc[position].y ;
        let framex = spriteAnimations[playerState].loc[position].x ;
        spriteWidth = spriteAnimations[playerState].loc[position].framewidth;
        spriteHeight = spriteAnimations[playerState].loc[position].frameheight;
        ctx.drawImage(playerImage, framex, framey, spriteWidth, spriteHeight, 50, 50,CANVAS_WIDTH-50,CANVAS_HEIGHT-50);
        gameFrame ++;
        requestAnimationFrame(animate);
        };
        animate();
