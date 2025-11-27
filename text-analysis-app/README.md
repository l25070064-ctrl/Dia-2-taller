# Proyecto de Análisis de Texto

Este proyecto es una aplicación web que permite a los usuarios analizar el texto ingresado. Proporciona estadísticas útiles como el número de caracteres, palabras, oraciones y el tiempo estimado de lectura.

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de archivos:

```
text-analysis-app
├── src
│   ├── index.html        # Estructura básica de la aplicación web
│   ├── styles.css       # Estilos CSS para la aplicación
│   ├── script.js        # Lógica principal de la aplicación
│   └── utils
│       └── textAnalyzer.js # Funciones para analizar el texto
├── assets
│   └── README.md        # Información sobre los recursos utilizados
└── README.md            # Documentación general del proyecto
```

## Características

- Área de texto grande para ingresar texto.
- Cálculo automático de estadísticas:
  - Número de caracteres (con y sin espacios).
  - Número de palabras.
  - Número de oraciones.
  - Tiempo estimado de lectura (basado en 200 palabras por minuto).
- Botón para resetear todas las estadísticas.
- Botón para copiar las estadísticas al portapapeles.

## Instrucciones para Ejecutar

1. Clona el repositorio en tu máquina local.
2. Abre el archivo `src/index.html` en un navegador web.
3. Ingresa tu texto en el área designada y observa cómo se actualizan las estadísticas automáticamente.

## Tecnologías Utilizadas

- HTML
- CSS
- JavaScript

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar el proyecto, por favor abre un issue o un pull request.