// Función que suma dos números y devuelve el resultado.
// Comentarios explicativos están en cada línea para principiantes.

// Definimos la función llamada "suma" que recibe dos parámetros: a y b.
// a y b representan los dos números que queremos sumar.
function suma(a, b) {
	// Aquí comprobamos que los parámetros sean números.
	// isNaN devuelve true si el valor NO es un número válido.
	if (isNaN(a) || isNaN(b)) {
		// Si alguno no es número, devolvemos NaN para indicar error en la operación.
		return NaN;
	}

	// Realizamos la suma de los dos valores.
	// El operador + suma números. Si fueran cadenas, se concatenarían,
	// por eso la verificación anterior ayuda a evitar concatenaciones no deseadas.
	var resultado = a + b;

	// Devolvemos el resultado al código que llamó a esta función.
	return resultado;
}

// Exportamos la función para que pueda usarse en otros archivos (Node.js).
module.exports = suma;

// -------------------------------------------------------------------
// Explicación: ¿Qué es una "Variable"? (Analogía con cajas de mudanza)
// -------------------------------------------------------------------
// Imagina que una variable es como una caja de mudanza con una etiqueta.
// Puedes poner cosas dentro de la caja, cambiar lo que hay dentro, o vaciarla.
// La etiqueta es el nombre de la variable: te dice dónde está guardado el contenido.
// A continuación hay un ejemplo en código con comentarios línea por línea,
// usando sintaxis sencilla (sin ES6) para que sea fácil de entender.

// Declaramos una variable llamada 'caja' (la etiqueta de la caja).
var caja; // todavía está vacía porque no le pusimos nada dentro.

// Guardamos algo en la caja: en este caso, la palabra "libros".
caja = "libros"; // ahora la caja contiene "libros".

// Mostramos en la consola qué hay dentro de la caja.
console.log("Contenido de la caja:", caja); // imprime: Contenido de la caja: libros

// Podemos crear otra caja y poner otra cosa dentro al declararla y asignarla.
var otraCaja = "ropa"; // nueva caja que contiene "ropa"
console.log("Contenido de otraCaja:", otraCaja); // imprime: Contenido de otraCaja: ropa

// Podemos mover objetos entre cajas (reasignar valores).
var cajaTemporal = caja; // copiamos el contenido de 'caja' a 'cajaTemporal'
caja = otraCaja; // ahora 'caja' contiene lo que tenía 'otraCaja' ("ropa")

// Mostramos el resultado después del cambio.
console.log("Después de mover cosas:");
console.log("caja contiene:", caja); // imprime: caja contiene: ropa
console.log("cajaTemporal contiene:", cajaTemporal); // imprime: cajaTemporal contiene: libros

// También podemos vaciar una caja asignándole undefined o null.
cajaTemporal = undefined; // ahora la caja temporal está vacía (no contiene información útil)
console.log("cajaTemporal ahora contiene:", cajaTemporal); // imprime: cajaTemporal ahora contiene: undefined

// Resumen simple:
// - Declarar una variable = crear una caja con etiqueta.
// - Asignar un valor = poner algo dentro de la caja.
// - Reasignar = cambiar lo que hay dentro de la caja.
// - Leer la variable = abrir la caja y ver su contenido.