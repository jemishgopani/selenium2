const fs = require("fs");
const FileUtil = require("./FileUtil");
const ConfigFactory = require("./ConfigFactory");
const SelectorType = require("./SelectorType");
const ProcessUtil = require("./ProcessUtil");
const MochaUtil = require("./MochaUtil");
const { WebDriver, until, By, WebElement, Key } = require("selenium-webdriver");


class Browser {
    mainWindowHandler = "";

    //Constructor
    constructor(mochaContext, driver) {
        this.testConfig = ConfigFactory.getConfig();
        this.mochaContext = mochaContext;
        this.driver = driver;
    }

    /**
     * Get the Base URL.
     */
    getBaseUrl() {
        return this.testConfig.baseUrl;
    }

    /**
     * Navigate to URL.
     * @param url The URL of destination.
     */
    async navigate(url) {
        console.log("Navigating to: " + url);
        await this.driver.navigate().to(url);
        this.clearMainWindowHandler();
    }

    clearMainWindowHandler() {
        this.mainWindowHandler = "";
    }

    /**
     * Close the browser.
     */
    async close() {
        await this.driver.quit();
    }

    //-------------CONFIGURATION VALUES--------------//
    //-----------------------------------------------//
    //-----------------------------------------------//

    getShopifyPartnerCredentials(){
        return [this.testConfig.shopifyPartnerEmail, this.testConfig.shopifyPartnerPassword];
    }

    //------------DRIVER RELATED METHODS-------------//
    //-----------------------------------------------//
    //-----------------------------------------------//


    //-----------------FIND ELEMENT------------------//
    async findBySelectorType(selectorType, locator, timeout) {
        if (selectorType == SelectorType.CSS) {
            if (timeout) return await this.findByCss(locator, timeout);
            else return await this.findByCss(locator);
        } else {
            if (timeout) return await this.findByXPath(locator, timeout);
            return await this.findByXPath(locator);
        }
    }

    async findByCss(cssPath, timeout) {
        console.info("waitForCssPath: " + cssPath);
        const optTimeout = timeout || this.testConfig.defaultElementTimeout;
        await this.driver.wait(until.elementLocated(By.css(cssPath)), optTimeout);
        const element = await this.driver.findElement(By.css(cssPath));
        return element;
    }

    async findByXPath(xPath, timeout) {
        console.info("waitForXPath: " + xPath);
        const optTimeout = timeout || this.testConfig.defaultElementTimeout;
        await this.driver.wait(until.elementLocated(By.xpath(xPath)), optTimeout);
        const element = await this.driver.findElement(By.xpath(xPath));
        return element;
    }

    //----------------WAIT FUNCTIONS-----------------//
    delay(timeInMillis) {
        console.log("delay: " + timeInMillis + " milliseconds");
        return new Promise(function (resolve) {
            setTimeout(resolve, timeInMillis);
        });
    }

    async elementExists(selectorType, locator) {
        if (selectorType === SelectorType.CSS) {
            return (await this.driver.findElements(By.css(locator))).length > 0;
        } else {
            return (await this.driver.findElements(By.xpath(locator))).length > 0;
        }
    }

    async waitUntilElementEnabled(element) {
        console.info("WaitUntilElementEnabled");
        await this.driver.wait(until.elementIsVisible(element), this.testConfig.defaultElementTimeout);
        await this.driver.wait(until.elementIsEnabled(element), this.testConfig.defaultElementTimeout);
        console.info(`Element: '${await element.getText()}' is enabled!`);
    }

    async waitUntilEnabled(selectorType, locator) {
        const element = await this.findBySelectorType(selectorType, locator);
        await this.waitUntilElementEnabled(element);
    }


    //----------------SCROLL FUNCTIONS-----------------//
    async scrollToTopOfPage() {
        console.info("ScrollToTopOfPage");
        const javaScript = "window.scrollTo(0, 0)";
        await this.executeJavaScript(javaScript, null);
        await this.delay(700);
    }

    async scrollToBottomOfPage() {
        console.info("ScrollToBottomOfPage");
        const javaScript = "window.scrollTo(0, document.body.scrollHeight)";
        await this.executeJavaScript(javaScript, null);
        await this.delay(700);
    }

    async scrollElementIntoView(element) {
        console.info("ScrollElementIntoView");
        const javaScript = "arguments[0].scrollIntoView(true);";
        await this.executeJavaScript(javaScript, element);
        await this.delay(700);
    }

    async scrollIntoView(selectorType, locator) {
        console.info("ScrollIntoView");
        const element = await this.findBySelectorType(selectorType, locator);
        const javaScript = "arguments[0].scrollIntoView(true);";
        await this.ExecuteJavaScript(javaScript, element);
        await this.delay(700);
    }

    //--------------TEXTFIELD FUNCTIONS---------------//
    async clear(element) {
        const tagName = (await element.getTagName()).toLowerCase();

        if (tagName === "input" || tagName === "textarea") {
            await element.clear();
        } else {
            await element.sendKeys("{CTRL}a{CTRL}");
            await element.sendKeys("\b");
        }
    }

    async sendKeys(selectorType, locator, text) {
        const element = await this.findBySelectorType(selectorType, locator);
        await this.waitUntilElementEnabled(element);
        console.info("sendKeys: " + text);
        await element.sendKeys(text);
        console.info("sendKeys performed successfully!");
    }

    async getText(selectorType, locator) {
        const element = await this.findBySelectorType(selectorType, locator);
        const result = await element.getText();
        console.info(`GetText: ${result}`);
        return result;
    }
    //--------------BUTTON FUNCTIONS---------------//
    async click(selectorType, locator) {
        const element = await this.findBySelectorType(selectorType, locator);
        await this.waitUntilElementEnabled(element);
        await element.click();
        console.info("Click() happened");
    }

    // Click, using element.click(), does not work in certain cases.
    async clickJS(selectorType, locator) {
        const element = await this.findBySelectorType(selectorType, locator);
        await this.waitUntilElementEnabled(element);

        console.info("Clicking on element via JS");
        await this.ExecuteJavaScript("arguments[0].click();", element);
        console.info("clickJS() happened");
    }

    //--------------SCREENSHOT CAPTURING--------------//
    async captureScreenshot(imageName){
        const screenshotDirectory = FileUtil.pathCombine(FileUtil.getCurrentDirectory(), "mochawesome-report", "screenshots");
        FileUtil.createDirectory(screenshotDirectory);
        const filePath = FileUtil.pathCombine(screenshotDirectory,  imageName);

        this.driver.takeScreenshot().then(function(data) {
            console.info("Capturing screenshot...");
            fs.writeFileSync(filePath, data, "base64");
        });
    }


    //----------------MISC. FUNCTIONS-----------------//
    async executeJavaScript(javaScript, args) {
        await this.driver.executeScript(javaScript, args);
        await this.delay(300);
    }

    async issueError(error) {
        await ProcessUtil.errorToPromiseError(error);
    }

    async getPageSource() {
        return await this.driver.getPageSource();
    }
}

module.exports = Browser
