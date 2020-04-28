import { removeLastQuestionDivAfterDebounce, watchForMouseMovementInQuestionContainer } from './removeLastQuestionDivAfterDebounce';
import { makeQuestionContainer } from './makeQuestionContainer';
import { pendingQuestionColor } from '../pendingQuestionColor';

let questionContainer: HTMLElement;
const mouseoverHandlersByQuestionDiv = new Map<HTMLElement, () => void>();
export const insertQuestionDiv = (questionOuterHTML: string, channel: BroadcastChannel) => {
    if (!questionContainer) {
        questionContainer = makeQuestionContainer();
        watchForMouseMovementInQuestionContainer(questionContainer);
    }
    questionContainer.insertAdjacentHTML('afterbegin', questionOuterHTML);
    const questionDiv = questionContainer.firstElementChild as HTMLElement;
    questionDiv.removeAttribute('style');
    questionDiv.style.backgroundColor = pendingQuestionColor;
    /* If the list page closes, it can't communicate to the question pages in time to stop highlighting and remove questionDivs
     * So, remove the background color automatically after 20 seconds, to ensure the questionDiv will disappear
     */
    const mouseoverHandler = () => {
        channel.postMessage(`Cancel ${questionDiv.id}`);
        questionDiv.style.removeProperty('background-color');
        removeLastQuestionDivAfterDebounce();
    };
    questionDiv.addEventListener('mouseover', mouseoverHandler, { once: true });
    mouseoverHandlersByQuestionDiv.set(questionDiv, mouseoverHandler);
    window.setTimeout(mouseoverHandler, 20000);
};
export const tryUnhighlightQuestionDiv = (questionId: string) => {
    if (!questionContainer) {
        return;
    }
    removeLastQuestionDivAfterDebounce();
    const questionDiv = ([...questionContainer.children] as HTMLElement[]).find(({ id }) => id === questionId);
    if (questionDiv) {
        questionDiv.style.removeProperty('background-color');
        const mouseoverHandler = mouseoverHandlersByQuestionDiv.get(questionDiv);
        questionDiv.removeEventListener('mouseover', mouseoverHandler!);
    }
};
