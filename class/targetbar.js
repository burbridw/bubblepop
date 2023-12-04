class TargetBar {
    constructor(game,canvas) {
        this.game = game
        this.canvas = canvas
        this.width = (canvas.width/5)*2
        this.height = this.width/5
        this.x = 50
        this.y = this.height/2
        this.image = target5
        this.text = correctWords[0]
    }
    draw(context) {
        context.font = this.canvas.width/30+"px Architects Daughter"
        context.drawImage(this.image,this.x,this.y,this.width,this.height)
        context.fillStyle = "white"
        context.textBaseline = "middle"
        context.textAlign = "center"
        const measureText = context.measureText(this.text)
        const measurement = measureText.width
        if ( measurement > this.width/2) context.font = this.canvas.width/50+"px Architects Daughter"
        context.fillText(this.text,(this.x+(this.width*0.4)),this.y+(this.height/2))
    }
}

class tarbar5 extends TargetBar {
    setScore() {
        this.image = target5
        this.text = correctWords[0]
    }
    update() {
        this.game.setScoreState(5)
    }
}
class tarbar4 extends TargetBar {
    setScore() {
        this.image = target4
        this.text = correctWords[0]
    }
    update() {
        this.game.setScoreState(4)
    }
}
class tarbar3 extends TargetBar {
    setScore() {
        this.image = target3
    }
    update() {
        this.game.setScoreState(3)
    }
}
class tarbar2 extends TargetBar {
    setScore() {
        this.image = target2
    }
    update() {
        this.game.setScoreState(2)
    }
}
class tarbar1 extends TargetBar {
    setScore() {
        this.image = target1
    }
    update() {
        this.game.setScoreState(1)
    }
}
class tarbar0 extends TargetBar {
    setScore() {
        this.image = target0
    }
    update() {
        this.game.setScoreState(0)
    }
}