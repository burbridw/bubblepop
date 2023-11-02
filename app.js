const ctx = canvas1.getContext("2d")
canvas1.width = window.innerWidth
canvas1.height = window.innerHeight

const bubblesArr = []

let gameMode

const menuContainer = document.querySelector(".menu-container")
const preMenu = document.querySelector(".pre-menu")
const mainMenu = document.querySelector(".main-menu")
const topicMenu = document.querySelector(".topic-menu")
const topicMenuBody = document.querySelector(".topic-menu-body")
const readyScreen = document.querySelector(".ready-screen")

const mainMenuClose = document.querySelector(".main-menu-close")
const topicMenuClose = document.querySelector(".topic-menu-close")
const readyScreenClose = document.querySelector(".ready-screen-close")
const mainMenuButtons = document.querySelectorAll(".main-menu-button")
const readyScreenStart = document.querySelector(".ready-screen-start")

preMenu.addEventListener("click",openMainMenu)
mainMenuClose.addEventListener("click",closeMainMenu)
topicMenuClose.addEventListener("click",closeTopicMenu)
readyScreenClose.addEventListener("click",closeReadyScreen)
readyScreenStart.addEventListener("click",startGame)

mainMenuButtons.forEach( button=>{
    button.addEventListener("click",()=>{
        gameMode = button.dataset.mode
        switch(gameMode){
            case "easy": 
                openTopicMenu()
                break
            case "normal":
                openTopicMenu()
                break
            case "challenge":
                openReadyScreen()
        }
    })
})

function openMainMenu() {
    preMenu.classList.add("behind")
    mainMenu.classList.remove("behind")
}
function closeMainMenu() {
    preMenu.classList.remove("behind")
    mainMenu.classList.add("behind")
}
function openTopicMenu() {
    mainMenu.classList.add("behind")
    topicMenu.classList.remove("behind")
}
function closeTopicMenu() {
    topicMenu.classList.add("behind")
    mainMenu.classList.remove("behind")
}
function openReadyScreen() {
    switch(gameMode) {
        case "challenge":
            readyScreen.classList.remove("behind")
            mainMenu.classList.add("behind")
            break
        default: 
            readyScreen.classList.remove("behind")
            topicMenu.classList.add("behind")
    }
}
function closeReadyScreen() {
    switch(gameMode) {
        case "challenge":
            readyScreen.classList.add("behind")
            mainMenu.classList.remove("behind")
            break
        default: 
            readyScreen.classList.add("behind")
            topicMenu.classList.remove("behind")
    }
}
function startGame() {
    readyScreen.classList.add("behind")
    mainMenu.classList.remove("behind")
    menuContainer.classList.add("behind")
    renderGame()
}

function generateTopicList(list) {
    list.forEach( topic=>{
        topicMenuBody.innerHTML += `<div class="topic-menu-button" data-topic="${topicTitles[topic]}">${topic}</div>`
    })
    document.querySelectorAll(".topic-menu-button").forEach( button=>{
        setTopicButtonListener(button)
    })
}

let gameWordList = []

generateTopicList(topicList)

function setTopicButtonListener(target) {
    target.addEventListener("click", ()=>{
        const topic = target.dataset.topic
        gameWordList = []
        selectObj[topic].forEach( word=>{
            gameWordList.push(allObj[word])
        } )
        console.log(gameWordList)
        openReadyScreen()
    })
}

window.addEventListener("resize",()=>{
    canvas1.width = window.innerWidth
    canvas1.height = window.innerHeight
    bubbleSize = ((window.innerWidth/8)/3)+((window.innerWidth/8)/32)
    bubbleFrame = window.innerWidth/8
    playerSize = bubbleFrame/2
    if ( gameInProgress ) {
        for ( let i = 0; i < bubblesArr.length; i++ ) {
            bubblesArr[i].update()
            bubblesArr[i].draw()
        }
        thePlayer.update()
        thePlayer.draw()
    }
    playerCollissionRange = playerSize/2
})

// const words = ["red","blue","green","bird","dog","cat","rice","bread","salad","car","bus","bike"]
// const correctWords = ["red","blue","green"]

let correctWords = []

const frameSize = 512
const centerOffSetX = frameSize/4
const centerOffSetY = frameSize/4
let bubbleFrame = window.innerWidth/8
let playerSize = bubbleFrame/2
let playerCollissionRange = playerSize/2

const gravity = {
    x: 0,
    y: 0.1
}

let bubbleSize = ((window.innerWidth/8)/3)+((window.innerWidth/8)/32)

