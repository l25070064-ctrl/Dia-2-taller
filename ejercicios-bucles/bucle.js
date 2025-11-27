//ejercicio: Arrays y Objetos
//1. Arrays (listas)
//Crea una lista de tus 3 comidas favoritas.
var comidasFavoritas = ["Pizza", "Sushi", "Tacos"];
// Como agrego un elemento a un Array en JS
comidasFavoritas.push("Helado"); // Agrega "Helado" al final de la lista
// Muestrame la lista en consola
console.log("Comidas favoritas:", comidasFavoritas);

//2. Objetos (fichas)
//Crea un objeto que represente a un alumno (nombre, edad, si te gusta programar).
var alumno = {
    nombre: "Antonio",
    edad: 18,
    leGustaProgramar: true,
    habilidades: ["JavaScript", "Python", "C++"],
    estatura: 1.64,
    printInfo: function() {
        console.log("Nombre:", this.nombre);
        console.log("Edad:", this.edad);
        console.log("Le gusta programar:", this.leGustaProgramar);
        console.log("Habilidades:", this.habilidades.join(", "));
        console.log("Estatura:", this.estatura, "m");
    }
};
// Como accedo a la propiedad "nombre" del objeto del alumno
console.log("Nombre del alumno:", alumno.nombre);
// Muestrame el objeto en consola
console.log("Objeto alumno:", alumno);
// Como accedo a la funcion printInfo del objeto alumno
alumno.printInfo();

//3. Arrays de objetos (Reto extra de calificación)
// Crea una lista de 3 alumnos con nombre y calificación.
var listaAlumnos = [
    { nombre: "Antonio", calificacion: 9 },
    { nombre: "Luis", calificacion: 7 },
    { nombre: "Marta", calificacion: 5 }
];
// Muestrame la lista de alumnos y crea un bucle que recorra el Array e imprima el nombre y la calificación solo de los que aprobaron (calificación >= 6).
console.log("Lista de alumnos aprobados:");
for (var i = 0; i < listaAlumnos.length; i++) {
    var alumnoAprobado = listaAlumnos[i];
    if (alumnoAprobado.calificacion >= 6) {
        console.log("Nombre:", alumnoAprobado.nombre, "- Calificación:", alumnoAprobado.calificacion);
    }
}



