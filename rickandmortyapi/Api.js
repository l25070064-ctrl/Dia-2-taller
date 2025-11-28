// Configuración de la API de Rick and Morty
const API_BASE_URL = 'https://rickandmortyapi.com/api';
const CHARACTERS_PER_PAGE = 20;

// Gestión de estado
let currentPage = 1;
let totalPages = 1;
let currentSearchQuery = '';
let isSearching = false;

// Elementos del DOM
const charactersGrid = document.getElementById('charactersGrid');
const loading = document.getElementById('loading');
const errorElement = document.getElementById('error');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const searchInfo = document.getElementById('searchInfo');

/**
 * Obtener personajes de la API de Rick and Morty
 * @param {number} page - Número de página a obtener
 * @param {string} searchQuery - Término de búsqueda (opcional)
 */
async function fetchCharacters(page = 1, searchQuery = '') {
    try {
        showLoading(true);
        hideError();

        let url = `${API_BASE_URL}/character/?page=${page}`;

        if (searchQuery) {
            url += `&name=${encodeURIComponent(searchQuery)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('No se encontraron personajes con ese nombre');
            }
            throw new Error(`Error HTTP! estado: ${response.status}`);
        }

        const data = await response.json();

        // Actualizar estado de paginación
        currentPage = page;
        totalPages = data.info.pages;

        // Mostrar personajes
        displayCharacters(data.results);
        updatePagination();
        updateSearchInfo(data.info.count);

    } catch (error) {
        console.error('Error al obtener personajes:', error);
        showError(error.message || 'Error al cargar personajes. Por favor, intenta de nuevo más tarde.');
        charactersGrid.innerHTML = '';
        updateSearchInfo(0);
    } finally {
        showLoading(false);
    }
}

/**
 * Mostrar personajes en la cuadrícula
 * @param {Array} characters - Array de objetos de personajes
 */
function displayCharacters(characters) {
    charactersGrid.innerHTML = '';

    characters.forEach((character, index) => {
        const card = createCharacterCard(character);
        charactersGrid.appendChild(card);

        // Animación escalonada de entrada
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

/**
 * Crear un elemento de tarjeta de personaje
 * @param {Object} character - Objeto de datos del personaje
 * @returns {HTMLElement} Elemento de tarjeta de personaje
 */
function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'character-card';

    // Determinar clase de estado
    const statusClass = getStatusClass(character.status);
    const statusText = getStatusText(character.status);

    card.innerHTML = `
        <div class="card-image-container">
            <img src="${character.image}" alt="${character.name}" class="card-image">
            <span class="status-badge ${statusClass}">${statusText}</span>
        </div>
        <div class="card-content">
            <h2 class="character-name">${character.name}</h2>
            <div class="character-info">
                <div class="info-row">
                    <span class="info-label">Especie:</span>
                    <span class="info-value">${character.species}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Estado:</span>
                    <span class="info-value">${statusText}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Ubicación:</span>
                    <span class="info-value">${character.location.name}</span>
                </div>
                ${character.origin.name !== 'unknown' ? `
                <div class="info-row">
                    <span class="info-label">Origen:</span>
                    <span class="info-value">${character.origin.name}</span>
                </div>
                ` : ''}
            </div>
        </div>
    `;

    // Añadir animación de entrada
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';

    return card;
}

/**
 * Obtener clase CSS según el estado del personaje
 * @param {string} status - Estado del personaje (Alive, Dead, unknown)
 * @returns {string} Nombre de clase CSS
 */
function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'alive':
            return 'status-alive';
        case 'dead':
            return 'status-dead';
        default:
            return 'status-unknown';
    }
}

/**
 * Obtener texto de estado en español
 * @param {string} status - Estado del personaje
 * @returns {string} Texto de estado en español
 */
function getStatusText(status) {
    switch (status.toLowerCase()) {
        case 'alive':
            return 'Vivo';
        case 'dead':
            return 'Muerto';
        default:
            return 'Desconocido';
    }
}

/**
 * Actualizar controles de paginación
 */
function updatePagination() {
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

    // Habilitar/deshabilitar botones según la página actual
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

/**
 * Actualizar información de búsqueda
 * @param {number} count - Número total de resultados
 */
function updateSearchInfo(count) {
    if (isSearching && currentSearchQuery) {
        searchInfo.textContent = `Se encontraron ${count} personaje(s) que coinciden con "${currentSearchQuery}"`;
    } else {
        searchInfo.textContent = '';
    }
}

/**
 * Mostrar u ocultar spinner de carga
 * @param {boolean} show - Si mostrar el spinner de carga
 */
function showLoading(show) {
    if (show) {
        loading.classList.add('active');
        charactersGrid.style.opacity = '0.3';
    } else {
        loading.classList.remove('active');
        charactersGrid.style.opacity = '1';
    }
}

/**
 * Mostrar mensaje de error
 * @param {string} message - Mensaje de error a mostrar
 */
function showError(message) {
    errorElement.textContent = message;
    errorElement.classList.add('active');
}

/**
 * Ocultar mensaje de error
 */
function hideError() {
    errorElement.classList.remove('active');
}

/**
 * Ir a la página anterior
 */
function goToPreviousPage() {
    if (currentPage > 1) {
        fetchCharacters(currentPage - 1, currentSearchQuery);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Ir a la página siguiente
 */
function goToNextPage() {
    if (currentPage < totalPages) {
        fetchCharacters(currentPage + 1, currentSearchQuery);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Realizar búsqueda de personajes
 */
function performSearch() {
    const query = searchInput.value.trim();

    if (query === currentSearchQuery) {
        return; // No hacer nada si la búsqueda es la misma
    }

    currentSearchQuery = query;
    isSearching = query.length > 0;
    currentPage = 1;

    fetchCharacters(1, query);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Limpiar búsqueda y mostrar todos los personajes
 */
function clearSearch() {
    searchInput.value = '';
    currentSearchQuery = '';
    isSearching = false;
    currentPage = 1;

    fetchCharacters(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Inicializar event listeners
 */
function initEventListeners() {
    // Botones de paginación
    prevBtn.addEventListener('click', goToPreviousPage);
    nextBtn.addEventListener('click', goToNextPage);

    // Búsqueda
    searchBtn.addEventListener('click', performSearch);
    clearBtn.addEventListener('click', clearSearch);

    // Búsqueda al presionar Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        // Solo navegar si no estamos escribiendo en el input
        if (document.activeElement !== searchInput) {
            if (e.key === 'ArrowLeft') {
                goToPreviousPage();
            } else if (e.key === 'ArrowRight') {
                goToNextPage();
            }
        }
    });
}

/**
 * Inicializar la aplicación
 */
function init() {
    initEventListeners();
    fetchCharacters(1);
}

// Iniciar la aplicación cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
