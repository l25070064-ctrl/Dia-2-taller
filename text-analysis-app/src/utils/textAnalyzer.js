/**
 * Cuenta el número total de caracteres incluyendo espacios
 * @param {string} text - El texto a analizar
 * @returns {number} Cantidad total de caracteres
 */
export function countCharactersWithSpaces(text) {
    if (!text || typeof text !== 'string') {
        return 0;
    }
    return text.length;
}

/**
 * Cuenta el número de caracteres sin incluir espacios en blanco
 * @param {string} text - El texto a analizar
 * @returns {number} Cantidad de caracteres sin espacios
 */
export function countCharactersWithoutSpaces(text) {
    if (!text || typeof text !== 'string') {
        return 0;
    }
    return text.replace(/\s/g, '').length;
}

/**
 * Cuenta el número de palabras considerando espacios múltiples
 * Los espacios múltiples se tratan como un solo separador
 * @param {string} text - El texto a analizar
 * @returns {number} Cantidad de palabras encontradas
 */
export function countWords(text) {
    if (!text || typeof text !== 'string') {
        return 0;
    }
    
    // Validar texto vacío
    const trimmedText = text.trim();
    if (trimmedText.length === 0) {
        return 0;
    }
    
    // Dividir por uno o más espacios en blanco (incluyendo tabs, saltos de línea, etc.)
    const words = trimmedText.split(/\s+/).filter(word => word.length > 0);
    return words.length;
}

/**
 * Cuenta el número de oraciones basado en puntos, signos de interrogación y exclamación
 * @param {string} text - El texto a analizar
 * @returns {number} Cantidad de oraciones encontradas
 */
export function countSentences(text) {
    if (!text || typeof text !== 'string') {
        return 0;
    }
    
    // Validar texto vacío
    const trimmedText = text.trim();
    if (trimmedText.length === 0) {
        return 0;
    }
    
    // Dividir por puntos, signos de interrogación y exclamación
    // Filtra las oraciones vacías resultantes
    const sentences = trimmedText
        .split(/[.!?]+/)
        .filter(sentence => sentence.trim().length > 0);
    
    return sentences.length;
}

/**
 * Calcula el tiempo estimado de lectura en minutos
 * Basado en una velocidad promedio de lectura de 200 palabras por minuto
 * @param {string} text - El texto a analizar
 * @returns {number} Tiempo estimado de lectura en minutos (mínimo 1)
 */
export function estimateReadingTime(text) {
    if (!text || typeof text !== 'string') {
        return 0;
    }
    
    const words = countWords(text);
    const readingSpeed = 200; // palabras por minuto
    
    // Si hay menos de 200 palabras, mostrar al menos 1 minuto
    return Math.max(1, Math.ceil(words / readingSpeed));
}