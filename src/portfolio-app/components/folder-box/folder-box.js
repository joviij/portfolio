import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

class FolderBox extends PolymerElement {
	static get template() {
		// only show the folder box setup on screens big enough (> 768px)
		return html`
			<style>
				::slotted([slot=folders]) {
					display: none;
				}

				@media only screen and (min-width: 768px) {
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
						display: block;
						border-right: 4px solid #00ff43;
						flex: .5 1 auto;
						padding: 10px;
					}

					::slotted([slot=folder-content]) {
						flex: 2 1 0;
					}
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
				value: '',
				type: String
			}
		};
	}

	constructor() {
		super();
		this.__cards__ = null;
		this.cardMap = {};
		this.previousCard = '';
	}

	connectedCallback() {
		super.connectedCallback();

		// Event used to ensure that the page should only show the body after folder box has been rendered. 
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
		
		// attach event listener to folder box that will display the correct card when filename is clicked. 
		this.addEventListener('showCard', (e) => {
			this.processCard(e);
		});

		this.__contentSlot__ = this.shadowRoot.querySelectorAll('slot')[1];

		this.__contentSlot__ = this.shadowRoot.querySelector('slot[name=folder-content]');
		this.__cards__ = this.__contentSlot__.assignedNodes()[0].querySelectorAll('cool-card');
		this.initMap();
	}

	initMap() {
		// store card-id in a map so that it can be referenced faster in future calls. 

		this.__cards__.forEach((card, index, obj) => {
			let key = card.getAttribute('card-id');
			this.cardMap[key] = card;
		});
	}

	processCard(e) {
		// Will show the appropriate cool-card based on the file that was selected.

		let id = e.detail.cardName.replace(/.js/g, '');
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
