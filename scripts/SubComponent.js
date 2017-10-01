const React = require('react')
const PolymerComponent = require('../PolymerComponent')

class SubComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <div>HELLO! My Innards</div>
            <my-polymer-element items={ this.props.props.items }>{this.props.props.text}</my-polymer-element>
            <PolymerComponent
                element-tag="my-polymer-element"
                items={ this.props.props.items }
                on-click={ e => console.log("CLICKED") }
                on-my-event={ e => console.log("MY EVENT") }
            >
                {this.props.props.text}
                <div>THING</div>
            </PolymerComponent>
        </div>
    }
}

module.exports = SubComponent