const BasePage = require('./BasePage')
const SelectorType = require('./../BaseUI/SelectorType')
const Button = require('./../BaseUI/Components/Button')
const TextView = require('./../BaseUI/Components/TextView')
const TextInput = require('./../BaseUI/Components/TextInput')

class HomePage extends BasePage{
    constructor(browser) {
        super(browser);
        this.url = browser.getBaseUrl() + "/admin";
    }

    getSearchInputField(){
        return new TextInput(this.browser, SelectorType.CSS, "#PolarisSearchField1");
    }

    getMenuButton(){
        return new Button(this.browser, SelectorType.CSS, "[aria-controls='Polarispopover1']");
    }

    getLogOutButton(){
        return new Button(this.browser, SelectorType.XPATH, "//div[text()='Log out']");
    }

    getSuccessfullyLoggedOutTextView(){
        return new TextView(this.browser, SelectorType.CSS, ".logout-hero__heading");
    }

    getBaseUrl(){
        return this.url;
    }

    async verifyHomePageIsDisplayed(){
        await this.getSearchInputField().verifyInputFieldIsDisplayed();
        await this.browser.delay(2000);
    }

    async doLogout(){
        await this.getMenuButton().click();
        await this.getLogOutButton().click();
        await this.browser.delay(2000);
    }

    async getLoggedOutConfirmationMessage(){
        return await this.getSuccessfullyLoggedOutTextView().getText();
    }
}

module.exports = HomePage;