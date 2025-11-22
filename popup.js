document.addEventListener('DOMContentLoaded', async () => {
    const intervalSelect = document.getElementById('interval');
    const volumeSlider = document.getElementById('volume');
    const volumeValue = document.getElementById('volume-value');
    const testBtn = document.getElementById('test-btn');
    const statusDiv = document.getElementById('status');

    // Load saved settings
    const data = await chrome.storage.local.get(['intervalMinutes', 'volume']);

    if (data.intervalMinutes) {
        intervalSelect.value = data.intervalMinutes;
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

    volumeSlider.addEventListener('input', () => {
        const vol = parseFloat(volumeSlider.value);
        volumeValue.textContent = `${Math.round(vol * 100)}%`;
        chrome.storage.local.set({ volume: vol }); // Save immediately for smooth testing
    });

    testBtn.addEventListener('click', () => {
        chrome.runtime.sendMessage({ type: 'TEST_SOUND' });
    });

    function showStatus() {
        statusDiv.classList.remove('hidden');
        setTimeout(() => {
            statusDiv.classList.add('hidden');
        }, 2000);
    }
});
