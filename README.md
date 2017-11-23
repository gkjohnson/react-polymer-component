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

Event binding using the existing Polymer convention of prefixing event binding with `on-`, so events can easily be bound to from a React component.

```html
<MyPolymerElement on-my-custom-event={ e => console.log('Event Fired!', e) }></MyPolymerElement>
```

### Styling

The styles passed to the element are applied to the Polymer element directly.

## Caveats

### Slotted Content

Polymer / HTML slotted content does not work at the moment because of how opinionated React is about DOM management. One approach is to let React render the dom in a sibling element and move it once rendering is complete. However, with `ShadyDom` it's unclear how to properly add and remove slotted elements dynamically.

**Workaround**

If slotted elements are required for the behavior of the element then a wrapper Polymer element can be used to take an object as input and manage the dynamic children internally.

**Possible Changes / Solutions**

If React allowed for a callback for inserting "child" nodes into the dom and made the component responsible for removing them as well, then this problem could be solved (like the `_attachDom` function afforded by Polymer). React could still update the attributes, but order changes and additions / removals would still be made the responsibility of the containing component -- the only elements the component would be responsible for are the child roots though, so everything from there down would still be a basic React Dom tree.

New lifecycle functions like `insertChildren(<dom child array>)`, `reorderChildren(<dom child array>)`, and `removeChildren(<dom child array>)` would be enough to accomodate this use case.
