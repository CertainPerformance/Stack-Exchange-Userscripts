import { highlightVoteButtonIfVotedHere } from './highlightVoteButtonIfVotedHere';
import { listenForUpDownVotes } from './listenForUpDownVotes';
import { listenForVoteCountClick } from './listenForVoteCountClick';

export const handleNewTask = () => {
    const voteCountDiv = document.querySelector('.js-vote-count');
    if (!voteCountDiv) {
        // No new tasks
        return;
    }
    const voteCount = voteCountDiv.textContent;
    const votingContainer = document.createElement('div');
    votingContainer.className = 'js-voting-container grid fd-column ai-stretch gs4 fc-black-200';
    votingContainer.innerHTML = `
        <button class="js-vote-up-btn grid--cell s-btn s-btn__unset c-pointer" title="This question shows research effort; it is useful and clear" aria-pressed="false" aria-label="up vote" data-selected-classes="fc-theme-primary"><svg aria-hidden="true" class="svg-icon m0 iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10 2 26z"></path></svg></button>
        <div class="js-vote-count grid--cell fc-black-500 fs-title grid fd-column ai-center c-pointer" itemprop="upvoteCount" tabindex="0">${voteCount}</div>
        <button class="js-vote-down-btn grid--cell s-btn s-btn__unset c-pointer" title="This question does not show any research effort; it is unclear or not useful" aria-pressed="false" aria-label="down vote" data-selected-classes="fc-theme-primary"><svg aria-hidden="true" class="svg-icon m0 iconArrowDownLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26 2 10z"></path></svg></button>
    `;
    votingContainer.style.paddingRight = '15px';
    const voteCellDiv = document.querySelector('.votecell')!;
    voteCellDiv.parentElement!.replaceChild(votingContainer, voteCellDiv);
    listenForUpDownVotes(votingContainer);
    listenForVoteCountClick(votingContainer.children[1] as HTMLDivElement);
    highlightVoteButtonIfVotedHere(votingContainer);
};
