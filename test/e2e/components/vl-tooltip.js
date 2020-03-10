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
        const parentelement = await this.findElement(By.xpath('..'));
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

    async _getTooltipElement() {
        try {
            const parentelement = await this.findElement(By.xpath('..'));
            const tooltipId  = await parentelement.getAttribute('aria-describedby');
            return await this.driver.findElement(By.css('#' + tooltipId));
        } catch {
            return undefined;
        }
    }
}

module.exports = VlTooltip;
