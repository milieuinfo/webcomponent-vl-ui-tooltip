import { VlElement } from 'vl-ui-core';
import '@govflanders/vl-ui-util/dist/js/util.js';
import '@govflanders/vl-ui-tooltip/dist/js/tooltip.js';

/**
 * VlTooltip
 * @class
 * @classdesc Gebruik de vl-tooltip om beschrijvende informatie over een knop, label of eender welk element weer te geven.
 * 
 * @extends VlElement
 * 
 * @property {(left | right | bottom | top)} placement - Attribuut bepaalt de positie (t.o.v. het element) waar de tooltip moet verschijnen.
 * @property {boolean} static - Attribuut zorgt voor een variant waarbij een statische, altijd zichtbare, tooltip wordt getoond voor het betreffende element.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-tooltip/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-tooltip/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-tooltip.html|Demo}
 */
export class VlTooltip extends VlElement(HTMLElement) {
  constructor() {
    super(`
      <style>
.vl-vi::after,.vl-vi::before{font-family:vlaanderen-icon!important;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;text-transform:none;display:inline-block}.vl-vi.vl-vi-u-180deg::before{display:inline-block;transform:rotate(180deg)}.vl-vi-u-xs::before{font-size:.8rem}.vl-vi-u-s::before{font-size:1.3rem}.vl-vi-u-m::before{font-size:1.7rem}.vl-vi-u-l::before{font-size:2rem}.vl-vi-u-xl::before{font-size:2.2rem}.vl-vi-u-90deg::before{display:inline-block;transform:rotate(90deg)}.vl-vi-u-180deg::before{display:inline-block;transform:rotate(180deg)}.vl-tooltip{max-width:27rem;background:#fff;border:1px #cbd2da solid;text-align:center;font-size:1.4rem;line-height:1.4;font-weight:500;color:#333332;font-family:"Flanders Art Serif",serif;padding:.2rem .7rem;z-index:1;position:relative}.vl-tooltip::before{content:"";position:absolute;top:-11px;right:-11px;bottom:-11px;left:-11px}.vl-tooltip--static{display:block;pointer-events:auto}.vl-tooltip--static[x-placement^=top]{transform:translate(-50%,-100%);margin-left:50%}.vl-tooltip--static[x-placement^=left]{transform:translate(-100%,0)}.vl-tooltip--static[x-placement^=bottom]{transform:translate(-50%,0);margin-left:50%;top:100%}.vl-tooltip--static[x-placement^=right]{margin-left:calc(100% + 10px)}.vl-tooltip.vl-tooltip--large{font-weight:400;box-shadow:0 0 2.1rem 0 rgba(0,0,0,.3)}.vl-tooltip.vl-tooltip--large .tooltip__inner{text-align:left}.vl-tooltip__title{margin:0 0 .5rem;border-bottom:1px solid #b9c3cd;font-size:1.6rem;font-weight:500}.vl-tooltip__close{border:0;font-size:2.2rem;position:absolute;top:0;right:0;background:0 0;padding:.3rem 1.2rem;z-index:1061;cursor:pointer}.vl-tooltip[x-placement^=top] .vl-tooltip__arrow{left:50%;margin-left:-8px;border-bottom-width:0;border-top-color:#cbd2da;bottom:-8px}.vl-tooltip[x-placement^=top] .vl-tooltip__arrow::after{content:" ";bottom:1px;margin-left:-7px;border-bottom-width:0;border-top-color:#fff}.vl-tooltip[x-placement^=right] .vl-tooltip__arrow{top:50%;left:-8px;margin-top:-8px;border-left-width:0;border-right-color:#cbd2da}.vl-tooltip[x-placement^=right] .vl-tooltip__arrow::after{content:" ";left:1px;bottom:-7px;border-left-width:0;border-right-color:#fff}.vl-tooltip[x-placement^=bottom] .vl-tooltip__arrow{left:50%;margin-left:-8px;border-top-width:0;border-bottom-color:#cbd2da;top:-8px}.vl-tooltip[x-placement^=bottom] .vl-tooltip__arrow::after{content:" ";top:1px;margin-left:-7px;border-top-width:0;border-bottom-color:#fff}.vl-tooltip[x-placement^=left] .vl-tooltip__arrow{top:50%;right:-8px;margin-top:-8px;border-right-width:0;border-left-color:#cbd2da}.vl-tooltip[x-placement^=left] .vl-tooltip__arrow::after{content:" ";right:1px;border-right-width:0;border-left-color:#fff;bottom:-7px}.vl-tooltip__arrow{border-width:8px}.vl-tooltip__arrow,.vl-tooltip__arrow::after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid;border-width:7px;content:""}

      </style>
    `);
  }

  connectedCallback() {
    if (!this._isStatic) {
      this._dress();
    }
  }

  static get _observedAttributes() {
    return ['static', 'placement'];
  }

  get _isStatic() {
    return this.hasAttribute('static');
  }

  get _placement() {
    return this.getAttribute("placement");
  }

  get _staticTooltipElement() {
    return this._shadow.querySelector('.vl-tooltip');
  }

  _dress() {
    this.parentNode.setAttribute('data-vl-tooltip', '');
    this.parentNode.setAttribute('data-vl-tooltip-placement', this._placement);
    this.parentNode.setAttribute('data-vl-tooltip-content', this.textContent);
    vl.tooltip.createTooltip(this.parentNode);
  }

  _removeDataTooltipAttributes() {
    this.parentNode.removeAttribute('data-vl-tooltip');
    this.parentNode.removeAttribute('data-vl-tooltip-placement');
    this.parentNode.removeAttribute('data-vl-tooltip-content');
  }

  _getStaticTooltipTemplate() {
    return this._template(`
        <div class="vl-tooltip vl-tooltip--static">
          <div class="vl-tooltip__inner">
            <slot></slot>
          </div>
          <div class="vl-tooltip__arrow"></div>
        </div>
     `);
  };

  _placementChangedCallback(oldValue, newValue) {
    if (this._isStatic) {
      this._staticTooltipElement.setAttribute('x-placement', newValue);
    } else {
      this.parentNode.setAttribute('data-vl-tooltip-placement', newValue);
    }
  }

  _staticChangedCallback(oldValue, newValue) {
    if (this._staticTooltipElement) {
      this._staticTooltipElement.remove();
    }

    if (newValue != undefined) {
      this._removeDataTooltipAttributes();
      const tooltipTemplate = this._getStaticTooltipTemplate();
      this._shadow.appendChild(tooltipTemplate);
      this._staticTooltipElement.setAttribute('x-placement', this._placement);
    } else {
      this._dress();
    }
  }
}

customElements.define('vl-tooltip', VlTooltip);

