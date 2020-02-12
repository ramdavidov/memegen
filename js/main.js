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
    // gCurrImgUrl = img.url
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
    // img.src = './img/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

// Meme editor:
function onDrawText() {
    const elText = document.querySelector('.text-input')
    let elTextValue = elText.value
    let meme = getCurrMeme()

    meme.lines[0].txt = elTextValue

    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height) - DON'T USE (IMG will clear for now)
    var img = new Image()
    img.src = meme.selectedImgUrl

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText(elTextValue,
            meme.lines[0].coordsX,
            meme.lines[0].coordsY,
            meme.lines[0].stroke,
            meme.lines[0].color,
            meme.lines[0].size,
            meme.lines[0].align
        )
    }
}

function drawText(text, x, y, strokeColor, fillColor, textSize, textAlign) {
    gCtx.lineWidth = '2'
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${textSize}px Impact`
    gCtx.textAlign = textAlign
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

// call service to increase / decrease font size and draw:
function onIncreaseFontSize() {
    // var elModal = document.querySelector('.book-details-modal')
    // var elRate = document.querySelector('.value-number')
    // let meme = getCurrMeme()
    increaseFontSize()
    // find line?
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