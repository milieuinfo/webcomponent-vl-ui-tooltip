const VlTooltip = require('../components/vl-tooltip');
const { Page, Config, VlElement } = require('vl-ui-core').Test;

class VlTooltipPage extends Page {
    async _getTooltip(selector) {
        return new VlTooltip(this.driver, selector);
    }

    async getTopTooltip() {
        return this._getTooltip('#top-tooltip');
    }    
    
    async getTopTooltipButton() {
        return this._getTooltip('#top-button');
    }

    async getRightTooltip() {
        return this._getTooltip('#right-tooltip');
    }    
    
    async getRightTooltipButton() {
        return this._getTooltip('#right-button');
    }

    async getBottomTooltip() {
        return this._getTooltip('#bottom-tooltip');
    }    
    
    async getBottomTooltipButton() {
        return this._getTooltip('#bottom-button');
    }

    async getLeftTooltip() {
        return this._getTooltip('#left-tooltip');
    }    
    
    async getLeftTooltipButton() {
        return this._getTooltip('#left-button');
    }

    async getMoreContentTooltip() {
        return this._getTooltip('#more-tooltip');
    }
    
    async getMoreContentButton() {
        return this._getTooltip('#more-button');
    }

    async getStaticTooltip() {
        return this._getTooltip('#static-tooltip');
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-tooltip.html');
    }

    async hideAllTooltips() {
        const title = await this._getTitle();
        await title.hover();
    }

    async _getTitle() {
        return new VlElement(this.driver, 'body > h1');
    }
}

module.exports = VlTooltipPage;
