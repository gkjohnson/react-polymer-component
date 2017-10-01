const React = require('react')
const ReactDOM = require('react-dom')
const SubComponent = require('./SubComponent')

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { items: [{ value: 100 }], text: 'hello!' }
    }

    updateList() {
        const count = Math.ceil(Math.random() * 10)
        const items = []

        for(let i = 0; i < count; i++) {
            items.push({
                value: Math.random() * 10
            })
        }

        this.setState({ items, text: 'text ' + Math.random() })
    }

    render() {
        return <div>
                <SubComponent props={ this.state }></SubComponent>
                <button onClick={ e => this.updateList() }>Update List</button>
            </div>
    }
}

ReactDOM.render(<App/>, document.querySelector('#app'))