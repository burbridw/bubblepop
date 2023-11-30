class Bubbles {
    constructor(image,isPoison,isStar,isHeart,isRound) {
        this.size = bubbleFrame
        this.x = Math.random()*(window.innerWidth-this.size)
        this.y = window.innerHeight + this.size
        this.sx = sourceWidth
        this.speedX = Math.random()*3 -1.5
        this.speedY = Math.random()*1 + 2
        this.image = image
        this.speedMod = Math.random()*1.5 - 1
        this.text = gameWordList[Math.floor(Math.random()*gameWordList.length)]
        console.log(this.text)
        this.popped = false
        this.drop = false
        this.gravity = 0
        this.isPoison = isPoison
        this.isStar = isStar
        this.isHeart = isHeart
        this.isRound = isRound
    }
    update() {
        if ( this.speedX > 0.5) {
            this.speedX -= 0.05
        }
        if ( this.speedX < -0.5 ) {
            this.speedX += 0.05
        }
        if ( this.x < 1 ) {
            this.speedX *= -1
        }
        if ( this.x > window.innerWidth-(frameSize/2)) {
            this.speedX -= this.speedX*2
        }
        if ( this.speedY < 2+this.speedMod && !this.drop) {
            this.speedY += 0.03
        }
        if ( this.speedY > 2+this.speedMod && !this.drop) {
            this.speedY -= 0.05
        }
        this.speedY += this.gravity
        this.y -= this.speedY
        this.x += this.speedX
        this.size = bubbleFrame
    }
    draw(context) {
    context.drawImage(this.image, this.sx, startHeight, increment, frameSize, this.x, this.y, this.size, this.size)
    context.fillStyle = "white"
    context.font = window.innerWidth/100 +"px Architects Daughter"
    context.textBaseline = "middle"
    context.textAlign = "center"
    context.fillText(this.text,this.x+(this.size/2),this.y+(this.size/2))
    // context.beginPath()
    // context.arc(this.x+this.size/2,this.y+this.size/2,bubbleSize,0,Math.PI*2)
    // context.strokeStyle = "red"
    // context.stroke()
    // context.closePath()
    // context.beginPath()
    // context.moveTo(this.x,this.y)
    // context.lineTo(this.x+this.size, this.y)
    // context.lineTo(this.x+this.size, this.y+this.size)
    // context.lineTo(this.x,this.y+this.size)
    // context.lineTo(this.x,this.y)
    // context.stroke()
    }
}
