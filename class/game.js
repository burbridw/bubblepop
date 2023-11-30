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
    }
    sendBubbles() {
        const bubbleFlow = setInterval( ()=>{
            console.log("trigger sendBubbles")
            let newAdd = new Bubbles(bubble,false,false,false,true)
            bubblesArr.push( newAdd )
            if (bubblesArr.length > 8) {
                clearInterval(bubbleFlow)
            }
        },1000)
    }
    drawBubbles() {
        console.log("trigger drawBubbles")
            // bubblesArr[0].update()
            // bubblesArr[0].draw(ctx)
        for ( let i = 0; i < bubblesArr.length; i++ ) {
            bubblesArr[i].update()
            bubblesArr[i].draw(ctx)
            if ( bubblesArr[i].y < 0-bubblesArr[i].size || bubblesArr[i].y > window.innerHeight*1.5) {
                bubblesArr.splice(i,1)
                i--
                bubblesArr.push( this.chooseNewBubble() )
                // bubblesArr.push( new Bubbles(bubble,false,false) )
            }
        }
    }
    chooseNewBubble() {
        const randomNumber = Math.random()
        if ( randomNumber > 0.99 ) {
            console.log(randomNumber,"poison")
            return new Bubbles(poisonbubble,true,false,false,false)
        } else if ( randomNumber > 0.965 ) {
            console.log(randomNumber,"star")
            return new Bubbles(starbubble,false,true,false,false)
        } else if ( randomNumber > 0.94) {
            console.log(randomNumber,"heart")
            return new Bubbles(heartbubble,false,false,true,false)
        } else {
            console.log(randomNumber,"round")
            return new Bubbles(bubble,false,false,false,true)
        }
    }
}