import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

class FolderBox extends PolymerElement {
	static get template() {
		return html`
			<style>
				.folder-box {
					display: flex;
					margin: auto;
					width: 60%;
					height: 500px;
					justify-content: center;
					align-content: basline;
					background-color: #1a1c21;
				}

				::slotted([slot=folders]) {
					border-right: 4px solid #00ff43;
					flex: .5 1 auto;
					padding: 10px;
				}

				::slotted([slot=folder-content]) {
					flex: 2 1 0;
				}
			</style>
            <section class="folder-box">
                <slot name="folders"></slot>
                <slot name="folder-content"></slot>
			</section>
		`;
	}

	static get properties() {
		return {
			showCard: {
				value: 'TESTVAL',
				type: String
			}
		};
	}

	constructor() {
		super();
		this.__cards__ = null;
		this.cardMap = {};
		this.previousCard = '';

		this.addEventListener('showCard', (e) => {
			this.processCard(e);
		});
	}

	connectedCallback() {
		super.connectedCallback();
		var loadedEvent = new CustomEvent('box-loaded', {bubbles: true, composed: true});
		this.dispatchEvent(loadedEvent);
	}

	/**
	 * Option 1: Send notification to card to show it self
	 * Option 2: Store all cards within folderbox (in a map) and show the according one
	 * Option 3: have one card and switch out the text
	 */
	ready() {
		super.ready();
		this.__contentSlot__ = this.shadowRoot.querySelectorAll('slot')[1];

		this.__contentSlot__ = this.shadowRoot.querySelector('slot[name=folder-content]');
		this.__cards__ = this.__contentSlot__.assignedNodes()[0].querySelectorAll('cool-card');
		this.initMap();
	}

	initMap() {
		this.__cards__.forEach((card, index, obj) => {
			let key = card.getAttribute('card-id');
			this.cardMap[key] = card;
		});
	}

	processCard(e) {
		let id = e.detail.cardName;
		if (this.cardMap.hasOwnProperty(id) && id !== this.previousCard) {
			if (this.cardMap.hasOwnProperty(this.previousCard)) {
				this.cardMap[this.previousCard].removeAttribute('visible');
			}
			this.cardMap[id].setAttribute('visible', '');
			this.previousCard = id;
		}
	}
}

customElements.define('folder-box', FolderBox);