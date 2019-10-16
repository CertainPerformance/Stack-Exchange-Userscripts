import { makeSaveAllVisibleComments } from './makeSaveAllVisibleComments';

export const watchForNewComments = async () => {
    const myProfile = document.querySelector('a.my-profile');
    if (!myProfile) {
        // not logged in
        return;
    }
    const userHref = (myProfile as HTMLAnchorElement).href;
    const saveAllVisibleComments = makeSaveAllVisibleComments(userHref);
    await saveAllVisibleComments();

    // Each post (question or answer) has a UL as a comment container
    // When changes are observed there with MutationObserver, save all of the user's comments on the page
    // Attach a MutationObserver to all ULs on pageload, and also on every ajaxComplete (when new answers, and thus new ULs, may have appeared)
    const ulsBeingObserved = new Set<HTMLUListElement>();
    const attachObserverToUL = (ul: HTMLUListElement) => {
        if (ulsBeingObserved.has(ul)) {
            return;
        }
        ulsBeingObserved.add(ul);
        new MutationObserver(saveAllVisibleComments).observe(ul, { childList: true });
    };
    const attachObserverToAllULs = () => {
        // tslint:disable-next-line: no-unnecessary-type-assertion
        (document.querySelectorAll('ul.comments-list') as NodeListOf<HTMLUListElement>).forEach(attachObserverToUL);
    };
    attachObserverToAllULs();
    window.$(document).ajaxComplete(attachObserverToAllULs);
};
