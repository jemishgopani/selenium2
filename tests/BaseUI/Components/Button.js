class Button {
    constructor(browser, selectorType, locator) {
        this.browser = browser;
        this.selectorType = selectorType;
        this.locator = locator;
    }

    async click() {
        try {
            await this.browser.click(this.selectorType, this.locator);
        } catch (error) {
            await this.browser.clickJS(this.selectorType, this.locator);
            await this.browser.IssueError(error, `Couldn't able to click on the button`, error.message);
        }
    }
}

module.exports = Button;