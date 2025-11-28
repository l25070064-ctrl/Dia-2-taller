// script.js
// Funciones para análisis de texto con validación y documentación

/**
 * Cuenta el número total de caracteres incluyendo espacios
 * @param {string} text - El texto a analizar
 * @returns {number} Cantidad total de caracteres
 */
function countCharactersWithSpaces(text) {
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
function countCharactersWithoutSpaces(text) {
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
function countWords(text) {
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
function countSentences(text) {
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
 * @returns {number} Tiempo estimado de lectura en minutos
 */
function estimateReadingTime(text) {
    if (!text || typeof text !== 'string') {
        return 0;
    }
    
    const words = countWords(text);
    const readingSpeed = 200; // palabras por minuto
    
    // Si hay menos de 200 palabras, mostrar al menos 1 minuto
    return Math.max(1, Math.ceil(words / readingSpeed));
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const textArea = document.getElementById('textArea');
    const charCountWithSpaces = document.getElementById('charCountWithSpaces');
    const charCountWithoutSpaces = document.getElementById('charCountWithoutSpaces');
    const wordCount = document.getElementById('wordCount');
    const sentenceCount = document.getElementById('sentenceCount');
    const readingTime = document.getElementById('readingTime');
    const resetBtn = document.getElementById('resetBtn');
    const copyBtn = document.getElementById('copyBtn');
    const emptyTextWarning = document.getElementById('emptyTextWarning');

    // Event listener para actualización en tiempo real
    // Se ejecuta cada vez que el usuario escribe, pega o modifica el texto
    textArea.addEventListener('input', updateStatistics);

    // Event listeners para los botones
    resetBtn.addEventListener('click', resetStatistics);
    copyBtn.addEventListener('click', copyStatistics);

    /**
     * Actualiza todas las estadísticas en tiempo real mientras el usuario escribe
     * Valida el texto y muestra/oculta el mensaje de texto vacío
     */
    function updateStatistics() {
        const text = textArea.value;
        
        // Validación: verificar si el texto está vacío
        if (text.trim().length === 0) {
            // Mostrar advertencia de texto vacío
            emptyTextWarning.style.display = 'block';
            
            // Reiniciar todos los contadores a 0
            charCountWithSpaces.textContent = '0';
            charCountWithoutSpaces.textContent = '0';
            wordCount.textContent = '0';
            sentenceCount.textContent = '0';
            readingTime.textContent = '0';
            return;
        }
        
        // Ocultar la advertencia cuando hay texto
        emptyTextWarning.style.display = 'none';
        
        // Calcular todas las estadísticas usando las funciones específicas
        const charWithSpaces = countCharactersWithSpaces(text);
        const charWithoutSpaces = countCharactersWithoutSpaces(text);
        const words = countWords(text);
        const sentences = countSentences(text);
        const readingMinutes = estimateReadingTime(text);

        // Actualizar el contenido del DOM con los nuevos valores
        charCountWithSpaces.textContent = charWithSpaces;
        charCountWithoutSpaces.textContent = charWithoutSpaces;
        wordCount.textContent = words;
        sentenceCount.textContent = sentences;
        readingTime.textContent = readingMinutes;
    }

    /**
     * Reinicia todas las estadísticas y limpia el textarea
     */
    function resetStatistics() {
        textArea.value = '';
        charCountWithSpaces.textContent = '0';
        charCountWithoutSpaces.textContent = '0';
        wordCount.textContent = '0';
        sentenceCount.textContent = '0';
        readingTime.textContent = '0';
        emptyTextWarning.style.display = 'block';
        textArea.focus(); // Poner el foco en el textarea
    }

    /**
     * Copia las estadísticas actuales al portapapeles
     * Muestra una confirmación al usuario
     */
    function copyStatistics() {
        const text = textArea.value;
        
        // Validar que haya texto para copiar
        if (text.trim().length === 0) {
            alert('Por favor, escribe algo antes de copiar las estadísticas.');
            return;
        }
        
        // Crear un string formateado con las estadísticas
        const stats = `
📊 ESTADÍSTICAS DE ANÁLISIS DE TEXTO
====================================
Caracteres (con espacios): ${charCountWithSpaces.textContent}
Caracteres (sin espacios): ${charCountWithoutSpaces.textContent}
Palabras: ${wordCount.textContent}
Oraciones: ${sentenceCount.textContent}
Tiempo estimado de lectura: ${readingTime.textContent} minuto(s)
====================================`;
        
        // Copiar al portapapeles
        navigator.clipboard.writeText(stats).then(() => {
            // Mostrar confirmación
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓ Copiado!';
            copyBtn.disabled = true;
            
            // Restaurar el botón después de 2 segundos
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.disabled = false;
            }, 2000);
        }).catch(err => {
            alert('No se pudo copiar las estadísticas. Intenta de nuevo.');
            console.error('Error al copiar:', err);
        });
    }
});