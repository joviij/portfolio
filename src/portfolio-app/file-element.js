import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './custom-folder.js';

/**
 * `file-element`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class FileElement extends PolymerElement {
  static get template() {
    return html`
      <style>
        .file-explorer {
          background-color: black;
          width: 90%;
          height: 500px;
          margin: auto;
          display: flex;
        }

        .nav-pane {
          flex: 1;
          border-right: 1px solid white;
        }

        .file-content {
          flex: 2;

        }
      </style>
      <section class="file-explorer">
        <div class="nav-pane">
          <custom-folder></custom-folder>
          <custom-folder></custom-folder>
        </div>
        <div class="file-content"></div>
      </section>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'file-element',
      },
    };
  }
}

window.customElements.define('file-element', FileElement);
