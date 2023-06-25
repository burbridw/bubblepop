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

class Bubbles {
    constructor() {
        // this.size = (Math.random() * 325) + 25
        this.size = 300
        this.x = Math.random()*(window.innerWidth-this.size)
        // this.x = this.size*(Math.random()*((window.innerWidth/this.size)-this.size))
        this.y = window.innerHeight + this.size
        this.sx = sourceWidth
        this.speedX = 0
        this.speedY = 2*(this.size/300)
        this.image = bubble
        this.text = "things"
    }
    update() {
        // this.x += this.speedX
        if ( this.speedX > 0 ) {
            this.speedX -= 0.005
            console.log(this.speedX)
        } else if ( this.speedX < 0 ) {
            this.speedX += 0.005
        }
        this.y -= this.speedY
        this.x += this.speedX
    }
    draw() {
    ctx.drawImage(this.image, this.sx, startHeight, 300, 300, this.x, this.y, this.size, this.size)
    if ( this.size > 200 ) {
        ctx.fillStyle = "white"
        ctx.font = "30px Arial"
        ctx.textBaseline = "middle"
        ctx.textAlign = "center"
        ctx.fillText(this.text,this.x+(this.size/2)-20,this.y+(this.size/2)-10)
    }
    // ctx.beginPath()
    // ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
    // ctx.fillStyle = "yellow"
    // ctx.fill()
    }
}

function gen() {
    for ( let i = 0; i < 3; i++ ) {
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
        if ( event.x > popper.x && event.x < popper.x+popper.size && event.y > popper.y && event.y < popper.y+popper.size) {
            bubblePop(popper)
        }
    })
})


function bubblePop(target) {
    const popTimer = setInterval( ()=>{
        if ( target.sx < 1200 ) {
            target.sx += increment
        } else {
            clearInterval(popTimer)
            bubblesArr.splice(bubblesArr.indexOf(target),1)
            bubblesArr.push(new Bubbles)
        }
    },50)
}

function detectCollission() {
    bubblesArr.forEach( collider=>{
        bubblesArr.forEach( other=> {
            if ( bubblesArr.indexOf(collider)!=bubblesArr.indexOf(other) ) {
                const collisionDistance = Math.hypot(collider.x - other.x, collider.y, other.y)
                console.log(collisionDistance)
            }
        })
    })
}

window.addEventListener("click",detectCollission)


// function sendBubbles() {
//     const bubbleFlow = setInterval( ()=>{
//         bubblesArr.push( new Bubbles)
//         if (bubblesArr.length > 25) {
//             clearInterval(bubbleFlow)
//         }
//     },1000)
// }

// sendBubbles()

let frameCount = 0

let sourceWidth = 0
let startHeight = 0
let increment = 300
let pop = false
const offSet = increment/2

let bubbleY = window.innerHeight

// ctx.drawImage(bubble, sourceWidth, startHeight, 300, 300,(window.innerWidth/2)-offSet, bubbleY, 300, 300)

function animate() {
    frameCount++
    ctx.clearRect( 0, 0, canvas1.width, canvas1.height)
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
gen()
animate()
// frameCount++

// function drawCanvas() {
//     ctx.drawImage(bubble, 0, 0, 300, 300, 0, 0, 600, 600)
// }

// , startWidth+increment, startHeight+increment, 0, 0, canvas1.width, canvas1.height

window.addEventListener("touchmove",(event)=>{
    event.preventDefault()
})