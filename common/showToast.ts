import './declareGlobalStackExchange';

export const showToastError = (message: string) => {
    window.StackExchange.helpers.showToast(message, { transient: false, type: 'danger' });
};
export const showToastInfo = (message: string) => {
    const transientTimeout = window.StackExchange.helpers.suggestedTransientTimeout(message, true);
    window.StackExchange.helpers.showToast(message, { transientTimeout, transient: true, type: 'info' });
};
