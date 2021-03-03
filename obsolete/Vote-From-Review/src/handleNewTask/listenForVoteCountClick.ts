import { showToastError, showToastInfo } from '../../../common/showToast';
import { getPostId } from './getPostId';
import { handleError } from './handleError';

const canFetchVoteDetails = (() => {
    if (window.location.href.startsWith('https://stackexchange.com/oauth-vote-from-review')) {
        return false;
    }
    const repText = document.querySelector('.-rep')!.textContent!;
    const rep = Number(repText.match(/[\d,]+$/)![0].replace(/,/g, ''));
    return rep >= 1000;
})();

const getVoteCounts = async (centerNetSumDiv: HTMLDivElement) => {
    const url = `${window.location.origin}/posts/${getPostId()}/vote-counts?_=${Date.now()}`;
    const response = await fetch(url, { credentials: 'same-origin' });
    const responseText = await response.text();
    if (responseText === 'You may only fetch vote counts once every second') {
        showToastInfo(responseText);
        return;
    }
    try {
        const { up, down } = JSON.parse(responseText) as { up: string; down: string; };
        centerNetSumDiv.innerHTML = `
            <div style="color:green">${up}</div>
            <div class="vote-count-separator"></div>
            <div style="color:maroon">${down}</div>
        `;
    } catch (e) {
        // responseText may not be JSON if there's an error
        showToastError(responseText);
    }
};

export const listenForVoteCountClick = (centerNetSumDiv: HTMLDivElement) => {
    if (!canFetchVoteDetails) {
        return;
    }
    centerNetSumDiv.title = 'View upvote and downvote totals';
    centerNetSumDiv.addEventListener('click', () => {
        getVoteCounts(centerNetSumDiv).catch(handleError);
    });
};
