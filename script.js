// Card deck represented as an array of card objects
const deck = [
  { rank: '2', suit: 'hearts' },
  { rank: '3', suit: 'hearts' },
  { rank: '4', suit: 'hearts' },
  { rank: '5', suit: 'hearts' },
  { rank: '6', suit: 'hearts' },
  { rank: '7', suit: 'hearts' },
  { rank: '8', suit: 'hearts' },
  { rank: '9', suit: 'hearts' },
  { rank: '10', suit: 'hearts' },
  { rank: 'jack', suit: 'hearts' },
  { rank: 'queen', suit: 'hearts' },
  { rank: 'king', suit: 'hearts' },
  { rank: 'ace', suit: 'hearts' },
  { rank: '2', suit: 'diamonds' },
  { rank: '3', suit: 'diamonds' },
  { rank: '4', suit: 'diamonds' },
  { rank: '5', suit: 'diamonds' },
  { rank: '6', suit: 'diamonds' },
  { rank: '7', suit: 'diamonds' },
  { rank: '8', suit: 'diamonds' },
  { rank: '9', suit: 'diamonds' },
  { rank: '10', suit: 'diamonds' },
  { rank: 'jack', suit: 'diamonds' },
  { rank: 'queen', suit: 'diamonds' },
  { rank: 'king', suit: 'diamonds' },
  { rank: 'ace', suit: 'diamonds' },
  { rank: '2', suit: 'clubs' },
  { rank: '3', suit: 'clubs' },
  { rank: '4', suit: 'clubs' },
  { rank: '5', suit: 'clubs' },
  { rank: '6', suit: 'clubs' },
  { rank: '7', suit: 'clubs' },
  { rank: '8', suit: 'clubs' },
  { rank: '9', suit: 'clubs' },
  { rank: '10', suit: 'clubs' },
  { rank: 'jack', suit: 'clubs' },
  { rank: 'queen', suit: 'clubs' },
  { rank: 'king', suit: 'clubs' },
  { rank: 'ace', suit: 'clubs' },
  { rank: '2', suit: 'spades' },
  { rank: '3', suit: 'spades' },
  { rank: '4', suit: 'spades' },
  { rank: '5', suit: 'spades' },
  { rank: '6', suit: 'spades' },
  { rank: '7', suit: 'spades' },
  { rank: '8', suit: 'spades' },
  { rank: '9', suit: 'spades' },
  { rank: '10', suit: 'spades' },
  { rank: 'jack', suit: 'spades' },
  { rank: 'queen', suit: 'spades' },
  { rank: 'king', suit: 'spades' },
  { rank: 'ace', suit: 'spades' }
];

//Declaring Variables
let dealerHand = [];
let playerHand = [];
let betAmount = 0
let playerMoney = 100;
let resultMessage = document.getElementById('result-message');

//Deal Cards to Players
function dealInitialCards() {
  // Pushes two cards to the dealer and player from deck
  dealerHand.push(drawCard());
  dealerHand.push(drawCard());
  playerHand.push(drawCard());
  playerHand.push(drawCard());

  // Display cards
  displayDealerHand();
  displayPlayerHand();
  checkBlackjack();
}

//Draw Card
function drawCard() {
  // Randomly select a card from the deck
  const index = Math.floor(Math.random() * deck.length);
  return deck.splice(index, 1)[0];
}

//Display Dealer Hand
function displayDealerHand() {
  // Clear dealer's hand
  document.getElementById('dealer-hand').innerHTML = '';

  // Display each card in the dealer's hand
  for (let i = 0; i < dealerHand.length; i++) {
      const card = dealerHand[i];
      const cardImage = document.createElement('img');
      cardImage.src = getCardImage(card);
      document.getElementById('dealer-hand').appendChild(cardImage);
  }
}

//Display Player Hand
function displayPlayerHand() {
  // Clear player's hand
  document.getElementById('player-hand').innerHTML = '';

  // Display each card in the player's hand
  for (let i = 0; i < playerHand.length; i++) {
      const card = playerHand[i];
      const cardImage = document.createElement('img');
      cardImage.src = getCardImage(card);
      document.getElementById('player-hand').appendChild(cardImage);
  }
}

//Images for the cards
function getCardImage(card) {
  // Generate the image URL for the card based on its rank and suit
  return `assets/images/${card.rank}_of_${card.suit}.png`;
}

