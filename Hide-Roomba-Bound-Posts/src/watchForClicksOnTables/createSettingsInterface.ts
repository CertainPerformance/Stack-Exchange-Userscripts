import * as settingsStore from './settingsStore';

const setSettingsDivAttributes = (settings: Settings, settingsDiv: HTMLDivElement) => {
    if (settings.enabled) {
        settingsDiv.setAttribute('data-enabled', '');
    } else {
        settingsDiv.removeAttribute('data-enabled');
    }

    if (settings.showPostsWithReopenVotes) {
        settingsDiv.removeAttribute('data-hide-posts-with-reopen-votes');
    } else {
        settingsDiv.setAttribute('data-hide-posts-with-reopen-votes', '');
    }
};

export const createSettingsInterface = (checkOpenTables: () => void) => {
    const settingsDiv = document.createElement('div');
    settingsDiv.setAttribute('data-cpuserscript-hide-roomba-bound-posts-settings', '');
    // on settings change: consider fade-in animation
    settingsDiv.innerHTML = `
        <span>Hide Roomba Bound Posts:</span>
        <label>Enabled<input type="checkbox"></label>
        <label title="If checked, closed questions with reopen votes which would otherwise be eligible for RemoveAbandonedClosed will remain visible">
            Show posts with reopen votes<input type="checkbox">
        </label>
    `;
    const [enabledCheckbox, showPostsWithReopenVotesCheckbox] = settingsDiv.querySelectorAll('input');
    const initialSettings = settingsStore.get();
    setSettingsDivAttributes(initialSettings, settingsDiv);
    enabledCheckbox.checked = initialSettings.enabled;
    showPostsWithReopenVotesCheckbox.checked = initialSettings.showPostsWithReopenVotes;
    settingsDiv.addEventListener('change', () => {
        const [enabled, showPostsWithReopenVotes] = [enabledCheckbox, showPostsWithReopenVotesCheckbox].map(checkbox => checkbox.checked);
        const newSettings = { enabled, showPostsWithReopenVotes };
        settingsStore.set(newSettings);
        setSettingsDivAttributes(newSettings, settingsDiv);
        checkOpenTables();
    });
    const containerForAllTables = document.querySelector('.subheader + div')!;
    const deleteVotesHeading = containerForAllTables.querySelector('h2')!;
    deleteVotesHeading.insertAdjacentElement('beforebegin', settingsDiv);
};