canvas1.addEventListener("touchstart",touchCanvas)
canvas1.addEventListener("touchmove",touchCanvas)
function touchCanvas(event) {
    event.preventDefault()
    const touch = event.touches[0]
    mouseObj.x = touch.pageX
    mouseObj.y = touch.pageY
    mouseObj.click = true
}
canvas1.addEventListener("touchend",()=>{
    mouseObj.click = false
})

class Bubbles {
    constructor() {
        this.size = bubbleFrame
        this.x = Math.random()*(window.innerWidth-this.size)
        this.y = window.innerHeight + this.size
        this.sx = sourceWidth
        this.speedX = Math.random()*3 -1.5
        this.speedY = Math.random()*1 + 2
        this.image = bubble
        this.speedMod = Math.random()*1.5 - 1
        this.text = gameWordList[Math.floor(Math.random()*gameWordList.length)]
        this.popped = false
        this.drop = false
        this.gravity = 0
    }
    update() {
        if ( this.speedX > 0.5) {
            this.speedX -= 0.05
        }
        if ( this.speedX < -0.5 ) {
            this.speedX += 0.05
        }
        if ( this.x < 1 ) {
            this.speedX *= -1
        }
        if ( this.x > window.innerWidth-255) {
            this.speedX -= this.speedX*2
        }
        if ( this.speedY < 2+this.speedMod && !this.drop) {
            this.speedY += 0.03
        }
        if ( this.speedY > 2+this.speedMod && !this.drop) {
            this.speedY -= 0.05
        }
        this.speedY += this.gravity
        this.y -= this.speedY
        this.x += this.speedX
        this.size = bubbleFrame
    }
    draw() {
    ctx.drawImage(this.image, this.sx, startHeight, increment, 512, this.x, this.y, this.size, this.size)
    ctx.fillStyle = "white"
    ctx.font = "30px Architects Daughter"
    ctx.textBaseline = "middle"
    ctx.textAlign = "center"
    ctx.fillText(this.text,this.x+(this.size/2),this.y+(this.size/2))
    // ctx.beginPath()
    // ctx.arc(this.x+this.size/2,this.y+this.size/2,bubbleSize,0,Math.PI*2)
    // ctx.strokeStyle = "red"
    // ctx.stroke()
    // ctx.closePath()
    // ctx.beginPath()
    // ctx.moveTo(this.x,this.y)
    // ctx.lineTo(this.x+this.size, this.y)
    // ctx.lineTo(this.x+this.size, this.y+this.size)
    // ctx.lineTo(this.x,this.y+this.size)
    // ctx.lineTo(this.x,this.y)
    // ctx.stroke()
    }
}

const mouseObj = {
    x: window.innerWidth/2-1,
    y: window.innerHeight/2,
    click: false
}

window.addEventListener("mousemove",(e)=>{
    mouseObj.x = e.x
    mouseObj.y = e.y
})

class Player {
    constructor() {
        this.size = playerSize
        this.x = window.innerWidth/2
        this.y = window.innerHeight/2
        this.image = playerimageleft
        this.sx = 0
        this.sy = 0
        this.width = 1992/4
        this.height = 967/3
        this.angle = 0
    }
    update() {
        const dx = this.x - mouseObj.x
        const dy = this.y - mouseObj.y
        let theta = Math.atan2(dy, dx)
        this.angle = theta
        if ( mouseObj.click ) {
            this.x -= dx/40
            this.y -= dy/40
        }
        this.size = playerSize
    }
    draw() {
        if ( this.x > mouseObj.x ) {
            this.image = playerimageleft
        } else {
            this.image = playerimageinv
        }
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.rotate(this.angle)
        ctx.drawImage(this.image, this.sx, this.sy, this.width, this.height, 0-playerSize/2, 0-playerSize/2, this.size, this.size)
        ctx.restore()
        // ctx.beginPath()
        // ctx.arc(this.x, this.y, playerCollissionRange,0,Math.PI*2)
        // ctx.strokestyle = "black"
        // ctx.stroke()
        // ctx.beginPath()
        // ctx.moveTo(this.x,this.y)
        // ctx.lineTo(this.x+bubbleFrame,this.y)
        // ctx.lineTo(this.x+bubbleFrame, this.y+bubbleFrame)
        // ctx.lineTo(this.x, this.y+bubbleFrame)
        // ctx.lineTo(this.x,this.y)
        // ctx.strokeStyle = "black"
        // ctx.stroke()
    }
}


const thePlayer = new Player

canvas1.addEventListener("mousedown",()=>{
    mouseObj.click = true
})
window.addEventListener("mouseup",()=>{
    mouseObj.click = false
})



