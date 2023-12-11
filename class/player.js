class Player {
    constructor(game,canvas,size,imageleft,imageinv) {
        this.game = game
        this.canvas = canvas
        this.size = size
        this.x = canvas.width/2
        this.y = canvas.height/2
        this.imageleft = imageleft
        this.imageinv = imageinv
        this.image = this.imageleft
        this.sx = 0
        this.sy = 0
        this.width = 1992/4
        this.height = 967/3
        this.angle = 0
    }
    update() {
        const dx = this.x - mouseObj.x
        const dy = this.y - mouseObj.y
        let theta = Math.atan2(dy, dx)
        this.angle = theta
        if ( mouseObj.click ) {
            this.x -= dx/40
            this.y -= dy/40
        }
        this.size = playerSize
    }
    draw(context) {
        if ( this.x > mouseObj.x ) {
            this.image = this.imageleft
        } else {
            this.image = this.imageinv
        }
        context.save()
        context.translate(this.x,this.y)
        context.rotate(this.angle)
        if ( poisoned ) context.filter = "hue-rotate(90deg)"
        context.drawImage(this.image, this.sx, this.sy, this.width, this.height, 0-this.size/2, 0-this.size/2, this.size, this.size)
        context.filter = "none"
        context.restore()
        // context.beginPath()
        // context.arc(this.x, this.y, playerCollissionRange,0,Math.PI*2)
        // context.strokestyle = "black"
        // context.stroke()
        // context.beginPath()
        // context.moveTo(this.x,this.y)
        // context.lineTo(this.x+bubbleFrame,this.y)
        // context.lineTo(this.x+bubbleFrame, this.y+bubbleFrame)
        // context.lineTo(this.x, this.y+bubbleFrame)
        // context.lineTo(this.x,this.y)
        // context.strokeStyle = "black"
        // context.stroke()
    }
    night(context2) {
        context2.rect(0,0,this.canvas.width,this.canvas.height)
        context2.fillStyle = "rgba(0,0,0,1)"
        context2.fill()
    }
    clearCircle(context2,x,y,radius) {
        const radgrad = context2.createRadialGradient(x,y,radius,x,y,radius*2)
        radgrad.addColorStop(0,"rgba(0,0,0,0")
        radgrad.addColorStop(1,"rgba(0,0,0,0.9")
        context2.fillStyle = radgrad
        context2.clearRect(0, 0,(radius*2)*4,(radius*2)*4)
        context2.fillRect(0, 0,this.canvas.width,this.canvas.height)
    }
}