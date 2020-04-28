import { queueUtterance } from './queueUtterance';
import { getState } from './state';
import { targetBlankAllAnchors } from './targetBlankAllAnchors';
import { addBorderWhenClicked } from './addBorderWhenClicked';
import { temporarilyPreventClicks } from './temporarilyPreventClicks';
import { pendingQuestionColor } from '../pendingQuestionColor';

const seenQuestionsIds = new Set(
    [...document.querySelectorAll('#questions > div.question-summary')].map(({ id }) => id),
);
const watchedTags = document.querySelector<HTMLInputElement>('#search input')?.value.match(/[^\[\]]+(?=\])/g) || [];
const questionTagCountsLeftById: { [questionId: string]: number } = {};
const siteName = window.location.href === 'https://example.com/fakepage' ? '' : window.StackExchange.options.site.name;
const siteNameSpokenText = siteName === 'Stack Overflow' ? '' : `${siteName}, `;

export const checkNewQuestions = () => {
    temporarilyPreventClicks();
    [...document.querySelectorAll<HTMLElement>('#questions > div.question-summary')]
        .filter(questionDiv => !seenQuestionsIds.has(questionDiv.id))
        .forEach((questionDiv) => {
            targetBlankAllAnchors(questionDiv);
            const { focusing } = getState();
            // New question divs that have not been spoken yet will be highlighted yellow
            // But these divs may get removed and replaced with copies before being passed to queueUtterance (see below)
            // For style consistency while the divs are appearing, highlight them immediately
            if (!focusing) {
                questionDiv.style.backgroundColor = pendingQuestionColor;
            }

            /* StackExchange will send the client new info about an active question *for every question, and for every tag in that question* that you're watching
             * Eg if you're watching 5 tags, and a question is posted with 3 of them, the websocket will send you info 3 times
             * (there may be a moderate fraction of a second delay between each)
             * and each time, if the existing question div is already in the document, it will be completely removed and replaced
             * See: https://dev.stackoverflow.com/content//Js/full.en.js
             * search for: $('#question-summary-' + activeq.id).remove();
             * Rather than fiddling with the element (and with the styles added by the userscript, and with the linked audio) every time it gets replaced
             * just wait for the question to appear in the questions list for the nth time, where n is the number of watched tags that question has
             * Only on that nth time does the code below result in the questionDiv actually getting changed, watched, and linked to the utterance that gets queued
             */
            const questionId = questionDiv.id;
            if (!questionTagCountsLeftById.hasOwnProperty(questionId)) {
                const watchedTagCountForThisQuestion = Array.from(
                    questionDiv.querySelectorAll('.tags > a'),
                    a => a.textContent!,
                )
                    .reduce((a, tag) => a + Number(watchedTags.includes(tag)), 0);
                questionTagCountsLeftById[questionId] = watchedTagCountForThisQuestion;
            }
            questionTagCountsLeftById[questionId] -= 1;
            // User may not be watching any tags - may be just on /questions?tab=Newest page
            // in which case there's nothing to count, and only one socket message per question, so queue the question immediately
            if (watchedTags.length && questionTagCountsLeftById[questionId] !== 0) {
                return;
            }
            seenQuestionsIds.add(questionId);
            addBorderWhenClicked(questionDiv);
            if (focusing) {
                return;
            }
            const questionText = questionDiv.querySelector('.question-hyperlink')!.textContent;
            const questionTags = [...questionDiv.querySelectorAll('.tags > a')]
                .map(tagA => tagA.textContent!.replace(/\./g, ' dot '));
            const textToSpeak = `Question, ${siteNameSpokenText} ${questionText} ---- ${questionTags.join(', ')}`;
            queueUtterance(textToSpeak, questionId);
        });
};
