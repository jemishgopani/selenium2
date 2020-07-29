class TextView {
    constructor(browser, selectorType, locator) {
        this.browser = browser;
        this.selectorType = selectorType;
        this.locator = locator;
    }

    async getText() {
        try {
            return await this.browser.getText(this.selectorType, this.locator);
        } catch (error) {
            return await this.browser.issueError(error);
        }
    }
}

module.exports = TextView;