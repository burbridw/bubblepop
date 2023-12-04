class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.width = canvas.width
        this.height = canvas.height
        this.player = new Player(this,this.canvas,playerSize,playerimageleft,playerimageinv)
        this.healthStates = [new bar0(this,this.canvas), new bar1(this,this.canvas), new bar2(this,this.canvas), new bar3(this,this.canvas), new bar4(this,this.canvas), new bar5(this,this.canvas)]
        this.healthbar = this.healthStates[5]
        this.healthbar.changeHp()
        this.scoreStates = [new tarbar0(this,this.canvas), new tarbar1(this,this.canvas), new tarbar2(this,this.canvas), new tarbar3(this,this.canvas), new tarbar4(this,this.canvas), new tarbar5(this,this.canvas)]
        this.scorebar = this.scoreStates[0]
        this.scorebar.setScore()
    }
    render(context) {
        detectCollission()
        detectPlayerPop()
        playerSwimAnimation()
        this.drawBubbles()
        this.player.update()
        this.player.draw(context)
        this.healthbar.draw(ctx2)
        this.scorebar.draw(ctx2)
    }
    setHealthState(state) {
        this.healthbar = this.healthStates[state]
        this.healthbar.changeHp()
    }
    setScoreState(state) {
        this.scorebar = this.scoreStates[state]
        this.scorebar.setScore()
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
                if ( score < 5 ) bubblesArr.push( this.chooseNewBubble() )
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