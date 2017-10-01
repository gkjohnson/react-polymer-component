# react-polymer-component

A generic `React.Component` for wrapping Polymer Elements and binding events and property data between them.

## Use
### Wrapping an Element

Polymer elements can be wrapped and used in two ways and used just like any other React component in the `render()` function:

``` javascript
const React = require('react')

// Generic class for wrapping a Polymer element
const PolymerComponent = require('@gkjohnson/react-polymer-component')

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

Event binding using the existing Polymer convention of prefixing event binding with `on-`, so events can easily be bound to from a React component.

```html
<MyPolymerElement on-my-custom-event={ e => console.log('Event Fired!', e) }></MyPolymerElement>
```

### Styling

The styles passed to the element are applied to the Polymer element directly. However, because a `div` wrapper is required, the `display` properties of the style are also applied to that.

### Slotted Content
TBD

## Caveats

### Div Container

Because of how React works, a `div` container for the Polymer element is needed so the Polymer element can be properly manage. This means that styles may not work exactly as expected. The built out DOM looks like this:

```html
<div element-tag="my-polymer-element" style="...">
  <my-polymer-element style="..."></my-polymer-element>
</div>
```

This also means that elements that rely on direct parent-child relationships may not work properly.

### Slotted Content

Polymer / HTML slotted content does not work at the moment because of how opinionated React is about it. One approach is to let React render the dom in a sibling element and move it once rendering is complete.
