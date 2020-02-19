
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlTooltipPage = require('./pages/vl-tooltip.page');

describe('vl-tooltip', async () => {
    const vlTooltipPage = new VlTooltipPage(driver);

    before(async () => {
        // maximize is nodig om een MoveTargetOutOfBoundsError te voorkomen bij het hoveren
        await driver.manage().window().maximize();
        return vlTooltipPage.load();
    });

    it('als ik over een knop hover, zie ik de tooltip', async () => {
        const button = await vlTooltipPage.getTopTooltipButton();
        await button.hover();
        const tooltip = await vlTooltipPage.getTopTooltip();
        
        await assert.eventually.isTrue(tooltip.isDisplayed());
        await assert.eventually.isTrue(tooltip.isTop());
        await assert.eventually.equal(tooltip.getText(), 'This is tooltip on the top');
    });

    it('als ik veel tekst in een tooltip zet, zal deze kleiner getoond worden', async () => {
        const button = await vlTooltipPage.getMoreContentButton();
        await button.hover();
        const tooltip = await vlTooltipPage.getMoreContentTooltip();

        await assert.eventually.isTrue(tooltip.isDisplayed());
        await assert.eventually.isTrue(tooltip.isTextSmall());
        await assert.eventually.equal(tooltip.getText(), 'For a large button, label or other element with more text, the content is shown in a smaller, more condensed way.');
    });

    it('ik kan een tooltip als static definieren', async () => {
        const tooltip = await vlTooltipPage.getStaticTooltip();
        await assert.eventually.isTrue(tooltip.isDisplayed());
        await assert.eventually.equal(tooltip.getText(), 'Static Tooltip');
    });

    after(async () => {
        return driver.quit();
    });
});
