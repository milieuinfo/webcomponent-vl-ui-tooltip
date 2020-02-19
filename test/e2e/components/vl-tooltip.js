const { VlElement } = require('vl-ui-core').Test;
const { By } = require('selenium-webdriver');

class VlTooltip extends VlElement {  

    async _getPlacement() {
        return this.getAttribute('placement');
    }

    async _isPlacement(position) {
        return (await this._getPlacement()) === placement;
    }

    async isStatic() {
        return this.hasAttribute("static");
    }

    async isTop() {
        return this._isPlacement("top");
    }
    
    async isRight() {
        return this._isPlacement("right");
    }
    
    async isBottom() {
        return this._isPlacement("bottom");
    }
    
    async isLeft() {
        return this._isPlacement("left");
    }

    async isTextSmall() {
        const parentelement = await this.findElement(By.xpath('..'));
        const parentDiv = await parentelement.findElement(By.xpath('..'));
        const tooltip = await parentDiv.findElement(By.css('.vl-tooltip'));
        return tooltip.hasClass('vl-tooltip--large');
    }
}

module.exports = VlTooltip;
