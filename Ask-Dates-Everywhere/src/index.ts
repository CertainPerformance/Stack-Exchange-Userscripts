import '../../common/declareGlobalStackExchange';
import { observeQuestionsContainer } from './observeQuestionsContainer';

const questions = document.querySelector<HTMLElement>('#questions');
const miniList = document.querySelector<HTMLElement>('#question-mini-list');

const questionsContainer = questions || miniList;
if (questionsContainer) {
    observeQuestionsContainer(questionsContainer);
}
