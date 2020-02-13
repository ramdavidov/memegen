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
    lines: [
        {
            txt: '',
            coordsX: 250,
            coordsY: 100,
            size: 40,
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
            size: 40,
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

// Returns the requested line for drawing purposes:
function getLineForDisplay() {
    return gMeme.lines[gMeme.selectedLineIdx]
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

// Increase / decrease font size
function increaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size++
}
function decreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size--
}

// Move text row up or down:
function moveTextUp() {
    gMeme.lines[gMeme.selectedLineIdx].coordsY--
}

function moveTextDown() {
    gMeme.lines[gMeme.selectedLineIdx].coordsY++
}

// Switches focus between lines:
function nextTextLine() {
    let idx = gMeme.selectedLineIdx++
    if (idx >= gMeme.lines.length - 1) {
        idx = 0 // probably not needed
        gMeme.selectedLineIdx = 0
    }
    return gMeme[idx]
}

// Splices the line from the lines array:
function removeLine(idx) {
    if (gMeme.lines.length = 1) return
    gMeme.lines.splice(idx, 1)
}

// finds the curr selected line for remove purposes:
function findCurrLine() {
    return gMeme.selectedLineIdx
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

function setFontChange(fontType) {
    gMeme.lines[gMeme.selectedLineIdx].font = fontType
}

// Creates a new line in the lines array:
function _createLine() {
    let newLine = {
        txt: '',
        coordsX: 250,
        coordsY: 300,
        size: 40,
        lineWidth: 2,
        align: 'center',
        font: 'Impact',
        color: 'white',
        stroke: 'black'
    }
        gMeme.lines.push(newLine)
        gMeme.selectedLineIdx = gMeme.lines.length - 1
}