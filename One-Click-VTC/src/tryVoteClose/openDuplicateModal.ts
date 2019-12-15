export const openDuplicateModal = () => {
    (document.querySelector('.close-question-link') as HTMLAnchorElement).click();
    const handler = () => {
        window.$(document).off('ajaxComplete', handler);
        const duplicateRadio = document.querySelector('input[type="radio"][name="close-reason"][value="Duplicate"]');
        if (duplicateRadio) {
            // If there's an error, or user has already voted to close, duplicateRadio will not exist
            // That's fine - keep the newly opened modal or error box open, so user can see what the problem was
            (duplicateRadio as HTMLElement).click();
        }
    };
    window.$(document).on('ajaxComplete', handler);
};
