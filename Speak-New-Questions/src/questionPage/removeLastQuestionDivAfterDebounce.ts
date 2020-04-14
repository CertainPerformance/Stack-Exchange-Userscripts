/* Remove a questionDiv once:
 * (1) the questionDiv's spoken text ended at least 10 seconds ago, and
 * (2) The mouse has not been inside the questionContainer for 10 seconds; both
 *   (a) Last mouseenter, if any, was followed by a mouseleave
 *   (b) mouseleave was at least 10 seconds ago
 */

let timeoutId = -1;
let overContainer = false;
let questionContainer: HTMLElement;
export const watchForMouseMovementInQuestionContainer = (questionContainerParam: HTMLElement) => {
    questionContainer = questionContainerParam;
    questionContainer.addEventListener('mouseenter', () => {
        window.clearTimeout(timeoutId);
        overContainer = true;
    });
    questionContainer.addEventListener('mouseleave', () => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(removeLastQuestionDiv, 10000);
        overContainer = false;
    });
};
export const removeLastQuestionDivAfterDebounce = () => {
    window.clearTimeout(timeoutId);
    if (!overContainer) {
        timeoutId = window.setTimeout(removeLastQuestionDiv, 10000);
    }
};
const removeLastQuestionDiv = () => {
    const questionDivs = [...questionContainer.children] as HTMLElement[];
    if (!questionDivs.length || questionDivs.some(div => div.style.backgroundColor === 'yellow')) {
        return;
    }
    questionContainer.lastElementChild!.remove();
    timeoutId = window.setTimeout(removeLastQuestionDiv, 10000);
};
