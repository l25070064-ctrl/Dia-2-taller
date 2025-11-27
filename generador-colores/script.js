// Elementos del DOM
const colorDisplay = document.getElementById('colorDisplay');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const colorCode = document.getElementById('colorCode');

// Función para generar un color hexadecimal aleatorio
function generateRandomColor() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    return randomColor;
}

// Función para actualizar el color
function updateColor() {
    const newColor = generateRandomColor();
    colorDisplay.style.backgroundColor = newColor;
    colorCode.textContent = newColor;
}

// Función para copiar el código al portapapeles
function copyToClipboard() {
    const hexCode = colorCode.textContent;
    navigator.clipboard.writeText(hexCode).then(() => {
        // Cambiar el texto del botón temporalmente
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '¡Copiado!';
        copyBtn.classList.add('copy-success');
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.classList.remove('copy-success');
        }, 2000);
    }).catch(err => {
        alert('Error al copiar: ' + err);
    });
}

// Event listeners
generateBtn.addEventListener('click', updateColor);
copyBtn.addEventListener('click', copyToClipboard);

// Generar un color inicial al cargar la página
updateColor();

// Permitir generar color con la tecla Enter
document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        updateColor();
    }
});
