const { VlElement } = require('vl-ui-core').Test;
const { By } = require('vl-ui-core').Test.Setup;

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
        const tooltip = await this._getTooltipElement();
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

    async _getTooltipId() {
        const parentelement = await this.findElement(By.xpath('..'));
        return parentelement.getAttribute('aria-describedby');
    }

    async _getTooltipElement() {
        try {
            const tooltipId  = await this._getTooltipId();
            const tooltipElement =  await this.driver.findElement(By.css('#' + tooltipId));
            return new VlElement(this.driver, tooltipElement);
        } catch {
            return undefined;
        }
    }
}

module.exports = VlTooltip;
