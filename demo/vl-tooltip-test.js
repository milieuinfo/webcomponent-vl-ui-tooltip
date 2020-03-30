import { VlElement, define } from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-button/dist/vl-button.js';
import '/src/vl-tooltip.js';

export class VlTooltipTest extends VlElement(HTMLElement) {
  constructor() {
    super(`
      <style>
          @import '/src/style.css';
          @import '/node_modules/vl-ui-button/dist/style.css';
      </style>

      <div>
        <button is="vl-button" slot="button">
          <vl-tooltip placement="top">This is tooltip on the top</vl-tooltip>
          <span>top</span>
        </button>
      </div>
    `);
  }
}

define('vl-tooltip-test', VlTooltipTest);