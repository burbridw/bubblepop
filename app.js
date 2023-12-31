const canvasContainer = document.querySelector(".canvas-container")
const canvas1 = document.getElementById("canvas1")
const ctx = canvas1.getContext("2d")
canvas1.height = window.innerHeight
window.innerWidth > window.innerHeight ?  canvas1.width = window.innerHeight : canvas1.width = window.innerWidth

const canvas2 = document.getElementById("canvas2")
const ctx2 = canvas2.getContext("2d")
canvas2.height = canvas1.height
canvas2.width = canvas1.width

function resizeCanvasContainer() {
    let vh = window.innerHeight
    let vw = window.innerWidth
    if ( window.innerWidth > window.innerHeight ){
        canvasContainer.style.setProperty("width",`${vh}px`)
    } else {
        canvasContainer.style.setProperty("width",`${vw}px`)
    }
}

resizeCanvasContainer()

let bubblesArr = []
const frameSize = 512
const centerOffSetX = frameSize/4
const centerOffSetY = frameSize/4
const gravity = {
    x: 0,
    y: 0.1
}

const playerImages = ["redfish","bluefish","greenfish", "yellowfish"]
const bubbleSizes = ["smaller","small","big","bigger"]
const bubbleSizesActual = [8,6,5,4]

const bubbleSizeMinus = document.querySelector(".bubble-size-minus")
const bubbleSizePlus = document.querySelector(".bubble-size-plus")
const bubbleSizeDisplay = document.querySelector(".bubble-size-display")

let gameMode
let round = 1
let bubbleCap = 8
let gameInProgress = false
let pauseAnimation = false
let nightLevel = false
let keepCount = true
let sendBubblesInterrupted = false
let audioOn = true
let frameCount = 0
let increment = 3675/5
let selectedWordList = []
let unselectedWordList = []
let challengeTopic
let modifiedList = []
let gameWordList = []
let correctWords = []
let currentBubbleSize = 1
let bubbleSizeModifier = 6
let bubbleFrame = canvas1.width/bubbleSizeModifier
let playerSize = bubbleFrame/2
let playerCollissionRange = playerSize/2
let score = 0
let health = 5
let poisoned = false
let mini = false
let bubbleSize = bubbleFrame*0.43
let currentPlayerImage = 0
let playerFish = playerImages[currentPlayerImage]
let imageLeft
let imageInv

setPlayerImages()

function setPlayerImages() {
    playerFish = playerImages[currentPlayerImage]
    imageLeft = document.getElementById(fishImages[playerFish][0].getAttribute("id"))
    imageInv = document.getElementById(fishImages[playerFish][1].getAttribute("id"))
}

function refreshSizes() {
    bubbleFrame = canvas1.width/bubbleSizeModifier
    playerSize = bubbleFrame/2
    if ( poisoned ) playerSize = bubbleFrame * 2
    if ( mini ) playerSize = bubbleFrame / 4
    playerCollissionRange = playerSize/2
    bubbleSize = bubbleFrame*0.43
}

const menuContainer = document.querySelector(".menu-container")
const preMenu = document.querySelector(".pre-menu")
const mainMenu = document.querySelector(".main-menu")
const topicMenu = document.querySelector(".topic-menu")
const topicMenuBody = document.querySelector(".topic-menu-body")
const readyScreen = document.querySelector(".ready-screen")
const inGameHud = document.querySelector(".in-game-hud")
const hBarDisplay = document.querySelector("#hbardisplay")
const scoreBarDisplay = document.querySelector("#scorebardisplay")
const scoreBarText = document.querySelector(".scorebar-text")
const playerSelectLeft = document.querySelector(".player-select-left")
const playerSelectRight = document.querySelector(".player-select-right")
const playerSelectImage = document.querySelector("#currentplayerimage")
const infoScreen = document.querySelector(".info-screen")
const infoScreenClose = document.querySelector(".info-screen-close")
const infoScreenButtons = document.querySelectorAll(".info-screen-button")
const settingsMenu = document.querySelector(".settings-menu")
const settingsMenuClose = document.querySelector(".settings-menu-close")
const settingsMenuButtons = document.querySelectorAll(".settings-menu-button")
const settingsRestart = document.querySelector(".settings-restart")
const settingsMainMenu = document.querySelector(".settings-mainmenu")

const mainMenuClose = document.querySelector(".main-menu-close")
const topicMenuClose = document.querySelector(".topic-menu-close")
const readyScreenClose = document.querySelector(".ready-screen-close")
const mainMenuButtons = document.querySelectorAll(".main-menu-button")
const readyScreenStart = document.querySelector(".ready-screen-start")
const gameOverDisplay = document.querySelector(".game-over-display")
const gameOverMenu = document.querySelector(".game-over-menu")
const gameOverRestart = document.querySelector(".game-over-restart")
const gameOverContinue = document.querySelector(".game-over-continue")
const gameOverText = document.querySelector(".game-over-text")
const audioOnButton = document.querySelector(".audio-on")
const audioOffButton = document.querySelector(".audio-off")

