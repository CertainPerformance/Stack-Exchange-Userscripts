// tslint:disable: object-literal-sort-keys

// Properties below are site names, accessible by accessing StackExchange.options.site.name

export const defaultSiteSpecificShortReasons: { [siteName: string]: string[] } = {
    'Stack Overflow': [
        'General computing',
        'Server / networking',
        'Off-site resource request',
        'No MCVE',
        'Caused by typo',
    ],
    'Meta Stack Overflow': [
        'Not about SO/SE',
        "Doesn't seek discussion",
        'Not reproducible',
    ],
    'Meta Stack Exchange': [
        'Not about SE',
        "Doesn't seek discussion",
        'Not reproducible',
        'Only applicable to subsite',
    ],
    'Code Review Stack Exchange': [
        'Authorship/embedded code',
        'Code not working',
        'Missing review context',
    ],
};
