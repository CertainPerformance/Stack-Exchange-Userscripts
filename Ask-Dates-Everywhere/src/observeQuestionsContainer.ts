import { showToastError } from '../../common/showToast';
import { addResultsToQuestionList } from './addResultsToQuestionList';
import { getQuestionData } from './getQuestionData';

const getStartedQuestionAnchor = (started: HTMLElement) => started.querySelector<HTMLAnchorElement>('a[href^="/questions/"]');

export const observeQuestionsContainer = (questionsContainer: HTMLElement) => {
    const handledParents = new Set();
    const fix = () => {
        const startedsToFix: HTMLElement[] = [];
        for (const started of questionsContainer.querySelectorAll<HTMLElement>('.started')) {
            const summary = started.parentElement!;
            if (handledParents.has(summary)) {
                continue;
            }
            handledParents.add(summary);
            // There may not be an anchor if browsing new questions
            const startedQuestionAnchor = getStartedQuestionAnchor(started);
            if (startedQuestionAnchor && !startedQuestionAnchor.textContent!.includes('asked')) {
                startedsToFix.push(started);
            }
        }
        if (!startedsToFix.length) {
            return;
        }
        const startedsToFixByQuestionId = new Map<number, HTMLElement>();
        for (const started of startedsToFix) {
            const questionId = Number(getStartedQuestionAnchor(started)!.href.match(/\d+/)![0]);
            startedsToFixByQuestionId.set(questionId, started);
        }
        getQuestionData([...startedsToFixByQuestionId.keys()])
            .then((questionData) => {
                addResultsToQuestionList(startedsToFixByQuestionId, questionData, questionsContainer.matches('#question-mini-list'));
            })
            .catch((error) => {
                console.error(error);
                showToastError('Stack Ask Dates Everywhere: An error occurred, see console for details');
            });
    };
    new MutationObserver(fix).observe(questionsContainer, { childList: true });
    fix();
};
