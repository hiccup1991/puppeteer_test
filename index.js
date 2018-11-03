/**
 * ================================================Example - navigating to https://example.com and saving a screenshot as example.png====================
 */
// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://example.com');
//   await page.screenshot({path: 'example.png'});

//   await browser.close();
// })();

// Example - create a PDF.
// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
//   await page.pdf({path: 'hn.pdf', format: 'A4'});

//   await browser.close();
// })();

/**
 * ================================================Example - evaluate script in the context of the page==================================================
 */
// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://example.com');

//   // Get the "viewport" of the page, as reported by the page.
//   const dimensions = await page.evaluate(() => {
//     return {
//       width: document.documentElement.clientWidth,
//       height: document.documentElement.clientHeight,
//       deviceScaleFactor: window.devicePixelRatio
//     };
//   });

//   console.log('Dimensions:', dimensions);

//   await browser.close();
// })();

/**
 * ================================================Example - print the user agent========================================================================
 */
// const puppeteer = require('puppeteer');

// (async() => {
//   const browser = await puppeteer.launch();
//   console.log(await browser.version());
//   await browser.close();
// })();

/**
 * ===============================================Example - using chrome-launcher to launch Headless=====================================================
 */
// const chromeLauncher = require('chrome-launcher');

// // Optional: set logging level of launcher to see its output.
// // Install it using: npm i --save lighthouse-logger
// // const log = require('lighthouse-logger');
// // log.setLevel('info');

// /**
//  * Launches a debugging instance of Chrome.
//  * @param {boolean=} headless True (default) launches Chrome in headless mode.
//  *     False launches a full version of Chrome.
//  * @return {Promise<ChromeLauncher>}
//  */
// function launchChrome(headless=true) {
//   return chromeLauncher.launch({
//     // port: 9222, // Uncomment to force a specific port of your choice.
//     chromeFlags: [
//       '--window-size=412,732',
//       '--disable-gpu',
//       headless ? '--headless' : ''
//     ]
//   });
// }

// launchChrome().then(chrome => {
//   console.log(`Chrome debuggable on port: ${chrome.port}`);
//   // chrome.kill();
// });

/**
 * ==================================================Example - print the user agent======================================================================
 */
// const chromeLauncher = require('chrome-launcher');
// const CDP = require('chrome-remote-interface');

// // Optional: set logging level of launcher to see its output.
// // Install it using: npm i --save lighthouse-logger
// // const log = require('lighthouse-logger');
// // log.setLevel('info');

// /**
//  * Launches a debugging instance of Chrome.
//  * @param {boolean=} headless True (default) launches Chrome in headless mode.
//  *     False launches a full version of Chrome.
//  * @return {Promise<ChromeLauncher>}
//  */
// function launchChrome(headless=true) {
//   return chromeLauncher.launch({
//     // port: 9222, // Uncomment to force a specific port of your choice.
//     chromeFlags: [
//       '--window-size=412,732',
//       '--disable-gpu',
//       headless ? '--headless' : ''
//     ]
//   });
// }

// launchChrome().then(async chrome => {
//   const version = await CDP.Version({port: chrome.port});
//   console.log(version['User-Agent']);
// });

/**
 * ==================================================Example - check if the site has a web app manifest==================================================
 */
// const chromeLauncher = require('chrome-launcher');
// const CDP = require('chrome-remote-interface');

// // Optional: set logging level of launcher to see its output.
// // Install it using: npm i --save lighthouse-logger
// // const log = require('lighthouse-logger');
// // log.setLevel('info');

// /**
//  * Launches a debugging instance of Chrome.
//  * @param {boolean=} headless True (default) launches Chrome in headless mode.
//  *     False launches a full version of Chrome.
//  * @return {Promise<ChromeLauncher>}
//  */
// function launchChrome(headless=true) {
//   return chromeLauncher.launch({
//     // port: 9222, // Uncomment to force a specific port of your choice.
//     chromeFlags: [
//       '--window-size=412,732',
//       '--disable-gpu',
//       headless ? '--headless' : ''
//     ]
//   });
// }
// (async function() {

//   const chrome = await launchChrome();
//   const protocol = await CDP({port: chrome.port});

//   // Extract the DevTools protocol domains we need and enable them.
//   // See API docs: https://chromedevtools.github.io/devtools-protocol/
//   const {Page} = protocol;
//   await Page.enable();

//   Page.navigate({url: 'https://www.chromestatus.com/'});