gameOverRestart.addEventListener("click",restartFromGameOver)
gameOverContinue.addEventListener("click",continueFromGameOver)
gameOverMenu.addEventListener("click",menuFromGameOver)
audioOnButton.addEventListener("click",audioSetOn)
audioOffButton.addEventListener("click",audioSetOff)

preMenu.addEventListener("click",openMainMenu)
mainMenuClose.addEventListener("click",closeMainMenu)
topicMenuClose.addEventListener("click",closeTopicMenu)
readyScreenClose.addEventListener("click",closeReadyScreen)
readyScreenStart.addEventListener("click",startGame)
settingsRestart.addEventListener("click",restartFromGameOver)
settingsMainMenu.addEventListener("click",menuFromGameOver)

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

function closePreMenu() {
    preMenu.classList.add("behind")
}
function openPreMenu() {
    preMenu.classList.remove("behind")
}

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
    pauseAnimation = false
    menuContainer.classList.add("behind")
    closeReadyScreen()
    closeTopicMenu()
    closeMainMenu()
    closePreMenu()
    game = new Game(canvas1)
    if ( round%3 === 0 ) {
        nightLevel = true
    } else {
        nightLevel = false
    }
    if ( audioOn ) startsound.play()
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
        selectedWordList = []
        selectObj[topic].forEach( word=>{
            selectedWordList.push(allObj[word])
        } )
        if ( gameMode === "normal" ) {
            unselectedWordList = []
            for ( const key in selectObj ) {
                if ( key != topic ) {
                    selectObj[key].forEach( word =>{
                        unselectedWordList.push(allObj[word])
                    })
                }
            }
        } 
        openReadyScreen()
    })
}

window.addEventListener("resize",()=>{
    setTimeout( ()=>{
        resizeCanvasContainer()
        canvas1.height = window.innerHeight
        window.innerWidth >= window.innerHeight ? canvas1.width = window.innerHeight : canvas1.width = window.innerWidth
        canvas2.height = canvas1.height
        canvas2.width = canvas1.width
        refreshSizes()
    },1)
})

canvas1.addEventListener("touchstart",touchCanvas)
canvas1.addEventListener("touchmove",touchCanvas)
function touchCanvas(event) {
    event.preventDefault()
    const canvasLoc = event.target.getBoundingClientRect()
    const touch = event.touches[0]
    mouseObj.x = touch.clientX - canvasLoc.x
    mouseObj.y = touch.clientY - canvasLoc.y
    mouseObj.click = true
}
canvas1.addEventListener("touchend",()=>{
    mouseObj.click = false
})

