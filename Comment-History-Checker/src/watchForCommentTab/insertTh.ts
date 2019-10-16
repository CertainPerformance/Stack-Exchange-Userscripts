export const insertTh = (thisProfileIsLoggedIn: boolean) => {
    const table = document.querySelector('.history-table')!;
    const thead = table.insertBefore(document.createElement('thead'), table.children[0]);
    // Limitation: Below only makes sense on English sites
    thead.innerHTML = `
    <tr>
        <th></th>
        <th>
            <div data-cpuserscript-rowstats>
                <div data-cpuserscript-qa-box data-cpuserscript-parent-post>Q</div>
                <div data-cpuserscript-qa-box data-cpuserscript-parent-post>A</div>
                <div data-cpuserscript-comment-score>Score</div>
                <div data-cpuserscript-more-answers><span># of additional answers</span></div>
            </div>
        </th>
        <th>
            <div${!thisProfileIsLoggedIn ? ' style="visibility: hidden;"' : ''}>
                <div data-cpuserscript-self-deleted>Comment deleted by you</div>
                <div data-cpuserscript-post-removed>Parent post removed</div>
                <div data-cpuserscript-duplicate-removed>Possible Duplicate comment removed</div>
                <div data-cpuserscript-comment-removed>Comment deleted by mod/system</div>
            </div>
        </th>
    </tr>
    `;
};
