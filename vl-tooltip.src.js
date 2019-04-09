import { VlElement } from '/node_modules/vl-ui-core/vl-core.js';

(() => {
  addScript('vl-util.js', '/node_modules/@govflanders/vl-ui-util/dist/js/util.js');
  addScript('tooltip.js', '/node_modules/tooltip.js/dist/umd/tooltip.js');
  addScript('popper.js', '/node_modules/popper.js/dist/umd/popper.js');
  addScript('vl-tooltip.js', '/node_modules/@govflanders/vl-ui-tooltip/dist/js/tooltip.js');

  function addScript(id, src) {
    if (!document.head.querySelector('#' + id)) {
      var script = getScript(id, src);
      document.head.appendChild(script);
    }
  }

  function getScript(id, src) {
    var script = document.createElement('script');
    script.setAttribute('src', src);
    return script;
  }
})();

/**
 * vl-tooltip
 *
 * @demo demo/vl-tooltip.html
 */
export class VlTooltip extends VlElement(HTMLElement) {

  constructor() {
    super(`
            <style>
                @import "../style.css";
            </style>
        `);
  }

  connectedCallback() {
    if (!this._isStatic) {
      this._applyDataTooltipAttributes();
    }
  }

  static get _observedAttributes() {
    return ['static', 'placement'];
  }

  get _parentElement() {
    if (this._shadow && this._shadow.host) {
      return this._shadow.host.parentNode;
    }
    return undefined;
  }

  get _isStatic() {
    return this.hasAttribute('static');
  }

  _applyDataTooltipAttributes() {
    if (this._parentElement) {
      this._parentElement.setAttribute('data-vl-tooltip', '');
      this._parentElement.setAttribute('data-vl-tooltip-placement', this._placement);
      this._parentElement.setAttribute('data-vl-tooltip-content', this.textContent);
    }
  }

  _removeDataTooltipAttributes() {
    if (this._parentElement) {
      this._parentElement.removeAttribute('data-vl-tooltip');
      this._parentElement.removeAttribute('data-vl-tooltip-placement');
      this._parentElement.removeAttribute('data-vl-tooltip-content');
    }
  }

  _placementChangedCallback(oldValue, newValue) {
    if (this._isStatic) {
      this._staticTooltipElement.setAttribute('x-placement', newValue);
    } else if (this._parentElement) {
      this._parentElement.setAttribute('data-vl-tooltip-placement', newValue);
    }
  }

  get _staticTooltipElement() {
    return this._shadow.querySelector('.vl-tooltip');
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

  _staticChangedCallback(oldValue, newValue) {
    if (this._staticTooltipElement) {
      this._staticTooltipElement.remove();
    }

    if (this._isStatic) {
      this._removeDataTooltipAttributes();
      if (newValue !== undefined) {
        const tooltipTemplate = this._getStaticTooltipTemplate();
        this._shadow.appendChild(tooltipTemplate);
        this._staticTooltipElement.setAttribute('x-placement', this._placement);
      }
    } else {
      this._applyDataTooltipAttributes();
    }
  }

  get _placement() {
    return this.getAttribute("placement");
  }

}

customElements.define('vl-tooltip', VlTooltip);
