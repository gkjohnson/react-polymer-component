const React = require('react')

// PolymerComponent
// React Component for wrapping and using polymer elements
// within a React application

// Props
// element-tag:         the element tag to instantiate
// on-<event-name>:     register for events thrown by the polymer element
// <polymer property:   bind the data to the same polymer property
class PolymerComponent extends React.Component {
    // Returns a version of the class that is bound
    // to a specific tag so it doesn't need to
    // be provided through the 'element-tag'
    static bind(tag, styles) {
        return class extends PolymerComponent {
            constructor(props) {
                super(props)
                this.defaultStyles = styles
            }

            _getTag() {
                return tag
            }
        }
    }

    /* Lifecycle Functions */
    constructor(props) {
        super(props)

        // the polymer element to display
        this.element = null

        // the class representing the polymer element if it
        // exists. We use this to inspect the properties
        this.class = null

        // the events that have been requested to be
        // registered to
        this.events = null
        
        // the original values of all the properties for the
        // element
        this.originalProps = null

        // default styles
        this.defaultStyles = {}
    }

    componentDidMount() {
        this.container.appendChild(this.element)
        this.container.setAttribute('polymer-wrapper', this.element.tagName.toLowerCase())
    }

    componentWillUnmount() {
        this.element.remove()
    }

    render () {

        this._prepElement(this._getTag())
        this._updateElementProperties(this.props)

        const style = Object.assign({}, this.defaultStyles, this.prop.styles)
        return <div
            ref={ el => this.container=el }
            style={ style }
        ></div>
    }

    /* Private Functions */
    _getTag() {
        return this.props['element-tag']
    }

    // Prepare the polymer element and helper objects for
    // being registered to the page
    _prepElement(tag) {
        // If the tag is different, then clear the element out
        if (this.element && this.element.tagName.toLowerCase() !== tag.toLowerCase()) { 
            this.element.remove()
            this.element = null
            this.class = null
            this.events = null
            this.originalProps = null
        }

        // If there's no element, then create it
        if (!this.element) {
            this.element = document.createElement(tag)           
            this.events = {}
            
            const cl = customElements.get(tag)
            const properties = cl ? cl.properties : null
            this.originalProps = {}
            for(let key in properties) this.originalProps[key] = this.element[key]
        }
    }

    _updateElementProperties() {
        const el = this.element
        const newProps = Object.assign({}, this.originalProps, this.props)
        for (let key in newProps) {
            // update the property value if it exists in the property object
            if (key in this.originalProps) el.set(key, this.props[key])

            // register events based on the "on-" attribute keywords
            if (/^on-/.test(key)) {
                if (!(key in this.events)) {
                    this.events[key] = e => this.props[key](e)
                    this.element.addEventListener(key.replace(/^on-/, ''), this.events[key])
                }
            }
        }

        // cull events
        for (let key in this.events) {
            if (!(key in this.props)) {
                this.element.removeEventListener(key.replace(/^on-/, ''), this.events[key])
                delete this.events[key]
            }
        }
    }
}

module.exports = PolymerComponent