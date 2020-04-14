import { makeSpeakInterface } from './makeSpeakInterface';
import { showSpeechSynthesisReadyness } from './showSpeechSynthesisReadyness';
import { speakOnNewMessage } from './speakOnNewMessage';
import { targetBlankAllAnchors } from './targetBlankAllAnchors';
import { watchNewQuestions } from './watchNewQuestions';
import { hideNewPostActivity } from './hideNewPostActivity';
import { setupBroadcastChannelForFocusOnQuestionList } from './setupBroadcastChannelForFocusOnQuestionList';
import { addBorderWhenClicked } from './addBorderWhenClicked';
import { clearInterfaceOnDuplicatePageload } from './clearInterfaceOnDuplicatePageload';

export const handleQuestionListPage = () => {
    /* URL will be like one of
     * https://stackoverflow.com/questions/tagged/someTag?sort=newest
     * https://stackoverflow.com/questions?tab=Newest
     * https://stackoverflow.com/questions
     * If on /questions, need to check that we're on a Newest tab,
     * not on one of the others like Active or Unanswered
     */
    if (window.location.pathname === '/questions' && !document.querySelector('.is-selected[href="/questions?tab=Newest"]')) {
        return;
    }
    // This channel will allow Newest pages to communicate new questions to question pages
    // and for question pages to communicate to Newest pages when an utterance gets canceled
    // and for all pages to communicate with each other when their Focus button is clicked
    const channel = new BroadcastChannel('cpUserscriptSpeakNewQuestions');
    const speakInterface = makeSpeakInterface();
    clearInterfaceOnDuplicatePageload(channel, speakInterface);
    const focusButton = speakInterface.querySelector('button');
    if (focusButton) {
        setupBroadcastChannelForFocusOnQuestionList(channel, focusButton);
    }
    showSpeechSynthesisReadyness();
    speakOnNewMessage();
    watchNewQuestions(channel, speakInterface);
    targetBlankAllAnchors(document.body);
    for (const questionDiv of document.querySelectorAll<HTMLElement>('#questions > .question-summary')) {
        addBorderWhenClicked(questionDiv);
    }
    hideNewPostActivity();
    // Rarely, speechSynthesis will get stuck on pageload due to prior speaking events, so cancel them
    speechSynthesis.cancel();
};
