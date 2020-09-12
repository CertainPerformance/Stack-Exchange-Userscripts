// @ts-ignore
// tslint:disable-next-line: no-implicit-dependencies
import styleTextCss from 'raw-loader!../../build/styleText.css';
import { changeStyle } from '../insertStyle';
import { getSettings } from './getSettings';

/**
 * From the column width settings in localStorage, change the textContent of the userscript's <style> tag
 * to display the saved column widths
 */
export const updateStyle = () => {
    const { firstColWidth, secondColWidth } = getSettings();
    // The above will be (numeric) percentages 0-100
    const firstTwoColsTotalWidth = firstColWidth + secondColWidth;
    const thirdColumnWidth = 100 - firstTwoColsTotalWidth;
    // At very low width, the user probably doesn't care about the column in question; overflow will look silly
    const widthNumToCssRules = (width: number) => `width: ${width}%; ${width < 5 ? 'overflow: hidden;' : ''}`;
    const replaceObj: { [replaceProperty: string]: string } = {
        'col1-width': widthNumToCssRules(firstColWidth),
        'resizer1-left': `left: ${firstColWidth}%;`,
        'col2-left': `left: ${firstColWidth}%;`,
        'col2-width': `${widthNumToCssRules(secondColWidth)} !important`,
        'resizer2-left': `left: ${firstTwoColsTotalWidth}%;`,
        'col3-left': `left: ${firstTwoColsTotalWidth}%;`,
        'col3-width': widthNumToCssRules(thirdColumnWidth),
    };
    const newCssText = (styleTextCss as string).replace(
        /^ *\/\* replace-(\S+) \*\//gm,
        (match, g1) => replaceObj[g1 as string] || match,
    );
    changeStyle(newCssText);
};
