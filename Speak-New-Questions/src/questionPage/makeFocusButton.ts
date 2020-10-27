export const makeFocusButton = () => {
    const header = document.querySelector('header')!;
    const focusButton = header.insertBefore(document.createElement('button'), header.children[0]);
    focusButton.className = 's-btn s-btn__primary';
    focusButton.style.cssText = 'position: absolute; margin-left: 10px; height: 100%; z-index: 1; display: none;';
    return focusButton;
};
