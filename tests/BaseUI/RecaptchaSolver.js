const dbc = require('../libs/DeathByCaptcha/deathbycaptcha');
require('dotenv').config();

class RecaptchaSolver {
    constructor(browser) {
        this.browser = browser;
        console.log(process.env.DEATH_BY_CAPTCHA_USERNAME);
    }

    getTokenParams() {
        return JSON.stringify({
            'proxy': '',
            'proxytype': '',
            'googlekey': process.env.RECAPTCHA_SITE_KEY,
            'pageurl': process.env.RECAPTCHA_PAGE_URL
        });
    }

    getClient() {
        return new dbc.HttpClient(process.env.DEATH_BY_CAPTCHA_USERNAME, process.env.DEATH_BY_CAPTCHA_PASSWORD);
    }

    async solve() {
        const token = await new Promise(resolve => {
            // Get user balance
            const client = this.getClient();
            client.get_balance((balance) => {
                console.log(balance);
            });
            client.decode({extra: {type: 4, token_params: this.getTokenParams()}}, async (captcha) => {
                if (captcha) {
                    return resolve(captcha['text']);
                }else {
                    return resolve(false);
                }
            });
        });
        console.log('----token---->', token);
        await this.browser.executeJavaScript(`document.getElementById("g-recaptcha-response").innerHTML="${token}"`, null)
    }
}

module.exports = RecaptchaSolver;
