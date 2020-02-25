
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlTooltipPage = require('./pages/vl-tooltip.page');

describe('vl-tooltip', async () => {
    const vlTooltipPage = new VlTooltipPage(driver);

    before(async () => {
        return vlTooltipPage.load();
    });

    it('als gebruiker kan ik over een knop hoveren om de tooltip bovenaan te zien', async () => {
        const button = await vlTooltipPage.getTopTooltipButton();
        await button.hover();
        const topTooltip = await vlTooltipPage.getTopTooltip();
        await assert.eventually.isTrue(topTooltip.isDisplayed());
        await assert.eventually.isTrue(topTooltip.isTop());
        await assert.eventually.isFalse(topTooltip.isRight());
        await assert.eventually.isFalse(topTooltip.isBottom());
        await assert.eventually.isFalse(topTooltip.isLeft());
        await assert.eventually.equal(topTooltip.getText(), 'This is tooltip on the top');
    });

    it('als gebruiker kan ik over een knop hoveren om de tooltip rechts te zien', async () => {
        const button = await vlTooltipPage.getRightTooltipButton();
        await button.hover();
        const rightTooltip = await vlTooltipPage.getRightTooltip();
        await assert.eventually.isTrue(rightTooltip.isDisplayed());
        await assert.eventually.isFalse(rightTooltip.isTop());
        await assert.eventually.isTrue(rightTooltip.isRight());
        await assert.eventually.isFalse(rightTooltip.isBottom());
        await assert.eventually.isFalse(rightTooltip.isLeft());
        await assert.eventually.equal(rightTooltip.getText(), 'This is tooltip on the right');
    });

    it('als gebruiker kan ik over een knop hoveren om de tooltip onderaan te zien', async () => {
        const button = await vlTooltipPage.getBottomTooltipButton();
        await button.hover();
        const bottomTooltip = await vlTooltipPage.getBottomTooltip();
        await assert.eventually.isTrue(bottomTooltip.isDisplayed());
        await assert.eventually.isFalse(bottomTooltip.isTop());
        await assert.eventually.isFalse(bottomTooltip.isRight());
        await assert.eventually.isTrue(bottomTooltip.isBottom());
        await assert.eventually.isFalse(bottomTooltip.isLeft());
        await assert.eventually.equal(bottomTooltip.getText(), 'This is tooltip on the bottom');
    });

    it('als gebruiker kan ik over een knop hoveren om de tooltip links te zien', async () => {
        const button = await vlTooltipPage.getLeftTooltipButton();
        await button.hover();
        const leftTooltip = await vlTooltipPage.getLeftTooltip();
        await assert.eventually.isTrue(leftTooltip.isDisplayed());
        await assert.eventually.isFalse(leftTooltip.isTop());
        await assert.eventually.isFalse(leftTooltip.isRight());
        await assert.eventually.isFalse(leftTooltip.isBottom());
        await assert.eventually.isTrue(leftTooltip.isLeft());
        await assert.eventually.equal(leftTooltip.getText(), 'This is tooltip on the left');
    });

    it('als gebruiker zie ik de tekst kleiner wanneer er veel tekst in een tooltip zit', async () => {
        const button = await vlTooltipPage.getMoreContentButton();
        await button.hover();
        const tooltip = await vlTooltipPage.getMoreContentTooltip();

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
