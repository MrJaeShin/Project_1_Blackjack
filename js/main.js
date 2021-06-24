const suits = ["♥", "♣", "♦", "♠"];
const names = ["A", "K", "Q", "J", "10", "09", "08", "07", "06", "05", "04", "03", "02"];


let table = document.getElementById("table");
let dealButton = document.getElementById("deal");
let hitButton = document.getElementById("hit");
let stayButton = document.getElementById("stay");
let resetButton = document.getElementById("reset");

let deck, gameStarted, gameOver, playerWon, playerScore, dealerScore, playerCards, dealerCards;

function init() {
    deck = [];
    gamesStarted = false;
    gameOver = false;
    playerWon = false;
    playerScore = 0;
    dealerScore = 0;
    playerCards = [];
    dealerCards = [];
    // table.innerText = "To Start: PRESS DEAL";
    dealButton.style.display = "inline";
    hitButton.style.display = "none";
    stayButton.style.display = "none";
    resetButton.style.display = "none";
}

// resetButton.style.display = "none";
// hitButton.style.display = "none";
// stayButton.style.display = "none";


//____________________BUTTONS___________________


dealButton.addEventListener("click", function() {
    gamesStarted = true;
    gameOver = false;
    playerWon = false;
    
    deck = createDeck();
    shuffleCard(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];
    
    dealButton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
    resetButton.style.display = "inline";
    render();
});


hitButton.addEventListener("click", function() {
    playerCards.push(getNextCard());
    getResult();
    render();
});


stayButton.addEventListener("click", function() {
    gameOver = true;
    getResult();
    render();
});


resetButton.addEventListener("click", function() {
    table.innerText = "To Start: PRESS DEAL";
    init()
});


//____________________FUNCTIONS__________________
function createDeck() {
    let deck = [];
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for (let nameIdx = 0; nameIdx < names.length; nameIdx++) {
            let card = {
                suit: suits[suitIdx],
                name: names[nameIdx]
            };
            deck.push(card)
        }
    }
    return deck;
}

let tableCards = document.querySelector("#table")

function render() {
    let dealerCardFace = [];//""//creat element span and span.innerHtml
    for (let i = 0; i < dealerCards.length; i++) {
        // dealerCardFace += getCard(dealerCards[i]) + "\n";
        let dealtCard = getCard(dealerCards[i])
        dealerCardFace.push(dealtCard);
        let cardObj = document.createElement("span");
        cardObj.classList.add(dealtCard);
        tableCards.appendChild(cardObj);
        console.log(tableCards)
        console.log(cardObj)
    }
    // console.log("DEALERCARDFACE:", dealerCardFace)

    let playerCardFace = "";//create element span and span.innerHtml
    for (let i = 0; i < playerCards.length; i++) {
        playerCardFace += getCard(playerCards[i]) + "\n";
    }
    
    
    updateScores();
        
    table.innerText = 
    "Dealer has: \n " + dealerCardFace + "(score:" + dealerScore + ")\n\n\n" 
    + "Player has: \n " + playerCardFace + "(score:" + playerScore + ")\n\n";

    if (gameOver) {
        if (playerWon) {
            table.innerText += "You are the Winner!";
        } else {
            table.innerText += "Dealer Wins!";
        }
    dealButton.style.display = "inline";
    hitButton.style.display = "none";
    stayButton.style.display = "none";
    }
}



function shuffleCard(deck) {
    for (let i = 0; i < deck.length; i++) {
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = tmp;
    }
}


function getCard(card) {
    // return card.name + " of " + card.suit;
    return card.suit + card.name
}

// function getCardName(card) {
//     return card.suit + card.name
// }

function getNextCard() {
    return deck.shift();
}


function getCardValue(card) {
    switch (card.name) {
        case "A": return 1;
        case "02": return 2;
        case "03": return 3;
        case "04": return 4;
        case "05": return 5;
        case "06": return 6;
        case "07":  return 7;
        case "08": return 8;
        case "09": return 9;
        default: return 10;
    }
}


function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        score += getCardValue(card);
        if (card.names === "A") {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}


function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}


function getResult() {
    updateScores();
    if (gameOver) {
        while (dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
            dealerCards.push(getNextCard());
            updateScores();
        }
    }
    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    } else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    } else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        } else { 
            playerWon = false;
        }
    }
}

init()