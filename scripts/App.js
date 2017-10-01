const React = require('react')
const ReactDOM = require('react-dom')
const SubComponent = require('./SubComponent')

class App extends React.Component {
    render() {
        return <div>
                <h1>Hello</h1>
                <SubComponent></SubComponent>
            </div>
    }
}

ReactDOM.render(<App/>, document.querySelector('#app'))