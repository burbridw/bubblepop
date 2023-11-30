const canvas1 = document.getElementById("canvas1")
const ctx = canvas1.getContext("2d")
canvas1.width = window.innerWidth
canvas1.height = window.innerHeight

const bubblesArr = []
const frameSize = 512
const centerOffSetX = frameSize/4
const centerOffSetY = frameSize/4
const gravity = {
    x: 0,
    y: 0.1
}

let gameMode
let gameInProgress = false
let frameCount = 0
let sourceWidth = 0
let startHeight = 0
let increment = 4096/8
let pop = false
const offSet = increment/2
let bubbleY = window.innerHeight
let gameWordList = []
let correctWords = []
let bubbleFrame = window.innerWidth/8
let playerSize = bubbleFrame/2
let playerCollissionRange = playerSize/2
let score = 0 

let bubbleSize = ((window.innerWidth/8)/3)+((window.innerWidth/8)/32)

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

let game

function startGame() {
    readyScreen.classList.add("behind")
    mainMenu.classList.remove("behind")
    menuContainer.classList.add("behind")
    game = new Game(canvas1)
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
    playerSize = window.innerWidth/16
    if ( gameInProgress ) {
        for ( let i = 0; i < bubblesArr.length; i++ ) {
            bubblesArr[i].update()
            bubblesArr[i].draw(ctx)
        }
        game.player.update()
        game.player.draw(ctx)
    }
    playerCollissionRange = playerSize/2
})

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

const mouseObj = {
    x: window.innerWidth/2-1,
    y: window.innerHeight/2,
    click: false
}
window.addEventListener("mousemove",(e)=>{
    mouseObj.x = e.x
    mouseObj.y = e.y
})
canvas1.addEventListener("mousedown",()=>{
    mouseObj.click = true
})
window.addEventListener("mouseup",()=>{
    mouseObj.click = false
})
window.addEventListener("touchmove",(event)=>{
    event.preventDefault()
})

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
        }
    },25)
}
function dropDown(target) {
    target.drop = true
    target.gravity = -0.2
}

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
        const collisionDistance = Math.hypot(game.player.x - (collider.x + collider.size/2), game.player.y - (collider.y + collider.size/2))
        if ( collisionDistance < playerCollissionRange + bubbleSize && collider.popped === false) {
            collider.popped = true
            console.log("isStar "+collider.isStar,"isHeart "+collider.isHeart)
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
        game.player.sx = (game.player.width*playerFrameCol)
        game.player.sy = (game.player.height*playerFrameRow)
    }
}

function animate() {
    frameCount++
    ctx.clearRect( 0, 0, canvas1.width, canvas1.height)
    game.render(ctx)
    if ( frameCount === 61) {
        frameCount = 0
    }
    requestAnimationFrame(animate)
}

function renderGame() {
    gameInProgress = true
    const targetWord = gameWordList[Math.floor(Math.random()*gameWordList.length)]
    correctWords.push(targetWord)
    console.log("The correct word is ", correctWords[0])
    game.sendBubbles()
    animate()
}
