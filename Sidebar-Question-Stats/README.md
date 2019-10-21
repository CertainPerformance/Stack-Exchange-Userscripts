# Sidebar Question Stats (&#8202;[install](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/Sidebar-Question-Stats/StackSidebarQuestionStats.user.js)&#8202;)

The Stack Exchange UI now puts question stats (ask date, view count, and active date) under the question title. You [may find this distracting](https://meta.stackexchange.com/questions/331349/why-are-the-sidebar-stats-for-a-question-now-under-the-title), because the information is only occasionally useful, yet its current position results in it being the *second* thing you read on every page.

This userscript restores the question stats back to their prior position in the sidebar before the UI change, removing them from just below the title:

([screenshot](https://raw.githubusercontent.com/CertainPerformance/Stack-Exchange-Userscripts/master/Sidebar-Question-Stats/userscript-screenshot.png))

For compatibility with [Roomba Forecaster](https://github.com/makyen/StackExchange-userscripts/tree/master/Roomba-Forecaster) and with any other older userscripts that depended on the old location of question stats in the sidebar, make sure this userscript runs [before they do](https://www.mturkcrowd.com/threads/how-to-change-execution-order-of-userscripts-and-customize-excluded-pages.152/), so that the `#qinfo` table it creates can be found by the other userscripts.
