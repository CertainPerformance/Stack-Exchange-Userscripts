import { closeLayout } from './closeLayout';

/**
 * If the user clicks on "close" or "edit (1)" (pending edit which needs to be approved) on ANY post while in 3-column layout,
 * prevent the click, close the layout, and then click() what they clicked manually
 * to ensure that the close / edit approval interface appears in the middle of the screen, after the layout is back to normal
 */
export const closeLayoutWhenClickOnCloseOrPendingEdit = () => {
    const clickHandler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        // Continue main body of function only if layout is open *and* one of (.close-question-link or a[id^="edit-pending"]) is clicked
        if (!target.closest('html[data-cpuserscript-three-columns-layout-open]') || !target.closest('.close-question-link, a[id^="edit-pending"]')) {
            return;
        }
        // Do not trigger SE's listeners for clicks on Edit / Close:
        e.stopPropagation();
        // This is an <a>, do not navigage away:
        e.preventDefault();
        // Close layout immediately, without scroll animation to the post the layout was focused on:
        closeLayout(true);
        // Scroll to the post the user wants to close or edit:
        const targetedPostRoot = target.closest('#post-form, .answer, .question')!;
        window.$('html, body')
            .animate({ scrollTop: $(targetedPostRoot).offset()!.top - 55 }, 200)
            .promise()
            .then(() => {
                // Click on "Edit (1)" or Close immediately after window is scrolled:
                target.click();
            });
    };
    window.addEventListener('click', clickHandler, true);
};
