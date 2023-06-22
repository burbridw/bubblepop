const ctx = canvas1.getContext("2d")
canvas1.width = window.innerWidth
canvas1.height = window.innerHeight
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

let frameCount = 0

let sourceWidth = 0
let startHeight = 0
let increment = 300
let pop = false
const offSet = increment/2

let bubbleY = window.innerHeight

ctx.drawImage(bubble, sourceWidth, startHeight, 300, 300,(window.innerWidth/2)-offSet, bubbleY, 300, 300)

function animate() {
    ctx.clearRect(0,0,canvas1.width,canvas1.height)
    ctx.drawImage(bubble, sourceWidth, startHeight, 300, 300,(window.innerWidth/2)-offSet, bubbleY, 300, 300)
    if ( frameCount%4 === 0 && pop) {
        sourceWidth += increment
        console.log(sourceWidth)
    }
    bubbleY -= 3
    frameCount++
    if ( bubbleY < (0-offSet)*2 ) {
        bubbleY = window.innerHeight
    }
    if (sourceWidth < 1200 ) {
        requestAnimationFrame(animate)
    } else {
        pop = false
        sourceWidth = 0
        ctx.clearRect(0,0,canvas1.width,canvas1.height)
        // ctx.drawImage(bubble, sourceWidth, startHeight, 300, 300,(window.innerWidth/2)-offSet, bubbleY, 300, 300)
        // requestAnimationFrame(animate)
    }
}
animate()
// frameCount++

// function drawCanvas() {
//     ctx.drawImage(bubble, 0, 0, 300, 300, 0, 0, 600, 600)
// }

// , startWidth+increment, startHeight+increment, 0, 0, canvas1.width, canvas1.height

window.addEventListener("click",()=>{
    pop = true
})