// 🖱️ Ejercicio: DOM (Document Object Model)

// 1. Seleccionar elementos
// Pídele a la IA: "¿Cómo selecciono un elemento por su ID en JavaScript?"
// Selecciona el botón 'btnCambiarColor' y la 'miCaja'.
var botonCambiarColor = document.getElementById("btnCambiarColor");
var miCaja = document.getElementById("miCaja");

// Selecciona el botón 'btnCambiarTexto'.
var botonCambiarTexto = document.getElementById("btnCambiarTexto");


// 2. Escuchar eventos (Clicks)
// Pídele a la IA: "¿Cómo hago que pase algo cuando hago click en un botón?"
botonCambiarColor.addEventListener("click", function() {
    // Código para cambiar el color de fondo de la caja
    miCaja.style.backgroundColor = "red";
});

botonCambiarTexto.addEventListener("click", function() {
    // Código para cambiar el texto dentro de la caja
    miCaja.textContent = "¡Hola DOM!";
});

// 3. Modificar elementos
// Cuando den click en 'Cambiar Color', cambia el color de fondo de la caja a rojo.
// Pídele a la IA: "¿Cómo cambio el estilo background-color de un elemento con JS?"


// Reto:
// Haz que el botón 'Cambiar Texto' cambie lo que dice dentro de la caja por "¡Hola DOM!".
