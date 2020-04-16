# One Click VTC (&#8202;[install](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/One-Click-VTC/dist/StackOneClickVTC.user.js)&#8202;)

For Stack Overflow only. If you vote to close (VTC) a lot, you can use this userscript to choose a close reason immediately (and downvote too, if you want) in a single click, rather than have to navigate through the pop-up interface first (which can be tedious if done tens of times every day).

![screenshot](https://raw.githubusercontent.com/CertainPerformance/Stack-Exchange-Userscripts/master/One-Click-VTC/userscript-screenshot.png)

This is intended for those with reasonably wide screens, since the VTC reasons are put in a container to the left of the main page content. To increase space on the left, you can [disable the left sidebar](https://stackoverflow.com/users/preferences/) and/or install [Right Content](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/tree/master/Right-Content).

You'll still have to manually open the pop-up interface in order to VTC with a custom reason, or to vote for migration.

If you wish (or don't wish) to downvote while voting to close, you can bring up the settings to do so automatically by hovering over the userscript interface for a few seconds.

If downvoting is enabled, voting to close through the userscript interface will also cast a downvote when:

1. You haven't already voted (+ or -) on the post, AND

2. You click on the close reason text (yellow background), rather than on the button to the right of it
 
If downvoting is enabled, but you click the "OK" button to the right of the close reason text, no downvote will be cast while voting to close the question. (This is useful for borderline cases, or for when the question isn't bad, but isn't answerable in its current state.)
