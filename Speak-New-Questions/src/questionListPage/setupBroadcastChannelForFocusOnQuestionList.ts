import { assignState } from './state';
import { setupFocusButtonInterval } from '../setupFocusButtonInterval';

export const setupBroadcastChannelForFocusOnQuestionList = (channel: BroadcastChannel, focusButton: HTMLButtonElement) => {
    // Reset question page focus countdowns, and display the question page focus button if not visible yet
    channel.postMessage('Focus Until 0');
    const setStateFocusingFalse = () => {
        assignState({ focusing: false });
    };
    const { makeNewInterval, stopInterval, getStopFocusingAfter } = setupFocusButtonInterval(focusButton, setStateFocusingFalse);
    const handleMessage = (message: string) => {
        if (message.startsWith('Cancel')) {
            const id = message.match(/^Cancel (.+)/)![1];
            const questionElement = document.getElementById(id);
            if (questionElement) {
                questionElement.dispatchEvent(new Event('mouseover'));
            }
        }
        if (message === 'Status?' || message === 'Focus On') {
            if (message === 'Focus On') {
                makeNewInterval(Date.now() + 300_000);
                assignState({ focusing: true, textToSpeakQueue: [] });
                speechSynthesis.cancel();
                for (const questionDiv of document.querySelectorAll<HTMLElement>('.question-summary')) {
                    questionDiv.style.removeProperty('background-color');
                }
            }
            channel.postMessage(`Focus Until ${getStopFocusingAfter()}`);
        }
        // Can be sent by any page
        if (message === 'Focus Off') {
            stopInterval();
            assignState({ focusing: false });
        }
    };
    channel.addEventListener('message', ({ data: message }) => {
        if (typeof message === 'string') {
            handleMessage(message);
        }
    });
    focusButton.addEventListener('click', () => {
        if (focusButton.textContent === 'Start Focusing') {
            handleMessage('Focus On');
        } else {
            handleMessage('Focus Off');
            channel.postMessage('Focus Off');
        }
    });
    return channel;
};
