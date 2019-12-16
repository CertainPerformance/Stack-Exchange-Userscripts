export const openDuplicateModal = () => {
    document.querySelector<HTMLAnchorElement>('.close-question-link')!.click();
    const handler = () => {
        window.$(document).off('ajaxComplete', handler);
        const duplicateRadio = document.querySelector<HTMLElement>('input[type="radio"][name="close-reason"][value="Duplicate"]');
        if (duplicateRadio) {
            // If there's an error, or user has already voted to close, duplicateRadio will not exist
            // That's fine - keep the newly opened modal or error box open, so user can see what the problem was
            duplicateRadio.click();
        }
    };
    window.$(document).on('ajaxComplete', handler);
};
