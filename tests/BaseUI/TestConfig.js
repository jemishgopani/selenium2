class TestConfig {
    //Constructor
    constructor() {
        this.baseUrl = "";
        this.defaultElementTimeout = 30000; //30 seconds
        this.defaultPageLoadTimeout = 60000; //60 seconds
        this.defaultTestTimeout = 300000; //5 Minutes
        this.browser = "chrome";
        this.shopifyPartnerEmail = "";
        this.shopifyPartnerPassword = "";
    }

    //Properties
    baseUrl;
    browser;
    defaultElementTimeout;
    defaultPageLoadTimeout;
    defaultTestTimeout;
    shopifyPartnerEmail;
    shopifyPartnerPassword;
}

module.exports = TestConfig;
