// The new post activity element will be clicked on automatically in watchNewQuestions.
// Its frequent appearance and disappearance will only cause disorienting vertical jiggle of the question list, so remove it.

export const hideNewPostActivity = () => {
    document.querySelector('#questions')!.appendChild(document.createElement('style')).textContent = `
        .js-new-post-activity {
            display: none;
        }
    `;
};
