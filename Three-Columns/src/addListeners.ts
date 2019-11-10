import { attachListenersAndOpen3ColLayoutOnTextareaFocus } from './attachListenersAndOpen3ColLayoutOnTextareaFocus';
import { closeLayoutWhenClickOnCloseOrPendingEdit } from './closeLayoutWhenClickOnCloseOrPendingEdit';
import { closeTopbarWhenClickingPreview } from './closeTopbarWhenClickingPreview';
import { enterInterfaceWhenCopyToAnswer } from './enterInterfaceWhenCopyToAnswer';

export const addListeners = () => {
    attachListenersAndOpen3ColLayoutOnTextareaFocus();
    closeLayoutWhenClickOnCloseOrPendingEdit();
    closeTopbarWhenClickingPreview();
    enterInterfaceWhenCopyToAnswer();
};
