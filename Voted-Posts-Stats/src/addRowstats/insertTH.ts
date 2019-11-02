export const insertTH = () => {
    const table = document.querySelector('.history-table')!;
    const thead = table.insertBefore(document.createElement('thead'), table.children[0]);
    thead.innerHTML = `
        <tr>
            <th></th>
            <th>
                <span></span>
                <span data-cpuserscript-rowstats>
                    <span data-cpuserscript-parent-post>Q</span>
                    <span data-cpuserscript-parent-post>A</span>
                    <span># of additional answers</span>
                </span>
            </th>
        </tr>`;
};
