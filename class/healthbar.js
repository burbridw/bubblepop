class HealthBar {
    constructor(game,canvas) {
        this.game = game
        this.image = hbar5.getAttribute("src")
    }
    displayHealth() {
        hBarDisplay.setAttribute("src",this.image)
    }
}

class bar5 extends HealthBar {
    changeHp() {
        this.image = hbar5.getAttribute("src")
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
        this.image = hbar4.getAttribute("src")
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
        this.image = hbar3.getAttribute("src")
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
        this.image = hbar2.getAttribute("src")
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
        this.image = hbar1.getAttribute("src")
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
        this.image = hbar0.getAttribute("src")
    }
    hUp() {
        this.game.setHealthState(1)
    }
    hDown() {
        this.game.setHealthState(0)
    }
}