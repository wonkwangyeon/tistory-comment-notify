require("dotenv").config();
const slack = require('./slack/slack');
const { chromium } = require('playwright');


(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(process.env.URL);

    let h = new Date().getHours();
    if (process.env.NODE_ENV == "production") {
        h = h + 9;
        if (h >= 24)
            h = h - 24;
    }
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

    if (commentArr.length > 0)
        await slack.sendSlack(commentArr)

    await browser.close();
})();
