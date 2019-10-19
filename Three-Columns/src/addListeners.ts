import { attachListenersAndOpen3ColLayoutOnTextareaFocus } from './attachListenersAndOpen3ColLayoutOnTextareaFocus';
import { closeLayoutWhenClickOnCloseOrPendingEdit } from './closeLayoutWhenClickOnCloseOrPendingEdit';
import { closeTopbarWhenClickingPreview } from './closeTopbarWhenClickingPreview';

export const addListeners = () => {
    attachListenersAndOpen3ColLayoutOnTextareaFocus();
    closeLayoutWhenClickOnCloseOrPendingEdit();
    closeTopbarWhenClickingPreview();
};
