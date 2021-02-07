import './declareGlobalStackExchange';

// Most scripts have `// @grant none`, and will see the native window.StackExchange
// Those which have a different @grant will need to go through unsafeWindow.StackExchange
const { helpers } = (window.StackExchange || unsafeWindow.StackExchange);
export const showToastError = (message: string) => {
    helpers.showToast(message, { transient: false, type: 'danger' });
};
export const showToastInfo = (message: string, transientTimeout = helpers.suggestedTransientTimeout(message, true)) => {
    helpers.showToast(message, { transientTimeout, transient: true, type: 'info' });
};
