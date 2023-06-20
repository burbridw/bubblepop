window.addEventListener("load",()=>{
    const ctx = canvas1.getContext("2d")
    canvas1.width = 500
    canvas1.height = 500

    class game {
        constructor(width, height) {
            this.width = width
            this.height = height
        }
        update() {

        }
        draw() {

        }
    }
})

class bubble {
    constructor(game){
        this.game = game
        this.width = 300
        this.height = 300
    }
}



function drawCanvas() {
    ctx.drawImage(bubble, 0, 0, 300, 300, 0, 0, 300, 300)
}

drawCanvas()