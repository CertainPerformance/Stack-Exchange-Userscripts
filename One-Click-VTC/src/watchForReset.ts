import { showToastError } from '../../common/showToast';

export const watchForReset = (vtcContainer: HTMLElement) => {
    const button = vtcContainer.querySelector('button')!;
    button.addEventListener('click', () => {
        delete localStorage.cpUserscriptOneClickVTCSettings;
        vtcContainer.remove();
        showToastError('Cleared, refresh the page');
    });
};
