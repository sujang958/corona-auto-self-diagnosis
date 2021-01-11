const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://hcs.eduro.go.kr/#/loginHome');
        var a = await driver.takeScreenshot()
        console.log(a);
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } catch (e) {
        console.error(e);
    } finally {
        await driver.quit();
    }
})();