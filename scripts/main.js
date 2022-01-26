window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load
})

let deck = [];
let dealerHand = [];
let playerHand = [];

function buildDeck(deck){
  for(let i=0; i<13; i++){
    deck[i] = {rank:i+1, suit: 'hearts'}
  }
  for(let i=0; i<13; i++){
    deck[i+13] = {rank:i+1, suit: 'diamonds'}
  }
  for(let i=0; i<13; i++){
    deck[i+26] = {rank:i+1, suit: 'spades'}
  }
  for(let i=0; i<13; i++){
    deck[i+39] = {rank:i+1, suit: 'clubs'}
  }
  return deck;
}

buildDeck(deck);
console.log(deck);

function deal() {
  clearBoard();
  dealPlayer();
  dealDealer();
  dealPlayer();
  dealDealer();
  displayPoints();
}

function dealDealer() {
  let randomNum = Math.floor(Math.random() * deck.length);
  let cardElement = document.createElement("img")
  let cardObjectArray = deck.splice(randomNum, 1);
  let cardObject = cardObjectArray[0]
  console.log(cardObject);
  cardElement.src = getCardImage(cardObject);
  document.getElementById("dealer-hand").appendChild(cardElement);
  dealerHand.push(cardObject);
  return cardObject;
}

function dealPlayer() {
  let randomNum = Math.floor(Math.random() * deck.length);
  let cardElement = document.createElement("img")
  let cardObjectArray = deck.splice(randomNum, 1);
  let cardObject = cardObjectArray[0]
  console.log(cardObject);
  cardElement.src = getCardImage(cardObject);
  document.getElementById("player-hand").appendChild(cardElement);
  playerHand.push(cardObject);
  return cardObject;
}

function hit() {
  dealPlayer();
  dealDealer();
  displayPoints();
}

function getCardImage(card){
  let suit = card.suit;
  let rank = card.rank;
  let imageName;
  if (rank<10){
    imageName = 'images/' + (rank+1).toString() + '_of_' + suit + '.png';
  }
  else if (rank==10) {
    imageName =  'images/jack_of_' + suit + '.png';
  }
  else if (rank==11) {
    imageName =  'images/queen_of_' + suit + '.png';
  }
  else if (rank==12) {
    imageName =  'images/king_of_' + suit + '.png';
  }
  else {
    imageName =  'images/ace_of_' + suit + '.png';
  }
  return imageName;
}

function clearBoard() {
  const elements = document.getElementsByTagName("img");
  while(elements.length >0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
  document.getElementById("messages").innerText="";
  deck = [];
  playerHand = [];
  dealerHand = [];
  buildDeck(deck);
}

function calculatePoints(hand) {
  let points = 0;
  hand.forEach(element => {
    let rank = element.rank;
    if (rank<10){
      points += rank+1;
    }
    else if (rank<13){
      points += 10;
    }
    else {
      if(points<11){
        points += 11;
      }
      else {
        points += 1;
      }
    }
  });
  return points;
}

function updatePoints(playerPoints, dealerPoints) {
  document.getElementById("player-points").innerText=playerPoints.toString();
  document.getElementById("dealer-points").innerText=dealerPoints.toString();
}

function displayPoints() {
  let playerPoints = calculatePoints(playerHand);
  let dealerPoints = calculatePoints(dealerHand);
  updatePoints(playerPoints, dealerPoints);
  if (playerPoints > 21) {
    document.getElementById("messages").innerText="Player Busted!";
  }
  else if (dealerPoints > 21) {
    document.getElementById("messages").innerText="Dealer Busted!";
  }
}