import { makeFocusButton } from './makeFocusButton';
import { setupBroadcastChannelForFocusOnQuestion } from './setupBroadcastChannelForFocusOnQuestion';

export const handleQuestionPage = () => {
    const focusButton = makeFocusButton();
    setupBroadcastChannelForFocusOnQuestion(focusButton);
};
