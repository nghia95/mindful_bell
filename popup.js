document.addEventListener('DOMContentLoaded', async () => {
    const intervalSelect = document.getElementById('interval');
    const bellSoundsSelect = document.getElementById('bell-sounds');
    const volumeSlider = document.getElementById('volume');
    const volumeValue = document.getElementById('volume-value');
    const testBtn = document.getElementById('test-btn');
    const stopBtn = document.getElementById('stop-btn');
    const statusDiv = document.getElementById('status');

    // Load saved settings
    const data = await chrome.storage.local.get(['intervalMinutes', 'volume', 'bellSounds']);

    if (data.intervalMinutes) {
        intervalSelect.value = data.intervalMinutes;
    }

    if (data.bellSounds) {
        bellSoundsSelect.value = data.bellSounds;
    }

    if (data.volume !== undefined) {
        volumeSlider.value = data.volume;
        volumeValue.textContent = `${Math.round(data.volume * 100)}%`;
    }

    // Save settings on change
    intervalSelect.addEventListener('change', () => {
        const minutes = parseInt(intervalSelect.value, 10);
        chrome.storage.local.set({ intervalMinutes: minutes }, () => {
            showStatus();
        });
    });

    bellSoundsSelect.addEventListener('change', () => {
        const sounds = parseInt(bellSoundsSelect.value, 10);
        chrome.storage.local.set({ bellSounds: sounds }, () => {
            showStatus();
        });
    });

    volumeSlider.addEventListener('input', () => {
        const vol = parseFloat(volumeSlider.value);
        volumeValue.textContent = `${Math.round(vol * 100)}%`;
        chrome.storage.local.set({ volume: vol }); // Save immediately for smooth testing
    });

    testBtn.addEventListener('click', () => {
        chrome.runtime.sendMessage({ type: 'TEST_SOUND' });
    });

    stopBtn.addEventListener('click', () => {
        chrome.runtime.sendMessage({ type: 'STOP_SOUND' });
    });

    function showStatus() {
        statusDiv.classList.remove('hidden');
        setTimeout(() => {
            statusDiv.classList.add('hidden');
        }, 2000);
    }
});
