import { html, PolymerElement } from "../../node_modules/@polymer/polymer/polymer-element.js";
/**
 * `file-element`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */

class CustomFolder extends PolymerElement {
  static get template() {
    return html`
      <style>
        .image {
          width: 20px;
        }

        .documents {
          color: white;
          margin: 0px;
          list-style: none;
          max-height: 0px;
          overflow: hidden;
          transition: max-height 0.2s ease-in;
        }

        .visible {
          max-height: 50px;
          height: auto;
        }
      </style>
      <div class="custom-folder">
        <img on-click="expandFolder" class="image" src="../icons/folder.svg">
        <ul class="documents">
            <li><span><img class="image" src="../icons/document.svg">Blah</span></li>
            <li>adfasdf</li>
        </ul>
      </div>
      ` + `
      <div>BLAHLHLAHLHALH</div>
    `;
  }

  static get properties() {
    return {
      __docs: Object
    };
  }

  ready() {
    super.ready();
    this.__docs = this.shadowRoot.querySelector('.documents');
  }

  expandFolder(e) {
    this.__docs.classList.toggle('visible');
  }

}

window.customElements.define('custom-folder', CustomFolder);