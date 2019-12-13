# One Click VTC (&#8202;[install](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/One-Click-VTC/StackOneClickVTC.user.js)&#8202;)

If you vote to close (VTC) on Stack Overflow a lot, you can use this userscript to choose a close reason immediately (and downvote too, if you want) in a single click, rather than have to navigate through the pop-up interface first (which can be tedious if done tens of times every day).

This is intended for those with reasonably wide screens. The VTC reasons are put in a container to the left of the main page content; you may also wish to [disable the left sidebar](https://stackoverflow.com/users/preferences/) to free up space.

You'll still have to open the pop-up interface in order to VTC as duplicate or with a custom reason.

You may set the `downvoteWhenVotingToClose` variable in the script to `true` or `false`. If set to `false`, no downvoting will occur. If set to `true`, voting to close with the userscript interface will also cast a downvote when:

1. You haven't already voted (+ or -) on the post, AND

2. You click on the close reason text (yellow background), rather than on the button to the right of it
 
If set to `true`, but you click the button to the right of the close reason text, no downvote will be cast while voting to close the question. (This is useful for borderline cases, or for when the question isn't bad, but isn't answerable in its current state.)

![screenshot](https://raw.githubusercontent.com/CertainPerformance/Stack-Exchange-Userscripts/master/One-Click-VTC/userscript-screenshot.png)
