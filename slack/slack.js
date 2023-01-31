const Slack = require('slack-node');
const config = require('../config/config.json')['slack']

module.exports = {

    sendSlack: function (text) {
        
        const slack = new Slack();
        slack.setWebhook(config.webhookUri);

        slack.webhook({
            channel: config.channel,
            username: config.userName,
            text: JSON.stringify(text)	//텍스트
        }, function (err, response) {
            console.log(response);
        });
    }
}
