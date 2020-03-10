const { VlElement } = require('vl-ui-core').Test;
const { By } = require('selenium-webdriver');

class VlTooltip extends VlElement {  
    async _getPlacement() {
        return this.getAttribute('placement');
    }

    async _isPlacement(position) {
        return (await this._getPlacement()) === position;
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

    async isLargeTooltip() {
        const parentelement = await this._getParentElement();
        const parentDiv = await parentelement.findElement(By.xpath('..'));
        const tooltip = await parentDiv.findElement(By.css('.vl-tooltip'));
        return tooltip.hasClass('vl-tooltip--large');
    }

    async isDisplayed() {
        if (await this.isStatic()) {
            return super.isDisplayed();
        } else {
            const tooltip = await this._getTooltipElement();
            if (tooltip) {
                return tooltip.isDisplayed();
            } else {
                return false;
            }
        }
    }

    async _getParentElement() {
        return this.findElement(By.xpath('..'));
    }

    async _getTooltipId() {
        const parentelement = await this._getParentElement();
        return parentelement.getAttribute('aria-describedby');

    }

    async _getTooltipElement() {
        try {
            const tooltipId  = await this._getTooltipId();
            return await this.driver.findElement(By.css('#' + tooltipId));
        } catch {
            return undefined;
        }
    }
}

module.exports = VlTooltip;
