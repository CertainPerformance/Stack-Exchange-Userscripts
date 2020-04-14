type Settings = {
    rate: number;
    volume: number;
    voiceName: string;
};
let settings: Settings = localStorage.cpUserscriptSpeakNewQuestions
    ? JSON.parse(localStorage.cpUserscriptSpeakNewQuestions as string) as Settings
    : {
        rate: 2,
        voiceName: '',
        volume: 1,
    };
export const getSettings = () => settings;
export const saveSettings = (partialNewSettings: Partial<Settings>) => {
    settings = Object.assign({}, settings, partialNewSettings);
    localStorage.cpUserscriptSpeakNewQuestions = JSON.stringify(settings);
};
