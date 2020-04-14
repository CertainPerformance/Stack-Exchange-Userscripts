import { getState } from './state';

export const speakNext = () => {
    const { textToSpeakQueue, volume, rate, voice } = getState();
    if (textToSpeakQueue.length === 0) {
        return;
    }
    const speakItem = textToSpeakQueue.shift()!;
    const activeUtterance = new SpeechSynthesisUtterance(speakItem.textToSpeak);
    activeUtterance.rate = rate;
    activeUtterance.volume = volume;
    if (voice) {
        activeUtterance.voice = voice;
    }
    speechSynthesis.speak(activeUtterance);

    activeUtterance.addEventListener('end', () => {
        if ('questionElement' in speakItem) {
            speakItem.questionElement.style.removeProperty('background-color');
            speakItem.questionElement.removeEventListener('mouseover', speakItem.mouseoverHandler);
            getState().channel!.postMessage(`Done with ${speakItem.questionElement.id}`);
        }
        speakNext();
    });
};
