import { queueUtterance } from './queueUtterance';
import { assignState } from './state';
import { getSettings, saveSettings } from './settings';
import { makeVoicesSelect } from './makeVoicesSelect';

export const makeSpeakInterface = () => {
    const questions = document.querySelector<HTMLElement>('#questions');
    const speakInterface = document.querySelector('#mainbar')!.insertBefore(document.createElement('div'), questions);
    speakInterface.style.cssText = 'text-align: center; background-color: #afceff; font-size: large;';
    const { volume, rate } = getSettings();
    assignState({ volume, rate });
    speakInterface.innerHTML = `
        <div>Listening for new questions...</div>
        <div style="display: flex; justify-content: center;">
            <span style="width: 65px; text-align: right; margin-right: 5px;">Volume:</span>
            <input type="range" min="0" max="1" step="0.1" value="${volume}" title="${volume}" data-setting-prop="volume" style="margin: 0;"></div>
        </div>
        <div style="display: flex; justify-content: center;">
            <span style="width: 65px; text-align: right; margin-right: 5px;">Rate:</span>
            <input type="range" min="0.25" max="4" step="0.05" value="${rate}" title="${rate}" data-setting-prop="rate" style="margin: 0;"></div>
        </div>
    `;
    makeVoicesSelect(speakInterface);
    speakInterface.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        if (target.matches('select')) {
            queueUtterance('Example question title');
            return;
        }
        const input = target as HTMLInputElement;
        const partialObj = { [input.dataset.settingProp as 'volume' | 'rate']: Number(input.value) };
        saveSettings(partialObj);
        assignState(partialObj);
        queueUtterance('Example question title');
        input.title = input.value;
    });
    if (window.StackExchange.options.site.name !== 'Stack Overflow') {
        return speakInterface;
    }
    speakInterface.insertAdjacentHTML('beforeend', `
        <button>Start Focusing</button>
        <div></div>
    `);
    const questionFrequencyDiv = speakInterface.children[5];
    const elmToTimestamp = (elm: HTMLElement) => new Date(elm.title).getTime();
    const updateQuestionFrequencyStats = () => {
        const now = new Date().getTime();
        const timeElms = [...document.querySelectorAll<HTMLElement>('#questions .relativetime')];
        const questionCountLastHour = timeElms.reduce((a, elm) => a + Number(now - elmToTimestamp(elm) < 3600_000), 0);
        const sinceEarliestQuestion = now - elmToTimestamp(timeElms[timeElms.length - 1]);
        const divisor = sinceEarliestQuestion < 3600_000 ? sinceEarliestQuestion / 60_000 : 60;
        questionFrequencyDiv.textContent = `${(questionCountLastHour / divisor).toFixed(1)} questions per minute, ${questionCountLastHour} last ${Math.round(divisor)} minutes`;
    };
    updateQuestionFrequencyStats();
    window.setInterval(updateQuestionFrequencyStats, 60_000);

    return speakInterface;
};
