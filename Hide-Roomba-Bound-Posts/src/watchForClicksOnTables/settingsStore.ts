let settings: Settings;

if (!localStorage.cpUserscriptHideRoombaBoundPostsSettings) {
    localStorage.cpUserscriptHideRoombaBoundPostsSettings = JSON.stringify({
        enabled: true,
        showPostsWithReopenVotes: false,
    });
}

// In the unlikely event that the object in memory conflicts with the object in localStorage,
// the object in memory takes priority
export const get = () => {
    return settings || JSON.parse(localStorage.cpUserscriptHideRoombaBoundPostsSettings as string) as Settings;
};
export const set = (newSettings: Settings) => {
    settings = newSettings;
    localStorage.cpUserscriptHideRoombaBoundPostsSettings = JSON.stringify(newSettings);
};
