import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

const url = 'https://www.linkedin.com/feed/';
const timeout = 5000;

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/Applications/Arc.app/Contents/MacOS/Arc',
        userDataDir: '/Users/piyushchauhan/Library/Application Support/Arc/User\ Data',
    });

    const page = await browser.newPage();

    await page.setViewport({
        width: 1200,
        height: 1200,
        deviceScaleFactor: 1,
    });

    await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: timeout,
    });

    await page.waitForTimeout(timeout);

    await page.screenshot({
        path: "screenshot.jpg",
        fullPage: true,
    });

    // await browser.close();
})();