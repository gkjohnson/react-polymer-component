
/* globals Polymer CustomEvent customElements */
class MyPolymerElement extends Polymer.Element {

    static get template () {

        return Polymer.html`
            <style>
                #container {
                    background: #eee;
                    padding: 10px;
                    border-radius: 2px;
                }

                .slotted {
                    padding-left: 20px;
                }
            </style>

            <div id="container">
                <h4>Slotted Content:</h4>
                <div class="slotted">
                    <slot></slot>
                </div>

                <h4>Named Slotted Content:</h4>
                <div class="slotted">
                    <slot name="slot-name"></slot>
                </div>

                <h4>Repeated Content:</h4>
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
