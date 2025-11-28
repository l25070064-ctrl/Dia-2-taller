// 🎮 Pokédex - JavaScript Vanilla
// Consumo de la PokéAPI con paginación, búsqueda y modal de detalles

// Variables globales
let currentPage = 1;
const pokemonPerPage = 20;
let allPokemon = [];

// Elementos del DOM
const pokemonGrid = document.getElementById('pokemonGrid');
const inputPokemon = document.getElementById('inputPokemon');
const btnBuscar = document.getElementById('btnBuscar');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const currentPageSpan = document.getElementById('currentPage');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

// Colores por tipo de Pokémon
const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadPokemonList();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    btnBuscar.addEventListener('click', searchPokemon);
    inputPokemon.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchPokemon();
        }
    });
    btnPrev.addEventListener('click', () => changePage(-1));
    btnNext.addEventListener('click', () => changePage(1));
    closeModal.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Cargar lista inicial de Pokémon
async function loadPokemonList() {
    try {
        showLoading();
        const offset = (currentPage - 1) * pokemonPerPage;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${offset}`);
        const data = await response.json();

        // Obtener detalles de cada Pokémon
        const pokemonPromises = data.results.map(pokemon =>
            fetch(pokemon.url).then(res => res.json())
        );

        allPokemon = await Promise.all(pokemonPromises);
        displayPokemon(allPokemon);
        updatePaginationButtons();
    } catch (error) {
        console.error('Error al cargar Pokémon:', error);
        pokemonGrid.innerHTML = '<p class="loading">❌ Error al cargar los Pokémon. Por favor, intenta de nuevo.</p>';
    }
}

// Mostrar loading
function showLoading() {
    pokemonGrid.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Cargando Pokémon...</p>
        </div>
    `;
}

// Mostrar Pokémon en el grid
function displayPokemon(pokemonList) {
    pokemonGrid.innerHTML = '';

    pokemonList.forEach(pokemon => {
        const card = createPokemonCard(pokemon);
        pokemonGrid.appendChild(card);
    });
}

// Crear tarjeta de Pokémon
function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.onclick = () => showPokemonDetails(pokemon);

    const types = pokemon.types.map(type => {
        const typeName = type.type.name;
        const color = typeColors[typeName] || '#777';
        return `<span class="type-badge" style="background-color: ${color}">${typeName}</span>`;
    }).join('');

    card.innerHTML = `
        <div class="pokemon-card-content">
            <div class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</div>
            <img class="pokemon-image" 
                 src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" 
                 alt="${pokemon.name}"
                 loading="lazy">
            <h3 class="pokemon-name">${pokemon.name}</h3>
            <div class="pokemon-types">${types}</div>
        </div>
    `;

    return card;
}

// Buscar Pokémon específico
async function searchPokemon() {
    const searchTerm = inputPokemon.value.trim().toLowerCase();

    if (!searchTerm) {
        loadPokemonList();
        return;
    }

    try {
        showLoading();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);

        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const pokemon = await response.json();
        displayPokemon([pokemon]);

        // Ocultar paginación durante búsqueda
        btnPrev.style.display = 'none';
        btnNext.style.display = 'none';
        currentPageSpan.parentElement.style.display = 'none';

    } catch (error) {
        console.error('Error en la búsqueda:', error);
        pokemonGrid.innerHTML = `
            <div class="loading">
                <p>❌ No se encontró el Pokémon "${searchTerm}"</p>
                <p style="margin-top: 20px;">
                    <button onclick="resetSearch()" style="padding: 12px 30px; border-radius: 50px; border: none; background: linear-gradient(135deg, #ff6b6b, #4ecdc4); color: white; cursor: pointer; font-size: 1rem; font-weight: 600;">
                        Volver al Pokédex
                    </button>
                </p>
            </div>
        `;
    }
}

// Resetear búsqueda
function resetSearch() {
    inputPokemon.value = '';
    btnPrev.style.display = '';
    btnNext.style.display = '';
    currentPageSpan.parentElement.style.display = '';
    loadPokemonList();
}

// Cambiar página
function changePage(direction) {
    currentPage += direction;
    currentPageSpan.textContent = currentPage;
    loadPokemonList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Actualizar botones de paginación
function updatePaginationButtons() {
    btnPrev.disabled = currentPage === 1;
    // La PokéAPI tiene más de 1000 Pokémon, limitamos a 50 páginas para este ejemplo
    btnNext.disabled = currentPage >= 50;
}

// Mostrar detalles del Pokémon en modal
async function showPokemonDetails(pokemon) {
    modal.classList.add('active');

    // Imagen y nombre
    document.getElementById('modalImage').src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    document.getElementById('modalName').textContent = pokemon.name;

    // Tipos
    const modalTypes = document.getElementById('modalTypes');
    modalTypes.innerHTML = pokemon.types.map(type => {
        const typeName = type.type.name;
        const color = typeColors[typeName] || '#777';
        return `<span class="type-badge" style="background-color: ${color}">${typeName}</span>`;
    }).join('');

    // Estadísticas
    const modalStats = document.getElementById('modalStats');
    modalStats.innerHTML = pokemon.stats.map(stat => {
        const percentage = (stat.base_stat / 255) * 100; // 255 es el máximo teórico
        return `
            <div class="stat-item">
                <div class="stat-name">${stat.stat.name}</div>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${percentage}%">
                        ${stat.base_stat}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Información adicional
    const modalInfo = document.getElementById('modalInfo');
    modalInfo.innerHTML = `
        <div class="info-item">
            <div class="info-label">Altura</div>
            <div class="info-value">${(pokemon.height / 10).toFixed(1)} m</div>
        </div>
        <div class="info-item">
            <div class="info-label">Peso</div>
            <div class="info-value">${(pokemon.weight / 10).toFixed(1)} kg</div>
        </div>
        <div class="info-item">
            <div class="info-label">Experiencia Base</div>
            <div class="info-value">${pokemon.base_experience}</div>
        </div>
        <div class="info-item">
            <div class="info-label">ID Nacional</div>
            <div class="info-value">#${String(pokemon.id).padStart(3, '0')}</div>
        </div>
    `;

    // Habilidades
    const modalAbilities = document.getElementById('modalAbilities');
    modalAbilities.innerHTML = pokemon.abilities.map(ability =>
        `<div class="ability-badge">${ability.ability.name}</div>`
    ).join('');
}

// Hacer resetSearch disponible globalmente
window.resetSearch = resetSearch;
