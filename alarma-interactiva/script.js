class AlarmApp {
    constructor() {
        this.isActive = false;
        this.alarmTime = null;
        this.alarms = JSON.parse(localStorage.getItem('alarms')) || [];
        
        this.initElements();
        this.attachEventListeners();
        this.updateTime();
        this.renderAlarms();
        setInterval(() => this.updateTime(), 1000);
    }

    initElements() {
        this.timeDisplay = document.getElementById('timeDisplay');
        this.alarmStatus = document.getElementById('alarmStatus');
        this.hoursInput = document.getElementById('hours');
        this.minutesInput = document.getElementById('minutes');
        this.secondsInput = document.getElementById('seconds');
        this.soundSelect = document.getElementById('soundSelect');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.volumeValue = document.getElementById('volumeValue');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.alarmDisplay = document.querySelector('.alarm-display');
        this.alarmList = document.getElementById('alarmList');
    }

    attachEventListeners() {
        this.startBtn.addEventListener('click', () => this.startAlarm());
        this.stopBtn.addEventListener('click', () => this.stopAlarm());
        this.resetBtn.addEventListener('click', () => this.resetInputs());
        this.volumeSlider.addEventListener('input', (e) => {
            this.volumeValue.textContent = e.target.value;
        });
    }

    updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        this.timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

        if (this.isActive && this.alarmTime) {
            const currentTime = `${hours}:${minutes}:${seconds}`;
            if (currentTime === this.alarmTime) {
                this.triggerAlarm();
            }
        }
    }

    startAlarm() {
        const hours = String(this.hoursInput.value).padStart(2, '0');
        const minutes = String(this.minutesInput.value).padStart(2, '0');
        const seconds = String(this.secondsInput.value).padStart(2, '0');
        
        this.alarmTime = `${hours}:${minutes}:${seconds}`;
        this.isActive = true;
        
        this.alarmStatus.textContent = `Activa - ${this.alarmTime}`;
        this.alarmDisplay.classList.add('active');
        this.startBtn.disabled = true;
        this.startBtn.style.opacity = '0.5';

        // Guardar alarma
        const alarm = {
            id: Date.now(),
            time: this.alarmTime,
            sound: this.soundSelect.value,
            volume: this.volumeSlider.value
        };
        this.alarms.push(alarm);
        this.saveAlarms();
        this.renderAlarms();
    }

    stopAlarm() {
        this.isActive = false;
        this.alarmTime = null;
        this.alarmStatus.textContent = 'Inactiva';
        this.alarmDisplay.classList.remove('active');
        this.startBtn.disabled = false;
        this.startBtn.style.opacity = '1';
        this.stopSound();
    }

    resetInputs() {
        this.hoursInput.value = '07';
        this.minutesInput.value = '00';
        this.secondsInput.value = '00';
        this.stopAlarm();
    }

    triggerAlarm() {
        this.alarmDisplay.classList.add('active');
        this.playSound();
        alert('¡La alarma ha sonado! 🔔');
        this.stopAlarm();
    }

    playSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const volume = this.volumeSlider.value / 100;
        const soundType = this.soundSelect.value;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);

        switch(soundType) {
            case 'bell':
                oscillator.frequency.value = 800;
                break;
            case 'alarm':
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);
                break;
            case 'buzzer':
                oscillator.frequency.value = 1000;
                break;
            case 'ding':
                oscillator.frequency.value = 1200;
                break;
        }

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
    }

    stopSound() {
        // Detener cualquier sonido activo
    }

    saveAlarms() {
        localStorage.setItem('alarms', JSON.stringify(this.alarms));
    }

    renderAlarms() {
        if (this.alarms.length === 0) {
            this.alarmList.innerHTML = '';
            return;
        }

        this.alarmList.innerHTML = '<h3 style="color: #333; margin-bottom: 15px;">Alarmas Programadas:</h3>';
        this.alarms.forEach(alarm => {
            const alarmElement = document.createElement('div');
            alarmElement.style.cssText = `
                padding: 15px;
                background: #f5f5f5;
                border-radius: 10px;
                margin-bottom: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            `;
            alarmElement.innerHTML = `
                <span style="color: #333; font-weight: 600;">⏰ ${alarm.time}</span>
                <button class="btn btn-delete" style="padding: 8px 15px; background-color: #ef4444;">Eliminar</button>
            `;
            alarmElement.querySelector('.btn-delete').addEventListener('click', () => {
                this.alarms = this.alarms.filter(a => a.id !== alarm.id);
                this.saveAlarms();
                this.renderAlarms();
            });
            this.alarmList.appendChild(alarmElement);
        });
    }
}

// Iniciar la aplicación
window.addEventListener('DOMContentLoaded', () => {
    new AlarmApp();
});