//   // Wait for window.onload before doing stuff.
//   Page.loadEventFired(async () => {
//     const manifest = await Page.getAppManifest();

//     if (manifest.url) {
//       console.log('Manifest: ' + manifest.url);
//       console.log(manifest.data);
//     } else {
//       console.log('Site has no app manifest');
//     }

//     protocol.close();
//     chrome.kill(); // Kill Chrome.
//   });
// })();

/**
 * ==================================================Example - extract the <title> of the page using DOM APIs============================================
 */
// const chromeLauncher = require('chrome-launcher');
// const CDP = require('chrome-remote-interface');

// // Optional: set logging level of launcher to see its output.
// // Install it using: npm i --save lighthouse-logger
// // const log = require('lighthouse-logger');
// // log.setLevel('info');

// /**
//  * Launches a debugging instance of Chrome.
//  * @param {boolean=} headless True (default) launches Chrome in headless mode.
//  *     False launches a full version of Chrome.
//  * @return {Promise<ChromeLauncher>}
//  */
// function launchChrome(headless=true) {
//   return chromeLauncher.launch({
//     // port: 9222, // Uncomment to force a specific port of your choice.
//     chromeFlags: [
//       '--window-size=412,732',
//       '--disable-gpu',
//       headless ? '--headless' : ''
//     ]
//   });
// }
// (async function() {

//   const chrome = await launchChrome();
//   const protocol = await CDP({port: chrome.port});
  
//   // Extract the DevTools protocol domains we need and enable them.
//   // See API docs: https://chromedevtools.github.io/devtools-protocol/
//   const {Page, Runtime} = protocol;
//   await Promise.all([Page.enable(), Runtime.enable()]);
  
//   Page.navigate({url: 'https://www.chromestatus.com/'});
  
//   // Wait for window.onload before doing stuff.
//   Page.loadEventFired(async () => {
//     const js = "document.querySelector('title').textContent";
//     // Evaluate the JS expression in the page.
//     const result = await Runtime.evaluate({expression: js});
  
//     console.log('Title of page: ' + result.result.value);
  
//     protocol.close();
//     chrome.kill(); // Kill Chrome.
//   });
// })();

/**
 * ==================================================Example - using ChromeDriver========================================================================
 */
// const fs = require('fs');
// const webdriver = require('selenium-webdriver');
// const chromedriver = require('chromedriver');

// const chromeCapabilities = webdriver.Capabilities.chrome();
// chromeCapabilities.set('chromeOptions', {args: ['--headless']});

// const driver = new webdriver.Builder()
//   .forBrowser('chrome')
//   .withCapabilities(chromeCapabilities)
//   .build();

// // Navigate to google.com, enter a search.
// driver.get('https://www.google.com/');
// driver.findElement({name: 'q'}).sendKeys('webdriver');
// driver.findElement({name: 'btnG'}).click();
// driver.wait(webdriver.until.titleIs('webdriver - Google Search'), 1000);

// // Take screenshot of results page. Save to disk.
// driver.takeScreenshot().then(base64png => {
//   fs.writeFileSync('screenshot.png', Buffer.from(base64png, 'base64'));
// });

// driver.quit();

/**
 * ==================================================Example - using WebDriverIO========================================================================
 */
// const webdriverio = require('webdriverio');
// const chromedriver = require('chromedriver');

// const PORT = 9515;

// chromedriver.start([
//   '--url-base=wd/hub',
//   `--port=${PORT}`,
//   '--verbose'
// ]);

// (async () => {

// const opts = {
//   port: PORT,
//   desiredCapabilities: {
//     browserName: 'chrome',
//     chromeOptions: {args: ['--headless']}
//   }
// };

// const browser = webdriverio.remote(opts).init();

// await browser.url('https://www.chromestatus.com/features');

// const title = await browser.getTitle();
// console.log(`Title: ${title}`);

// await browser.waitForText('.num-features', 3000);
// let numFeatures = await browser.getText('.num-features');
// console.log(`Chrome has ${numFeatures} total features`);

// await browser.setValue('input[type="search"]', 'CSS');
// console.log('Filtering features...');
// await browser.pause(1000);

// numFeatures = await browser.getText('.num-features');
// console.log(`Chrome has ${numFeatures} CSS features`);

// const buffer = await browser.saveScreenshot('screenshot.png');
// console.log('Saved screenshot...');

// chromedriver.stop();
// browser.end();

// })();