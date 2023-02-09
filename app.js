require("dotenv").config();
const slack = require('./slack/slack');
const { chromium } = require('playwright');


(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(process.env.URL);

    let h = new Date().getHours();
    let commentArr = [];
    for (const commentList of await page.locator('#recentComments').getByRole('listitem').all()) {

        const content = await commentList.getByRole('link').textContent();
        const titleText = await commentList.getByRole('link').getAttribute('title');
        const titleDate = titleText.split("〃")[1]
        let commentDate = titleDate.split(":");

        if (commentDate.length > 1) {
            if (commentDate[0] >= h && commentDate[0] < h + 1) {
                let comment = {
                    "date": titleDate,
                    "content": content
                };
                commentArr.push(comment);
            } else {
                break;
            }
        } else {
            break;
        }
    }
    console.log(commentArr)
    console.log(process.env.URL)
    console.log(process.env.WEBHOOK_URI)
    console.log(process.env.CHANNEL)
    console.log(process.env.USER_NAME)
    if (commentArr.length > 0)
        await slack.sendSlack(commentArr)

    await browser.close();
})();
