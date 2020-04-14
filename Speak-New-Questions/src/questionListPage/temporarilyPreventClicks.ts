let timeoutId: number;
const listener = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('#questions') && target.closest('a')) {
        e.preventDefault();
    }
};
const timeoutCallback = () => {
    window.removeEventListener('click', listener, true);
};
export const temporarilyPreventClicks = () => {
    /* The user may occasionally click right when a new question comes in
     * resulting in them clicking on a link other than the one they intended to click
     * This prevents clicks on <a>s inside #questions for 400ms after a new question appears
     */
    window.addEventListener('click', listener, true);
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(timeoutCallback, 400);
};
