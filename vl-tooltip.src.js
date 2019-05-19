import { VlElement } from '/node_modules/vl-ui-core/vl-core.js';

(() => {
  addScript('vl-util.js', '/node_modules/@govflanders/vl-ui-util/dist/js/util.js');
  addScript('tooltip.js', '/node_modules/tooltip.js/dist/umd/tooltip.js');
  addScript('popper.js', '/node_modules/popper.js/dist/umd/popper.js');
  addScript('vl-tooltip.js', '/node_modules/@govflanders/vl-ui-tooltip/dist/js/tooltip.js');

  function addScript(id, src) {
    if (!document.head.querySelector('#' + id)) {
      const script = getScript(id, src);
      document.head.appendChild(script);
    }
  }

  function getScript(id, src) {
    const script = document.createElement('script');
    script.setAttribute('src', src);
    return script;
  }
})();

 /**
 * VlTooltip
 * @class
 * @classdesc Gebruik de vl-tooltip om beschrijvende informatie over een knop, label of eender welk element weer te geven. <a href="demo/vl-tooltip.html">Demo</a>.
 * 
 * @extends VlElement
 * 
 * @property {(left | right | bottom | top)} placement - Attribuut bepaalt de positie (t.o.v. het element) waar de tooltip moet verschijnen.
 * @property {boolean} static - Attribuut zorgt voor een variant waarbij een statische, altijd zichtbare, tooltip wordt getoond voor het betreffende element.
 */
export class VlTooltip extends VlElement(HTMLElement) {

  constructor() {
    super(`
      <style>
          @import "../style.css";
      </style>
    `);
    this._addStyleLink();
  }

  connectedCallback() {
    if (!this._isStatic) {
      this._applyDataTooltipAttributes();
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

  _applyDataTooltipAttributes() {
    this.parentNode.setAttribute('data-vl-tooltip', '');
    this.parentNode.setAttribute('data-vl-tooltip-placement', this._placement);
    this.parentNode.setAttribute('data-vl-tooltip-content', this.textContent);
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
      this._applyDataTooltipAttributes();
    }
  }

  get _stylePath() {
    return '../style.css';
  }
}

customElements.define('vl-tooltip', VlTooltip);