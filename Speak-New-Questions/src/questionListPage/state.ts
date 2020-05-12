let state: {
    channel: BroadcastChannel | null;
    focusing: boolean;
    textToSpeakQueue: Array<
        { textToSpeak: string; } |
        { textToSpeak: string; questionElement: HTMLElement; mouseoverHandler: () => void; }
    >;
    voice: SpeechSynthesisVoice | null;
    volume: number;
    rate: number;
} = {
    channel: null,
    focusing: false,
    textToSpeakQueue: [],
    voice: null,
    volume: 1, // Volume and rate, when on a Newest page, will be immediately overwritten by an assignState in makeSpeakInterface
    rate: 2,
};
export const assignState = (partialNewState: Partial<typeof state>) => {
    state = Object.assign({}, state, partialNewState);
};
export const getState = () => state;
