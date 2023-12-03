class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.width = canvas.width
        this.height = canvas.height
        this.player = new Player(this,this.canvas,playerSize,playerimageleft,playerimageinv)
    }
    render(context) {
        detectCollission()
        detectPlayerPop()
        playerSwimAnimation()
        this.drawBubbles()
        this.player.update()
        this.player.draw(context)
        console.log(bubbleFrame,bubbleSize)
    }
    sendBubbles() {
        const bubbleFlow = setInterval( ()=>{
            let newAdd = new Bubbles(bubble,frameSize,false,false,false,true)
            bubblesArr.push( newAdd )
            if (bubblesArr.length > 8) {
                clearInterval(bubbleFlow)
            }
        },1000)
    }
    drawBubbles() {
        for ( let i = 0; i < bubblesArr.length; i++ ) {
            const thisBubble = bubblesArr[i]
            thisBubble.update()
            thisBubble.draw(ctx)
            if ( thisBubble.y < 0-thisBubble.size || thisBubble.y > canvas1.height*1.5) {
                bubblesArr.splice(i,1)
                i--
                if ( score < 3 ) bubblesArr.push( this.chooseNewBubble() )
            }
        }
    }
    chooseNewBubble() {
        const randomNumber = Math.random()
        if ( randomNumber > 0.99 ) {
            return new Bubbles(poisonbubble,frameSize,true,false,false,false)
        } else if ( randomNumber > 0.965 ) {
            return new Bubbles(starbubble,frameSize,false,true,false,false)
        } else if ( randomNumber > 0.94) {
            return new Bubbles(heartbubble,frameSize,false,false,true,false)
        } else {
            return new Bubbles(bubble,frameSize,false,false,false,true)
        }
    }
}