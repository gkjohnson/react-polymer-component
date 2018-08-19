/* global
    THREE URDFLoader
    jest
    describe it beforeAll afterAll beforeEach afterEach expect
*/
const puppeteer = require('puppeteer');
// const pti = require('puppeteer-to-istanbul');
const path = require('path');

let browser = null, page = null;
beforeAll(async() => {

    browser = await puppeteer.launch({
        headless: false,

        // --no-sandbox is required to run puppeteer in Travis.
        // https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-on-travis-ci
        args: ['--no-sandbox'],
    });
    page = await browser.newPage();

    await page.coverage.startJSCoverage();
    await page.goto(`file:${ path.join(__dirname, './build/test-setup.html') }`);
    await page.evaluate(() => window.testEl = document.querySelector('test-element'));

    page.on('error', e => { throw new Error(e); });
    page.on('pageerror', e => { throw new Error(e); });
    page.on('console', e => {

        if (e.type() === 'error') {

            throw new Error(e.text());

        }

    });

});

describe('Polymer Element in React Component', () => {

    beforeEach(async() => {

        await page.evaluate(() => window.fixture.resetState());

    });

    it('should initialize to the default values', async() => {

        expect(await page.evaluate(() => window.testEl.headerEl.innerText)).toEqual('header');

        expect(await page.evaluate(() => window.testEl.objectEl.childElementCount)).toEqual(2);
        expect(await page.evaluate(() => window.testEl.objectEl.children[0].innerText)).toEqual('1');
        expect(await page.evaluate(() => window.testEl.objectEl.children[1].innerText)).toEqual('2');

        const slottedChildrenCount = await page.evaluate(() => {

            const str = new XMLSerializer().serializeToString(window.testEl.childrenEl);
            const dom = new DOMParser().parseFromString(str, 'text/xml');
            return dom.querySelector('.children').childElementCount;

        });
        expect(slottedChildrenCount).toEqual(0);

        expect(await page.evaluate(() => window.testEl.listEl.querySelectorAll('li').length)).toEqual(0);

    });

    it('should respect state updates', async() => {

        await page.evaluate(() => window.fixture.setState(() => ({

            header: 'changed header',
            object: { a: 10, b: 20, c: 30 },
            items: [1, 2],
            childItems: [],

        })));

        expect(await page.evaluate(() => window.testEl.headerEl.innerText)).toEqual('changed header');

        expect(await page.evaluate(() => window.testEl.objectEl.childElementCount)).toEqual(2);
        expect(await page.evaluate(() => window.testEl.objectEl.children[0].innerText)).toEqual('10');
        expect(await page.evaluate(() => window.testEl.objectEl.children[1].innerText)).toEqual('20');
        expect(await page.evaluate(() => window.testEl.object === window.fixture.state.object)).toBeTruthy();

        expect(await page.evaluate(() => window.testEl.listEl.querySelectorAll('li').length)).toEqual(2);
        expect(await page.evaluate(() => window.testEl.listEl.children[0].innerText)).toEqual('1');
        expect(await page.evaluate(() => window.testEl.listEl.children[1].innerText)).toEqual('2');

    });

    it('should use styles', async() => {

        await page.evaluate(() => window.fixture.setState(() => ({

            style: { background: 'red' },

        })));

        const style = await page.evaluate(() => {

            return window.testEl.getAttribute('style');

        });

        expect(style).toEqual('background:red;');

    });

    it('should insert children properly', async() => {

        await page.evaluate(() => window.fixture.setState(() => ({

            childItems: [1, 2, 3],

        })));

        const slottedChildrenCount = await page.evaluate(() => {

            const str = new XMLSerializer().serializeToString(window.testEl.childrenEl);
            const dom = new DOMParser().parseFromString(str, 'text/xml');
            return dom.querySelector('.children').childElementCount;

        });

        expect(slottedChildrenCount).toEqual(3);

    });

    it('should not overwrite internally changed properties', async() => {

        await page.evaluate(() => window.testEl.updateInternalProperty(100));
        expect(await page.evaluate(() => window.testEl.internalProperty)).toEqual(100);
        expect(await page.evaluate(() => window.testEl.internalEl.innerText)).toEqual('100');

        await page.evaluate(() => window.fixture.resetState());
        expect(await page.evaluate(() => window.testEl.internalProperty)).toEqual(100);
        expect(await page.evaluate(() => window.testEl.internalEl.innerText)).toEqual('100');

    });

});

afterAll(async() => {

    // const coverage = await page.coverage.stopJSCoverage();
    // const urdfLoaderCoverage = coverage.filter(o => /URDFLoader\.js$/.test(o.url));
    // pti.write(urdfLoaderCoverage);

    // browser.close();

});
