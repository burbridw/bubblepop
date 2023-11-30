class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.width = canvas.width
        this.height = canvas.height
        this.player = new Player(this,this.canvas,playerSize,playerimageleft,playerimageinv)
        this.bubbleStates = [new Star(starbubble),new Heart(heartbubble),new RoundBubble(bubble)]
        this.bubbleState = this.bubbleStates[0]
    }
    render(context) {
        detectCollission()
        detectPlayerPop()
        playerSwimAnimation()
        this.drawBubbles()
        this.player.update()
        this.player.draw(context)
    }
    sendBubbles() {
        const bubbleFlow = setInterval( ()=>{
            bubblesArr.push(new Bubbles(this,this.canvas,bubble,bubbleFrame))
            if (bubblesArr.length > 8) {
                clearInterval(bubbleFlow)
            }
        },1000)
    }
    drawBubbles() {
        for ( let i = 0; i < bubblesArr.length; i++ ) {
            bubblesArr[i].update()
            bubblesArr[i].draw(ctx)
            if ( bubblesArr[i].y < 0-bubblesArr[i].size || bubblesArr[i].y > window.innerHeight*1.5) {
                bubblesArr.splice(i,1)
                i--
                bubblesArr.push( new Bubbles(this,this.canvas,bubble,bubbleFrame) )
            }
        }
    }
}