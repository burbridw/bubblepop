class HealthBar {
    constructor(game,canvas) {
        this.game = game
        this.width = canvas.width/5
        this.height = this.width/4
        this.x = (canvas.width - this.width) - 50
        this.y = this.height
        this.image = hbar5
    }
    draw(context) {
        context.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class bar5 extends HealthBar {
    changeHp() {
        this.image = hbar5
    }
    hUp() {
        this.game.setHealthState(5)
    }
    hDown() {
        this.game.setHealthState(4)
    }
}
class bar4 extends HealthBar {
    changeHp() {
        this.image = hbar4
    }
    hUp() {
        this.game.setHealthState(5)
    }
    hDown() {
        this.game.setHealthState(3)
    }
}
class bar3 extends HealthBar {
    changeHp() {
        this.image = hbar3
    }
    hUp() {
        this.game.setHealthState(4)
    }
    hDown() {
        this.game.setHealthState(2)
    }
}
class bar2 extends HealthBar {
    changeHp() {
        this.image = hbar2
    }
    hUp() {
        this.game.setHealthState(3)
    }
    hDown() {
        this.game.setHealthState(1)
    }
}
class bar1 extends HealthBar {
    changeHp() {
        this.image = hbar1
    }
    hUp() {
        this.game.setHealthState(2)
    }
    hDown() {
        this.game.setHealthState(0)
    }
}
class bar0 extends HealthBar {
    changeHp() {
        this.image = hbar0
    }
    hUp() {
        this.game.setHealthState(1)
    }
    hDown() {
        this.game.setHealthState(0)
    }
}