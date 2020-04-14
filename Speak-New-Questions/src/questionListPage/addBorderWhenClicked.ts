// Give visual indication of having visited a question
export const addBorderWhenClicked = (questionDiv: HTMLElement) => {
    questionDiv.querySelector('.question-hyperlink')!.addEventListener('click', () => {
        questionDiv.style.borderRight = '4px solid blue';
    });
};
