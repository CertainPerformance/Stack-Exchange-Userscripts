# Comment History Checker (&#8202;[install](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/Comment-History-Checker/dist/StackCommentHistoryChecker.user.js)&#8202;)

Saves all comments you post into a local database. When you want to review them, go to your profile's Activity tab ([example](https://stackoverflow.com/users/9515207/certainperformance?tab=activity)) and click on the **Comments** subtab. Comments that are no longer visible (and would not be shown on the page by default) will be inserted into the table, and data taken from the Stack Exchange API will be put into every comment row:

![screenshot](https://raw.githubusercontent.com/CertainPerformance/Stack-Exchange-Userscripts/master/Comment-History-Checker/userscript-screenshot.png)

Info added to each row:

* Score and accept status of the question
* Score and accept status of:
  * The answer the comment was made on, if the comment was made on an answer
  * Else, the top answer
* Number of additional answers
* Opacity indicating whether the comment was made on a question or an answer
* Comment score (if greater than 0)
* Comment deletion cause, if deleted: one of
  * The post the comment was made on was deleted
  * You deleted the comment
  * System removed your "Possible duplicate of" comment due to question being closed as a duplicate
  * A ♦ moderator deleted the comment, or the system deleted the comment in response to a flag

The same data will be displayed on other users' profiles, but only comments *you* make are saved in the database, so deleted comments won't be shown.

Script is active on all Stack Exchange sites, including meta sites.

## Why check comment history?

Comment score is an interesting, useful indicator of how much those who saw it agree, but is ordinarily only visible if you manually visit the page with the comment, which is tedious.

If you found the question interesting enough to make a comment on it, this lets you see at a glance if it's been solved

If you couldn't answer, or someone else's answer was received better, you can check it out to see what a better solution would be

Answer scores are occasionally surprising, and one should avoid posting answers in the comments. If a question isn't close-worthy, is answerable, but you only commented, you can see how well answers fared at a glance.

By default, when a moderator deletes someone's comment, they are not notified (nor can they even when comments are deleted on the activity page), which means they have no opportunity to notice that they did something wrong, let alone try to improve in the future. This script remedies that by drawing one's attention to removed comments and the cause of their deletion. (Note that deleted comments are not *necessarily* a problem - they may just have been "No longer needed", such as a request for clarification that was dealt with.)
