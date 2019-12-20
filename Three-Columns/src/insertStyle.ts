// @ts-ignore
// tslint:disable-next-line: no-implicit-dependencies
import styleTextCss from 'raw-loader!../build/styleText.css';

/* Most of the display changes are done through CSS alone. The only DOM modifications made by the userscript are:
 * Injected stylesheet
 * data- attributes on a few elements
 * Buttons to open/close the layout
 * Column resizer lines
 */
let styleTag: HTMLStyleElement;
export const insertStyle = () => {
    styleTag = document.body.appendChild(document.createElement('style'));
    styleTag.textContent = styleTextCss as string;
};
export const changeStyle = (newStyleText: string) => {
    styleTag.textContent = newStyleText;
};
