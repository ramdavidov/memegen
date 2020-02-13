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
    const elEditor = document.querySelector('.meme-editor-container')
    const elImgGallery = document.querySelector('.memes-img-container')
    elEditor.classList.add('flex')
    elImgGallery.classList.remove('flex')
}
// Hide the meme editor:
function hideMemeEditor() {
    const elEditor = document.querySelector('.meme-editor-container')
    const elImgGallery = document.querySelector('.memes-img-container')
    elImgGallery.classList.add('flex')
    elEditor.classList.remove('flex')
}

// Init canvas:
function initCanvas() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
}

// Draw the img to the canvas afte selecting img:
function drawImg(imgUrl) {
    var img = new Image()
    img.src = imgUrl
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

// Meme editor:
// Draw text as the user types:
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

// Switch text lines in the meme editor:
function onNextTextLine() {
    nextTextLine()
    updateTextInputValue()
}

// Update the input text to show the txt value:
function updateTextInputValue() {
    const elText = document.querySelector('.text-input')
    let line = getLineForDisplay()
    elText.value = line.txt

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

// Toggle menu on mobile:
function toggleMenu() {
    document.body.classList.toggle('menu-open');
}