import '../../common/declareGlobalStackExchange';
import { canCreateInterface } from './canCreateInterface';
import { insertStyle } from './insertStyle';
import { watchForInterfaceHover } from './watchForInterfaceHover';
import { watchForSiteSpecificEdits } from './watchForSiteSpecificEdits';
import { showOkButtonWhenHovered } from './showOkButtonWhenHovered';
import { tryVoteCloseWhenSEReady } from './tryVoteClose';
import { makeVTCContainerHTML } from './makeVTCContainerHTML';
import { populateCloseReasons } from './populateCloseReasons';
import { watchForReset } from './watchForReset';

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

const createInterface = () => {
    const vtcContainer = document.querySelector('.container')!.insertAdjacentElement('afterbegin', document.createElement('div')) as HTMLElement;
    vtcContainer.innerHTML = makeVTCContainerHTML();
    showOkButtonWhenHovered(vtcContainer);
    vtcContainer.setAttribute('data-cpuserscript-one-click-vtc', '');
    vtcContainer.addEventListener('click', tryVoteCloseWhenSEReady);
    watchForInterfaceHover(vtcContainer);
    watchForSiteSpecificEdits(vtcContainer);
    watchForReset(vtcContainer);
    insertStyle();
};

if (canCreateInterface()) {
    if (!localStorage.cpUserscriptOneClickVTCSettings) {
        populateCloseReasons(createInterface);
    } else {
        createInterface();
    }
}
