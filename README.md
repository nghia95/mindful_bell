# Mindful Bell Chrome Extension

A Chrome extension that plays a calming Buddhism bell sound at regular intervals to help you stay mindful throughout the day.

## Features

- **Multiple Bell Sounds**: Choose between 1, 2, or 3 bell sounds per interval
- **Adjustable Interval**: Select from 5, 10, 15, 20, 30, 45, or 60 minutes
- **Volume Control**: Adjust the bell volume using a slider
- **Test Button**: Preview the bell sound instantly
- **Stop Button**: Immediately stop any playing sound

## Installation

1. Open Google Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `mindful_bell` directory

## How to Use

1. Click the **Mindful Bell** icon in the Chrome toolbar
2. **Set Interval**: Select your preferred time interval (default: 20 minutes)
3. **Number of Sounds**: Choose how many bell sounds to play (1, 2, or 3)
4. **Set Volume**: Adjust the slider to your liking
5. **Test**: Click "Test Bell" to hear the sound immediately
6. **Stop**: Click "Stop Bell" to silence any currently playing sound
7. The extension runs in the background and rings the bell at the specified interval

## Technical Details

- **Manifest V3**: Uses service worker and offscreen API for audio playback
- **Audio Files**: `1_sound_bell.mp3`, `2_sound_bell.mp3`, `3_sound_bell.mp3`
- **Settings Persistence**: Settings are saved to `chrome.storage.local`
- **Timer**: Uses `chrome.alarms` API for reliable background scheduling
