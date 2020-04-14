import { speakNext } from './speakNext';
import { getState } from './state';

export const queueUtterance = (textToSpeak: string, questionId?: string) => {
    const { textToSpeakQueue } = getState();
    if (!questionId) {
        textToSpeakQueue.push({ textToSpeak });
        if (!speechSynthesis.speaking) {
            speakNext();
        }
        return;
    }
    const questionElement = document.getElementById(questionId)!;
    const channel = getState().channel!;
    if (questionElement && questionId) {
        // This will pretty much always already be highlighted, but just in case
        questionElement.style.backgroundColor = 'yellow';
        channel.postMessage({ newQuestion: true, questionOuterHTML: questionElement.outerHTML });
    }
    const mouseoverHandler = () => {
        channel.postMessage(`Done with ${questionId}`);
        const foundIndex = textToSpeakQueue.findIndex(item => 'questionElement' in item && item.questionElement === questionElement);
        questionElement.style.removeProperty('background-color');
        if (foundIndex !== -1) {
            // The utterance for this questionElement has not been spoken, so just removing it from the array is enough
            textToSpeakQueue.splice(foundIndex, 1);
            return;
        }
        // The utterance for this element is currently being spoken, and must be canceled
        speechSynthesis.cancel();
        if (textToSpeakQueue.length) {
            speakNext();
        }
    };
    if (questionElement) {
        questionElement.addEventListener('mouseover', mouseoverHandler, { once: true });
    }
    textToSpeakQueue.push({ textToSpeak, questionElement, mouseoverHandler });
    if (!speechSynthesis.speaking) {
        speakNext();
    }
};
