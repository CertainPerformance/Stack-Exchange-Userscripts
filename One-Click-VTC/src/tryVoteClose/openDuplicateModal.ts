export const openDuplicateModal = () => {
    document.querySelector<HTMLAnchorElement>('.js-close-question-link')!.click();
    const handler = (_event: unknown, _jqXHR: unknown, ajaxOptions: JQuery.AjaxSettings<unknown>) => {
        if (!ajaxOptions.url || !/\/flags\/questions\/\d+\/close\/popup/.test(ajaxOptions.url)) {
            return;
        }
        const duplicateRadio = document.querySelector<HTMLElement>('#closeReasonId-Duplicate');
        if (duplicateRadio) {
            // If there's an error, or user has already voted to close, duplicateRadio will not exist
            // That's fine - keep the newly opened modal or error box open, so user can see what the problem was
            duplicateRadio.click();
            window.$(document).off('ajaxComplete', handler);
        }
    };
    window.$(document).on('ajaxComplete', handler);
};
