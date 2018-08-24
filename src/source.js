'use strict';

// helpers functions *******************
const displayCard = function(){
    this.classList.toggle('card-open');
    this.classList.toggle('card-show');
    this.classList.toggle('disable-card');
}



// declare lets,const,var ******************
let cards, cardsArray, moves = 0, openedCards = [] , matchedCards ,ginterval,timer; 
const deck = document.getElementById('deck-query');
matchedCards = document.getElementsByClassName('success-match');
// Add event listener click for every card in the deck
cards = document.getElementsByClassName('card');
cardsArray = [...cards];

cardsArray.forEach((el)=>{
    el.addEventListener('click', displayCard);
    el.addEventListener('click', cardOpen);
});


// function Game Start
function startTime(){
      let seconds = 0 , minutes = 0; 
      
      timer = document.querySelector('.timer');
      ginterval = setInterval(function(){
           timer.innerHTML = 'Time: ' + minutes + ' min '  + seconds + ' seconds ';
           seconds++;
           if(seconds == 60){
            seconds = 0;
               minutes++;
           }
      },1000);
}


function gameStart(){
      moves = 0;
    clearInterval(ginterval);
    let timer = document.querySelector('.timer');
    timer.innerHTML = 'Time: '+ 0 + ' minutes ' + 0 + ' seconds';
        let suffledCards = _.shuffle(cards);
        
         suffledCards.forEach((el)=>{
                    
            deck.appendChild(el);

         });

         

}

function moveCounter(){
    moves++;
    let counter = document.getElementById('moves');
    counter.innerHTML = 'Move(s): ' + moves;
    if(moves === 1){
        startTime();
    }
    
}

function matched(){
        openedCards[0].classList.add('success-match');
        openedCards[1].classList.add('success-match');
        openedCards[1].classList.remove('card-open');
        openedCards[0].classList.remove('card-open');      
        openedCards = [];   
        
if(matchedCards.length == 20){
    gameEnd();
}    
}

function unmatched(){
    openedCards[0].classList.add('bad-match');
    openedCards[1].classList.add('bad-match');
    
    
    disable();

    setTimeout(()=>{
             openedCards[0].classList.remove("card-show","card-open",'bad-match');
             openedCards[1].classList.remove("card-show","card-open",'bad-match');
             enableCards();
             openedCards = [];
            },1150);
}

function disable(){
    cardsArray.forEach((el)=>{
          el.classList.add('disable-card');
    }); 
}

function enableCards(){
    cardsArray.forEach((el)=>{
               el.classList.remove('disable-card');
    });

     for(let i = 0; i < matchedCards.length; i++){
           matchedCards[i].classList.add('disable-card');
     };

};

function cardOpen(){
        openedCards.push(this);
        
        if(openedCards.length === 2){
              moveCounter();
            return openedCards[0].type === openedCards[1].type ? matched() : unmatched();
        }
}


function gameEnd(){
       let finalTime = timer.innerHTML;
       console.log(finalTime);
       document.querySelector('.info2').innerHTML = 'Your time is: ' + finalTime;
       document.querySelector('.info1').innerHTML = 'You done: ' + moves + ' moves.';
       clearInterval(ginterval);
       cardsArray.forEach((el)=>{
           el.classList.remove('card-show');
           el.classList.remove('disable-card');
           el.classList.remove('success-match');
       });
       let modal = document.getElementById('modal-container');
       modal.classList.toggle('modal-show');
       
     
}

document.getElementById('restart').addEventListener('click',()=>{
    moves = 0;
    let counter = document.getElementById('moves');
    counter.innerHTML = 'Move(s): ' + moves;
    gameStart();
});

document.getElementById('play-again').addEventListener('click',()=>{
    let modal = document.getElementById('modal-container');
       modal.classList.toggle('modal-show'); 
       moves = 0;
       let counter = document.getElementById('moves');
       counter.innerHTML = 'Move(s): ' + moves;
    gameStart();
});




gameStart();

