export type LogError = (message: string, line?: string) => void;
export type MakeLogError = (path: string) => LogError;
export type VerifierParam = {
    text: string;
    path: string;
    logError: LogError;
};
export type Verifier = (verifierParam: VerifierParam) => void;
