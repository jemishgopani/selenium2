require('chromedriver');
const Browser = require("./Browser");
const ConfigFactory = require("./ConfigFactory");
const ProcessUtil = require("./ProcessUtil");
const Chrome = require("selenium-webdriver/chrome");
const { Builder } = require("selenium-webdriver");

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
            case "chromeheadless":
                return await this.CreateChromeHeadlessDriver();
            default:
                const message =
                    "User has not selected any browser to run automation tests upon!";
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
        await driver.manage().window().maximize();

        return driver;
    }

    static async CreateChromeHeadlessDriver() {
        console.log("Creating headless chrome driver...");
        const options = new Chrome.Options();
        options.addArguments("--test-type");
        options.addArguments("--incognito");
        options.addArguments("--headless");
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");

        // //Override the normal headless user agent string
        // options.addArguments(
        //     "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36"
        // );

        const driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();

        //Maximize the window
        await driver.manage().window().maximize();

        return driver;
    }
}

module.exports = BrowserFactory;
