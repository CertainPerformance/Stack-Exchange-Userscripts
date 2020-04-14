import { assignState } from './state';
import { getSettings, saveSettings } from './settings';

const populateSelect = (select: HTMLSelectElement) => {
    const voices = speechSynthesis.getVoices();
    for (const voice of voices) {
        const option = select.appendChild(document.createElement('option'));
        option.textContent = voice.name;
        option.value = voice.name;
        if (!voice.localService) {
            option.style.backgroundColor = '#ffcabf';
        }
    }
    if (select.children.length === 0) {
        // No voices were found. Probably, something is currently being spoken.
        // Try again once voices change
        speechSynthesis.addEventListener(
            'voiceschanged', () => {
                populateSelect(select);
            },
            { once: true },
        );
        return;
    }
    select.addEventListener('change', () => {
        const voice = voices.find(({ name }) => name === select.value)!;
        assignState({ voice });
        saveSettings({ voiceName: voice.name });
        // This change event will bubble and be seen by parent listener
        // resulting in a queueUtterance call
    });
    const pageloadVoiceName = getSettings().voiceName;
    if (pageloadVoiceName) {
        select.value = pageloadVoiceName;
    }
    const pageloadVoice = voices.find(({ name }) => name === pageloadVoiceName);
    if (pageloadVoice) {
        assignState({ voice: pageloadVoice });
    }
};
export const makeVoicesSelect = (speakInterface: HTMLElement) => {
    const container = speakInterface.appendChild(document.createElement('div'));
    const select = container.appendChild(document.createElement('select'));
    populateSelect(select);
};
