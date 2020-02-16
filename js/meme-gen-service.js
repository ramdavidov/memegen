'use strict'

var gImgs = [
    { id: 1, url: 'meme-imgs/1.jpg', keywords: ['trump'] },
    { id: 2, url: 'meme-imgs/2.jpg', keywords: ['dog'] },
    { id: 3, url: 'meme-imgs/3.jpg', keywords: ['dog'] },
    { id: 4, url: 'meme-imgs/4.jpg', keywords: ['trump'] },
    { id: 5, url: 'meme-imgs/5.jpg', keywords: ['trump'] },
    { id: 6, url: 'meme-imgs/6.jpg', keywords: ['trump'] },
    { id: 7, url: 'meme-imgs/7.jpg', keywords: ['trump'] },
    { id: 8, url: 'meme-imgs/8.jpg', keywords: ['trump'] },
    { id: 9, url: 'meme-imgs/9.jpg', keywords: ['trump'] },
    { id: 10, url: 'meme-imgs/10.jpg', keywords: ['trump'] },
    { id: 11, url: 'meme-imgs/11.jpg', keywords: ['trump'] },
    { id: 12, url: 'meme-imgs/12.jpg', keywords: ['trump'] },
    { id: 13, url: 'meme-imgs/13.jpg', keywords: ['trump'] },
    { id: 14, url: 'meme-imgs/14.jpg', keywords: ['trump'] },
    { id: 15, url: 'meme-imgs/15.jpg', keywords: ['trump'] },
    { id: 16, url: 'meme-imgs/16.jpg', keywords: ['trump'] },
    { id: 17, url: 'meme-imgs/17.jpg', keywords: ['trump'] },
    { id: 18, url: 'meme-imgs/18.jpg', keywords: ['trump'] },
]

var gMeme = {
    selectedImgId: 5,
    selectedImgUrl: '',
    selectedLineIdx: 0,
    isDrag: false,
    lines: [
        {
            txt: '',
            coordsX: 250,
            coordsY: 100,
            size: 50,
            lineWidth: 2,
            font: 'impact',
            align: 'center',
            color: '#ffffff',
            stroke: '#000000'
        },
        {
            txt: '',
            coordsX: 250,
            coordsY: 400,
            size: 50,
            lineWidth: 2,
            font: 'impact',
            align: 'center',
            color: '#ffffff',
            stroke: '#000000'
        }
    ]
}

// Return the gImgs for displauy:
function getMemesForDisplay() {
    return gImgs
}

// Returns the meme object to the controller:
function getCurrMeme() {
    return gMeme
}

// Return current line to controller:
function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

// Returns the curr selected line for remove purposes:
function getCurrLineIdx() {
    return gMeme.selectedLineIdx
}

// Returns the idx of the selected line:
function setSelectedLineIdx(idx) {
    gMeme.selectedLineIdx = idx
}

// Toggles allowing to drag line or not:
function setIsLineDrag(isLineDrag) {
    gMeme.isDrag = isLineDrag
}

// Sets the line coords based on DOM mouse position
function setLineCoords(line, PosX, PosY) {
    line.coordsX = PosX
    line.coordsY = PosY
}


//Update gMeme img info after selecting img from gallery:
function updateMemeImg(img) {
    gMeme.selectedImgId = img.id
    gMeme.selectedImgUrl = `meme-imgs/${img.id}.jpg`
}

// Find image by id:
function findImg(imgId) {
    let img = gImgs.find(img => {
        if (imgId === img.id) return img
    })
    return img
}

// Sets the default X,Y position of the lines:
function setDefaultLinePos(width, height) {
    gMeme.lines.forEach((line, index) => {
        line.coordsX = Math.floor(width / 2)
        if (!index) {
            line.coordsY = line.size + 10
        } else if (index === 1) {
            line.coordsY = height - (line.size / 2)
        } else {
            line.coordsY = Math.floor(height / 2) + line.size
        }
    })
}

// Increase / decrease font size
function increaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size += 2
}
function decreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 2
}

// Move text row up or down:
function moveTextUp() {
    gMeme.lines[gMeme.selectedLineIdx].coordsY -= 2
}

function moveTextDown() {
    gMeme.lines[gMeme.selectedLineIdx].coordsY += 2
}

// Switches focus between lines:
function nextTextLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }
}

// resets the selectedLineIdx to 0 after removing a line
function resetSelectedLine() {
    gMeme.selectedLineIdx = 0
}

// Splices the line from the lines array:
function removeLine(idx) {
    if (!gMeme.lines.length) return
    gMeme.lines.splice(idx, 1)
}

// Switch align type and update x position
function changeAlign(alignTo, canvasWidth) {
    let line = getCurrLine()
    line.align = alignTo
    switch (alignTo) {
        case 'left':
            line.coordsX = 1
            break
        case 'center':
            line.coordsX = Math.floor(canvasWidth / 2)
            break
        case 'right':
            line.coordsX = (canvasWidth - 1)
            break
    }
}

// create a new line in gMeme:
function addLine() {
    _createLine()
}

// Change the line color properties:
function setDrawColor(strokeColor, fillColor) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = strokeColor
    gMeme.lines[gMeme.selectedLineIdx].color = fillColor
}

// Change the line font type:
function setFontChange(fontType) {
    gMeme.lines[gMeme.selectedLineIdx].font = fontType
}


// Creates a new line in the lines array:
function _createLine() {
    let newLine = {
        txt: '',
        coordsX: 250,
        coordsY: 300,
        size: 50,
        lineWidth: 2,
        align: 'center',
        font: 'Impact',
        color: '#ffffff',
        stroke: '#000000'
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}