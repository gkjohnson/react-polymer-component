const React = require('react')
const ReactDOM = require('react-dom')
const SubComponent = require('./SubComponent')

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { items: [{ value: 100 }], text: 'hello!' }

        window.setState = state => {
            this.setState(state)
        }
    }

    render() {
        console.log("RENERING")
        return <div>
                <h1>Hello</h1>
                <SubComponent props={this.state}></SubComponent>
            </div>
    }
}

ReactDOM.render(<App/>, document.querySelector('#app'))