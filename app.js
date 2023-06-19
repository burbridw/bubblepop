const ctx = canvas1.getContext("2d")
canvas1.width = 500
canvas1.height = 500

function drawCanvas() {
    ctx.drawImage(bubble, 0, 0, 300, 300, 0, 0, 300, 300)
}

drawCanvas()