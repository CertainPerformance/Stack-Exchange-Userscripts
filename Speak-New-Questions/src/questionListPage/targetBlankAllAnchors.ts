export const targetBlankAllAnchors = (parent: Element) => {
    for (const a of parent.querySelectorAll<HTMLAnchorElement>('a[href]')) {
        a.target = '_blank';
    }
};
