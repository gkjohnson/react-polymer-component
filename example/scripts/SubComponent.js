const React = require('react')
const PolymerComponent = require('@gkjohnson/react-polymer-component')
const MyPolymerElement = PolymerComponent.bind('my-polymer-element')

class SubComponent extends React.Component {
    render() {
        return <div>
            <h1>Basic Polymer Element</h1>
            <my-polymer-element
                items={ this.props.props.items }
                on-click={ e => console.log('Polymer Click Event') }
                on-my-event={ e => console.log('Custom Polymer Event') }
            >
                {this.props.props.text}
                <div>THING</div>
            </my-polymer-element>
            
            <h1>Wrapped Polymer Element</h1>
            <MyPolymerElement
                items={ this.props.props.items }
                on-click={ e => console.log('Polymer Click Event') }
                on-my-event={ e => console.log('Custom Polymer Event') }
            >
                {this.props.props.text}
                <div>THING</div>
            </MyPolymerElement>
        </div>
    }
}

module.exports = SubComponent