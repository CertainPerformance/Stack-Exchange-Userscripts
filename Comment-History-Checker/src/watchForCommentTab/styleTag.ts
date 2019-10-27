// @ts-ignore
// tslint:disable-next-line: no-implicit-dependencies
import styleTextCss from 'raw-loader!../../build/watchForCommentTab/styleText.css';
export const styleTag = document.createElement('style');
styleTag.textContent = styleTextCss as string;