function drawPlayer() {
    thePlayer.update()
    thePlayer.draw()
}

function drawBubbles() {
    for ( let i = 0; i < bubblesArr.length; i++ ) {
        bubblesArr[i].update()
        bubblesArr[i].draw()
        if ( bubblesArr[i].y < 0-bubblesArr[i].size || bubblesArr[i].y > window.innerHeight*1.5) {
            bubblesArr.splice(i,1)
            i--
            bubblesArr.push( new Bubbles)
        }
    }
}
function gen() {
    for ( let i = 0; i < 16; i++ ) {
        bubblesArr.push( new Bubbles() )
    }
}

// canvas1.addEventListener("click",(event)=>{
//     bubblesArr.forEach( popper=>{
//         const mouseDistanceForPop = Math.hypot(event.x - (popper.x+centerOffSetX), event.y - (popper.y+centerOffSetY))
//         if ( mouseDistanceForPop < 92) {
//             bubblePop(popper)
//         }
//     })
// })
            

function bubblePop(target) {
    const popTimer = setInterval( ()=>{
        if ( target.sx < increment*8 ) {
            target.sx += increment
        } else {
            clearInterval(popTimer)
            target.drop = true
            dropDown(target)
            // bubblesArr.splice(bubblesArr.indexOf(target),1)
            // bubblesArr.push(new Bubbles)
        }
    },25)
}
function dropDown(target) {
    target.drop = true
    target.gravity = -0.2
}
let score = 0 

function checkWord(text) {
    if ( correctWords.includes(text) ) {
        score++
        console.log("Correct word", score)
    } else {
        score--
        console.log("Wrong word", score)
    }
}
function detectPlayerPop() {
    bubblesArr.forEach( collider => {
        const collisionDistance = Math.hypot(thePlayer.x - (collider.x + collider.size/2), thePlayer.y - (collider.y + collider.size/2))
        if ( collisionDistance < playerCollissionRange + bubbleSize && collider.popped === false) {
            collider.popped = true
            bubblePop(collider)
            checkWord(collider.text)
        }
    })
}

function detectCollission() {
    bubblesArr.forEach( collider=>{
        bubblesArr.forEach( other=> {
            if ( bubblesArr.indexOf(collider)!=bubblesArr.indexOf(other) && !collider.drop && !other.drop) {
                const collisionDistance = Math.hypot((collider.x+centerOffSetX) - (other.x+centerOffSetX), (collider.y+centerOffSetY) - (other.y+centerOffSetY))
                if ( collisionDistance < bubbleSize*2) {
                    if ( collider.x > other.x) {
                        collider.speedX += 0.2
                        other.speedX -= 0.2
                    } else {
                        collider.speedX -= 0.2
                        other.speedX += 0.2
                    }
                    if ( collider.y > other.y ) {
                        collider.speedY -= 0.2
                        other.speedY += 0.2
                    } else {
                        collider.speedY += 0.2
                        other.speedY -= 0.2
                    }
                }
            }
        })
    })
}

let playerFrameCol = 0
let playerFrameRow = 0

function playerSwimAnimation() {
    if ( frameCount%6 === 0 ) {
        playerFrameCol++
        if ( playerFrameCol > 3) {
            playerFrameRow++
            playerFrameCol = 0
        }
        if ( playerFrameRow > 2 ) {
            playerFrameRow = 0
        }
        thePlayer.sx = (thePlayer.width*playerFrameCol)
        thePlayer.sy = (thePlayer.height*playerFrameRow)
    }
}

function sendBubbles() {
    const bubbleFlow = setInterval( ()=>{
        bubblesArr.push( new Bubbles)
        if (bubblesArr.length > 8) {
            clearInterval(bubbleFlow)
        }
    },1000)
}

let frameCount = 0

let sourceWidth = 0
let startHeight = 0
let increment = 4096/8
let pop = false
const offSet = increment/2

let bubbleY = window.innerHeight

function animate() {
    frameCount++
    ctx.clearRect( 0, 0, canvas1.width, canvas1.height)
    playerSwimAnimation()
    detectCollission()
    detectPlayerPop()
    drawBubbles()
    drawPlayer()
    if ( frameCount === 61) {
        frameCount = 0
    }
    requestAnimationFrame(animate)
}

// animate()

window.addEventListener("touchmove",(event)=>{
    event.preventDefault()
})

let gameInProgress = false

function renderGame() {
    gameInProgress = true
    const targetWord = gameWordList[Math.floor(Math.random()*gameWordList.length)]
    correctWords.push(targetWord)
    console.log("The correct word is ", correctWords[0])
    drawPlayer()
    sendBubbles()
    animate()
}