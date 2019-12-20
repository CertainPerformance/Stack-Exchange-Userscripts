import { isAdjustable } from '../isAdjustable';
import { getSettings } from './getSettings';
import { updateStyle } from './updateStyle';

export const watchForResize = () => {
    if (!isAdjustable) {
        delete localStorage.cpUserscriptThreeColumnsAdjustable;
        return;
    }
    // Load the possibly-personalized values into the CSS on pageload:
    updateStyle();
    window.addEventListener('mousedown', (mousedownEvent) => {
        const target = mousedownEvent.target as HTMLElement;
        if (!target.matches('[data-cpuserscript-three-columns-post-root] [data-resizer]')) {
            return;
        }
        const isFirstResizer = target.nextElementSibling !== null;
        const decimalLeftOfColumnLeftOfResizer = isFirstResizer ? 0 : target.closest('[data-cpuserscript-three-columns-post-root]')!.getBoundingClientRect().left;
        const currentSettings = getSettings();
        const mousemoveHandler = (mousemoveEvent: MouseEvent) => {
            const newPageX = mousemoveEvent.pageX;
            const pageWidth = document.documentElement.clientWidth;
            const newPercentWidthOfColumnLeftOfResizer = 100 * Math.max((newPageX - decimalLeftOfColumnLeftOfResizer), 0) / pageWidth;
            if (isFirstResizer) {
                localStorage.cpUserscriptThreeColumnsAdjustable = JSON.stringify({
                    firstColWidth: newPercentWidthOfColumnLeftOfResizer,
                    secondColWidth: currentSettings.secondColWidth,
                });
            } else {
                localStorage.cpUserscriptThreeColumnsAdjustable = JSON.stringify({
                    firstColWidth: currentSettings.firstColWidth,
                    secondColWidth: newPercentWidthOfColumnLeftOfResizer,
                });
            }
            updateStyle();
        };
        window.addEventListener('mousemove', mousemoveHandler);
        window.addEventListener(
            'mouseup',
            () => {
                window.removeEventListener('mousemove', mousemoveHandler);
            },
            { once: true },
        );
    });
};
