const VlTooltip = require('../components/vl-tooltip');
const { Page, Config } = require('vl-ui-core').Test;

class VlTooltipPage extends Page {
    async _getTooltip(selector) {
        return new VlTooltip(this.driver, selector);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-tooltip.html');
    }
}

module.exports = VlTooltipPage;
