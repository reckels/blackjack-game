window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load
})

let deck = [];
let dealerHand = [];
let playerHand = [];
let gameStarted = false;

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
  document.getElementById("deal-button").disabled = true;
  gameStarted = true;
  clearBoard();
  document.getElementById("hit-button").disabled = false;
  document.getElementById("stand-button").disabled = false;
  dealPlayer();
  dealDealer();
  dealPlayer();
  dealDealer();
  let dealerPoints = calculatePoints(dealerHand);
  let playerPoints = calculatePoints(playerHand);
  updatePoints(playerPoints, dealerPoints);
  findDealWinner(playerPoints, dealerPoints);
}

function reset() {
  clearBoard();
  document.getElementById("deal-button").disabled = false;
}

function hit() {
  if(gameStarted){
    dealPlayer();
    if (calculatePoints(dealerHand)<17){
      dealDealer();
    }
    let dealerPoints = calculatePoints(dealerHand);
    let playerPoints = calculatePoints(playerHand);
    updatePoints(playerPoints, dealerPoints);
    findHitWinner(playerPoints, dealerPoints);
  }
}

function stand() {
  if (gameStarted){
    let dealerPoints = calculatePoints(dealerHand);
    let playerPoints = calculatePoints(playerHand);
    while(dealerPoints < 17) {
      dealDealer();
      dealerPoints = calculatePoints(dealerHand);
    }
    updatePoints(playerPoints, dealerPoints);
    findStandWinner(playerPoints, dealerPoints);
  }
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
  let elements = document.getElementsByTagName("img");
  while(elements.length >0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
  deck = [];
  playerHand = [];
  dealerHand = [];
  buildDeck(deck);
  updatePoints(calculatePoints(playerHand), calculatePoints(dealerHand))
  document.getElementById("hit-button").disabled = true;
  document.getElementById("stand-button").disabled = true;
  document.getElementById("messages").innerText="";
  document.getElementById("winner-messages").innerText="";
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

function findDealWinner(playerPoints, dealerPoints) {
  if(playerPoints==21 && dealerPoints==21){
    document.getElementById("winner-messages").innerText="It's a Draw!";
    disableButtons;
  }
  else if (playerPoints==21){
    document.getElementById("winner-messages").innerText="Player Wins!";
    disableButtons;
  }
  else if (dealerPoints==21){
    document.getElementById("winner-messages").innerText="Dealer Wins!";
    disableButtons;
  }
  else {
    document.getElementById("winner-messages").innerText="";
  }
}

function findHitWinner(playerPoints, dealerPoints) {
  if(playerPoints==21 && dealerPoints==21){
    document.getElementById("winner-messages").innerText="It's a Draw!";
    disableButtons;
  }
  else if (playerPoints>21){
    document.getElementById("winner-messages").innerText="Dealer Wins!";
    disableButtons();
    document.getElementById("messages").innerText="Player Busted!";
  }
  else if (dealerPoints>21){
    document.getElementById("winner-messages").innerText="Player Wins!";
    disableButtons;
    document.getElementById("messages").innerText="Dealer Busted!";
  }
  else if (dealerPoints>playerPoints) {
    document.getElementById("winner-messages").innerText="";
  }
}

function findStandWinner(playerPoints, dealerPoints){
  if (dealerPoints>21){
    document.getElementById("winner-messages").innerText="Player Wins!";
    disableButtons;
    document.getElementById("messages").innerText="Dealer Busted!";
  }
  else if (playerPoints==21 && dealerPoints==21) {
    document.getElementById("winner-messages").innerText="It's a Draw!";
    disableButtons;
  }
  else if (dealerPoints>playerPoints){
    document.getElementById("winner-messages").innerText="Dealer Wins!";
    disableButtons();
  }
  else{
    document.getElementById("winner-messages").innerText="Player Wins!";
    disableButtons;
  }
}

function disableButtons(){
  document.getElementById("hit-button").disabled = true;
  document.getElementById("stand-button").disabled = true;
}