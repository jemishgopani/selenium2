const ProcessUtil = require('./../BaseUI/ProcessUtil');

class BasePage {
    constructor(browser) {
        if (this.constructor == BasePage) {
            throw new Error("Abstract class can not be instantiated!");
        }
        this.url = "";
        this.browser = browser;
    }

    getPageName() {
        return this.constructor.name;
    }


    async goTo() {
        try {
            await this.browser.navigate(this.url);
        } catch (error) {
            await ProcessUtil.errorToPromiseError(`Page: '${this.getPageName()}' tried to go to url: ${this.url}`);
        }
    }

}

module.exports = BasePage;