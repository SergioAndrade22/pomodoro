class PomodoroTimer {
    constructor() {
        this.workTime = 25; // minutes
        this.breakTime = 5; // minutes
        this.longBreakTime = 30; // minutes (work + break)
        this.currentPomodoro = 1;
        this.isWorkTime = true;
        this.isLongBreak = false;
        this.isRunning = false;
        this.isPaused = false;
        this.timeLeft = this.workTime * 60; // seconds
        this.interval = null;
        this.alarmAudio = null;
        this.alarmInterval = null;
        this.backgroundSounds = new Map();
        this.selectedSounds = new Set();
        this.volume = 0.3; // Default volume (30%)
        
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
        this.initializeCircularTimer();
        this.initializeAlarm();
        this.initializeTheme();
        this.initializeBackgroundSounds();
        this.initializeVolumeControl();
    }

    initializeElements() {
        // Timer elements
        this.timerDisplay = document.getElementById('timerDisplay');
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.timerLabel = document.getElementById('timerLabel');
        
        // Circular timer elements
        this.circularTimer = document.getElementById('circularTimer');
        this.timerProgress = document.getElementById('timerProgress');
        
        // Progress elements
        this.currentPomodoroDisplay = document.getElementById('currentPomodoro');
        this.pomodoroDots = document.querySelectorAll('.pomodoro-dot');
        
        // Settings elements
        this.workTimeInput = document.getElementById('workTime');
        this.breakTimeInput = document.getElementById('breakTime');
        
        // Volume control elements
        this.volumeSlider = document.getElementById('volume-slider');
        this.volumeValue = document.getElementById('volume-value');
        
        // Control elements
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        
        // Status element
        this.statusElement = document.getElementById('status');
    }

    initializeCircularTimer() {
        // Set initial progress
        this.updateCircularTimer();
    }

    updateCircularTimer() {
        const totalTime = this.isWorkTime ? this.workTime * 60 : 
                         this.isLongBreak ? this.longBreakTime * 60 : 
                         this.breakTime * 60;
        const progress = 1 - (this.timeLeft / totalTime);
        
        // Calculate stroke-dashoffset (339.292 is the circumference)
        const circumference = 339.292;
        const offset = circumference - (progress * circumference);
        
        // Update the progress circle
        this.timerProgress.style.strokeDashoffset = offset;
        
        // Update timer colors based on current state
        this.circularTimer.className = 'circular-timer';
        
        if (this.isLongBreak) {
            this.circularTimer.classList.add('long-break');
        } else if (this.isWorkTime) {
            this.circularTimer.classList.add('work');
        } else {
            this.circularTimer.classList.add('break');
        }
        
        // Add/remove running class for animation
        if (this.isRunning) {
            this.circularTimer.classList.add('running');
        } else {
            this.circularTimer.classList.remove('running');
        }
    }

    toggleTheme() {
        const body = document.body;
        const isDark = body.classList.contains('dark-theme');
        
        if (isDark) {
            body.classList.remove('dark-theme');
            localStorage.setItem('pomodoro-theme', 'light');
        } else {
            body.classList.add('dark-theme');
            localStorage.setItem('pomodoro-theme', 'dark');
        }
        
        // Update volume slider background when theme changes
        this.updateVolumeSliderBackground();
    }

    bindEvents() {
        // Button events
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        // Settings events
        this.workTimeInput.addEventListener('input', () => this.updateBreakTime());
        this.workTimeInput.addEventListener('change', () => this.updateBreakTime());
        
        // Theme toggle event
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Volume control event
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', () => this.updateVolume());
        }
        
        // Settings modal events
        const settingsToggle = document.getElementById('settingsToggle');
        const settingsModal = document.getElementById('settingsModal');
        const closeSettings = document.getElementById('closeSettings');
        
        if (settingsToggle) {
            settingsToggle.addEventListener('click', () => this.openSettings());
        }
        
        if (closeSettings) {
            closeSettings.addEventListener('click', () => this.closeSettings());
        }
        
        if (settingsModal) {
            settingsModal.addEventListener('click', (e) => {
                if (e.target === settingsModal) {
                    this.closeSettings();
                }
            });
        }
        
        // Sound checkbox events
        this.bindSoundCheckboxes();
    }

    initializeAlarm() {
        // Initialize alarm audio
        this.alarmAudio = new Audio('assets/sounds/alarm.mp3');
        this.alarmAudio.loop = true; // Loop the alarm
    }

    updateBreakTime() {
        let newWorkTime = parseInt(this.workTimeInput.value) || 25;
        
        // Enforce minimum work time of 5 minutes
        if (newWorkTime < 5) {
            newWorkTime = 5;
            this.workTimeInput.value = 5;
        }
        
        this.workTime = newWorkTime;
        this.breakTime = Math.round(newWorkTime * 0.2); // 20% of work time
        this.longBreakTime = this.workTime + this.breakTime; // work + break time
        
        this.breakTimeInput.value = this.breakTime;
        
        // Reset timer if not running
        if (!this.isRunning) {
            this.timeLeft = this.workTime * 60;
            this.updateDisplay();
            this.updateCircularTimer();
        }
    }

    start() {
        if (this.isRunning) return;
        
        // Stop alarm if it's playing
        this.stopAlarm();
        
        this.isRunning = true;
        this.isPaused = false;
        
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.resetBtn.disabled = false;
        
        // Play background sounds only during work time
        if (this.isWorkTime && !this.isLongBreak) {
            this.playBackgroundSounds();
        }
        
        this.interval = setInterval(() => {
            this.timeLeft--;
            
            if (this.timeLeft <= 0) {
                this.handleTimerComplete();
            } else {
                this.updateDisplay();
            }
        }, 1000);
        
        this.updateStatus();
    }

    pause() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        this.isPaused = true;
        
        clearInterval(this.interval);
        
        // Stop background sounds when paused
        this.stopBackgroundSounds();
        
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        
        this.updateStatus();
    }

    reset() {
        this.isRunning = false;
        this.isPaused = false;
        this.isWorkTime = true;
        this.isLongBreak = false;
        this.currentPomodoro = 1;
        
        clearInterval(this.interval);
        
        // Stop alarm if it's playing
        this.stopAlarm();
        
        // Stop background sounds
        this.stopBackgroundSounds();
        
        this.timeLeft = this.workTime * 60;
        this.updateDisplay();
        this.updateProgress();
        this.updateStatus();
        this.updateCircularTimer();
        
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.resetBtn.disabled = true;
    }

    handleTimerComplete() {
        clearInterval(this.interval);
        this.isRunning = false;
        
        // Play notification sound (if supported)
        this.playNotification();
        
        if (this.isWorkTime) {
            // Work session completed
            this.completeWorkSession();
        } else {
            // Break completed
            this.completeBreak();
        }
        
        this.updateStatus();
    }

    completeWorkSession() {
        // Mark current pomodoro as completed
        this.pomodoroDots[this.currentPomodoro - 1].classList.remove('active');
        this.pomodoroDots[this.currentPomodoro - 1].classList.add('completed');
        
        // Stop background sounds when work session ends
        this.stopBackgroundSounds();
        
        // Check if this was the 4th pomodoro
        if (this.currentPomodoro === 4) {
            // Start long break
            this.isLongBreak = true;
            this.timeLeft = this.longBreakTime * 60;
            this.timerLabel.textContent = 'Long Break';
            this.updateDisplay();
            this.updateStatus();
            this.updateCircularTimer();
        } else {
            // Start regular break
            this.currentPomodoro++;
            this.isWorkTime = false;
            this.timeLeft = this.breakTime * 60;
            this.timerLabel.textContent = 'Break Time';
            this.updateDisplay();
            this.updateProgress();
            this.updateStatus();
            this.updateCircularTimer();
        }
        
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
    }

    completeBreak() {
        if (this.isLongBreak) {
            // Long break completed, reset session completely
            this.isRunning = false;
            this.isPaused = false;
            this.isWorkTime = true;
            this.isLongBreak = false;
            this.currentPomodoro = 1;
            
            clearInterval(this.interval);
            this.stopAlarm();
            
            this.timeLeft = this.workTime * 60;
            this.updateDisplay();
            this.updateProgress();
            this.updateStatus();
            this.updateCircularTimer();
            
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            this.resetBtn.disabled = true;
            
            this.statusElement.textContent = 'Session completed! Ready to start a new Pomodoro session.';
        } else {
            // Regular break completed, start next work session
            this.isWorkTime = true;
            this.timeLeft = this.workTime * 60;
            this.timerLabel.textContent = 'Work Time';
            this.updateDisplay();
            this.updateStatus();
            this.updateCircularTimer();
            
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
        }
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
        
        // Update timer colors based on current state
        this.timerDisplay.className = 'timer-display';
        this.timerLabel.className = 'timer-label';
        
        if (this.isLongBreak) {
            this.timerDisplay.classList.add('long-break');
            this.timerLabel.classList.add('long-break');
        } else if (this.isWorkTime) {
            this.timerDisplay.classList.add('work');
            this.timerLabel.classList.add('work');
        } else {
            this.timerDisplay.classList.add('break');
            this.timerLabel.classList.add('break');
        }
        
        // Update circular timer
        this.updateCircularTimer();
    }

    updateProgress() {
        this.currentPomodoroDisplay.textContent = this.currentPomodoro;
        
        // Update pomodoro dots
        this.pomodoroDots.forEach((dot, index) => {
            dot.classList.remove('active', 'completed', 'long-break');
            
            if (index < this.currentPomodoro - 1) {
                dot.classList.add('completed');
            } else if (index === this.currentPomodoro - 1) {
                if (this.isLongBreak) {
                    dot.classList.add('long-break');
                } else {
                    dot.classList.add('active');
                }
            }
        });
    }

    updateStatus() {
        this.statusElement.className = 'status';
        
        if (this.isLongBreak) {
            this.statusElement.classList.add('long-break');
            this.statusElement.textContent = `Long break time! Take a well-deserved ${this.longBreakTime}-minute break.`;
        } else if (this.isWorkTime) {
            this.statusElement.classList.add('work');
            if (this.isRunning) {
                this.statusElement.textContent = `Focus on your work! Pomodoro ${this.currentPomodoro} of 4.`;
            } else if (this.isPaused) {
                this.statusElement.textContent = `Work session paused. Pomodoro ${this.currentPomodoro} of 4.`;
            } else {
                this.statusElement.textContent = `Ready to start Pomodoro ${this.currentPomodoro} of 4.`;
            }
        } else {
            this.statusElement.classList.add('break');
            if (this.isRunning) {
                this.statusElement.textContent = `Take a break! ${this.breakTime} minutes to relax.`;
            } else if (this.isPaused) {
                this.statusElement.textContent = `Break paused. ${this.breakTime} minutes remaining.`;
            } else {
                this.statusElement.textContent = `Break time! ${this.breakTime} minutes to relax.`;
            }
        }
    }

    playNotification() {
        // Play alarm sound for 2-3 seconds
        this.playAlarm();
        
        // Fallback: use browser notification if available
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Pomodoro Timer', {
                body: this.isWorkTime ? 'Work session completed!' : 'Break time is over!',
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23e74c3c"/><text x="50" y="60" text-anchor="middle" fill="white" font-size="40">⏰</text></svg>'
            });
        }
    }

    playAlarm() {
        if (this.alarmAudio) {
            this.alarmAudio.currentTime = 0; // Reset to beginning
            this.alarmAudio.play().catch(e => {
                console.log('Could not play alarm audio:', e);
            });
            
            // Stop alarm after 2.5 seconds
            this.alarmInterval = setTimeout(() => {
                this.stopAlarm();
            }, 2500);
        }
    }

    stopAlarm() {
        if (this.alarmAudio) {
            this.alarmAudio.pause();
            this.alarmAudio.currentTime = 0;
        }
        if (this.alarmInterval) {
            clearTimeout(this.alarmInterval);
            this.alarmInterval = null;
        }
    }

    initializeTheme() {
        // Check for saved theme preference or default to light theme
        const savedTheme = localStorage.getItem('pomodoro-theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }

    initializeVolumeControl() {
        // Load saved volume preference or use default
        const savedVolume = localStorage.getItem('pomodoro-volume');
        if (savedVolume !== null) {
            this.volume = parseFloat(savedVolume);
            if (this.volumeSlider) {
                this.volumeSlider.value = this.volume * 100;
            }
            if (this.volumeValue) {
                this.volumeValue.textContent = `${Math.round(this.volume * 100)}%`;
            }
            
            // Update slider background
            this.updateVolumeSliderBackground();
        }
        
        // Apply volume to all audio elements
        this.applyVolumeToAllSounds();
    }

    updateVolume() {
        if (!this.volumeSlider) return;
        
        // Get volume value (0-1)
        this.volume = this.volumeSlider.value / 100;
        
        // Update display
        if (this.volumeValue) {
            this.volumeValue.textContent = `${Math.round(this.volume * 100)}%`;
        }
        
        // Save preference
        localStorage.setItem('pomodoro-volume', this.volume.toString());
        
        // Apply to all audio elements
        this.applyVolumeToAllSounds();
        
        // Update slider background
        this.updateVolumeSliderBackground();
    }

    applyVolumeToAllSounds() {
        // Apply volume to all background sounds
        this.backgroundSounds.forEach(audio => {
            audio.volume = this.volume;
        });
        
        // Also apply to alarm sound
        if (this.alarmAudio) {
            this.alarmAudio.volume = this.volume;
        }
    }

    updateVolumeSliderBackground() {
        if (!this.volumeSlider) return;
        
        const value = this.volumeSlider.value;
        const percentage = value + '%';
        
        // Update the background gradient to reflect current value
        const isDarkTheme = document.body.classList.contains('dark-theme');
        const backgroundColor = isDarkTheme ? '#555' : '#ddd';
        
        this.volumeSlider.style.background = `linear-gradient(to right, #667eea 0%, #667eea ${percentage}, ${backgroundColor} ${percentage}, ${backgroundColor} 100%)`;
    }

    initializeBackgroundSounds() {
        const soundFiles = [
            'lofi', 'blues', 'jazz', 'sea', 'wind', 'birds', 
            'river', 'fire', 'rain_thunder', 'storm', 'heavy_rain', 'light_rain'
        ];
        
        soundFiles.forEach(sound => {
            const audio = new Audio(`assets/sounds/${sound}.mp3`);
            audio.loop = true;
            audio.volume = this.volume; // Use the volume property
            this.backgroundSounds.set(sound, audio);
        });
        
        // Load saved sound preferences
        this.loadSoundPreferences();
    }

    bindSoundCheckboxes() {
        const checkboxes = document.querySelectorAll('.sound-option input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const soundName = e.target.value;
                if (e.target.checked) {
                    this.selectedSounds.add(soundName);
                } else {
                    this.selectedSounds.delete(soundName);
                }
                this.saveSoundPreferences();
            });
        });
    }

    loadSoundPreferences() {
        const savedSounds = localStorage.getItem('pomodoro-sounds');
        if (savedSounds) {
            const sounds = JSON.parse(savedSounds);
            sounds.forEach(sound => {
                this.selectedSounds.add(sound);
                const checkbox = document.getElementById(`sound-${sound.replace('_', '-')}`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
    }

    saveSoundPreferences() {
        localStorage.setItem('pomodoro-sounds', JSON.stringify([...this.selectedSounds]));
    }

    openSettings() {
        const modal = document.getElementById('settingsModal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    closeSettings() {
        const modal = document.getElementById('settingsModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    playBackgroundSounds() {
        this.selectedSounds.forEach(soundName => {
            const audio = this.backgroundSounds.get(soundName);
            if (audio) {
                audio.currentTime = 0;
                audio.play().catch(e => {
                    console.log(`Could not play ${soundName}:`, e);
                });
            }
        });
    }

    stopBackgroundSounds() {
        this.backgroundSounds.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }
}

// Initialize the Pomodoro timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const pomodoro = new PomodoroTimer();
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
});