// list of all the icons used the memory game
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", 
"fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt",
 "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

const cardsBox = document.querySelector(".collection");
let Cards_opened = [];
let Cards_matched = [];
let starsGot;

//To calculate the time
const timerContainer = document.querySelector(".timer");
var allSeconds=0;


//To calculate the number of moves 
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;


const resetBtn = document.querySelector(".reset");

//To give ratings to the player with respect to the number of moves 
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;


let resetButton = document.querySelector(".reset");

start();

//To intialize the cards with a particular icon
function start() {
    const shuffleIcons = shuffle(icons);
    for(let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = "<i class='"+ icons[i] + "'></i>";
        cardsBox.appendChild(card);
    
        click(card);
    }
}


//To show the icon associated with a particular card when it is clicked
let is_first_click = true;

function click(card) {

    card.addEventListener("click", function() {

        
        if(is_first_click) {
            
            startTimer();   //As soon as the first card is clicked the timer starts running

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


//To compare the cards and determine whether they match or not
function compare(present_Card, previous_Card) {

  
    if(present_Card.innerHTML === previous_Card.innerHTML) {
                
        
        present_Card.classList.add("match");
        previous_Card.classList.add("match");

        Cards_matched.push(present_Card, previous_Card);

        Cards_opened = [];        //If cards are similar

    } else {
            present_Card.classList.add('wrongCard');
            previous_Card.classList.add('wrongCard');
        setTimeout(function() {
            present_Card.classList.remove("open", "show", "disable","wrongCard");
            previous_Card.classList.remove("open", "show", "disable","wrongCard"); //If cards are not similar
            
        }, 600);

        Cards_opened = [];
    }
    addMove();  
    gameFinish();
}
        
//Function to the shuffle the cards
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

//As soon as the game ends we stop the timer and display the player's score
function gameFinish(){
    if(Cards_matched.length === icons.length) {

    stopTimer();
   
   modalDisplay();
        
    }
}



//Function to start the timer as soon as the user clicks on the first card
function startTimer()
{
    liveTimer=setInterval(function()
{       
 ++allSeconds;
  
  var minute = Math.floor((allSeconds / 60)); //we are making a minute:seconds clock
  var seconds = allSeconds - (minute * 60);   

  
  document.getElementById(`minute`).innerHTML = minute;
  document.getElementById(`seconds`).innerHTML = seconds; },1000);

}

function stopTimer()
{
     clearInterval(liveTimer);   //To stop the timer
}


function addMove() {
    moves++;
    movesContainer.innerHTML = moves; //The function adds a move everytime two cards are opened and compared
    grade();  
     }


//We define the ratings or grades on the basis of number of moves taken by the user
function grade() {

    if( moves < 10) {
        starsGot=" 3 stars"; //for less than 10 moves
        starsContainer.innerHTML = star + star + star;
    } else if( moves < 15) {
        starsGot=" 2 stars"; //for moves between 10 and 15
        starsContainer.innerHTML = star + star;
    } else {
        starsGot=" 1 star"; //for moves more than 15
        starsContainer.innerHTML = star;
    }
    
}

//The reset features restarts the game again as soon as the user clicks on the icon
resetBtn.addEventListener("click", function() {

    cardsBox.innerHTML = "";


    start();

    reset();

});

//The reset function is called when the user clicks on the reset button
function reset() {
    
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = star + star + star;
    Cards_opened=[];
    stopTimer();
    allSeconds=0;
    minute.innerHTML=0;
    seconds.innerHTML=0;
     Cards_matched = [];
    is_first_click = true;
}






// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
function modalDisplay() 
{
    modal.style.display = "block";
    Result.innerHTML="Congratulations! You took " +  moves + " moves" + " In " + minute.innerHTML + ":" + seconds.innerHTML + " seconds" +" and have got" + starsContainer.textContent + starsGot;

}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let Result=document.querySelector(".result");


//when the user click on play again the game starts again works like reset functionality
const Play_again=document.querySelector(".playAgain");

Play_again.addEventListener("click", function() {

    cardsBox.innerHTML = "";

     modal.style.display = "none";

    start();

    reset();



});

//when the user click on exit the modal simply closes
const Exit=document.querySelector(".exit");

Exit.addEventListener('click',function(){
    modal.style.display="none";
});



