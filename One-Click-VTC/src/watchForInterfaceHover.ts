import { getSettings, saveSettings } from './settings';

const showOptionContainer = (optionContainer: HTMLElement) => {
    if (optionContainer.style.visibility === 'visible') {
        return;
    }
    optionContainer.style.visibility = 'visible';
    const buttons = [...optionContainer.children[1].children] as HTMLDivElement[];
    const { downvoteCondition } = getSettings();
    const currentButton = buttons.find(button => button.textContent === downvoteCondition)!;
    currentButton.setAttribute('data-selected-option', '');
    optionContainer.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (!target.matches('h4 + div > div')) {
            return;
        }
        for (const button of buttons) {
            button.removeAttribute('data-selected-option');
        }
        target.setAttribute('data-selected-option', '');
        saveSettings({ downvoteCondition: target.textContent! });
    });
};

export const watchForInterfaceHover = (vtcContainer: HTMLElement) => {
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
