// Ejercicio: Area y Volumenes
// Objetivo crear multiples funciones y reutilizables
// Crea una funcion para calcular el area de un circulo dado su radio
/**
 * Calcula el área de un círculo.
 * @param {number} radio - El radio del círculo.
 * @returns {number} El área del círculo.
 */
function areaCirculo(radio) {
    return Math.PI * radio * radio;
}
console.log(areaCirculo(5));

//crea una funcion para calcular el area de un rectangulo dado su base y altura
/**
 * Calcula el área de un rectángulo.
 * @param {number} base - La base del rectángulo.
 * @param {number} altura - La altura del rectángulo.
 * @returns {number} El área del rectángulo.
 * @example
 * // Devuelve 50
 * areaRectangulo(5, 10);
 */
function areaRectangulo(base, altura) {
    return base * altura;
}
console.log(areaRectangulo(5, 10));

//crea una funcion para calcular el volumen de un cilindro
//crea la funcion 'calcular volumen cilindro reutilizando la funcion areaCirculo'
/**
 * Calcula el volumen de un cilindro.
 * Reutiliza la función areaCirculo para obtener el área de la base.
 * @param {number} radio - El radio de la base del cilindro.
 * @param {number} altura - La altura del cilindro.
 * @returns {number} El volumen del cilindro.
 * @example
 * // Devuelve aproximadamente 785.398
 * calcularVolumenCilindro(5, 10);
 */
function calcularVolumenCilindro(radio, altura) {
    return areaCirculo(radio) * altura;
}
console.log(calcularVolumenCilindro(5, 10));

//crea una funcion para calcular una derivada simple de una funcion polinomial de grado n
function derivadaSimple(funcion, grado) {
    return funcion(grado) * grado;
}
console.log(derivadaSimple(areaCirculo, 5));


