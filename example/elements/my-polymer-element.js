
import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';

/* globals CustomEvent customElements */
class MyPolymerElement extends PolymerElement {

    static get template () {

        return html`
            <style>
                :host {
                    display: block;
                }

                #container {
                    border-radius: 2px;
                }

                .slotted {
                    padding-left: 20px;
                }
            </style>

            <div id="container">
                <h5>Slotted Content:</h5>
                <div class="slotted">
                    <slot></slot>
                </div>

                <h5>Named Slotted Content:</h5>
                <div class="slotted">
                    <slot name="slot-name"></slot>
                </div>

                <h5>Repeated Content:</h5>
                <ul>
                    <template is="dom-repeat" items="[[items]]">
                        <li on-click="_onClickHandler">[[item.value]]</li>
                    </template>
                </ul>
            </div>`;

    }

    static get properties () {

        return {
            items: {
                type: Array,
                value: () => [{ value: 1 }, { value: 2 }, { value: 4 }]
            },
        };

    }

    _onClickHandler (e) {

        this.dispatchEvent(new CustomEvent('my-event'));

    }

}

customElements.define('my-polymer-element', MyPolymerElement);
