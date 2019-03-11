import { html, PolymerElement } from "../../../../node_modules/@polymer/polymer/polymer-element.js";
import "../../../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js";
import "../../../../node_modules/@webcomponents/shadycss/entrypoints/apply-shim.js";
import '../custom-file/custom-file.js'; // custom folder icon fill color: #231f20

class CustomFolder extends PolymerElement {
  static get template() {
    return html`
        <style>
            .custom-folder {
                -webkit-user-select: none; /* Safari */        
                -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* IE10+/Edge */
                user-select: none; /* Standard */
            }

            .files {
                padding-left: 20px;
                margin: 5px 0px;
                overflow: hidden;
                transition: max-height 0.2s ease-in;
                max-height: 0px;
            }

            .files li {
                list-style: none;
            }

            .folder-icon {
                width: 20px;
                margin-right: 5px;
            }

            .visible {
                max-height: var(--folder-height, 30px);
                height: auto;
            }

            .folder-name {
                display: flex;
                align-items: center;
            }

        </style>
        <div class="custom-folder">
            <span class="folder-name" on-click="expandFolder">
                <img class="folder-icon" src="../../../../../assets/folder.svg"></img>
                [[folderName]]
            </span>
            <ul class="files">
                <template is="dom-repeat" items="[[files]]">
                    <li><custom-file name="[[item]]"></custom-file></li>
                </template>
            </ul> 
        </div>
        `;
  }

  static get properties() {
    return {
      folderName: String,
      files: {
        type: Array,

        value() {
          return [];
        }

      }
    };
  }

  constructor() {
    super();
    this.__folder__ = null;
    this.fileSize = 24;
  }

  ready() {
    let folderSize = this.fileSize * this.files.length;
    super.ready();
    this.__folder__ = this.shadowRoot.querySelector('.files'); // set the height of folder dynamically based on number of files. 

    this.updateStyles({
      '--folder-height': folderSize + 'px'
    });
  }

  expandFolder() {
    this.__folder__.classList.toggle('visible');
  }

}

customElements.define('custom-folder', CustomFolder);