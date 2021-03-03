# Vote From Review

**This userscript is obsolete due to [UI changes](https://meta.stackexchange.com/q/360198) that have added vote buttons to the review queues.**

In some review queues, you may sometimes encounter posts that are of poor quality, but do not qualify for removal via review. For example, you might run into a code-only answer that looks like it *might* be an attempt to answer the question, but doesn't explain anything about how it actually solves the problem. If you don't know how to edit it into shape, [the proper thing to do](https://meta.stackoverflow.com/a/262696/) is to downvote it and press Looks OK. But (for most queues) there is no voting interface in review, so you have to manually exit the queue to do the right thing.

Similarly, you may find a post that looks *useful and interesting* that you'd like to upvote, but the review interface does not include such an option, so you again have to exit the queue to vote on it.

This is tedious. So, this userscript creates voting buttons for posts being reviewed, in the following queues:

* Close Votes
* Reopen Votes
* Low Quality Posts
* Triage
* Help and Improvement

![screenshot](https://raw.githubusercontent.com/CertainPerformance/Stack-Exchange-Userscripts/master/Vote-From-Review/userscript-screenshot.png)

The userscript uses the Stack Exchange API to check to see if you've already voted on a post, so that the appropriate vote arrow is colored when a new review task comes up. Checking whether you've voted on a post requires you to authorize the application to access your private information, so you'll see a warning about this when the script redirects you to https://stackoverflow.com/oauth the first time you run it.
