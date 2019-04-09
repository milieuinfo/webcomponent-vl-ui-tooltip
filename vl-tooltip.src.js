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

  static get _observedAttributes() {
    return ['static'];
  }
/*
  get _classPrefix() {
    return 'vl-tooltip--';
  }*/

  get _tooltipElement() {
    return this._element.querySelector('.vl-tooltip');
  }

  _getTooltipTemplate(newValue) {
    return this._template(`
        <div class="vl-tooltip vl-tooltip--static" x-placement="top">
          <div class="vl-tooltip__inner">
            <slot></slot>
          </div>
          <div class="vl-tooltip__arrow"></div>
        </div>
     `);
  };

  _staticChangedCallback(oldValue, newValue) {
    if (this._tooltipElement) {
      this._tooltipElement.remove();
    }

    if (newValue !== undefined) {
      const tooltipTemplate = this._getTooltipTemplate();
      this._shadow.appendChild(tooltipTemplate);
    }
  }

}

customElements.define('vl-tooltip', VlTooltip);
