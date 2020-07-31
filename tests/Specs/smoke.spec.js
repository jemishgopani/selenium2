const AllPages = require('./../Pages/AllPages')
const BrowserFactory = require('./../BaseUI/BrowserFactory')
const { expect } = require('chai')

describe("Smoke tests:", function () {
    before(async function () {
        this.browser = await BrowserFactory.createBrowser(this);
        pages = new AllPages(this.browser);
    })

    it("Verify valid user should able to login and logout", async function () {
        const [email, password] = this.browser.getShopifyPartnerCredentials();
        const expectedLoggedOutConfirmationMessage = "You have successfully logged out";

        await pages.loginPage.goTo();
        await pages.loginPage.fillLoginForm(email, password);
        await pages.homePage.verifyHomePageIsDisplayed();
        await pages.homePage.doLogout();

        const actualLoggedOutConfirmationMessage = await pages.homePage.getLoggedOutConfirmationMessage();
        expect(actualLoggedOutConfirmationMessage).to.equal(expectedLoggedOutConfirmationMessage);
    })

    afterEach(function() {
        if (this.currentTest.state !== "passed") {
            const imageFileName = this.currentTest.title+'.jpeg';
            this.browser.captureScreenshot(imageFileName);
        }
    });

    after(async function () {
        console.log("----------PAGE SOURCE----------");
        console.log(await this.browser.getPageSource());
        await this.browser.close();
    });
})