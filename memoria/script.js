const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const matchesDisplay = document.getElementById('matches');
const gameOverScreen = document.getElementById('game-over');
const restartButton = document.getElementById('restart');

let cards = [];
let flippedCards = [];
let moves = 0;
let matches = 0;
const totalPairs = 15;

const criptos = [
    { sigla: 'BTC', nome: 'Bitcoin' },
    { sigla: 'ETH', nome: 'Ethereum' },
    { sigla: 'BNB', nome: 'Binance Coin' },
    { sigla: 'ADA', nome: 'Cardano' },
    { sigla: 'SOL', nome: 'Solana' },
    { sigla: 'XRP', nome: 'Ripple' },
    { sigla: 'DOT', nome: 'Polkadot' },
    { sigla: 'DOGE', nome: 'Dogecoin' },
    { sigla: 'AVAX', nome: 'Avalanche' },
    { sigla: 'SHIB', nome: 'Shiba Inu' },
    { sigla: 'MATIC', nome: 'Polygon' },
    { sigla: 'LINK', nome: 'Chainlink' },
    { sigla: 'UNI', nome: 'Uniswap' },
    { sigla: 'LTC', nome: 'Litecoin' },
    { sigla: 'XLM', nome: 'Stellar' },
    { sigla: 'TRX', nome: 'TRON' },
    { sigla: 'TON', nome: 'Toncoin' }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    const cardValues = [];
    criptos.forEach((cripto, index) => {
        cardValues.push({ value: cripto.sigla, pairId: index });
        cardValues.push({ value: cripto.nome, pairId: index });
    });
    shuffle(cardValues);
    gameBoard.innerHTML = '';
    cards = [];

    cardValues.forEach(cardData => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = cardData.value;

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        card.appendChild(cardFront);
        card.appendChild(cardBack);
        gameBoard.appendChild(card);

        card.addEventListener('click', () => flipCard(card, cardData));
        cards.push(card);
    });
}

function flipCard(card, cardData) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push({ card, pairId: cardData.pairId });

        // Movemos a contagem para o checkMatch
        if (flippedCards.length === 2) {
            moves++; // Agora conta 1 por par de cliques
            movesDisplay.textContent = moves;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.pairId === card2.pairId) {
        matches++;
        matchesDisplay.textContent = matches;
        
        if (matches === totalPairs) {
            setTimeout(() => {
                gameOverScreen.classList.remove('hidden');
                confetti();
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.card.classList.remove('flipped');
            card2.card.classList.remove('flipped');
        }, 1000);
    }
    
    flippedCards = []; // Resetamos após a verificação
}

function resetGame() {
    moves = 0;
    matches = 0;
    movesDisplay.textContent = moves;
    matchesDisplay.textContent = matches;
    gameOverScreen.classList.add('hidden');
    flippedCards = [];
    createBoard();
}

restartButton.addEventListener('click', resetGame);
createBoard();