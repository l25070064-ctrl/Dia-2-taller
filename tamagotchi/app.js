// 🐱 Cuidando a Taco - Tamagotchi con IA básica
// JavaScript Vanilla

// ============================================
// VARIABLES GLOBALES
// ============================================

// Estados de Taco (0-100)
let hunger = 50;        // Hambre
let energy = 50;        // Energía
let happiness = 50;     // Felicidad

// Control de tiempo
let timeAlive = 0;      // Tiempo vivo en segundos
let gameActive = true;  // Estado del juego
let isDaytime = true;   // Modo día/noche

// Intervalos
let hungerInterval;
let energyInterval;
let happinessInterval;
let timeInterval;
let dayNightInterval;

// ============================================
// ELEMENTOS DEL DOM
// ============================================

// Estadísticas
const hungerValue = document.getElementById('hungerValue');
const energyValue = document.getElementById('energyValue');
const happinessValue = document.getElementById('happinessValue');
const hungerBar = document.getElementById('hungerBar');
const energyBar = document.getElementById('energyBar');
const happinessBar = document.getElementById('happinessBar');
const timeAliveElement = document.getElementById('timeAlive');
const recordElement = document.getElementById('record');

// Personaje y pensamiento
const tacoCharacter = document.getElementById('tacoCharacter');
const thoughtText = document.getElementById('thoughtText');

// Botones de acción
const feedButton = document.getElementById('feedButton');
const sleepButton = document.getElementById('sleepButton');
const playButton = document.getElementById('playButton');
const medicineButton = document.getElementById('medicineButton');

// Game Over
const gameOverOverlay = document.getElementById('gameOverOverlay');
const gameOverMessage = document.getElementById('gameOverMessage');
const restartButton = document.getElementById('restartButton');

// Logros
const achievement30s = document.getElementById('achievement30s');
const achievement1min = document.getElementById('achievement1min');
const achievement3min = document.getElementById('achievement3min');
const achievement5min = document.getElementById('achievement5min');
const achievement10min = document.getElementById('achievement10min');

// Día/Noche
const dayNightIndicator = document.getElementById('dayNightIndicator');

// ============================================
// EVENT LISTENERS
// ============================================

feedButton.addEventListener('click', feedTaco);
sleepButton.addEventListener('click', sleepTaco);
playButton.addEventListener('click', playWithTaco);
medicineButton.addEventListener('click', giveMedicine);
restartButton.addEventListener('click', restartGame);

// ============================================
// FUNCIONES DE INICIALIZACIÓN
// ============================================

function initGame() {
    // Crear estrellas de fondo
    createStars();

    // Cargar récord
    loadRecord();

    // Iniciar intervalos de cambio de estados
    startIntervals();

    // Actualizar UI inicial
    updateUI();
    updateThought();
}

function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

function startIntervals() {
    // Hambre aumenta 5 puntos cada 3 segundos
    hungerInterval = setInterval(() => {
        if (gameActive) {
            hunger = Math.min(100, hunger + 5);
            updateUI();
            updateThought();
            checkGameOver();
        }
    }, 3000);

    // Energía disminuye 3 puntos cada 4 segundos
    energyInterval = setInterval(() => {
        if (gameActive) {
            // Si es de noche, la energía disminuye más rápido
            const decrease = isDaytime ? 3 : 5;
            energy = Math.max(0, energy - decrease);
            updateUI();
            updateThought();
            checkGameOver();
        }
    }, 4000);

    // Felicidad disminuye 2 puntos cada 5 segundos
    happinessInterval = setInterval(() => {
        if (gameActive) {
            happiness = Math.max(0, happiness - 2);
            updateUI();
            updateThought();
            checkGameOver();
        }
    }, 5000);

    // Contador de tiempo
    timeInterval = setInterval(() => {
        if (gameActive) {
            timeAlive++;
            updateTimeDisplay();
            checkAchievements();
        }
    }, 1000);

    // Ciclo día/noche cada 30 segundos
    dayNightInterval = setInterval(() => {
        if (gameActive) {
            isDaytime = !isDaytime;
            updateDayNight();
        }
    }, 30000);
}

// ============================================
// ACCIONES DEL JUGADOR
// ============================================

function feedTaco() {
    if (!gameActive) return;

    // Reduce hambre en 30 puntos
    hunger = Math.max(0, hunger - 30);

    // Efectos visuales
    createParticles('🍕');
    shakeTaco();
    playSound('eat');

    updateUI();
    updateThought();
}

