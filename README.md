# Mindful Bell Extension Walkthrough

The **Mindful Bell** extension has been successfully created! It uses the Chrome `offscreen` API to play a synthesized "Buddhism Bell" sound at user-defined intervals.

## Features
- **Synthesized Bell Sound**: No external audio files; the sound is generated using the Web Audio API for a pure, customizable tone.
- **Adjustable Interval**: Choose from 5, 10, 15, 20, 30, 45, or 60 minutes.
- **Volume Control**: Adjust the volume of the bell directly from the popup.
- **Test Button**: Preview the sound instantly.

## Installation Instructions

1.  Open Google Chrome and navigate to `chrome://extensions/`.
2.  Enable **Developer mode** (toggle in the top-right corner).
3.  Click **Load unpacked**.
4.  Select the directory: `/Users/nghiale/Desktop/Study/mindful_bell`.

## How to Use

1.  Click the **Mindful Bell** icon in the Chrome toolbar.
2.  **Set Interval**: Select your preferred time interval (default is 20 minutes).
3.  **Set Volume**: Adjust the slider to your liking.
4.  **Test**: Click "Test Bell" to hear the sound immediately.
5.  The extension will now run in the background and ring the bell at the specified interval.

## Verification
- [x] **Manifest V3 Compliance**: Uses `service_worker` and `offscreen` API.
- [x] **Audio Synthesis**: `offscreen.js` generates a complex bell tone using oscillators.
- [x] **Settings Persistence**: `popup.js` saves/loads settings to `chrome.storage.local`.
- [x] **Timer Logic**: `background.js` uses `chrome.alarms` to schedule the bell.
