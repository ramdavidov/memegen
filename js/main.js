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
    getDefaultLinePos()
    showMemeEditor()
}

// Set gMeme with the current img
function setCurrMeme(img) {
    updateMemeImg(img)
}

// Show the meme editor:
function showMemeEditor() {
    const elEditor = document.querySelector('.meme-creator-container')
    const elImgGallery = document.querySelector('.memes-img-container')
    elEditor.classList.add('flex')
    elImgGallery.classList.remove('flex')
}
// Hide the meme editor:
function hideMemeEditor() {
    const elEditor = document.querySelector('.meme-creator-container')
    const elImgGallery = document.querySelector('.memes-img-container')
    elImgGallery.classList.add('flex')
    elEditor.classList.remove('flex')
}

// Toggle menu on mobile:
function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

// Init canvas:
function initCanvas() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    setCanvasSize()
}

// Changes canvas size based on window size (for mobile):
function setCanvasSize() {
    if (window.innerWidth < 720) {
        // Finds the divider to keep image ratio:
        let heightDivider = gCanvas.width / window.innerWidth

        gCanvas.width = window.innerWidth
        gCanvas.height /= heightDivider
    }
}

function getDefaultLinePos() {
    setDefaultLinePos(gCanvas.width, gCanvas.height)
}

// Removes focus frame before downloading meme:
function onShareSave() {
    onDrawText(false)
    toggleConfirmBtn()

    setTimeout(() => {
        const elSaveShareModal = document.querySelector('.confirm-btn')
        elSaveShareModal.classList.remove('show-btn')
    }, 2000)
}

// Displays confirm message for downloading meme:
function toggleConfirmBtn() {
    const elSaveShareModal = document.querySelector('.confirm-btn')
    elSaveShareModal.classList.toggle('show-btn')
}

// Downloads the canvas(Meme)
function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'myCanvas'
    toggleConfirmBtn()
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
function onDrawText(addFocusLine = true) {
    updateCurrLineTxt()
    let img = new Image()
    let meme = getCurrMeme()
    img.src = meme.selectedImgUrl

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        meme.lines.forEach(line => {
            drawText(line)
            if (addFocusLine) drawLineFocus(line)
        })
    }
}

// Handles changes to curr line from DOM to Modal:
function updateCurrLineTxt() {
    const elText = document.querySelector('.text-input')
    let elTextValue = elText.value
    let line = getCurrLine()
    line.txt = elTextValue // MAYBE: this invokes rules of MVC?
}

// Draw Text according to given params:
function drawText(line) {
    gCtx.lineWidth = `${line.lineWidth}`
    gCtx.strokeStyle = line.stroke
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = line.align
    gCtx.fillText(line.txt, line.coordsX, line.coordsY)
    gCtx.strokeText(line.txt, line.coordsX, line.coordsY)
}

// Draw focus (mark) for the current line:
function drawLineFocus(line) {
    if (line !== getCurrLine()) return
    // let textArea = gCtx.measureText(line.txt)
    gCtx.beginPath()
    gCtx.rect(1, line.coordsY - line.size, gCanvas.width - 2, line.size)
    gCtx.strokeStyle = '#FFFFFF'
    gCtx.stroke()
}

// Selects the line that the user clicks on and gives it focus:
function onLineClicked(ev) {
    var { offsetX, offsetY } = ev
    let meme = getCurrMeme()
    let lineIdx = 0
    meme.lines.find(line => {
        if (offsetX > 0 &&
            offsetX < gCanvas.width &&
            offsetY > line.coordsY - line.size &&
            offsetY < line.coordsY) {
            setSelectedLineIdx(lineIdx)
            setLineVals()
            onDrawText()
            setIsLineDrag(true)
        }
        lineIdx++
    })
}

// Invokes dragging option on mouseup:
function onCancelDrag() {
    setIsLineDrag(false)
}

// Updated the coords of the line to the service:
function onLineDrag(ev) {
    let meme = getCurrMeme()
    if (!meme.isDrag) return
    var { offsetX, offsetY } = ev
    let line = getCurrLine()
    setLineCoords(line, offsetX, offsetY)
    onDrawText()
}

// Switch text lines in the meme editor:
function onNextTextLine() {
    nextTextLine()
    setLineVals()
    onDrawText()
    // Handles focus (mark) for the next line:
    let currLine = getCurrLine()
    drawLineFocus(currLine)
}

// Updates the input text to show the txt value:
function setLineVals() {
    const elText = document.querySelector('.text-input')
    const elStrokeColor = document.querySelector('#stroke-color')
    const elFillColor = document.querySelector('#fill-color')

    let line = getCurrLine()
    elText.value = line.txt
    elStrokeColor.value = line.stroke
    elFillColor.value = line.color
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

// Calls service to update alignment type and position X:
function onChangeAlign(alignTo) {
    let canvasWidth = gCanvas.width
    changeAlign(alignTo, canvasWidth)
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

// Calls service to add a line:
function onAddLine() {
    addLine()
    setLineVals()
    onDrawText()
    // Adds focus (mark) to the new line
    let currLine = getCurrLine()
    drawLineFocus(currLine)
}

// calls service to delete a line and focus on new line:
function onRemoveLine() {
    let lineIdx = getCurrLineIdx()
    clearTextInput()
    removeLine(lineIdx)
    resetSelectedLine()
    setLineVals()
    onDrawText()
}

// Clears text input after deleteing a text line:
function clearTextInput() {
    const elText = document.querySelector('.text-input')
    elText.value = ''
}
// Calls service to change font:
function onFontChange() {
    const elFontType = document.querySelector('#font-type').value
    setFontChange(elFontType)
    onDrawText()
}

// Calls service to update the text fill color;
function onColorChange() {
    const elStrokeColor = document.querySelector('#stroke-color').value
    const elFillColor = document.querySelector('#fill-color').value
    setDrawColor(elStrokeColor, elFillColor)
    onDrawText()
}