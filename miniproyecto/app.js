// Buscador de Libros usando Open Library API
// JavaScript Vanilla

// Variables globales
let currentPage = 1;
let currentQuery = '';
let totalResults = 0;
const resultsPerPage = 20;

// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const booksGrid = document.getElementById('booksGrid');
const loading = document.getElementById('loading');
const pagination = document.getElementById('pagination');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const pageInfo = document.getElementById('pageInfo');
const errorMessage = document.getElementById('errorMessage');
const sectionTitle = document.getElementById('sectionTitle');

// Elementos del Modal
const bookModal = document.getElementById('bookModal');
const closeModal = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalAuthor = document.getElementById('modalAuthor');
const modalDate = document.getElementById('modalDate');
const modalDescription = document.getElementById('modalDescription');
const modalRating = document.getElementById('modalRating');
const modalExtraInfo = document.getElementById('modalExtraInfo');

// Event Listeners
searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        searchBooks(currentQuery, currentPage);
    }
});

nextButton.addEventListener('click', () => {
    const maxPages = Math.ceil(totalResults / resultsPerPage);
    if (currentPage < maxPages) {
        currentPage++;
        searchBooks(currentQuery, currentPage);
    }
});

// Event Listeners del Modal
closeModal.addEventListener('click', closeBookModal);
window.addEventListener('click', (e) => {
    if (e.target === bookModal) {
        closeBookModal();
    }
});

// Función para manejar la búsqueda
function handleSearch() {
    const query = searchInput.value.trim();

    if (query === '') {
        showError('Por favor, ingresa un término de búsqueda');
        return;
    }

    currentQuery = query;
    currentPage = 1;
    sectionTitle.textContent = `📚 Resultados para: "${query}"`;
    searchBooks(query, currentPage);
}

// Función principal para buscar libros
async function searchBooks(query, page = 1) {
    showLoading(true);
    hideError();
    booksGrid.innerHTML = '';
    pagination.style.display = 'none';

    try {
        const offset = (page - 1) * resultsPerPage;
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${resultsPerPage}&offset=${offset}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }

        const data = await response.json();

        totalResults = data.numFound;

        if (data.docs.length === 0) {
            showNoResults();
            showLoading(false);
            return;
        }

        displayBooks(data.docs);
        updatePagination(page);
        showLoading(false);

    } catch (error) {
        console.error('Error:', error);
        showError('Hubo un error al buscar los libros. Por favor, intenta de nuevo.');
        showLoading(false);
    }
}

// Función para mostrar los libros
function displayBooks(books) {
    booksGrid.innerHTML = '';

    books.forEach(book => {
        const bookCard = createBookCard(book);
        booksGrid.appendChild(bookCard);
    });
}

// Función para crear una tarjeta de libro
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';

    // Obtener la imagen del libro
    const coverId = book.cover_i;
    const imageUrl = coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : 'https://via.placeholder.com/200x280/8b7355/f5f1e8?text=Sin+Portada';

    // Obtener el título
    const title = book.title || 'Título no disponible';

    // Obtener el autor
    const author = book.author_name
        ? book.author_name.join(', ')
        : 'Autor desconocido';

    // Obtener la fecha de publicación
    const publishDate = book.first_publish_year
        ? book.first_publish_year
        : 'Fecha no disponible';

    // Crear el HTML de la tarjeta
    card.innerHTML = `
        <img 
            src="${imageUrl}" 
            alt="${title}" 
            class="book-image"
            onerror="this.src='https://via.placeholder.com/200x280/8b7355/f5f1e8?text=Sin+Portada'"
        >
        <h3 class="book-title">${truncateText(title, 60)}</h3>
        <p class="book-author">Por: ${truncateText(author, 50)}</p>
        <p class="book-date">📅 Publicado: ${publishDate}</p>
    `;

    // Agregar evento click para abrir el modal
    card.addEventListener('click', () => {
        openBookModal(book);
    });

    return card;
}

// Función para abrir el modal con detalles del libro
async function openBookModal(book) {
    bookModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body

    // Obtener datos básicos
    const coverId = book.cover_i;
    const imageUrl = coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        : 'https://via.placeholder.com/300x450/8b7355/f5f1e8?text=Sin+Portada';

    const title = book.title || 'Título no disponible';
    const author = book.author_name
        ? book.author_name.join(', ')
        : 'Autor desconocido';
    const publishDate = book.first_publish_year
        ? book.first_publish_year
        : 'Fecha no disponible';

    // Mostrar datos básicos
    modalImage.src = imageUrl;
    modalTitle.textContent = title;
    modalAuthor.textContent = `Por: ${author}`;
    modalDate.textContent = `📅 Publicado: ${publishDate}`;

    // Resetear contenido
    modalDescription.textContent = 'Cargando...';
    modalRating.textContent = 'Cargando...';
    modalExtraInfo.innerHTML = '';

    // Obtener detalles adicionales
    if (book.key) {
        await fetchBookDetails(book.key, book);
    }
}

