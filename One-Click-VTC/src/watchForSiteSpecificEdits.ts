import { getSettings, saveSettings } from './settings';

/**
 * When user right-clicks on a Site Specific reason, replace it with an input.
 * When enter is pressed, save the new text for that reason in Local Storage
 */
export const watchForSiteSpecificEdits = (vtcContainer: HTMLElement) => {
    vtcContainer.addEventListener('contextmenu', (rightClickEvent) => {
        const originalDiv = rightClickEvent.target as HTMLElement;
        if (!originalDiv.matches('h3 + div > [data-close-reason-id]')) {
            return;
        }
        rightClickEvent.preventDefault();
        const input = document.createElement('input');
        const originalText = originalDiv.textContent!;
        input.value = originalText;
        input.maxLength = 35;
        input.title = originalDiv.title;
        // Hide the OK button while editing:
        originalDiv.dispatchEvent(new Event('mouseleave'));
        originalDiv.replaceWith(input);
        input.focus();
        input.addEventListener('keyup', (keyupEvent) => {
            if (keyupEvent.key !== 'Enter') {
                return;
            }
            originalDiv.textContent = input.value;
            input.replaceWith(originalDiv);
            const { siteSpecificCloseReasons } = getSettings();
            const closeObj = siteSpecificCloseReasons.find(({ reasonText }) => reasonText === originalText);
            if (closeObj) {
                // This should exist 99.9% of the time
                closeObj.reasonText = input.value;
                saveSettings({ siteSpecificCloseReasons });
            }
        });
    });
};
