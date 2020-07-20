// ==UserScript==
// @name             Stack Sidebar Question Stats
// @description      Puts question stats in the sidebar, rather than at the top of the page
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.32.2
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/questions/\d+/
// @run-at           document-start
// @grant            none
// ==/UserScript==

'use strict';

/* For compatibility with Roomba Forecaster
 * and with any other older userscripts that depended on the old location of question stats in the sidebar
 * Make sure this userscript runs before they do, so that the #qinfo table it creates can be found by the other userscripts
 * https://www.mturkcrowd.com/threads/how-to-change-execution-order-of-userscripts-and-customize-excluded-pages.152/
 */

function moveQuestionStats() {
    // Localization:
    const localizationSubstitutions = {
        active: [
            'Active', // English
            'Ativa', // pt.stackoverflow.com
            'Activa', // es.stackoverflow.com
            'Последняя активность', // ru.stackoverflow.com & rus.stackexchange.com
            'アクティブ', // ja.stackoverflow.com
        ],
        asked: [
            'Asked', // English
            'Perguntada', // pt.stackoverflow.com
            'Formulada', // es.stackoverflow.com
            'Вопрос задан', // ru.stackoverflow.com & rus.stackexchange.com
            '質問日', // ja.stackoverflow.com
        ],
        viewed: [
            'Viewed', // English
            'Vista', // pt.stackoverflow.com
            // 'Vista', // es.stackoverflow.com
            'Просмотрен', // ru.stackoverflow.com & rus.stackexchange.com
            '閲覧数', // ja.stackoverflow.com
        ],
    };
    const mapToEnglishWord = {};
    Object.entries(localizationSubstitutions).forEach(([englishWord, arrOfAllWords]) => {
        arrOfAllWords.forEach((word) => {
            mapToEnglishWord[word] = englishWord;
        });
    });

    const topQuestionStatsContainer = document.querySelector('#question-header + div.grid');
    const statusCells = {};
    for (const cell of topQuestionStatsContainer.querySelectorAll('#question-header + div.grid > .grid--cell')) {
        const cellLabel = cell.querySelector('span.fc-light').textContent;
        const type = mapToEnglishWord[cellLabel];
        if (type) {
            statusCells[type] = cell;
        }
    }

    const askedCell = statusCells.asked;
    const askedCellLabel = askedCell.querySelector('span.fc-light').textContent.trim();
    const possibleActiveCell = statusCells.active;
    const viewedCell = statusCells.viewed;
    const viewedCellLabel = viewedCell.querySelector('span.fc-light').textContent.trim();
    const askedTitle = askedCell.title;
    const askedTimeHTML = askedCell.children[1].outerHTML;
    const viewCountTextContent = viewedCell.lastChild.textContent;

    // This element also acts as the horizontal separator between the title and the question body;
    // clear, but do not remove
    topQuestionStatsContainer.textContent = '';

    const sidebar = document.querySelector('#sidebar');
    const newSideQuestionStatsContainer = document.createElement('div');
    sidebar.insertAdjacentElement('afterbegin', newSideQuestionStatsContainer);
    newSideQuestionStatsContainer.className = 'module question-stats';
    const activeTRHTML = (() => {
        if (!possibleActiveCell) {
            return '';
        }
        const activeLink = possibleActiveCell.querySelector('a');
        const activeTitle = activeLink.title;
        const activeTextContent = activeLink.textContent;
        return `
            <tr>
                <td>
                    <p class="label-key">${possibleActiveCell.querySelector('span.fc-light').textContent.trim()}</p>
                </td>
                <td style="padding-left: 10px">
                    <p class="label-key">
                        <b>
                            <a href="?lastactivity" class="lastactivity-link" title="${activeTitle}">${activeTextContent}</a>
                        </b>
                    </p>
                </td>
            </tr>
        `;
    })();
    newSideQuestionStatsContainer.innerHTML = `
        <table id="qinfo">
            <tbody>
                <tr>
                    <td>
                        <p class="label-key">${askedCellLabel}</p>
                    </td>
                    <td style="padding-left: 10px">
                        <p class="label-key" title="${askedTitle}">
                            <b>${askedTimeHTML}</b>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p class="label-key">${viewedCellLabel}</p>
                    </td>
                    <td style="padding-left: 10px">
                        <p class="label-key">
                            <b>${viewCountTextContent}</b>
                        </p>
                    </td>
                </tr>
                ${activeTRHTML}
            </tbody>
        </table>
    `;
    // Make sure text color is correct even when in dark mode:
    newSideQuestionStatsContainer.appendChild(document.createElement('style')).textContent = `
        .label-key b, .label-key strong {
            color: var(--black);
        }
    `;
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', moveQuestionStats);
} else {
    moveQuestionStats();
}
