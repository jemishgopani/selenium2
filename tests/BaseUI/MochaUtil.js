class MochaUtil {
    static getCurrentTestState(mochaContext) {
        if (mochaContext.currentTest !== undefined && mochaContext.currentTest.state) {
            return mochaContext.currentTest.state.toString();
        }

        if (mochaContext.test !== undefined && mochaContext.test.state) {
            return mochaContext.test.state.toString();
        }

        throw new Error("GetCurrentTestState no current test");
    }

    static getCurrentTestFullTitle(mochaContext) {
        if (mochaContext.currentTest !== undefined) {
            return mochaContext.currentTest.fullTitle();
        }

        if (mochaContext.test !== undefined) {
            return mochaContext.test.fullTitle();
        }
        throw new Error("GetCurrentTestFullTitle no current test");
    }

    static getCurrentTestSuite(mochaContext) {
        if (mochaContext.currentTest !== undefined && mochaContext.currentTest.parent !== undefined) {
            return mochaContext.currentTest.parent.title;
        }

        if (mochaContext.test !== undefined && mochaContext.test.parent !== undefined) {
            return mochaContext.test.parent.title;
        }
        return "UnknownDescribe";
    }
}

module.exports = MochaUtil;