function calculateHandValue(hand) {
  // Calculate the total value of a hand
  let sum = 0;
  let numAces = 0;

  for (let i = 0; i < hand.length; i++) {
      const card = hand[i];
      if (card.rank === 'ace') {
          sum += 11;
          numAces++;
      } else if (['king', 'queen', 'jack'].includes(card.rank)) {
          sum += 10;
      } else {
          sum += parseInt(card.rank);
      }
  }

  // Adjust for aces if the sum exceeds 21
  while (sum > 21 && numAces > 0) {
      sum -= 10;
      numAces--;
  }

  return sum;
}

function checkBlackjack() {
  // Check if either dealer or player has blackjack
  const dealerValue = calculateHandValue(dealerHand);
  const playerValue = calculateHandValue(playerHand);

  if (dealerValue === 21 && playerValue === 21) {
      // It's a tie
      declareResult('It\'s a tie!', 0);
  } else if (dealerValue === 21) {
      // Dealer wins
      declareResult('Dealer wins with Blackjack!', -betAmount);
  } else if (playerValue === 21) {
      // Player wins
      declareResult('Player wins with Blackjack!', betAmount);
  }
}

function declareResult(result, moneyChange) {
  // Display the result message
  resultMessage.textContent = result;
  document.getElementById('hit-button').disabled = true;
  document.getElementById('stay-button').disabled = true;
  document.getElementById('play-again-button').style.display = 'inline';

  // Update player's money and display
  playerMoney += moneyChange;
  
  if (moneyChange > 0) {
    resultMessage.textContent += ' You won $' + moneyChange + '!';
  } else if (moneyChange < 0) {
    resultMessage.textContent += ' You lost $' + Math.abs(moneyChange) + '.';
  } else {
    resultMessage.textContent += ' No money change.';
  }
  document.getElementById('player-money').textContent = playerMoney
  document.getElementById('bet-amount').disabled = true;
  console.log('FUCK')
  return
}

function dealerTurn() {
  // Dealer takes a turn based on the hand value
  while (calculateHandValue(dealerHand) < 17) {
      dealerHand.push(drawCard());
  }

  displayDealerHand();
  checkResult();
}

function checkResult() {
  // Compare the values of dealer and player hands to determine the result
  const dealerValue = calculateHandValue(dealerHand);
  const playerValue = calculateHandValue(playerHand);

  if (dealerValue > 21) {
      declareResult('Dealer busts. Player wins!', betAmount);
  } else if (playerValue > 21) {
      declareResult('Player busts. Dealer wins!', -betAmount);
  } else if (dealerValue > playerValue) {
      declareResult('Dealer wins!', -betAmount);
  } else if (dealerValue < playerValue) {
      declareResult('Player wins!', betAmount);
  } else {
      declareResult('It\'s a tie!', 0);
  }
}

// Event listener for the hit button
document.getElementById('hit-button').addEventListener('click', function() {
  playerHand.push(drawCard());
  displayPlayerHand();
  checkBlackjack();
  if (calculateHandValue(playerHand) > 21) {
      declareResult('Player busts. Dealer wins!', -betAmount);
  }
});

// Event listener for the stay button
document.getElementById('stay-button').addEventListener('click', function() {
  dealerTurn();
});

// Event listener for the play again button
document.getElementById('play-again-button').addEventListener('click', function() {
  // Reset game state
  deck.push(...dealerHand, ...playerHand);
  dealerHand = [];
  playerHand = [];
  resultMessage.textContent = '';
  document.getElementById('dealer-hand').innerHTML = '';
  document.getElementById('player-hand').innerHTML = '';
  document.getElementById('hit-button').disabled = false;
  document.getElementById('stay-button').disabled = false;
  document.getElementById('play-again-button').style.display = 'none';
  document.getElementById('bet-amount').value = ''
  document.getElementById('bet-amount').disabled = false;

  // Deal initial cards and reset bet amount
  dealInitialCards();
});

// Deal initial cards on page load
dealInitialCards();

// Event listener for the submit button
document.getElementById('submit-bet').addEventListener('click', function() {
  // Get the bet amount from the input field
  betAmount = parseInt(document.getElementById('bet-amount').value);
  document.getElementById('bet-amount').disabled = true
});

