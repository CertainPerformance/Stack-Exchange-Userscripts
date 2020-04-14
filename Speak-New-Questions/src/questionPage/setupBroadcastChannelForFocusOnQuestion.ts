import { insertQuestionDiv, tryUnhighlightQuestionDiv } from './insertQuestionDiv';
import { setupFocusButtonInterval } from '../setupFocusButtonInterval';

export const setupBroadcastChannelForFocusOnQuestion = (focusButton: HTMLButtonElement) => {
    const channel = new BroadcastChannel('cpUserscriptSpeakNewQuestions');
    // On a question page, only show the focus button if/once the list page is active
    // If already active, it will respond to the below message
    channel.postMessage('Status?');
    const channelListener = ({ data: message }: { data: string }) => {
        if (String(message).includes('Until')) {
            focusButton.style.display = 'block';
            channel.removeEventListener('message', channelListener);
        }
    };
    channel.addEventListener('message', channelListener);
    const { makeNewInterval, stopInterval } = setupFocusButtonInterval(focusButton);

    channel.addEventListener('message', ({ data: messageAny }) => {
        const message = messageAny as unknown;
        if (typeof message === 'object' && message !== null && message.hasOwnProperty('newQuestion')) {
            const { questionOuterHTML } = (message as { newQuestion: boolean, questionOuterHTML: string });
            insertQuestionDiv(questionOuterHTML, channel);
        }
        if (typeof message !== 'string') {
            return;
        }
        if (message.startsWith('Done with')) {
            tryUnhighlightQuestionDiv(message.match(/^Done with (.+)/)![1]);
        }
        // Can be sent by any page, will be received by any page
        if (message === 'Focus Off') {
            stopInterval();
        }
        // Can only be sent by list page, will only be received by question page
        if (message.includes('Until')) {
            const match = message.match(/^Focus Until (\d+)$/)!;
            makeNewInterval(Number(match[1]));
        }
    });
    focusButton.addEventListener('click', () => {
        if (focusButton.textContent === 'Start Focusing') {
            channel.postMessage('Focus On');
        } else {
            channel.postMessage('Focus Off');
            stopInterval();
        }
    });
};
