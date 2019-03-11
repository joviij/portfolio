import { html, PolymerElement } from "../../../../node_modules/@polymer/polymer/polymer-element.js";

class CoolCard extends PolymerElement {
  static get template() {
    return html`
            <style>
                .cool-card {
                    height: 100%;
                    background-color: white;
                    color: black;
                    padding: 10px;
                    box-sizing: border-box;
                    margin-top: 10px;
                }
        
				@media only screen and (min-width: 768px) {
                    .cool-card {
                        display: none;
                        margin-top: 0px;
                    }

                    .visible {
                        display: block;
                    }
                }
            </style>
            <div class="cool-card">
                <slot></slot>
            </div>
        `;
  }

  static get properties() {
    return {
      cardId: String,
      visible: {
        type: Boolean,
        value: false,
        observer: 'toggleCard'
      }
    };
  }

  constructor() {
    super();
    this.card = null;
  } // observer to run everytime folder-box changes value of visible


  toggleCard(newValue, oldValue) {
    if (this.card) {
      if (this.visible) {
        this.card.classList.add('visible');
        return;
      }

      this.card.classList.remove('visible');
    }
  }

  ready() {
    super.ready();
    this.card = this.shadowRoot.querySelector('.cool-card');

    if (this.visible) {
      this.card.classList.add('visible');
    }
  }

}

customElements.define('cool-card', CoolCard);