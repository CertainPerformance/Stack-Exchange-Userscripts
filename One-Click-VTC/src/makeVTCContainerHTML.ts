import { getSettings } from './settings';

export const makeVTCContainerHTML = () => `
<h2>Vote to close as</h2>
<div>OK</div><h3 data-close-reason-id="Duplicate">Duplicate</h3>
<h3>Site-Specific</h3>
<div>${
    getSettings()
        .siteSpecificCloseReasons
        .map(({ siteSpecificCloseReasonId: id, reasonText, longReasonText }) =>
            `<div>OK</div>
            <div
                data-close-reason-id="SiteSpecific"
                data-site-specific-close-reason-id="${id}"
                title="${longReasonText.replace(/"/g, '&quot;')}"
            >${reasonText}</div>`,
        )
        .join('')
    }
</div>
<div>OK</div><h3 data-close-reason-id="NeedsDetailsOrClarity">Unclear</h3>
<div>OK</div><h3 data-close-reason-id="NeedMoreFocus">Too Broad</h3>
<div>OK</div><h3 data-close-reason-id="OpinionBased">Opinion-Based</h3>
<div>
    <h4>Downvote when voting to close:</h4>
    <div>
        <div>Always</div>
        <div>Non-dupes only</div>
        <div>Never</div>
    </div>
    <h5>Right-click a Site-Specific reason to edit displayed text</h5>
    <button title="Click this if moderators change a site's close reasons">Reset close reasons</button>
</div>
`;
