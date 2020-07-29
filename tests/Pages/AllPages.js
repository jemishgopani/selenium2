const LoginPage = require("./LoginPage");
const HomePage = require("./HomePage");

class AllPages{
    constructor(browser) {
        this.loginPage = new LoginPage(browser);
        this.homePage = new HomePage(browser);
    }

}

module.exports = AllPages;