const mouseObj = {
    x: canvas1.width/2-1,
    y: canvas1.height/2,
    click: false
}
canvas1.addEventListener("mousemove",(e)=>{
    mouseObj.x = e.offsetX
    mouseObj.y = e.offsetY
})
canvas1.addEventListener("mousedown",()=>{
    mouseObj.click = true
})
window.addEventListener("mouseup",()=>{
    mouseObj.click = false
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
    target.image = popimage
    target.frameSize = 735
    if ( audioOn ) target.play()
    const popTimer = setInterval( ()=>{
        if ( target.sx < increment*5 ) {
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
        if ( score > 5 ) score = 5
        game.setScoreState(score)
        if ( score === 5 ) {
            gameInProgress = false
            setTimeout( ()=>{
                scoreGameOver()
            },3000)
        }
    } else {
        health--
        if ( health < 0 ) health = 0
        game.setHealthState(health)
        if ( health === 0 ) {
            gameInProgress = false
            health = 0
            setTimeout( ()=>{
                healthGameOver()
            },1500)
        }
    }
}
function detectPlayerPop() {
    bubblesArr.forEach( collider => {
        const collisionDistance = Math.hypot(game.player.x - (collider.x + collider.size/2), game.player.y - (collider.y + collider.size/2))
        if ( collisionDistance < playerCollissionRange + bubbleSize && collider.popped === false) {
            collider.popped = true
            if ( collider.isPoison ) {
                mini ? restoreSize() : becomePoisoned()
            }
            if ( collider.isStar ) {
                poisoned ? restoreSize() : makeMini()
            }
            if ( collider.isHeart && gameInProgress ) {
                 restoreSize()
                health < 5 ? health++ : health = 5
                game.setHealthState(health)
            }
            if ( collider.isRound && gameInProgress) {
                checkWord(collider.text)
            }
            bubblePop(collider)
        }
    })
}
function becomePoisoned() {
    poisoned = true
    playerSize = bubbleFrame * 1.5
    playerCollissionRange = playerSize/2
}
function restoreSize() {
    poisoned = false
    mini = false
    playerSize = bubbleFrame/2
    playerCollissionRange = playerSize/2
}
function makeMini() {
    mini = true
    playerSize = bubbleFrame/4
    playerCollissionRange = playerSize/2
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
    ctx2.clearRect( 0, 0, canvas1.width, canvas1.height)
    game.render(ctx)
    if ( frameCount === 61) {
        frameCount = 0
    }
    if ( !pauseAnimation ) requestAnimationFrame(animate)
}

function renderGame() {
    gameInProgress = true
    correctWords = []
    gameWordList = [...getGameWordList()]
    if ( gameMode != "challenge" ) {
        scoreBarText.textContent = correctWords[0]
    } else {
        scoreBarText.textContent = challengeTopic
    }
    inGameHud.classList.add("show-in-game-hud")
    game.sendBubbles()
    animate()
}

function healthGameOver() {
    pauseAnimation = true
    gameOverContinue.classList.add("behind")
    gameOverText.textContent = `Your game is over on round ${round}`
    gameOverDisplay.classList.add("show-game-over")
    inGameHud.classList.remove("show-in-game-hud")
}
function scoreGameOver() {
    pauseAnimation = true
    gameOverContinue.classList.remove("behind")
    gameOverText.textContent = `You have cleared round ${round} \n Continue to round ${round+1}?`
    gameOverDisplay.classList.add("show-game-over")
    inGameHud.classList.remove("show-in-game-hud")
}

function restartFromGameOver() {
    gameOverDisplay.classList.remove("show-game-over")
    settingsMenu.classList.add("behind")
    menuContainer.classList.add("behind")
    bubblesArr = []
    bubbleCap = 8
    correctWords = []
    round = 1
    health = 5
    game.setHealthState(health)
    score = 0
    game.setScoreState(score)
    frameCount = 0
    restoreSize()
    startGame()
}

function continueFromGameOver() {
    gameOverDisplay.classList.remove("show-game-over")
    bubblesArr = []
    correctWords = []
    score = 0
    game.setScoreState(score)
    frameCount = 0
    bubbleCap += 1
    round += 1
    startGame()
}

function menuFromGameOver() {
    gameOverDisplay.classList.remove("show-game-over")
    settingsMenu.classList.add("behind")
    ctx.clearRect(0,0,canvas1.width,canvas1.height)
    ctx2.clearRect(0,0,canvas1.width,canvas1.height)
    inGameHud.classList.remove("show-in-game-hud")
    bubblesArr = []
    bubbleCap = 8
    correctWords = []
    selectedWordList = []
    gameWordList = []
    score = 0
    game.setScoreState(score)
    health = 5
    game.setHealthState(health)
    round = 1
    frameCount = 0
    menuContainer.classList.remove("behind")
    restoreSize()
    openPreMenu()
}

function getGameWordList() {
    if ( gameMode === "easy" ) {
        const easyList = selectedWordList.sort( ()=> { return 0.5 - Math.random()} ).slice(0,10)
        correctWords.push(easyList[0])
        return [...easyList]
    } else if ( gameMode === "normal" ) {
        const oneWord = selectedWordList.sort( ()=>{ return 0.5 - Math.random()} ).slice(0,1)
        correctWords.push(oneWord[0])
        const randoms = unselectedWordList.sort( ()=>{ return 0.5 -Math.random()} ).slice(0,9)
        const returnArr = oneWord
        return returnArr.concat(randoms)
    } else {
        challengeTopic = topicList.sort( ()=> { return 0.5 - Math.random() } )[0]
        selectedWordList = []
        selectObj[topicTitles[challengeTopic]].forEach( word=>{
            selectedWordList.push(allObj[word])
        } )
        unselectedWordList = []
        for ( const key in selectObj ) {
            if ( key != topicTitles[challengeTopic] ) {
                selectObj[key].forEach( word =>{
                    unselectedWordList.push(allObj[word])
                })
            }
        }
        const fiveWords = selectedWordList.sort( ()=>{ return 0.5 - Math.random()} ).slice(0,5)
        correctWords.push(...fiveWords)
        const randoms = unselectedWordList.sort( ()=>{ return 0.5 - Math.random()} ).slice(0,15)
        return [...fiveWords,...randoms]
    }
}

playerSelectLeft.addEventListener("click",()=>{
    currentPlayerImage--
    if ( currentPlayerImage < 0 ) {
        currentPlayerImage = 3
    }
    setCurrentPlayerImage()
})
playerSelectRight.addEventListener("click",()=>{
    currentPlayerImage++
    if ( currentPlayerImage > 3 ) {
        currentPlayerImage = 0
    }
    setCurrentPlayerImage()
})

function setCurrentPlayerImage() {
    const getImage = fishImages[playerImages[currentPlayerImage]][2].getAttribute("src")
    playerSelectImage.setAttribute("src",getImage)
    setPlayerImages()
    if ( game ) {
        game.player.imageleft = fishImages[playerImages[currentPlayerImage]][0]
        game.player.imageinv = fishImages[playerImages[currentPlayerImage]][1]
    }
}

function setCurrentBubbleSize() {
    bubbleSizeDisplay.textContent = bubbleSizes[currentBubbleSize]
    bubbleSizeModifier = bubbleSizesActual[currentBubbleSize]
    refreshSizes()
}
setCurrentBubbleSize()

bubbleSizeMinus.addEventListener("click",()=>{
    currentBubbleSize--
    if ( currentBubbleSize < 0 ) {
        currentBubbleSize = 3
    }
    setCurrentBubbleSize()
})
bubbleSizePlus.addEventListener("click",()=>{
    currentBubbleSize++
    if ( currentBubbleSize > 3 ) {
        currentBubbleSize = 0
    }
    setCurrentBubbleSize()
})

infoScreenButtons.forEach( button=>{
    button.addEventListener("click",()=>{
        openInfo(button.dataset.entrypoint)
    })
})

settingsMenuButtons.forEach( button=>{
    button.addEventListener("click",()=>{
        openSettings(button.dataset.entrypoint)
    })
})

function openSettings(entryPoint) {
    switch(entryPoint){
        case "mainmenu":
            mainMenu.classList.add("behind")
            settingsMenu.classList.remove("behind")
            settingsMenuClose.dataset.exitpoint = "mainmenu"
            break
        case "topicmenu":
            topicMenu.classList.add("behind")
            settingsMenu.classList.remove("behind")
            settingsMenuClose.dataset.exitpoint = "topicmenu"
            break
        case "readymenu": 
            readyScreen.classList.add("behind")
            settingsMenu.classList.remove("behind")
            settingsMenuClose.dataset.exitpoint = "readymenu"
            break
        case "gameover":
            gameOverDisplay.classList.add("behind")
            menuContainer.classList.remove("behind")
            settingsMenu.classList.remove("behind")
            settingsMenuClose.dataset.exitpoint = "gameover"
            break
        default:
            settingsShowGameButtons()
            pauseAnimation = true
            menuContainer.classList.remove("behind")
            settingsMenu.classList.remove("behind")
            settingsMenuClose.dataset.exitpoint = "game"
    }
}

settingsMenuClose.addEventListener("click",()=>{
    closeSettings(settingsMenuClose.dataset.exitpoint)
})

function closeSettings(exitPoint) {
    settingsMenu.classList.add("behind")
    settingsHideGameButtons()
    switch(exitPoint){
        case "mainmenu":
            mainMenu.classList.remove("behind")
            break
        case "topicmenu":
            topicMenu.classList.remove("behind")
            break
        case "readymenu":
            readyScreen.classList.remove("behind")
            break
        case "gameover":
            gameOverDisplay.classList.remove("behind")
            menuContainer.classList.add("behind")
            break
        default:
            menuContainer.classList.add("behind")
            pauseAnimation = false
            if ( sendBubblesInterrupted ) game.sendBubbles()
            animate()
    }
}

function settingsShowGameButtons() {
    settingsRestart.classList.remove("behind")
    settingsMainMenu.classList.remove("behind")
}
function settingsHideGameButtons() {
    settingsRestart.classList.add("behind")
    settingsMainMenu.classList.add("behind")
}
function openInfo(entryPoint) {
    switch(entryPoint){
        case "mainmenu":
            mainMenu.classList.add("behind")
            infoScreen.classList.remove("behind")
            infoScreenClose.dataset.exitpoint = "mainmenu"
            break
        case "topicmenu":
            topicMenu.classList.add("behind")
            infoScreen.classList.remove("behind")
            infoScreenClose.dataset.exitpoint = "topicmenu"
            break
        case "readymenu": 
            readyScreen.classList.add("behind")
            infoScreen.classList.remove("behind")
            infoScreenClose.dataset.exitpoint = "readymenu"
    }
}
infoScreenClose.addEventListener("click",()=>{
    closeInfo(infoScreenClose.dataset.exitpoint)
})

function closeInfo(exitPoint) {
    infoScreen.classList.add("behind")
    switch(exitPoint){
        case "mainmenu":
            mainMenu.classList.remove("behind")
            break
        case "topicmenu":
            topicMenu.classList.remove("behind")
            break
        case "readymenu":
            readyScreen.classList.remove("behind")
    }
}

function audioSetOn() {
    audioOffButton.classList.add("disabled")
    audioOnButton.classList.remove("disabled")
    audioOn = true
}
function audioSetOff() {
    audioOffButton.classList.remove("disabled")
    audioOnButton.classList.add("disabled")
    audioOn = false
}