import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

class CustomFile extends PolymerElement {
    static get template() {
        return html`
        <style>
            .file-icon {
                width: 20px;
                vertical-align: bottom;
                padding-right: 5px;
            }

            .file {
                cursor: default;
            }
        </style>
        <span on-click="handleFileClick" class="file"><img class="file-icon" src="../../../../../assets/file.svg"/>[[name]]</span>
        `;
    }

    static get properties() {
        return {
            name: {
                type: String,
                value: ""
            }, 
        };
    }

    handleFileClick() {
        this.dispatchEvent(new CustomEvent('showCard', {
            bubbles: true, 
            composed: true, 
            detail: {cardName: this.name}
        }));
    }
}

customElements.define('custom-file', CustomFile);