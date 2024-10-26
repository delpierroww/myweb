// Game data
const games = [
    { id: 1, title: 'Mobile Legends', price: 50000, description: 'Popular mobile MOBA game' },
    { id: 2, title: 'PUBG Mobile', price: 60000, description: 'Battle royale mobile game' },
    { id: 3, title: 'Free Fire', price: 45000, description: 'Fast-paced battle royale game' },
    { id: 4, title: 'Genshin Impact', price: 75000, description: 'Open-world action RPG' },
    { id: 5, title: 'Call of Duty Mobile', price: 55000, description: 'First-person shooter mobile game' }
];

let balance = 1000000; // Initial balance in Rupiah

// Function to format price in Rupiah
function formatRupiah(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

// Function to display games
function displayGames() {
    const gameContainer = document.querySelector('.game-container');
    gameContainer.innerHTML = '';

    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <h3 class="game-title">${game.title}</h3>
            <p class="game-description">${game.description}</p>
            <p class="game-price">${formatRupiah(game.price)}</p>
            <button class="buy-button" onclick="buyGame(${game.id})">Buy</button>
        `;
        gameContainer.appendChild(gameCard);
    });
}

// Function to buy a game
function buyGame(gameId) {
    const game = games.find(g => g.id === gameId);
    if (game && balance >= game.price) {
        balance -= game.price;
        updateBalanceDisplay();
        alert(`You have successfully purchased ${game.title} for ${formatRupiah(game.price)}`);
    } else if (!game) {
        alert('Game not found');
    } else {
        alert('Insufficient balance');
    }
}

// Function to update balance display
function updateBalanceDisplay() {
    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = formatRupiah(balance);
}

// Function to filter games
function filterGames() {
    const searchInput = document.getElementById('searchInput');
    const filter = searchInput.value.toLowerCase();
    const filteredGames = games.filter(game => 
        game.title.toLowerCase().includes(filter) || 
        game.description.toLowerCase().includes(filter)
    );
    
    const gameContainer = document.querySelector('.game-container');
    gameContainer.innerHTML = '';

    filteredGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <h3 class="game-title">${game.title}</h3>
            <p class="game-description">${game.description}</p>
            <p class="game-price">${formatRupiah(game.price)}</p>
            <button class="buy-button" onclick="buyGame(${game.id})">Buy</button>
        `;
        gameContainer.appendChild(gameCard);
    });
}

// Initialize the page
displayGames();
updateBalanceDisplay();

// Add event listener for search input
document.getElementById('searchInput').addEventListener('input', filterGames);
