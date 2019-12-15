if (!localStorage.cpUserscriptOneClickVTCDownvoteWhenVotingToClose) {
    localStorage.cpUserscriptOneClickVTCDownvoteWhenVotingToClose = 'Non-dupes only';
}
const showOptionContainer = (optionContainer: HTMLElement) => {
    optionContainer.style.visibility = 'visible';
    const buttons = [...optionContainer.children[1].children] as HTMLDivElement[];
    const currentButton = buttons.find(button => button.textContent === localStorage.cpUserscriptOneClickVTCDownvoteWhenVotingToClose)!;
    currentButton.style.backgroundColor = '#33ffe7';
    optionContainer.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (!target.matches('h4 + div > div')) {
            return;
        }
        for (const button of buttons) {
            button.removeAttribute('style');
        }
        target.style.backgroundColor = '#33ffe7';
        localStorage.cpUserscriptOneClickVTCDownvoteWhenVotingToClose = target.textContent;
    });
};

export const listenForAutoVoteChanges = (vtcContainer: HTMLElement) => {
    const optionContainer = vtcContainer.lastElementChild;
    // Reveal the optionContainer after mouse has hovered over the vtcContainer for 5 seconds
    let timeout: number;
    vtcContainer.addEventListener('mouseenter', () => {
        timeout = window.setTimeout(showOptionContainer, 5000, optionContainer);
    });
    vtcContainer.addEventListener('mouseleave', () => {
        window.clearTimeout(timeout);
    });
};