// Función para obtener detalles del libro
async function fetchBookDetails(bookKey, book) {
    try {
        // Obtener información del libro
        const workResponse = await fetch(`https://openlibrary.org${bookKey}.json`);
        const workData = await workResponse.json();

        // Obtener descripción
        let description = 'No hay descripción disponible para este libro.';
        if (workData.description) {
            if (typeof workData.description === 'string') {
                description = workData.description;
            } else if (workData.description.value) {
                description = workData.description.value;
            }
        }
        modalDescription.textContent = description;

        // Obtener valoración (ratings)
        const ratingsResponse = await fetch(`https://openlibrary.org${bookKey}/ratings.json`);
        const ratingsData = await ratingsResponse.json();

        if (ratingsData.summary && ratingsData.summary.average) {
            const average = ratingsData.summary.average.toFixed(1);
            const count = ratingsData.summary.count || 0;
            const stars = generateStars(ratingsData.summary.average);

            modalRating.innerHTML = `
                <div class="rating-stars">${stars}</div>
                <p><strong>${average}</strong> de 5 estrellas</p>
                <p>${count} valoraciones de lectores</p>
            `;
        } else {
            modalRating.innerHTML = '<p>No hay valoraciones disponibles aún.</p>';
        }

        // Información adicional
        let extraInfo = '';

        if (book.publisher && book.publisher.length > 0) {
            extraInfo += `<p><strong>Editorial:</strong> ${book.publisher.slice(0, 3).join(', ')}</p>`;
        }

        if (book.language && book.language.length > 0) {
            const languages = book.language.map(lang => {
                const langMap = {
                    'eng': 'Inglés',
                    'spa': 'Español',
                    'fre': 'Francés',
                    'ger': 'Alemán',
                    'ita': 'Italiano'
                };
                return langMap[lang] || lang.toUpperCase();
            });
            extraInfo += `<p><strong>Idiomas:</strong> ${languages.join(', ')}</p>`;
        }

        if (book.isbn && book.isbn.length > 0) {
            extraInfo += `<p><strong>ISBN:</strong> ${book.isbn[0]}</p>`;
        }

        if (book.number_of_pages_median) {
            extraInfo += `<p><strong>Páginas:</strong> ${book.number_of_pages_median}</p>`;
        }

        if (book.subject && book.subject.length > 0) {
            const subjects = book.subject.slice(0, 5).join(', ');
            extraInfo += `<p><strong>Temas:</strong> ${subjects}</p>`;
        }

        modalExtraInfo.innerHTML = extraInfo || '<p>No hay información adicional disponible.</p>';

    } catch (error) {
        console.error('Error al obtener detalles:', error);
        modalDescription.textContent = 'No se pudo cargar la descripción del libro.';
        modalRating.textContent = 'No se pudo cargar la valoración.';
        modalExtraInfo.innerHTML = '<p>No se pudo cargar información adicional.</p>';
    }
}

// Función para generar estrellas
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    if (hasHalfStar) {
        stars += '⯨';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }

    return stars;
}

// Función para cerrar el modal
function closeBookModal() {
    bookModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
}

// Función para truncar texto
function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
}

// Función para actualizar la paginación
function updatePagination(page) {
    const maxPages = Math.ceil(totalResults / resultsPerPage);

    pageInfo.textContent = `Página ${page} de ${maxPages}`;

    prevButton.disabled = page === 1;
    nextButton.disabled = page >= maxPages;

    pagination.style.display = 'flex';

    // Scroll suave hacia arriba
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Función para mostrar el estado de carga
function showLoading(show) {
    if (show) {
        loading.classList.add('active');
    } else {
        loading.classList.remove('active');
    }
}

// Función para mostrar mensaje de error
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('active');
}

// Función para ocultar mensaje de error
function hideError() {
    errorMessage.classList.remove('active');
}

// Función para mostrar cuando no hay resultados
function showNoResults() {
    booksGrid.innerHTML = `
        <div class="no-results" style="grid-column: 1 / -1;">
            <h2>No se encontraron resultados</h2>
            <p>Intenta con otros términos de búsqueda</p>
        </div>
    `;
}

// Función para cargar recomendaciones iniciales
async function loadRecommendations() {
    const recommendedTopics = [
        'bestseller',
        'fiction',
        'science',
        'history',
        'fantasy'
    ];

    // Seleccionar un tema aleatorio
    const randomTopic = recommendedTopics[Math.floor(Math.random() * recommendedTopics.length)];

    currentQuery = randomTopic;
    await searchBooks(randomTopic, 1);
}

// Cargar recomendaciones al iniciar la página
window.addEventListener('DOMContentLoaded', () => {
    loadRecommendations();
});
