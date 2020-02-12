'use strict'

var gImgs = [
    { id: 1, url: 'meme-imgs/1.jpg', keywords: ['trump'] },
    { id: 2, url: 'meme-imgs/2.jpg', keywords: ['dog'] },
    { id: 3, url: 'meme-imgs/3.jpg', keywords: ['trump'] },
]

var gMeme = {
    selectedImgId: 5,
    selectedImgUrl: '',
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            coordsX: 100,
            coordsY: 100,
            size: 40,
            align: 'center',
            color: 'white',
            stroke: 'black'
        }
    ]
}


// Return the gImgs for displauy:
function getMemesForDisplay() {
    return gImgs
}

function getCurrMeme() {
    return gMeme
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
    gMeme.lines[0].size++
}
function decreaseFontSize() {
    gMeme.lines[0].size--
}

function moveTextUp() {
    gMeme.lines[0].coordsY++
}

function moveTextDown() {
    gMeme.lines[0].coordsY--
}