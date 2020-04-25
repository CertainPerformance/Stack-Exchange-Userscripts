import { haveVotedOnQuestion } from './haveVotedOnQuestion';

const tryShowButton = (textContainer: HTMLElement, okButton: HTMLElement) => {
    // If user never auto-votes when voting to close, showing the button only adds confusing and useless noise
    const setting = localStorage.cpUserscriptOneClickVTCDownvoteWhenVotingToClose;
    if (setting === 'Never' || (setting === 'Non-dupes only' && textContainer.dataset.closeReasonId === 'Duplicate')) {
        return false;
    }
    okButton.style.visibility = 'visible';
    return true;
};

export const showOkButtonWhenHovered = (vtcContainer: Element) => {
    const downvoteButton = document.querySelector<HTMLElement>('.question .js-vote-down-btn')!;
    const showImminentDownvote = () => {
        if (!haveVotedOnQuestion()) {
            downvoteButton.style.backgroundColor = 'var(--orange-300)';
        }
    };
    const noImminentDownvote = () => {
        downvoteButton.style.removeProperty('background-color');
    };
    for (const textContainer of (vtcContainer.querySelectorAll<HTMLElement>('[data-close-reason-id]'))) {
        const okButton = textContainer.previousElementSibling as HTMLElement;
        okButton.addEventListener('mouseenter', () => {
            tryShowButton(textContainer, okButton);
            noImminentDownvote();
        });
        okButton.addEventListener('mouseleave', (e) => {
            if (e.relatedTarget !== textContainer) {
                okButton.removeAttribute('style');
            }
        });
        textContainer.addEventListener('mouseenter', () => {
            if (tryShowButton(textContainer, okButton)) {
                showImminentDownvote();
            }
        });
        textContainer.addEventListener('mouseleave', (e) => {
            if (e.relatedTarget !== okButton) {
                okButton.removeAttribute('style');
                noImminentDownvote();
            }
        });
    }
};
