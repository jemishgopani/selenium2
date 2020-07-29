class TextInput  {
    constructor(browser, selectorType, locator) {
        this.browser = browser;
        this.selectorType = selectorType;
        this.locator = locator;
    }

    async verifyInputFieldIsDisplayed() {
        try {
            await this.browser.elementExists(this.selectorType, this.locator);
        } catch (error) {
            await this.browser.issueError(error);
        }
    }

    async setText(text) {
        try {
            await this.browser.sendKeys(this.selectorType, this.locator, text);
        } catch (error) {
            await this.browser.issueError(error);
        }
    }
}

module.exports = TextInput;