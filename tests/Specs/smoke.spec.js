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

        const actualLggedOutConfirmationMessage = await pages.homePage.getLoggedOutConfirmationMessage();
        expect(actualLggedOutConfirmationMessage).to.equal(expectedLoggedOutConfirmationMessage);
    })

    after(function () {
        this.browser.close();
    });
})