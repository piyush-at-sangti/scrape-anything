const puppeteer = require('puppeteer-extra')

console.log(`Current working directory: ${process.cwd()}`);

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// puppeteer usage as normal
puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary',
    userDataDir: '/Users/piyushchauhan/Library/Application\ Support/Google/Chrome\ Canary/Default',
    dumpio: true, // Enable verbose logging
    ignoreDefaultArgs: ['--disable-extensions'],
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled'],
    ignoreHTTPSErrors: true,
}).then(async browser => {
    console.log('Running tests..')
    const page = await browser.newPage()
    // await page.evaluateOnNewDocument(() => {
    //     Object.defineProperty(navigator, 'webdriver', {
    //         get: () => undefined,
    //     });
    // });

    await page.goto('https://www.google.com')
    await page.waitForTimeout(5000)
    await page.screenshot({ path: 'testresult.png', fullPage: true })
    await page.waitForTimeout(5000)
    await browser.close()
    console.log(`All done, check the screenshot. ✨`)
})