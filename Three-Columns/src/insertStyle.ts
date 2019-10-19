// @ts-ignore
// tslint:disable-next-line: no-implicit-dependencies
import styleTextCss from 'raw-loader!./styleText.css';

/* Most of the display changes are done through CSS alone. The only DOM modifications made by the userscript are:
 * Injected stylesheet
 * data- attributes on a few elements
 * buttons to open/close the layout
 */
export const insertStyle = () => {
    const styleTag = document.body.appendChild(document.createElement('style'));
    styleTag.textContent = styleTextCss as string;
};
