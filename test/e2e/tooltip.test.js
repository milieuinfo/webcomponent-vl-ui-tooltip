
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlTooltipPage = require('./pages/vl-tooltip.page');

describe('vl-tooltip', async () => {
    const vlTooltipPage = new VlTooltipPage(driver);

    before(() => {
        return vlTooltipPage.load();
    });

    it('als ik over een knop hover, zie ik de tooltip', async () => {
        const button = await vlTooltipPage.getTopTooltipButton();
        const actions = driver.actions({bridge: true});
        await actions.move({x: 0, y: 0, origin: button}).perform();
        const tooltip = await vlTooltipPage.getTopTooltip();
        const text = await tooltip.getText();
        assert.equal(text, 'This is tooltip on the top');
    });

    after(async () => {
        return driver.quit();
    });
});
