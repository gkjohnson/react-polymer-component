import '../../node_modules/@polymer/paper-button/paper-button.js';

const React = require('react');
const ReactDOM = require('react-dom');
const SubComponent = require('./SubComponent.jsx');
const PolymerComponent = require('../../PolymerComponent.js');
const PaperButton = PolymerComponent.bind('paper-button');

class App extends React.Component {

    constructor(props) {

        super(props);
        this.state = { items: [{ value: 100 }], text: 'hello!' };
        window.App = this;

    }

    updateList() {

        const count = Math.ceil(Math.random() * 10);
        const items = [];

        for (let i = 0; i < count; i++) {

            items.push({ value: Math.random() * 10 });

        }

        this.setState(() => ({ items, text: 'text ' + Math.random() }));

    }

    render() {

        return <div>
            <SubComponent props={ this.state }></SubComponent>
            <PaperButton
                raised
                style={ {
                    color: 'white',
                    background: '#D81B60',
                } }
                on-click={ e => this.updateList() }
            >Update List</PaperButton>
        </div>;

    }

}

ReactDOM.render(<App/>, document.querySelector('#app'));
