# Pomodoro Timer SPA

A beautiful, modern Single Page Application for managing your time using the Pomodoro Technique. This app helps you stay focused and productive by breaking your work into manageable intervals with customizable audio experiences and themes.

## Features

### ⏰ Timer with Distinct Colors
- **Work Timer**: Red color (#e74c3c) - for focused work sessions
- **Break Timer**: Green color (#27ae60) - for short breaks
- **Long Break Timer**: Blue color (#3498db) - for extended breaks after 4 pomodoros

### 📊 Progress Tracking
- Visual indicators using custom tomato images
- **Active Pomodoro**: Red tomato icon for current session
- **Completed Pomodoro**: Green tomato icon for finished sessions
- **Long Break**: Blue-tinted tomato for extended breaks
- Session counter showing "X of 4" progress

### ⚙️ Customizable Settings
- Adjustable work time (minimum 5 minutes, default: 25 minutes)
- Automatic break time calculation (20% of work time)
- Real-time updates when you change settings

### 🎯 Complete Pomodoro Workflow
- **Work Session**: Focus on your task
- **Short Break**: 5-minute break (or 20% of work time)
- **4 Pomodoros**: Complete a full session
- **Long Break**: Extended break equal to one full pomodoro cycle
- **Session Reset**: Automatic reset after long break completion

### 🎮 Controls
- **Start**: Begin the current timer
- **Pause**: Pause the timer (can resume)
- **Reset**: Reset the entire session

### 🔔 Audio & Notifications
- **Alarm Sound**: Plays for 2-3 seconds when timer completes
- **Background Sounds**: Customizable ambient sounds during work sessions
- **Browser Notifications**: Desktop notifications (if permitted)
- **Visual Status Updates**: Clear status messages

### 🎨 Theme System
- **Light Theme**: Clean, bright interface (default)
- **Dark Theme**: Easy on the eyes for low-light environments
- **Persistent Preferences**: Theme choice saved across sessions
- **Smooth Transitions**: Beautiful theme switching animations

### 🎵 Background Sounds
- **12 Ambient Options**: Lo-Fi, Jazz, Blues, Nature sounds, and more
- **Multi-Selection**: Combine multiple sounds for your perfect work environment
- **Work-Only Playback**: Sounds play only during work sessions (not breaks)
- **Persistent Settings**: Your sound preferences are saved
- **Volume Control**: Optimized volume levels for background use

### 🎨 Enhanced UI/UX
- **Modern Design**: Glassmorphism effects with backdrop blur
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Custom Scrollbars**: Styled to match the app's aesthetic
- **Responsive Layout**: Works perfectly on all screen sizes
- **Accessibility**: Keyboard navigation and screen reader support

## How to Use

1. **Open the Application**: Simply open `index.html` in your web browser
2. **Customize Your Experience**:
   - Click the gear icon (⚙️) to select background sounds
   - Click the sun/moon icon to toggle between light and dark themes
   - Adjust work time if needed (minimum 5 minutes)
3. **Start Your First Pomodoro**: Click "Start Pomodoro" to begin
4. **Work Focus**: Stay focused during the work session (red timer) with your chosen background sounds
5. **Take Breaks**: When work time ends, take your break (green timer) - sounds automatically stop
6. **Complete the Session**: After 4 pomodoros, enjoy a long break (blue timer)
7. **Repeat**: Start a new session when ready

## Pomodoro Technique

The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.

### Benefits:
- **Improved Focus**: Short, timed work sessions help maintain concentration
- **Reduced Burnout**: Regular breaks prevent mental fatigue
- **Better Time Management**: Clear structure for your workday
- **Increased Productivity**: Regular breaks actually improve overall output

## Audio Features

### Background Sounds Available:
- **Music**: Lo-Fi, Jazz, Blues
- **Nature**: Ocean Waves, Wind, Birds, River, Fireplace
- **Weather**: Rain & Thunder, Storm, Heavy Rain, Light Rain

### Audio Controls:
- **Automatic Playback**: Sounds start when work sessions begin
- **Smart Stopping**: Sounds pause during breaks and when timer is paused
- **Volume Optimization**: Set to 30% for comfortable background listening
- **Loop Playback**: Continuous ambient sounds throughout work sessions

## Technical Details

- **Pure HTML/CSS/JavaScript**: No external dependencies
- **Local Storage**: Saves theme and sound preferences
- **Web Audio API**: For alarm and background sound playback
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Beautiful gradient backgrounds and smooth animations
- **Accessibility**: Clear visual indicators and keyboard-friendly controls
- **Cross-Browser Compatible**: Works in all modern browsers

## Browser Compatibility

Works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Getting Started

1. Download all files to a folder
2. Open `index.html` in your web browser
3. Allow notifications when prompted (optional)
4. Customize your experience with themes and background sounds
5. Start your first Pomodoro session!

## File Structure

```
pomodoro/
├── index.html              # Main HTML structure
├── styles.css              # Styling, animations, and themes
├── script.js               # Timer functionality and audio management
├── README.md               # This file
└── assets/
    ├── alarm.mp3           # Timer completion alarm sound
    ├── images/
    │   ├── tomato.png      # Active pomodoro indicator
    │   ├── tomato_green.png # Completed pomodoro indicator
    │   ├── sun.png         # Light theme icon
    │   ├── moon.png        # Dark theme icon
    │   └── gear.png        # Settings icon
    └── sounds/
        ├── lofi.mp3        # Lo-Fi background music
        ├── blues.mp3       # Blues background music
        ├── jazz.mp3        # Jazz background music
        ├── sea.mp3         # Ocean waves sound
        ├── wind.mp3        # Wind sound
        ├── birds.mp3       # Birds chirping
        ├── river.mp3       # River flowing
        ├── fire.mp3        # Fireplace crackling
        ├── rain_thunder.mp3 # Rain with thunder
        ├── storm.mp3       # Storm sounds
        ├── heavy_rain.mp3  # Heavy rainfall
        └── light_rain.mp3  # Light rainfall
```

## Recent Updates

### Version 2.0 - Enhanced Audio & UI Experience
- ✨ **Theme System**: Light and dark theme toggle with persistent preferences
- 🎵 **Background Sounds**: 12 ambient sounds with multi-selection capability
- 🔔 **Enhanced Alarms**: Improved alarm sound with automatic stopping
- 🎨 **Visual Improvements**: Custom tomato indicators and enhanced UI elements
- 📱 **Better UX**: Improved modal scrolling and custom scrollbars
- ⚡ **Performance**: Optimized audio loading and playback

### Version 1.0 - Core Features
- ⏰ **Basic Timer**: Work, break, and long break functionality
- 📊 **Progress Tracking**: Visual pomodoro session indicators
- ⚙️ **Settings**: Customizable work and break durations
- 🔔 **Notifications**: Audio and browser notifications

Enjoy your productive Pomodoro sessions! 🍅⏰🎵

## Credits & Attribution

### Images
All icons and images used in this application are from [Freepik - Flaticon](https://www.flaticon.com/):
- Settings icon: [Settings icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/settings)
- Theme icons (sun/moon)
- Tomato indicators

### Audio
All background sounds and audio effects are from [Pixabay](https://pixabay.com/):
- Ambient music tracks (Lo-Fi, Jazz, Blues)
- Nature sounds (Ocean waves, Wind, Birds, River, Fireplace)
- Weather effects (Rain, Thunder, Storm)
- Timer alarm sound

We thank these platforms for providing high-quality, royalty-free resources that make this application possible. 