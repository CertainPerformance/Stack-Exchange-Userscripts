import { attachListenersAndOpen3ColLayoutOnTextareaFocus } from './attachListenersAndOpen3ColLayoutOnTextareaFocus';
import { closeLayoutWhenClickOnCloseOrFlagOrPendingEdit } from './closeLayoutWhenClickOnCloseOrFlagOrPendingEdit';
import { closeTopbarWhenClickingPreview } from './closeTopbarWhenClickingPreview';
import { enterInterfaceWhenCopyToAnswer } from './enterInterfaceWhenCopyToAnswer';
import { watchForResize } from './watchForResize';

export const addListeners = () => {
    attachListenersAndOpen3ColLayoutOnTextareaFocus();
    closeLayoutWhenClickOnCloseOrFlagOrPendingEdit();
    closeTopbarWhenClickingPreview();
    enterInterfaceWhenCopyToAnswer();
    watchForResize();
};
