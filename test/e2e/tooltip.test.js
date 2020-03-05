
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlTooltipPage = require('./pages/vl-tooltip.page');

describe('vl-tooltip', async () => {
    const vlTooltipPage = new VlTooltipPage(driver);

    beforeEach(async () => {
        return vlTooltipPage.load();
    });

    it('als gebruiker kan ik over een knop hoveren om de tooltip bovenaan te zien', async () => {
        const button = await vlTooltipPage.getTopTooltipButton();
        const tooltip = await vlTooltipPage.getTopTooltip();
        await assert.eventually.isFalse(tooltip.isDisplayed());
        await button.hover();
        await assert.eventually.isTrue(tooltip.isDisplayed());
        await assert.eventually.isTrue(tooltip.isTop());
        await assert.eventually.isFalse(tooltip.isRight());
        await assert.eventually.isFalse(tooltip.isBottom());
        await assert.eventually.isFalse(tooltip.isLeft());
        await assert.eventually.equal(tooltip.getText(), 'This is tooltip on the top');
    });

    it('als gebruiker kan ik over een knop hoveren om de tooltip rechts te zien', async () => {
        const button = await vlTooltipPage.getRightTooltipButton();
        const tooltip = await vlTooltipPage.getRightTooltip();
        await assert.eventually.isFalse(tooltip.isDisplayed());
        await button.hover();
        await assert.eventually.isTrue(tooltip.isDisplayed());
        await assert.eventually.isFalse(tooltip.isTop());
        await assert.eventually.isTrue(tooltip.isRight());
        await assert.eventually.isFalse(tooltip.isBottom());
        await assert.eventually.isFalse(tooltip.isLeft());
        await assert.eventually.equal(tooltip.getText(), 'This is tooltip on the right');
    });

    it('als gebruiker kan ik over een knop hoveren om de tooltip onderaan te zien', async () => {
        const button = await vlTooltipPage.getBottomTooltipButton();
        const tooltip = await vlTooltipPage.getBottomTooltip();
        await assert.eventually.isFalse(tooltip.isDisplayed());
        await button.hover();
        await assert.eventually.isTrue(tooltip.isDisplayed());
        await assert.eventually.isFalse(tooltip.isTop());
        await assert.eventually.isFalse(tooltip.isRight());
        await assert.eventually.isTrue(tooltip.isBottom());
        await assert.eventually.isFalse(tooltip.isLeft());
        await assert.eventually.equal(tooltip.getText(), 'This is tooltip on the bottom');
    });

    it('als gebruiker kan ik over een knop hoveren om de tooltip links te zien', async () => {
        const button = await vlTooltipPage.getLeftTooltipButton();
        const tooltip = await vlTooltipPage.getLeftTooltip();
        await assert.eventually.isFalse(tooltip.isDisplayed());
        await button.hover();
        await assert.eventually.isTrue(tooltip.isDisplayed());
        await assert.eventually.isFalse(tooltip.isTop());
        await assert.eventually.isFalse(tooltip.isRight());
        await assert.eventually.isFalse(tooltip.isBottom());
        await assert.eventually.isTrue(tooltip.isLeft());
        await assert.eventually.equal(tooltip.getText(), 'This is tooltip on the left');
    });

    it('als gebruiker zie ik de tekst kleiner wanneer er veel tekst in een tooltip zit', async () => {
        const button = await vlTooltipPage.getMoreContentButton();
        const tooltip = await vlTooltipPage.getMoreContentTooltip();
        await button.hover();
        await assert.eventually.isTrue(tooltip.isDisplayed());
        await assert.eventually.isTrue(tooltip.isLargeTooltip());
        await assert.eventually.equal(tooltip.getText(), 'For a large button, label or other element with more text, the content is shown in a smaller, more condensed way.');
    });

    it('als gebruiker kan ik de tekst van een static tooltip zien', async () => {
        const tooltip = await vlTooltipPage.getStaticTooltip();
        await assert.eventually.isTrue(tooltip.isDisplayed());
        await assert.eventually.equal(tooltip.getText(), 'Static Tooltip');
    });
});
