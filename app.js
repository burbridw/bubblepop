const ctx = canvas1.getContext("2d")
canvas1.width = window.innerWidth
canvas1.height = window.innerHeight
const bubblesArr = []
// window.addEventListener("load",()=>{
//     class game {
//         constructor(width, height) {
//             this.width = width
//             this.height = height
//         }
//         update() {

//         }
//         draw() {

//         }
//     }
// })

// class bubble {
//     constructor(game){
//         this.game = game
//         this.width = 300
//         this.height = 300
//     }
// }

// const bubble = document.getElementById("bubble")

const centerOffSetX = 128
const centerOffSetY = 128

class Bubbles {
    constructor() {
        // this.size = (Math.random() * 325) + 25
        this.size = 256
        this.x = Math.random()*(window.innerWidth-this.size)
        // this.x = this.size*(Math.random()*((window.innerWidth/this.size)-this.size))
        this.y = window.innerHeight + this.size
        this.sx = sourceWidth
        this.speedX = Math.random()*3 -1.5
        this.speedY = Math.random()*1 + 2
        this.image = bubble
        this.speedMod = Math.random()*1.5 - 1
        // this.text = "things"
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
        if ( this.speedY < 2+this.speedMod ) {
            this.speedY += 0.03
        }
        if ( this.speedY > 2+this.speedMod ) {
            this.speedY -= 0.05
        }
        this.y -= this.speedY
        this.x += this.speedX
    }
    draw() {
    ctx.drawImage(this.image, this.sx, startHeight, increment, 512, this.x, this.y, this.size, this.size)
    // if ( this.size > 200 ) {
    //     ctx.fillStyle = "white"
    //     ctx.font = "30px Arial"
    //     ctx.textBaseline = "middle"
    //     ctx.textAlign = "center"
    //     ctx.fillText(this.text,this.x+(this.size/2)-20,this.y+(this.size/2)-10)
    // }
    // ctx.beginPath()
    // ctx.arc(this.x+centerOffSetX,this.y+centerOffSetY,91,0,Math.PI*2)
    // ctx.strokeStyle = "black"
    // ctx.stroke()
    }
}

function gen() {
    for ( let i = 0; i < 16; i++ ) {
        bubblesArr.push( new Bubbles() )
    }
}
function drawBubbles() {
    for ( let i = 0; i < bubblesArr.length; i++ ) {
        bubblesArr[i].update()
        bubblesArr[i].draw()
        if ( bubblesArr[i].y < 0-bubblesArr[i].size) {
            bubblesArr.splice(i,1)
            i--
            bubblesArr.push( new Bubbles)
        }
    }
}
canvas1.addEventListener("click",(event)=>{
    bubblesArr.forEach( popper=>{
        const mouseDistanceForPop = Math.hypot(event.x - (popper.x+centerOffSetX), event.y - (popper.y+centerOffSetY))
        if ( mouseDistanceForPop < 92) {
            bubblePop(popper)
        }
    })
})


function bubblePop(target) {
    const popTimer = setInterval( ()=>{
        if ( target.sx < increment*7 ) {
            target.sx += increment
        } else {
            clearInterval(popTimer)
            bubblesArr.splice(bubblesArr.indexOf(target),1)
            bubblesArr.push(new Bubbles)
        }
    },25)
}

function detectCollission() {
    bubblesArr.forEach( collider=>{
        bubblesArr.forEach( other=> {
            if ( bubblesArr.indexOf(collider)!=bubblesArr.indexOf(other) ) {
                const collisionDistance = Math.hypot((collider.x+centerOffSetX) - (other.x+centerOffSetX), (collider.y+centerOffSetY) - (other.y+centerOffSetY))
                if ( collisionDistance < 182) {
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

window.addEventListener("click",detectCollission)


function sendBubbles() {
    const bubbleFlow = setInterval( ()=>{
        bubblesArr.push( new Bubbles)
        if (bubblesArr.length > 8) {
            clearInterval(bubbleFlow)
        }
    },1000)
}

sendBubbles()

let frameCount = 0

let sourceWidth = 0
let startHeight = 0
let increment = 4096/8
let pop = false
const offSet = increment/2

let bubbleY = window.innerHeight

// ctx.drawImage(bubble, sourceWidth, startHeight, 300, 300,(window.innerWidth/2)-offSet, bubbleY, 300, 300)

function animate() {
    frameCount++
    ctx.clearRect( 0, 0, canvas1.width, canvas1.height)
    detectCollission()
    drawBubbles()
    if ( frameCount === 61) {
        frameCount = 0
    }
    requestAnimationFrame(animate)
}

// function animate() {
//     ctx.clearRect(0,0,canvas1.width,canvas1.height)
//     ctx.drawImage(bubble, sourceWidth, startHeight, 300, 300,(window.innerWidth/2)-offSet, bubbleY, 300, 300)
//     if ( frameCount%4 === 0 && pop) {
//         sourceWidth += increment
//         console.log(sourceWidth)
//     }
//     bubbleY -= 3
//     frameCount++
//     if ( bubbleY < (0-offSet)*2 ) {
//         bubbleY = window.innerHeight
//     }
//     if (sourceWidth < 1200 ) {
//         requestAnimationFrame(animate)
//     } else {
//         pop = false
//         sourceWidth = 0
//         ctx.clearRect(0,0,canvas1.width,canvas1.height)
//         // ctx.drawImage(bubble, sourceWidth, startHeight, 300, 300,(window.innerWidth/2)-offSet, bubbleY, 300, 300)
//         // requestAnimationFrame(animate)
//     }
// }
// gen()
animate()
// frameCount++

// function drawCanvas() {
//     ctx.drawImage(bubble, 0, 0, 300, 300, 0, 0, 600, 600)
// }

// , startWidth+increment, startHeight+increment, 0, 0, canvas1.width, canvas1.height

window.addEventListener("touchmove",(event)=>{
    event.preventDefault()
})