const React = require('react');

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
    static bind (tag) {

        return class extends PolymerComponent {

            _getTag () {

                return tag;

            }

        };

    }

    get tag () {

        return this._getTag();

    }

    get element () {

        return this.refs.element;

    }

    /* Lifecycle Functions */
    constructor (props) {

        super(props);

        // the events that have been requested to be
        // registered to
        this.events = null;

        // the original values of all the properties for the
        // element
        this.originalProps = null;

    }

    render () {

        return React.createElement(this.tag, { ref: 'element' }, this.props.children);

    }

    shouldComponentUpdate (newProps) {

        // Clear out everything if the tag has changed by updating the
        // defaults, implying we'll have a different element on render
        const tag = newProps['element-tag'] || this.tag;
        const hasNewTag = tag.toLowerCase() !== this.tag.toLowerCase();
        if (hasNewTag) this._updateDefaults();

        return true;

    }

    componentDidUpdate () {

        this._updateElementProperties(this.props);

    }

    componentDidMount () {

        this._updateDefaults();
        this._updateElementProperties(this.props);

    }

    /* Private Functions */
    _getTag () {

        return this.props['element-tag'];

    }

    // Prepare the polymer element and helper objects for
    // being registered to the page
    _updateDefaults () {

        this.events = {};

        const cl = customElements.get(this.tag);
        const properties = cl ? cl.properties : null;
        this.originalProps = {};
        for (let key in properties) this.originalProps[key] = this.element[key];

    }

    _updateElementProperties (props) {

        const removeEvent = key => {

            this.element.removeEventListener(key.replace(/^on-/, ''), this.events[key]);
            delete this.events[key];

        };

        const el = this.element;
        const newProps = Object.assign({}, this.originalProps, props);

        for (let key in newProps) {

            const val = newProps[key];

            // update the property value if it exists in the property object
            // only if it's changed
            if (key in this.originalProps && el.get(key) !== val) el.set(key, val);

            // register events based on the "on-" attribute keywords
            if (/^on-/.test(key)) {

                // remove the event if it's different
                if (key in this.events && this.events[key] !== val) removeEvent(key);

                if (!(key in this.events)) {

                    this.events[key] = e => props[key](e);
                    this.element.addEventListener(key.replace(/^on-/, ''), this.events[key]);

                }

            }

        }

        // cull events
        for (let key in this.events) {

            if (!(key in this.props)) removeEvent(key);

        }

        // styles
        let style = '';
        for (let key in newProps.style) {

            style += `${ key }:${ newProps.style[key] };`;

        }

        this.element.setAttribute('style', style);

    }

}

module.exports = PolymerComponent;
