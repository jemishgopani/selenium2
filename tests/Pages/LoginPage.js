const BasePage = require('./BasePage')
const SelectorType = require('./../BaseUI/SelectorType')
const TextInput = require('./../BaseUI/Components/TextInput')
const Button = require('./../BaseUI/Components/Button')

class LoginPage extends BasePage{
    constructor(browser) {
        super(browser);
        this.url = browser.getBaseUrl() + "/admin";
    }

    getEmailTextField(){
        return new TextInput(this.browser, SelectorType.CSS, "#account_email");
    }

    getNextButton(){
        return new Button(this.browser, SelectorType.CSS, "[name='commit']");
    }

    getPasswordTextField(){
        return new TextInput(this.browser, SelectorType.CSS, "#account_password");
    }

    getBaseUrl(){
        return this.url;
    }
    async fillLoginForm(username, password){
        await this.getEmailTextField().setText(username)
        await this.browser.delay(2000)
        await this.getNextButton().click()
        await this.browser.delay(2000)
        await this.getPasswordTextField().setText(password)
        await this.browser.delay(2000)
        await this.getNextButton().click()
        await this.browser.delay(2000)
    }
}

module.exports = LoginPage;