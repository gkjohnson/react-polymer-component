const React = require('react');
const PolymerComponent = require('../../PolymerComponent.js');
const MyPolymerElement = PolymerComponent.bind('my-polymer-element');

class SubComponent extends React.Component {

    render () {

        return <div>
            <h1>Basic Polymer Element</h1>
            <my-polymer-element
                items={ this.props.props.items }
                on-click={ e => console.log('Polymer Click Event') }
                on-my-event={ e => console.log('Custom Polymer Event') }
            >
                <div>internal content</div>
                {this.props.props.text}
            </my-polymer-element>

            <h1>Wrapped Polymer Element</h1>
            <MyPolymerElement
                items={ this.props.props.items }
                on-click={ e => console.log('Polymer Click Event') }
                on-my-event={ e => console.log('Custom Polymer Event') }
            >
                <div>internal content</div>
                {this.props.props.text}
            </MyPolymerElement>
        </div>;

    }

}

module.exports = SubComponent;
