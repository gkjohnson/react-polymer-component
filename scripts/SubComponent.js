const React = require('react')

class SubComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log("RENDERING", this, this.props)
        return <div>
            <div>HELLO! My Innards</div>
            <my-polymer-element>{this.props.props.text}</my-polymer-element>
        </div>
    }
}

module.exports = SubComponent