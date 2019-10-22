export const showToastError = (message: string) => {
    window.StackExchange.helpers.showToast(message, { transient: false, type: 'danger' });
};
