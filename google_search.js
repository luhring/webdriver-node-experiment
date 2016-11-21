// configuration
const _seleniumBrowser = "chrome";
const _seleniumRemoteHost = "selenium";
const _seleniumRemotePort = 4444
const _seleniumRemoteServerUri = "http://" + _seleniumRemoteHost + ":" + _seleniumRemotePort + "/wd/hub";

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser(_seleniumBrowser)
    .usingServer(_seleniumRemoteServerUri)
    .build();

driver.get('http://www.google.com/ncr');
driver.findElement(By.name('q')).sendKeys('webdriver');
driver.findElement(By.name('btnG')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 1000);

driver.takeScreenshot().then(
    function(image, err) {
        require('fs').writeFile('screenshot.png', image, 'base64', function(err) {
            console.log(err);
        });
    }
);

driver.quit();
