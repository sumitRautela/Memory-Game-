/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", 
"fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt",
 "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

const cardsBox = document.querySelector(".collection");
let Cards_opened = [];
let Cards_matched = [];

let Reset = document.querySelector(".reset");



start();

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





function click(card) {

    card.addEventListener("click", function() {

       
        
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
}

// Shuffle function from http://stackoverflow.com/a/2450976
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


Reset.addEventListener("click", function() {

    cardsBox.innerHTML = "";


    start();

    reset();

});

function reset() {

     Cards_matched = [];
    
}