import { addRowstats } from './addRowstats';

export const watchForTabChanges = (mainbarFull: Element) => {
    addRowstats();
    new MutationObserver(() => {
        const insertedElementsExist = mainbarFull.querySelector('[data-cpuserscript-rowstats]');
        if (!insertedElementsExist) {
            addRowstats();
        }
    })
        .observe(mainbarFull, { childList: true });
};
