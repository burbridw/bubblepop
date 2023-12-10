class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.width = canvas.width
        this.height = canvas.height
        this.player = new Player(this,this.canvas,playerSize,playerimageleft,playerimageinv)
        this.healthStates = [new bar0(this,this.canvas), new bar1(this,this.canvas), new bar2(this,this.canvas), new bar3(this,this.canvas), new bar4(this,this.canvas), new bar5(this,this.canvas)]
        this.healthbar = this.healthStates[5]
        this.healthbar.changeHp()
        this.scoreStates = [new scorebar0(this,this.canvas), new scorebar1(this,this.canvas), new scorebar2(this,this.canvas), new scorebar3(this,this.canvas), new scorebar4(this,this.canvas), new scorebar5(this,this.canvas)]
        this.scorebar = this.scoreStates[0]
        this.scorebar.setScore()
        this.popSound1 = document.getElementById("popsound1")
        this.popSound2 = document.getElementById("popsound2")
        this.popSound3 = document.getElementById("popsound3")
        this.popSound4 = document.getElementById("popsound4")
        this.popSounds = [this.popSound1,this.popSound2,this.popSound3,this.popSound4]
    }
    render(context) {
        detectCollission()
        detectPlayerPop()
        playerSwimAnimation()
        this.drawBubbles()
        this.player.update()
        this.player.draw(context)
    }
    setHealthState(state) {
        this.healthbar = this.healthStates[state]
        this.healthbar.changeHp()
        this.healthbar.displayHealth()
    }
    setScoreState(state) {
        this.scorebar = this.scoreStates[state]
        this.scorebar.setScore()
        this.scorebar.displayScore()
    }
    sendBubbles() {
        const bubbleFlow = setInterval( ()=>{
            let newAdd = new Bubbles(this,bubble,frameSize,false,false,false,true)
            bubblesArr.push( newAdd )
            if (bubblesArr.length > bubbleCap || pauseAnimation) {
                clearInterval(bubbleFlow)
                sendBubblesCleared = true
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
        if ( randomNumber > 0.985 ) {
            return new Bubbles(this,poisonbubble,frameSize,true,false,false,false)
        } else if ( randomNumber > 0.96 ) {
            return new Bubbles(this,starbubble,frameSize,false,true,false,false)
        } else if ( randomNumber > 0.93) {
            return new Bubbles(this,heartbubble,frameSize,false,false,true,false)
        } else {
            return new Bubbles(this,bubble,frameSize,false,false,false,true)
        }
    }
}