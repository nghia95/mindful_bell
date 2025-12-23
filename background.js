// background.js

const OFFSCREEN_DOCUMENT_PATH = 'offscreen.html';

// Setup alarm on install/startup
chrome.runtime.onInstalled.addListener(async () => {
    await setupAlarm();
});

chrome.runtime.onStartup.addListener(async () => {
    await setupAlarm();
});

// Handle Alarm
chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'mindful-bell') {
        await playSound();
    }
});

// Listen for changes in settings to update alarm
chrome.storage.onChanged.addListener(async (changes, area) => {
    if (area === 'local' && changes.intervalMinutes) {
        await setupAlarm();
    }
});

// Listen for test messages from popup
chrome.runtime.onMessage.addListener(async (msg) => {
    if (msg.type === 'TEST_SOUND') {
        await playSound();
    } else if (msg.type === 'STOP_SOUND') {
        await stopSound();
    }
});

async function setupAlarm() {
    const data = await chrome.storage.local.get(['intervalMinutes']);
    const interval = data.intervalMinutes || 20; // Default 20 mins

    // Clear existing to reset timer
    await chrome.alarms.clear('mindful-bell');

    chrome.alarms.create('mindful-bell', {
        delayInMinutes: interval,
        periodInMinutes: interval
    });
    console.log(`Alarm set for every ${interval} minutes.`);
}

async function playSound() {
    const data = await chrome.storage.local.get(['volume', 'bellSounds']);
    const volume = data.volume !== undefined ? data.volume : 0.8;
    const bellSounds = data.bellSounds || 3; // Default 3 sounds

    await createOffscreenDocument();

    // Send message to offscreen document to play audio
    chrome.runtime.sendMessage({
        type: 'PLAY_BELL',
        volume: volume,
        bellSounds: bellSounds
    });
}

async function stopSound() {
    await createOffscreenDocument();

    // Send message to offscreen document to stop audio
    chrome.runtime.sendMessage({
        type: 'STOP_BELL'
    });
}

async function createOffscreenDocument() {
    const existingContexts = await chrome.runtime.getContexts({
        contextTypes: ['OFFSCREEN_DOCUMENT'],
        documentUrls: [chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH)]
    });

    if (existingContexts.length > 0) {
        return;
    }

    await chrome.offscreen.createDocument({
        url: OFFSCREEN_DOCUMENT_PATH,
        reasons: ['AUDIO_PLAYBACK'],
        justification: 'To play the mindfulness bell sound.'
    });
}
