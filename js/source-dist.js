'use strict';

// helpers functions *******************

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var displayCard = function displayCard() {
    this.classList.toggle('card-open');
    this.classList.toggle('card-show');
    this.classList.toggle('disable-card');
};

// declare lets,const,var ******************
var cards = void 0,
    cardsArray = void 0,
    moves = 0,
    openedCards = [],
    matchedCards = void 0,
    ginterval = void 0,
    timer = void 0;
var deck = document.getElementById('deck-query');
matchedCards = document.getElementsByClassName('success-match');
// Add event listener click for every card in the deck
cards = document.getElementsByClassName('card');
cardsArray = [].concat(_toConsumableArray(cards));

cardsArray.forEach(function (el) {
    el.addEventListener('click', displayCard);
    el.addEventListener('click', cardOpen);
});

// function Game Start
function startTime() {
    var seconds = 0,
        minutes = 0;

    timer = document.querySelector('.timer');
    ginterval = setInterval(function () {
        timer.innerHTML = 'Time: ' + minutes + ' min ' + seconds + ' seconds ';
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }
    }, 1000);
}

function gameStart() {
    moves = 0;
    clearInterval(ginterval);
    var timer = document.querySelector('.timer');
    timer.innerHTML = 'Time: ' + 0 + ' minutes ' + 0 + ' seconds';
    var suffledCards = _.shuffle(cards);

    suffledCards.forEach(function (el) {

        deck.appendChild(el);
    });
}

function moveCounter() {
    moves++;
    var counter = document.getElementById('moves');
    counter.innerHTML = 'Move(s): ' + moves;
    if (moves === 1) {
        startTime();
    }
}

function matched() {
    openedCards[0].classList.add('success-match');
    openedCards[1].classList.add('success-match');
    openedCards[1].classList.remove('card-open');
    openedCards[0].classList.remove('card-open');
    openedCards = [];

    if (matchedCards.length == 20) {
        gameEnd();
    }
}

function unmatched() {
    openedCards[0].classList.add('bad-match');
    openedCards[1].classList.add('bad-match');

    disable();

    setTimeout(function () {
        openedCards[0].classList.remove("card-show", "card-open", 'bad-match');
        openedCards[1].classList.remove("card-show", "card-open", 'bad-match');
        enableCards();
        openedCards = [];
    }, 1150);
}

function disable() {
    cardsArray.forEach(function (el) {
        el.classList.add('disable-card');
    });
}

function enableCards() {
    cardsArray.forEach(function (el) {
        el.classList.remove('disable-card');
    });

    for (var i = 0; i < matchedCards.length; i++) {
        matchedCards[i].classList.add('disable-card');
    };
};

function cardOpen() {
    openedCards.push(this);

    if (openedCards.length === 2) {
        moveCounter();
        return openedCards[0].type === openedCards[1].type ? matched() : unmatched();
    }
}

function gameEnd() {
    var finalTime = timer.innerHTML;
    console.log(finalTime);
    document.querySelector('.info2').innerHTML = 'Your time is: ' + finalTime;
    document.querySelector('.info1').innerHTML = 'You done: ' + moves + ' moves.';
    clearInterval(ginterval);
    cardsArray.forEach(function (el) {
        el.classList.remove('card-show');
        el.classList.remove('disable-card');
        el.classList.remove('success-match');
    });
    var modal = document.getElementById('modal-container');
    modal.classList.toggle('modal-show');
}

document.getElementById('restart').addEventListener('click', function () {
    moves = 0;
    var counter = document.getElementById('moves');
    counter.innerHTML = 'Move(s): ' + moves;
    gameStart();
});

document.getElementById('play-again').addEventListener('click', function () {
    var modal = document.getElementById('modal-container');
    modal.classList.toggle('modal-show');
    moves = 0;
    var counter = document.getElementById('moves');
    counter.innerHTML = 'Move(s): ' + moves;
    gameStart();
});

gameStart();