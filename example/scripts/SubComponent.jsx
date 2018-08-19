import '../../node_modules/@polymer/paper-card/paper-card.js';
import '../elements/my-polymer-element.js';

const React = require('react');
const PolymerComponent = require('../../PolymerComponent.js');
const MyPolymerElement = PolymerComponent.bind('my-polymer-element');
const PaperCard = PolymerComponent.bind('paper-card');

class SubComponent extends React.Component {

    render () {

        return <div>
            <PaperCard>
                <h4>Basic Polymer Element</h4>
                <my-polymer-element
                    items={ this.props.items }
                    on-click={ () => console.log('Polymer Click Event') }
                    on-my-event={ () => console.log('Custom Polymer Event') }
                >
                    <div>internal content : { Math.random() }</div>
                    { this.props.text }
                    <div slot="slot-name">Selectively Slotted content</div>
                </my-polymer-element>
            </PaperCard>

            <PaperCard>
                <h4>Wrapped Polymer Element</h4>
                <MyPolymerElement
                    items={ this.props.items }
                    on-click={ () => console.log('Polymer Click Event') }
                    on-my-event={ () => console.log('Custom Polymer Event') }
                >
                    <div>internal content : { Math.random() }</div>
                    {this.props.text}
                    <div slot="slot-name">Selectively Slotted content</div>
                </MyPolymerElement>
            </PaperCard>
        </div>;

    }

}

module.exports = SubComponent;
