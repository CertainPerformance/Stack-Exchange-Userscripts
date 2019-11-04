// @ts-ignore
// tslint:disable-next-line: no-implicit-dependencies
import styleTextCss from 'raw-loader!../build/styleText.css';
export const insertStyle = () => {
    const styleTag = document.body.appendChild(document.createElement('style'));
    styleTag.textContent = styleTextCss as string;
};
