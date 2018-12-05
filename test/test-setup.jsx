import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';

const React = require('react');
const ReactDOM = require('react-dom');
const PolymerComponent = require('../PolymerComponent.js');
const TestElement = PolymerComponent.bind('test-element');

class PolymerTestElement extends PolymerElement {

    static get properties() {
        return {

            header: { value: 'header' },
            items: { value: () => [] },
            object: { value: () => ({ a: 1, b: 2 }) },
            internalProperty: { value: 0 },

        };
    }

    static get template() {
        return html`
            <style>:host { display: block }</style>
            <div class="header">
                [[header]]
            </div>
            <div class="object">
                <div class="a">[[object.a]]</div>
                <div class="b">[[object.b]]</div>
            </div>
            <div class="children">
                <slot></slot>
            </div>
            <ul class="list">
                <dom-repeat items="[[items]]">
                    <template>
                        <li>[[item]]</li>
                    </template>
                </dom-repeat>
            </ul>
            <div class="internal">[[internalProperty]]</div>
        `;
    }

    get headerEl() { return this.shadowRoot.querySelector('.header'); }
    get objectEl() { return this.shadowRoot.querySelector('.object'); }
    get childrenEl() { return this.shadowRoot.querySelector('.children'); }
    get listEl() { return this.shadowRoot.querySelector('.list'); }
    get internalEl() { return this.shadowRoot.querySelector('.internal'); }

    updateInternalProperty(value) {

        this.internalProperty = value;

    }

}

customElements.define('test-element', PolymerTestElement);

class TestFixture extends React.Component {

    get defaultState() {

        return {
            childItems: [],
            object: { a: 1, b: 2 },
            items: [],
            header: 'header',
            style: {},
            customEventCallback: undefined,
            className: undefined,
        };

    }

    constructor(props) {

        super(props);
        this.state = this.defaultState;
        window.fixture = this;

    }

    render() {

        return <TestElement
            header={ this.state.header }
            items={ this.state.items }
            object={ this.state.object }
            style={ this.state.style }
            on-custom-event={ this.state.customEventCallback }
            className= { this.state.className }
        >
            { this.state.childItems.map(i => <div>child { i }</div>) }
        </TestElement>;

    }

    resetState() {
        this.setState(() => this.defaultState);
    }

}

ReactDOM.render(<TestFixture/>, document.body);
