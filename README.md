# react-polymer-component

[![npm version](https://badge.fury.io/js/react-polymer-component.svg)](https://www.npmjs.com/package/react-polymer-component)

A generic `React.Component` for wrapping Polymer Elements and binding events and property data between them.

## Use
### Wrapping an Element

Polymer elements can be wrapped and used in two ways and used just like any other React component in the `render()` function:

``` javascript
const React = require('react')

// Generic class for wrapping a Polymer element
const PolymerComponent = require('react-polymer-component')

// Get a class that specifically wraps the element 'my-polymer-element'
const MyPolymerElement = PolymerComponent.bind('my-polymer-element')

class SubComponent extends React.Component {
  // ...
  render() {
    return <div>
      // ...
      <PolymerComponent element-tag="my-polymer-element"></PolymerElement>
      // or
      <MyPolymerElement></MyPolymerElement>
      // ...
    </div>
  }
}
```

### Binding Data

Data is bound like all other React properties and set on the Polymer element using the `set()` function. The property _must_ exist in the Polymer class' `properties` object to be bound. If a bound property is removed or set to `undefined`, then the original Polymer property value is used.

```html
<MyPolymerElement items={ this.props.items }></MyPolymerElement>
```

### Event Handling

Events are registered using the existing Polymer convention of prefixing events with `on-`, so they can easily be bound to from a React component.

```html
<MyPolymerElement on-my-custom-event={ e => console.log('Event Fired!', e) }></MyPolymerElement>
```

### Styling

The styles passed to the element are applied to the Polymer element directly. CSS variables work to the extent that they work in modern browsers.
