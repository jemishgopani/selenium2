const Browser = require("./Browser");
const ConfigFactory = require("./ConfigFactory");
const ProcessUtil = require("./ProcessUtil");
const Chrome = require("selenium-webdriver/chrome");
const { Builder } = require('selenium-webdriver');



class BrowserFactory {
    static async createBrowser(mochaContext) {
        try {
            const config = await ConfigFactory.getConfig();
            console.log(`Test: ${mochaContext.test.title} is being executed.`);

            const driver = await this.createDriverFromBrowserType(config.browser);
            let browser = await new Browser(mochaContext, driver);
            return await browser;
        } catch (error) {
            await ProcessUtil.errorToPromiseError(error);
            throw error;
        }
    }

    static async createDriverFromBrowserType(browserType) {
        console.log(`Create Driver from given browser: ${browserType}`);

        switch (browserType) {
            case "chrome":
                return await this.createChromeDriver();
            default:
                const message = "User has not selected any browser to run automation tests upon!";
                console.log(message);
                await ProcessUtil.returnPromiseError(message);
                throw new Error(message);
        }
    }

    static async createChromeDriver() {
        console.log("Creating chrome driver...");
        const options = new Chrome.Options();
        options.addArguments("--test-type");

        const driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();

        //Maximize the window
        await driver
            .manage()
            .window()
            .maximize();

        return driver;
    }
}

module.exports = BrowserFactory