const Slack = require('slack-node');


module.exports = {

    sendSlack: function (text) {

        const slack = new Slack();
        slack.setWebhook(process.env.WEBHOOK_URI);

        slack.webhook({
            channel: '#' + process.env.CHANNEL,
            username: process.env.USER_NAME,
            text: JSON.stringify(text)
        }, function (err, response) {

        });
    }
}