function sleepTaco() {
    if (!gameActive) return;

    // Aumenta energía en 40 puntos
    energy = Math.min(100, energy + 40);

    // Efectos visuales
    createParticles('💤');
    shakeTaco();
    playSound('sleep');

    updateUI();
    updateThought();
}

function playWithTaco() {
    if (!gameActive) return;

    // Aumenta felicidad en 25 puntos
    happiness = Math.min(100, happiness + 25);

    // Reduce energía en 15 puntos
    energy = Math.max(0, energy - 15);

    // Efectos visuales
    createParticles('🎮');
    shakeTaco();
    playSound('play');

    updateUI();
    updateThought();
}

function giveMedicine() {
    if (!gameActive) return;

    // Solo se puede usar si algún estado está crítico (< 40)
    if (hunger < 40 || energy < 40 || happiness < 40) {
        // Restaura todos los estados a 50
        hunger = 50;
        energy = 50;
        happiness = 50;

        // Efectos visuales
        createParticles('💊');
        shakeTaco();
        playSound('medicine');

        updateUI();
        updateThought();
    } else {
        // Mostrar mensaje de que no es necesario
        thoughtText.textContent = "¡No necesito medicina ahora! 😊";
    }
}

// ============================================
// LÓGICA DE IA - TACO "PIENSA"
// ============================================

function updateThought() {
    let thought = "";
    let emoji = "😺";

    // Prioridad: Hambre > Energía > Felicidad
    if (hunger > 70) {
        thought = "¡Dame comida YA! 🍕";
        emoji = "😿";
    } else if (hunger > 50) {
        thought = "Tengo un poco de hambre... 😋";
        emoji = "😸";
    } else if (energy < 30) {
        thought = "Estoy muy cansado... 😴";
        emoji = "😴";
    } else if (energy < 50) {
        thought = "Me siento algo cansado 🥱";
        emoji = "😪";
    } else if (happiness > 80) {
        thought = "¡Estoy súper feliz! 😸";
        emoji = "😻";
    } else if (happiness < 30) {
        thought = "Estoy triste... 😿";
        emoji = "😿";
    } else if (hunger >= 40 && hunger <= 70 &&
        energy >= 40 && energy <= 70 &&
        happiness >= 40 && happiness <= 70) {
        thought = "Me siento bien 😺";
        emoji = "😺";
    } else {
        thought = "¿Cómo estás? 🐱";
        emoji = "😺";
    }

    thoughtText.textContent = thought;
    tacoCharacter.textContent = emoji;
}

// ============================================
// ACTUALIZACIÓN DE UI
// ============================================

function updateUI() {
    // Actualizar valores numéricos
    hungerValue.textContent = Math.round(hunger);
    energyValue.textContent = Math.round(energy);
    happinessValue.textContent = Math.round(happiness);

    // Actualizar barras de progreso
    updateProgressBar(hungerBar, hunger);
    updateProgressBar(energyBar, energy);
    updateProgressBar(happinessBar, happiness);

    // Actualizar botón de medicina
    updateMedicineButton();
}

function updateProgressBar(bar, value) {
    const percentage = Math.max(0, Math.min(100, value));
    bar.style.width = percentage + '%';
    bar.textContent = Math.round(percentage);

    // Cambiar color según el valor
    bar.classList.remove('green', 'yellow', 'red');
    if (percentage >= 70) {
        bar.classList.add('green');
    } else if (percentage >= 40) {
        bar.classList.add('yellow');
    } else {
        bar.classList.add('red');
    }
}

function updateMedicineButton() {
    // Habilitar medicina solo si algún estado está crítico
    if (hunger < 40 || energy < 40 || happiness < 40) {
        medicineButton.disabled = false;
    } else {
        medicineButton.disabled = true;
    }
}

function updateTimeDisplay() {
    const minutes = Math.floor(timeAlive / 60);
    const seconds = timeAlive % 60;
    timeAliveElement.textContent = `⏱️ Tiempo vivo: ${minutes}m ${seconds}s`;
}

function updateDayNight() {
    if (isDaytime) {
        dayNightIndicator.textContent = '☀️';
    } else {
        dayNightIndicator.textContent = '🌙';
    }
}

// ============================================
// EFECTOS VISUALES
// ============================================

function shakeTaco() {
    tacoCharacter.classList.add('shake');
    setTimeout(() => {
        tacoCharacter.classList.remove('shake');
    }, 500);
}

