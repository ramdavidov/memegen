'use strict'
var gCanvas
var gCtx

function onInit() {
    renderMemesGallery()
}

// Render img gallery:
function renderMemesGallery() {
    let imgs = getMemesForDisplay()
    let elGrid = document.querySelector('.memes-grid-container')
    let imgsHtmlStrs = ''
    imgs.forEach(img => {
        let imgHtmlStr = `<img class="meme-img" src="meme-imgs/${img.id}.jpg" onclick="onSelectImg(${img.id}.)"></img>`
        imgsHtmlStrs += imgHtmlStr
    })
    elGrid.innerHTML = imgsHtmlStrs
}

// When user clicks on an img:
function onSelectImg(imgId) {
    let img = findImg(imgId)
    setCurrMeme(img)
    let imgUrl = img.url
    initCanvas()
    drawImg(imgUrl)
    showMemeEditor()
}

// Set gMeme with the current img
function setCurrMeme(img) {
    updateMemeImg(img)
}

// Show the meme editor:
function showMemeEditor() {
    console.log('I will open the memeEditor')
}

// Init canvas:
function initCanvas() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
}

// Draw the img to the canvas:
function drawImg(imgUrl) {
    var img = new Image()
    img.src = imgUrl
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function onNextTextLine() {
nextTextLine()
console.log(gMeme.selectedLineIdx)
updateTextInputValue()
}

function updateTextInputValue() {
    const elText = document.querySelector('.text-input')
    let line = getLineForDisplay()
    elText.value = line.txt

}

// Meme editor:
function onDrawText() {
    const elText = document.querySelector('.text-input')
    let elTextValue = elText.value
    let meme = getCurrMeme()
    let line = getLineForDisplay()

    let LineIdx = meme.selectedLineIdx
    line.txt = elTextValue

    var img = new Image()
    img.src = meme.selectedImgUrl

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText(line)
        for (var i = 0; i < meme.lines.length; i++) {
            if (i === LineIdx) continue
            drawText(meme.lines[i])
        }
    }
}

// Draw Text according to given params:
function drawText(line) {
    gCtx.lineWidth = `${line.lineWidth}`
    gCtx.strokeStyle = line.stroke
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px Impact`
    gCtx.textAlign = line.align
    gCtx.fillText(line.txt, line.coordsX, line.coordsY)
    gCtx.strokeText(line.txt, line.coordsX, line.coordsY)
}

// call service to increase / decrease font size and draw:
function onIncreaseFontSize() {
    increaseFontSize()
    onDrawText()

}
function onDecreaseFontSize() {
    decreaseFontSize()
    onDrawText()
}

// call service to move text up/down and:
function onMoveTextDown() {
    moveTextDown()
    onDrawText()
}

function onMoveTextUp() {
    moveTextUp()
    onDrawText()
}