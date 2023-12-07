class Bubbles {
    constructor(image,frameSize,isPoison,isStar,isHeart,isRound) {
        this.size = bubbleFrame
        this.frameSize = frameSize
        this.x = (this.size*0.43)+(Math.random()*(canvas1.width-this.frameSize))
        this.y = canvas1.height + (this.size+(Math.random()*1 + 2))
        this.sx = 0
        this.sy = 0
        this.speedX = Math.random()*3 -1.5
        this.speedY = Math.random()*1 + 2
        this.image = image
        this.speedMod = Math.random()*1.5 - 1
        this.text = gameWordList[Math.floor(Math.random()*gameWordList.length)]
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
        if ( this.x < -10 ) {
            this.speedX *= -1
        }
        if ( this.x > canvas1.width-(this.size-10) ) {
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
    if ( this.isPoison) context.filter = "hue-rotate(315deg)"
    if ( this.isHeart ) context.filter = "hue-rotate(155deg)"
    if ( this.isStar ) context.filter = "hue-rotate(225deg)"
    context.drawImage(this.image, this.sx, this.sy, this.frameSize, this.frameSize, this.x, this.y, this.size, this.size)
    context.filter = "none"
    if ( this.isRound ) {
        const fontSize = canvas1.width/50
        const textX = this.x+(this.size/2)
        let textY = this.y+(this.size/2)
        const wordsFromText = this.text.split(" ")
        context.fillStyle = "white"
        context.font = fontSize +"px Architects Daughter"
        context.textBaseline = "middle"
        context.textAlign = "center"
        const measureText = context.measureText(this.text)
        const measurement = measureText.width
        if ( wordsFromText.length === 1 ) {
            if ( measurement < bubbleFrame*0.8 ) {
                context.fillText(this.text,textX,textY)
            } else {
                context.font = canvas1.width/(bubbleSizeModifier*8)+"px Architects Daughter"
                context.fillText(this.text,textX,textY)
            }
        } else {
            if ( wordsFromText.length > 2 ) {
                textY -= fontSize/2
                context.font = canvas1.width/65+"px Architects Daughter"
            } else {
                textY -= fontSize/4
            }
            let line = ""
            for ( let i = 0; i < wordsFromText.length; i++ ) {
                let testLine = line+wordsFromText[i]+" "
                const measureTestLine = context.measureText(testLine)
                if ( measureTestLine.width > bubbleFrame*0.8 && i > 0) {
                    context.fillText(line,textX,textY)
                    line = wordsFromText[i]+" "
                    textY += fontSize
                } else {
                    line = testLine
                }
            }
            context.fillText(line,textX,textY)
        }
    }
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
