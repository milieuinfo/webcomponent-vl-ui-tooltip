
const { assert, driver } = require('vl-ui-core').Test;
const VlTooltipPage = require('./pages/vl-tooltip.page');

describe('vl-tooltip', async () => {
    const vlTooltipPage = new VlTooltipPage(driver);

    before((done) => {
        vlTooltipPage.load().then(() => {
            done();
        });
    });
});
