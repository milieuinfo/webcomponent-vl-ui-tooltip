const VlTooltip = require('../components/vl-tooltip');
const { Page, Config, VlElement } = require('vl-ui-core').Test;
const { By } = require('vl-ui-core').Test.Setup;

class VlTooltipPage extends Page {
    async _getTooltip(selector) {
        return new VlTooltip(this.driver, selector);
    }

    async _elementWithTooltip(selector) {
        return new VlElement(this.driver, selector);
    }

    async getTopTooltip() {
        return this._getTooltip('#top-tooltip');
    }    
    
    async getTopTooltipButton() {
        return this._elementWithTooltip('#top-button');
    }

    async getRightTooltip() {
        return this._getTooltip('#right-tooltip');
    }    
    
    async getRightTooltipButton() {
        return this._elementWithTooltip('#right-button');
    }

    async getBottomTooltip() {
        return this._getTooltip('#bottom-tooltip');
    }    
    
    async getBottomTooltipButton() {
        return this._elementWithTooltip('#bottom-button');
    }

    async getLeftTooltip() {
        return this._getTooltip('#left-tooltip');
    }    
    
    async getLeftTooltipButton() {
        return this._elementWithTooltip('#left-button');
    }

    async getMoreContentTooltip() {
        return this._getTooltip('#more-tooltip');
    }
    
    async getMoreContentButton() {
        return this._elementWithTooltip('#more-button');
    }

    async getStaticTooltip() {
        return this._getTooltip('#static-tooltip');
    }

    async getShadowDOMTooltipButton() {
        const element = await this._elementWithTooltip('#shadow-dom-button');
        const button = await element.shadowRoot.findElement(By.css('button'));
        return new VlElement(this.driver, button);
    }

    async getShadowDOMTooltip() {
        const element = await this._elementWithTooltip('#shadow-dom-button');
        const tooltip = await element.shadowRoot.findElement(By.css('vl-tooltip'));
        return this._getTooltip(tooltip);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-tooltip.html');
    }

    async hideAllTooltips() {
        const body = await new VlElement(this.driver, 'body');
        await body.hover();
    }
}

module.exports = VlTooltipPage;
