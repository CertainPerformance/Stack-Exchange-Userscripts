export const showSpeechSynthesisReadyness = () => {
    /* One user interaction required before audio can trigger by itself due to autoplay policies
     * In Chrome, one can also whitelist the site in the registry:
     * http://dev.chromium.org/administrators/policy-list-3#AutoplayWhitelist
     * In Windows:
     * Computer\HKEY_CURRENT_USER\Software\Policies\Google\Chrome\AutoplayWhitelist
     */
    document.body.style.backgroundColor = 'yellow';
    document.body.addEventListener(
        'click',
        () => {
            document.body.style.removeProperty('background-color');
        },
        { once: true },
    );
};
