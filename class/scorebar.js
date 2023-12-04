class ScoreBar {
    constructor(game,canvas) {
        this.game = game
        this.canvas = canvas
        this.width = (canvas.width/5)*2
        this.height = this.width/5
        this.x = 50
        this.y = this.height/2
        this.image = score5.getAttribute("src")
    }
    // draw(context) {
    //     context.font = this.canvas.width/30+"px Architects Daughter"
    //     context.drawImage(this.image,this.x,this.y,this.width,this.height)
    //     context.fillStyle = "white"
    //     context.textBaseline = "middle"
    //     context.textAlign = "center"
    //     const measureText = context.measureText(this.text)
    //     const measurement = measureText.width
    //     if ( measurement > this.width/2) context.font = this.canvas.width/50+"px Architects Daughter"
    //     context.fillText(this.text,(this.x+(this.width*0.4)),this.y+(this.height/2))
    // }
    displayScore() {
        scoreBarDisplay.setAttribute("src",this.image)
    }
}

class scorebar5 extends ScoreBar {
    setScore() {
        this.image = score5.getAttribute("src")
    }
    update() {
        this.game.setScoreState(5)
    }
}
class scorebar4 extends ScoreBar {
    setScore() {
        this.image = score4.getAttribute("src")
    }
    update() {
        this.game.setScoreState(4)
    }
}
class scorebar3 extends ScoreBar {
    setScore() {
        this.image = score3.getAttribute("src")
    }
    update() {
        this.game.setScoreState(3)
    }
}
class scorebar2 extends ScoreBar {
    setScore() {
        this.image = score2.getAttribute("src")
    }
    update() {
        this.game.setScoreState(2)
    }
}
class scorebar1 extends ScoreBar {
    setScore() {
        this.image = score1.getAttribute("src")
    }
    update() {
        this.game.setScoreState(1)
    }
}
class scorebar0 extends ScoreBar {
    setScore() {
        this.image = score0.getAttribute("src")
    }
    update() {
        this.game.setScoreState(0)
    }
}