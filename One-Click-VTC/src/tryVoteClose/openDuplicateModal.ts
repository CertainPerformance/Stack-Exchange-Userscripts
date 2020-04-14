export const openDuplicateModal = () => {
    document.querySelector<HTMLAnchorElement>('.close-question-link')!.click();
    const handler = () => {
        // First ID selector below is new due to UI changes ~4/13/20: https://meta.stackoverflow.com/q/396592
        // If it doesn't get reverted and makes it out of the testing phase, second selector can be removed
        const duplicateRadio = document.querySelector<HTMLElement>('#closeReasonId-Duplicate, input[type="radio"][name="close-reason"][value="Duplicate"]');
        if (duplicateRadio) {
            // If there's an error, or user has already voted to close, duplicateRadio will not exist
            // That's fine - keep the newly opened modal or error box open, so user can see what the problem was
            duplicateRadio.click();
            window.$(document).off('ajaxComplete', handler);
        }
    };
    window.$(document).on('ajaxComplete', handler);
    window.setTimeout(
        () => {
            window.$(document).off('ajaxComplete', handler);
        },
        1000,
    );
};
