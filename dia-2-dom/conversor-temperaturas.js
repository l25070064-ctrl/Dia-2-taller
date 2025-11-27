// ============================================
// CONVERSOR DE TEMPERATURAS
// ============================================

/**
 * Función que convierte una temperatura de Celsius a Fahrenheit y Kelvin
 * @param {number} celsius - La temperatura en grados Celsius
 * @returns {object} Objeto con las conversiones a Fahrenheit y Kelvin
 */
function convertirTemperatura(celsius) {
    // Validar que el parámetro sea un número
    if (typeof celsius !== 'number') {
        return { error: "Por favor, ingresa un número válido" };
    }

    // Fórmula para convertir Celsius a Fahrenheit: (°C × 9/5) + 32
    var fahrenheit = (celsius * 9/5) + 32;

    // Fórmula para convertir Celsius a Kelvin: °C + 273.15
    var kelvin = celsius + 273.15;

    // Retornar un objeto con los resultados
    return {
        celsius: celsius,
        fahrenheit: fahrenheit.toFixed(2),  // Redondeamos a 2 decimales
        kelvin: kelvin.toFixed(2)           // Redondeamos a 2 decimales
    };
}

// ============ PRUEBAS DE LA FUNCIÓN ============

// Prueba 1: Conversión de 0°C (punto de congelación del agua)
console.log("--- Prueba 1: Punto de congelación del agua ---");
console.log(convertirTemperatura(0));

// Prueba 2: Conversión de 25°C (temperatura ambiente)
console.log("\n--- Prueba 2: Temperatura ambiente ---");
console.log(convertirTemperatura(25));

// Prueba 3: Conversión de 100°C (punto de ebullición del agua)
console.log("\n--- Prueba 3: Punto de ebullición del agua ---");
console.log(convertirTemperatura(100));

// Prueba 4: Conversión de -40°C (donde Celsius = Fahrenheit)
console.log("\n--- Prueba 4: Temperatura especial (-40°C) ---");
console.log(convertirTemperatura(-40));

// Prueba 5: Validación con un valor inválido
console.log("\n--- Prueba 5: Validación con valor inválido ---");
console.log(convertirTemperatura("no soy un número"));
