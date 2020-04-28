let questionContainer: HTMLElement;
let haveWarned = false;
const setQuestionContainerWidth = () => {
    const availableSpaceToLeftOfContent = document.querySelector<HTMLElement>('.container')!.getBoundingClientRect().left - 20;
    if (availableSpaceToLeftOfContent < 300) {
        if (!haveWarned) {
            haveWarned = true;
            // tslint:disable: no-console
            console.warn(`Not enough space to put Stack Speak New Questions interface to left of main content (300px required, ${Math.floor(availableSpaceToLeftOfContent)}px found)`);
            console.warn('To acquire more space, consider installing Stack Right Content: https://github.com/CertainPerformance/Stack-Exchange-Userscripts/tree/master/Right-Content');
            // tslint:enable: no-console
        }
        questionContainer.style.display = 'none';
        return;
    }
    questionContainer.style.display = 'block';
    questionContainer.style.width = `${Math.min(availableSpaceToLeftOfContent, 700)}px`;
};
export const makeQuestionContainer = () => {
    if (document.querySelector<HTMLElement>('#left-sidebar')!.offsetParent !== null) {
        // tslint:disable: no-console
        console.warn('Stack Speak New Questions: Left sidebar found. This may interfere with the new questions interface.');
        console.warn('Consider disabling it at https://stackoverflow.com/users/preferences/');
        // tslint:enable: no-console
    }
    questionContainer = document.body.appendChild(document.createElement('div'));
    questionContainer.style.cssText = 'position: fixed; bottom: 0; background-color: var(--white);';
    setQuestionContainerWidth();
    window.addEventListener('resize', setQuestionContainerWidth);
    return questionContainer;
};
