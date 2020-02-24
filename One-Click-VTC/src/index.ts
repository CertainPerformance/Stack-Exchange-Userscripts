import '../../common/declareGlobalStackExchange';
import { canCreateInterface } from './canCreateInterface';
import { insertStyle } from './insertStyle';
import { listenForAutoVoteChanges } from './listenForAutoVoteChanges';
import { showOkButtonWhenHovered } from './showOkButtonWhenHovered';
import { tryVoteCloseWhenSEReady } from './tryVoteClose';
import { vtcContainerHTML } from './vtcContainerHTML';

declare global {
    interface Window {
        $: JQueryStatic;
    }
    interface JQuery {
        showInfoMessage: (
            message: string,
            options: {
                css?: object;
                transient: boolean;
            },
        ) => void;
    }
}

if (canCreateInterface()) {
    const vtcContainer = document.querySelector('.container')!.insertAdjacentElement('afterbegin', document.createElement('div')) as HTMLElement;
    vtcContainer.innerHTML = vtcContainerHTML;
    showOkButtonWhenHovered(vtcContainer);
    vtcContainer.setAttribute('data-cpuserscript-one-click-vtc', '');
    vtcContainer.addEventListener('click', tryVoteCloseWhenSEReady);
    listenForAutoVoteChanges(vtcContainer);
    insertStyle();
}
