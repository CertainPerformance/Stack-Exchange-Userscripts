export const setupFocusButtonInterval = (focusButton: HTMLElement, setStateFocusingFalse?: () => void) => {
    let intervalId: number;
    let stopFocusingAfter = 0;
    const intervalCallback = () => {
        const secsLeft = Math.round((stopFocusingAfter - Date.now()) / 1000);
        if (secsLeft > 0) {
            focusButton.textContent = `Focusing for ${Math.floor(secsLeft / 60)}:${String(secsLeft % 60).padStart(2, '0')}`;
        } else {
            focusButton.textContent = 'Start Focusing';
            window.clearInterval(intervalId);
            if (setStateFocusingFalse) {
                setStateFocusingFalse();
            }
        }
    };
    const makeNewInterval = (newStopFocusingAfter: number) => {
        stopFocusingAfter = newStopFocusingAfter;
        window.clearInterval(intervalId); // There almost certainly won't be an interval running, but just in case
        intervalId = window.setInterval(intervalCallback, 1000);
        intervalCallback();
    };
    const stopInterval = () => {
        stopFocusingAfter = 0;
        window.clearInterval(intervalId);
        focusButton.textContent = 'Start Focusing';
    };
    const getStopFocusingAfter = () => stopFocusingAfter;
    return { makeNewInterval, stopInterval, getStopFocusingAfter };
};
