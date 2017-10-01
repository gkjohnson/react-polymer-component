const React = require('react')

class PolymerComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log('did MOUNT', this.element, this.props)
        // this.prepElement(this.props['element-tag'])
        this.container.appendChild(this.element)


    }

    componentWillUnmount() {
        this.element.remove()
    }

    render () {

        this.prepElement(this.props['element-tag'])
        this.updateElementProperties(this.props)

        const style=Object.assign(this.props.style || {}, { display: 'inline-block' })
        return <div
            ref={ el => this.container=el }
            style={ style }
        >
            <h1>ITS HERE</h1>
        </div>
    }

    prepElement(type) {
        if (this.element && this.element.tagName.toLowerCase() !== type.toLowerCase()) {
            this.element.remove()
            this.element = null
            this.class = null
        }

        if (!this.element) {
            this.element = document.createElement(type)
            this.class = customElements.get(type)
        }
    }

    updateElementProperties(props) {
        const el = this.element
        const cl = this.class
        for (let key in props) {
            if (key in cl.properties) {
                el.set(key, props[key])
            }
        }

    }
}

module.exports = PolymerComponent