function createParticles(emoji) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = emoji;

            // Posición aleatoria alrededor de Taco
            const rect = tacoCharacter.getBoundingClientRect();
            particle.style.left = rect.left + rect.width / 2 + (Math.random() - 0.5) * 100 + 'px';
            particle.style.top = rect.top + rect.height / 2 + 'px';

            document.body.appendChild(particle);

            // Eliminar después de la animación
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }, i * 100);
    }
}

// ============================================
// SONIDOS (Opcional - usando Web Audio API)
// ============================================

function playSound(type) {
    // Crear contexto de audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Diferentes frecuencias para diferentes acciones
    switch (type) {
        case 'eat':
            oscillator.frequency.value = 400;
            break;
        case 'sleep':
            oscillator.frequency.value = 200;
            break;
        case 'play':
            oscillator.frequency.value = 600;
            break;
        case 'medicine':
            oscillator.frequency.value = 500;
            break;
    }

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// ============================================
// LOGROS
// ============================================

function checkAchievements() {
    if (timeAlive >= 30 && !achievement30s.classList.contains('unlocked')) {
        unlockAchievement(achievement30s, '🎉 ¡30 segundos!');
    }
    if (timeAlive >= 60 && !achievement1min.classList.contains('unlocked')) {
        unlockAchievement(achievement1min, '🎊 ¡1 minuto!');
    }
    if (timeAlive >= 180 && !achievement3min.classList.contains('unlocked')) {
        unlockAchievement(achievement3min, '🌟 ¡3 minutos!');
    }
    if (timeAlive >= 300 && !achievement5min.classList.contains('unlocked')) {
        unlockAchievement(achievement5min, '⭐ ¡5 minutos!');
    }
    if (timeAlive >= 600 && !achievement10min.classList.contains('unlocked')) {
        unlockAchievement(achievement10min, '🏆 ¡10 minutos!');
    }
}

function unlockAchievement(element, message) {
    element.classList.add('unlocked');

    // Mostrar mensaje temporal
    const originalThought = thoughtText.textContent;
    thoughtText.textContent = message;

    setTimeout(() => {
        updateThought();
    }, 3000);
}

// ============================================
// GAME OVER
// ============================================

function checkGameOver() {
    // Game Over si cualquier estado llega a 0 o hambre llega a 100
    if (hunger >= 100 || energy <= 0 || happiness <= 0) {
        gameOver();
    }
}

function gameOver() {
    gameActive = false;

    // Detener todos los intervalos
    clearInterval(hungerInterval);
    clearInterval(energyInterval);
    clearInterval(happinessInterval);
    clearInterval(timeInterval);
    clearInterval(dayNightInterval);

    // Determinar causa de muerte
    let cause = "";
    if (hunger >= 100) {
        cause = "Taco murió de hambre... 😿";
    } else if (energy <= 0) {
        cause = "Taco murió de agotamiento... 😿";
    } else if (happiness <= 0) {
        cause = "Taco murió de tristeza... 😿";
    }

    gameOverMessage.textContent = cause + `\n\nSobrevivió ${formatTime(timeAlive)}`;

    // Guardar récord
    saveRecord();

    // Mostrar overlay
    gameOverOverlay.classList.add('active');
}

// ============================================
// REINICIAR JUEGO
// ============================================

function restartGame() {
    // Resetear estados
    hunger = 50;
    energy = 50;
    happiness = 50;
    timeAlive = 0;
    gameActive = true;
    isDaytime = true;

    // Ocultar overlay
    gameOverOverlay.classList.remove('active');

    // Resetear logros visuales (pero no borrar los desbloqueados)
    // Los logros se mantienen entre partidas

    // Reiniciar intervalos
    startIntervals();

    // Actualizar UI
    updateUI();
    updateThought();
    updateTimeDisplay();
    updateDayNight();
}

// ============================================
// RÉCORD (LocalStorage)
// ============================================

function saveRecord() {
    const currentRecord = localStorage.getItem('tacoRecord') || 0;
    if (timeAlive > currentRecord) {
        localStorage.setItem('tacoRecord', timeAlive);
        loadRecord();
    }
}

function loadRecord() {
    const record = localStorage.getItem('tacoRecord') || 0;
    recordElement.textContent = `🏆 Récord: ${formatTime(record)}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
}

// ============================================
// INICIAR JUEGO AL CARGAR LA PÁGINA
// ============================================

window.addEventListener('DOMContentLoaded', () => {
    initGame();
});
