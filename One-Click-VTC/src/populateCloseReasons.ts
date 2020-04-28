import { showToastError } from '../../common/showToast';
import { saveNewSettings } from './settings';
import { defaultSiteSpecificShortReasons } from './defaultSiteSpecificShortReasons';

/**
 * Make a network request to get the site-specific interface to close the question,
 * save the results in localStorage
 */
export const populateCloseReasons = (createInterface: () => void) => {
    const questionId = window.location.href.match(/\d+/)![0];
    // The below will probably only log once after the userscript is installed
    // tslint:disable-next-line: no-console
    console.log('Stack One Click VTC: Fetching site-specific close reasons...');
    // The site-specific interface is included in the main /close interface response
    fetch(`${window.location.origin}/flags/questions/${questionId}/close/popup`)
        .then(res => res.text())
        .then((popupText) => {
            handlePopup(popupText, createInterface);
        })
        .catch((error) => {
            // tslint:disable-next-line: no-console
            console.error(error);
            showToastError('Stack One Click VTC: An error occurred while fetching site-specific close reasons, see console for details');
        });
};
const handlePopup = (popupText: string, createInterface: () => void) => {
    const doc = new DOMParser().parseFromString(popupText, 'text/html');
    const siteSpecificRadios = doc.querySelectorAll<HTMLInputElement>('input[name="siteSpecificCloseReasonId"]');
    if (!siteSpecificRadios.length) {
        // Might occur if site is down
        showToastError('Stack One Click VTC: No site-specific radio buttons found, try going to a different question');
        return;
    }
    const thisSiteShortReasons = defaultSiteSpecificShortReasons[window.StackExchange.options.site.name] || [];
    const siteSpecificCloseReasons: {
        siteSpecificCloseReasonId: number;
        longReasonText: string;
        reasonText: string;
    }[] = [];
    siteSpecificRadios.forEach((radio, i) => {
        const origLabelText = radio
            .parentElement!
            .nextElementSibling!
            .querySelector('label')!
            .textContent!;
        // If there's both a main label and an extended description, join them by `. `:
        const longReasonText = origLabelText
            .split('\n')
            .map(str => str.trim())
            .filter(Boolean)
            .join('. ');

        if (longReasonText.includes('add a comment') ||
            longReasonText.includes('another site') ||
            longReasonText.includes('Blatantly')
        ) {
            return;
        }
        const siteSpecificCloseReasonId = Number(radio.value);
        // The VTC container text needs to be **short**. Take no more than 30 characters, stopping right before a space.
        // User can adjust wording themselves later.
        const reasonText = thisSiteShortReasons[i] || longReasonText.match(/.{1,29}\S(?= |$)/)![0];
        siteSpecificCloseReasons.push({ siteSpecificCloseReasonId, longReasonText, reasonText });
    });
    saveNewSettings(siteSpecificCloseReasons);
    createInterface();
};
