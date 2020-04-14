# Speak New Questions (&#8202;[install](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/Speak-New-Questions/dist/StackSpeakNewQuestions.user.js)&#8202;)

When on a Newest tab, this userscript loads new questions automatically and speaks their titles aloud using the browser's SpeechSynthesis API. This gives you the ability to immediately determine whether a new question sounds interesting enough to check out, without having to switch active windows (or even be actively using the computer at all).

The volume and speech rate is adjustable, and any voice that your browser's SpeechSynthesis supports may be used. In the dropdown, voices that are *not* [local](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice/localService) (that is, voices which require a network request to be used) are given a darker background, as an indication for users who may wish to avoid them due to privacy or bandwidth concerns.

When a question is being spoken or is in the queue to be spoken, its container will have a yellow background. To cancel speech for a question, move the mouse over the container.

So that speech can be canceled from individual question pages as well as from the Newest page, new queued questions will be displayed on question pages as well - just like above, moving the mouse over them will cancel their speech.

The new question container on individual question pages requires a bit of space. If you have a less-than-wide screen, consider [disabling the left sidebar](https://stackoverflow.com/users/preferences/) and/or installing [Stack Right Content](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/tree/master/Right-Content).

On question pages, new question containers will disappear a few seconds after all speech has finished *and* the mouse isn't in the container.

Clicking on a question link will give it a small border on the right, to indicate that you've visited it.

Speaking text through the SpeechSynthesis API is only permitted once the user has interacted with the document at least once. To remind you of this, every time you load a Newest tab, the page will be given a different background color, which will persist until you've clicked somewhere on the page, which counts as an interaction.

When browsing new questions, because one usually wants to keep the Newest tab open, all outgoing links are changed to `target="_blank"` so that left-clicks open in new tabs, rather than replacing the Newest page.

Speech volume is adjustable with a slider.

When on Stack Overflow, you can "Start Focusing" from the Newest page or a question page by pressing a button, which will temporarily pause all speech, allowing you to focus on something without interruptions. (This button is only on Stack Overflow because other sites have much less traffic.)

In addition, the word "Message" is spoken when a new inbox message appears.
