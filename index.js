const express = require('express')

//https://medium.com/frontendjourney/server-side-rendering-js-df06a213da4e
//https://developer.chrome.com/blog/headless-chrome-ssr-js-sites?hl=pt-br

const PORT = process.env.PORT || 3100;
const server = express();


async function ssr(url) {

    const puppeteer = require("puppeteer");

    const browserOptions = {
        headless: true
    };
    try {
        const browser = await puppeteer.launch(browserOptions);
        const page = await browser.newPage();



        await page.setRequestInterception(true);

        page.on('request', req => {

            const blocklist = ['www.google-analytics.com', '/gtag/js', 'ga.js', 'analytics.js'];
            if (blocklist.find(regex => req.url().match(regex))) {
                return req.abort();
            }

            // 2. Ignore requests for resources that don't produce DOM
            // (images, stylesheets, media).
            const allowlist = ['document', 'script', 'xhr', 'fetch'];
            if (!allowlist.includes(req.resourceType())) {
                return req.abort();
            }

            // 3. Pass through all other requests.
            req.continue();
        });


        await page.goto(url, { waitUntil: "networkidle0" });

        await page.waitForSelector('#main');
        await page.$eval('#main', ({ dataset }) => {
            dataset.fetched = true;
        });

        const serializedHtml = await page.content();
        await browser.close();
        return serializedHtml;
    } catch (error) {
        console.log('SSR Error', error);
        return 'Problem rendering on the server.';
    }
}


server.use(express.static('public'));
server.get("/", async (req, res, next) => {
    const origin = `${req.protocol}://${req.get("host")}`;
    const pageUrl = `${origin}/app.html`;
    try {
        const serverRenderedPage = await ssr(pageUrl);
        return res.status(200).send(serverRenderedPage);
    } catch (error) {
        return res.status(500).send(error);
    }
});


server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});