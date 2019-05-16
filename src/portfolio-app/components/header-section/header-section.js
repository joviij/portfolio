import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

class HeaderSection extends PolymerElement {
	static get template() {
		return html`
			<style>
				.header-section {
					width: 100%;
					height: 50px;
					font-size: 25px;
					padding-top: 10px;
					font-family: 'IBM Plex Sans', sans-serif;
					letter-spacing: 2px;
					text-align: center;
				}

			</style>
			<section class="header-section">
				<slot></slot>
			</section>
		`;
	}
}

customElements.define('header-section', HeaderSection);