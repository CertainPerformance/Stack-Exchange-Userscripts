type Settings = {
    siteSpecificCloseReasons: {
        siteSpecificCloseReasonId: number;
        longReasonText: string;
        reasonText: string;
    }[];
    downvoteCondition: string;
    raisedCloseFlags: number[];
};
export const getSettings = () => (JSON.parse(localStorage.cpUserscriptOneClickVTCSettings as string) as Settings);
export const saveNewSettings = (siteSpecificCloseReasons: Settings['siteSpecificCloseReasons']) => {
    localStorage.cpUserscriptOneClickVTCSettings = JSON.stringify({
        siteSpecificCloseReasons,
        downvoteCondition: 'Non-dupes only',
        raisedCloseFlags: [],
    });
};
export const saveSettings = (partialNewSettings: Partial<Settings>) => {
    // Overwrite some properties of the existing settings:
    const oldSettings = getSettings();
    const newSettings = Object.assign({}, oldSettings, partialNewSettings);
    localStorage.cpUserscriptOneClickVTCSettings = JSON.stringify(newSettings);
};
