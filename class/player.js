class Player {
    constructor(game,canvas,size,imageleft,imageinv) {
        this.game = game
        this.canvas = canvas
        this.size = size
        this.x = window.innerWidth/2
        this.y = window.innerHeight/2
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
        context.drawImage(this.image, this.sx, this.sy, this.width, this.height, 0-this.size/2, 0-this.size/2, this.size, this.size)
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
}