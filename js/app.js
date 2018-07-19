// list of all the icons used the memory game
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", 
"fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt",
 "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

const cardsBox = document.querySelector(".collection");
let Cards_opened = [];
let Cards_matched = [];
let starsGot;


const timerContainer = document.querySelector(".timer");
var allSeconds=0;



const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;


const resetBtn = document.querySelector(".reset");


const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;


let resetButton = document.querySelector(".reset");

start();


function start() {
    resetButton.textContent="Reset";
    const shuffleIcons = shuffle(icons);
    for(let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = "<i class='"+ icons[i] + "'></i>";
        cardsBox.appendChild(card);
    
        click(card);
    }
}



let is_first_click = true;

function click(card) {

    card.addEventListener("click", function() {

        
        if(is_first_click) {
            
            startTimer();

            is_first_click = false;
        }
        
        const present_Card = this;
        const previous_Card = Cards_opened[0];

     

        if(Cards_opened.length === 1) {

            card.classList.add("open", "show", "disable");
            Cards_opened.push(this);


            compare(present_Card, previous_Card);
            

        } else {
    
            present_Card.classList.add("open", "show", "disable");
            Cards_opened.push(this);
        }
        
    });

}



function compare(present_Card, previous_Card) {

  
    if(present_Card.innerHTML === previous_Card.innerHTML) {
                
        
        present_Card.classList.add("match");
        previous_Card.classList.add("match");

        Cards_matched.push(present_Card, previous_Card);

        Cards_opened = []; 

    } else {
            present_Card.classList.add('wrongCard');
            previous_Card.classList.add('wrongCard');
        setTimeout(function() {
            present_Card.classList.remove("open", "show", "disable","wrongCard");
            previous_Card.classList.remove("open", "show", "disable","wrongCard");
            
        }, 600);

        Cards_opened = [];
    }
    addMove();  
    gameFinish();
}
        

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function gameFinish(){
    if(Cards_matched.length === icons.length) {

    stopTimer();
    resetButton.textContent="Play Again";
        
    setTimeout( function ( ) { alert( "Congratulations! You won in " +  minute.innerHTML + ":" + seconds.innerHTML + " seconds" + " In " + moves + " moves" + " and have got" + starsContainer.textContent + starsGot ); }, 500 ); 
    }
}




function startTimer()
{
    liveTimer=setInterval(function()
{       
 ++allSeconds;
  
  var minute = Math.floor((allSeconds / 60));
  var seconds = allSeconds - (minute * 60);

  
  document.getElementById(`minute`).innerHTML = minute;
  document.getElementById(`seconds`).innerHTML = seconds; },1000);

}

function stopTimer()
{
     clearInterval(liveTimer);
}


function addMove() {
    moves++;
    movesContainer.innerHTML = moves;
    grade();  
     }



function grade() {

    if( moves < 10) {
        starsGot=" 3 stars";
        starsContainer.innerHTML = star + star + star;
    } else if( moves < 15) {
        starsGot=" 2 stars";
        starsContainer.innerHTML = star + star;
    } else {
        starsGot=" 1 star";
        starsContainer.innerHTML = star;
    }
    
}


resetBtn.addEventListener("click", function() {

    cardsBox.innerHTML = "";


    start();

    reset();

});

function reset() {
    
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = star + star + star;
    resetButton.textContent="Reset";
    stopTimer();
    allSeconds=0;
    minute.innerHTML=0;
    seconds.innerHTML=0;
     Cards_matched = [];
    is_first_click = true;
}