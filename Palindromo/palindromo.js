// Ejercicio: Detector de palindromos
// Objetivo: crear una logica completa encapsulada en una funcion.
// Un palindromo es una cadena de texto que se lee igual de izquierda a derecha que de derecha a izquierda.
// Por ejemplo: 'ana', 'radar', 'reconocer' son palindromos.
// Crea una funcion llamada esPalindromo que reciba un texto y retorne true si es palindromo y false si no lo es.
function esPalindromo(texto) {
    // Convertir el texto a minúsculas y eliminar caracteres no alfanuméricos
    let textoLimpiado = texto.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (textoLimpiado.length === 0) return false;

    // Invertir el texto limpiado
    let textoReverso = textoLimpiado.split('').reverse().join('');
    // Comparar el texto original limpiado con su versión invertida
    return textoLimpiado === textoReverso;
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('inputPalabra');
    const button = document.getElementById('btnVerificar');
    const resultado = document.getElementById('resultado');

    function verificar() {
        const texto = input.value;

        if (!texto.trim()) {
            resultado.textContent = 'Por favor, ingresa un texto.';
            resultado.className = 'error visible';
            return;
        }

        const es = esPalindromo(texto);

        if (es) {
            resultado.textContent = `"${texto}" es un palíndromo ✨`;
            resultado.className = 'success visible';
        } else {
            resultado.textContent = `"${texto}" no es un palíndromo ❌`;
            resultado.className = 'error visible';
        }
    }

    button.addEventListener('click', verificar);

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            verificar();
        }
    });
});
