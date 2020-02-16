'use strict'

// Random numbers:
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// Random ID:
function makeId() {
    var length = 6;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

// Today's time:
function getTime() {
    return new Date().toString().split(' ')[4];
}

// Timer:
function startTimer() {
    gSecsPassed += 1;
    showTimer();
}

function showTimer() {
    let hours = parseInt(gSecsPassed / 3600);
    let minutes = parseInt((gSecsPassed - hours * 3600) / 60);
    let seconds = gSecsPassed - (hours * 3600 + minutes * 60);
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    document.querySelector('.timer span').innerText = hours + ":" + minutes + ":" + seconds;
}


// links: 
// https://dev.to/eddieaich/5-javascript-functions-to-add-to-your-utilities-library-l6j
// https://www.freecodecamp.org/news/10-js-util-functions-in-reduce/

// Removed: 

// function removeMenu() {
//     document.body.classList.remove('menu-open')
// }

// function handleCursorStyle(element, cursorType) {
//     const elCanvas = document.querySelector(`.${element}`)
//     elCanvas.style.cursor = cursorType
// }

