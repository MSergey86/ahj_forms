import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('show Popover', () => {
  let browser;
  let page;
  let server;
  const baseUrl = 'http://localhost:8080';

  beforeAll(async () => {
    server = fork('./src/e2e.server.js');
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('Open page', async () => {
    await page.goto(baseUrl);
  });

  test('Popover', async () => {
    await page.goto(baseUrl);
    const button = await page.$('button');
    await page.waitForSelector('.hidden');
    await button.click();
    const popoverClassName = await page.evaluate(() => document.getElementsByClassName('popover')[0].className);
    await expect(popoverClassName).toBe('popover');
    await button.click();
    await page.waitForSelector('.hidden');
  });
});
