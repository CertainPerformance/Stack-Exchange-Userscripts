export const getPostId = () => {
    const { href, title } = document.querySelector('[title="view answer"], [title="view question"]') as HTMLAnchorElement;
    const postId = Number(href.match(
        title === 'view answer'
            ? /\d+$/ // eg https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call/14220323#14220323
                     //                                                                                                                 ^^^^^^^^
            : /\d+/, // eg https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
                     //                                        ^^^^^^^^
    )![0]);
    return postId;
};
