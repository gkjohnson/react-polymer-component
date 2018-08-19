# react-polymer-component

[![npm version](https://img.shields.io/npm/v/react-polymer-component.svg?style=flat-square)](https://www.npmjs.com/package/react-polymer-component)
[![travis build](https://img.shields.io/travis/gkjohnson/react-polymer-component.svg?style=flat-square)](https://travis-ci.org/gkjohnson/react-polymer-component)
[![lgtm code quality](https://img.shields.io/lgtm/grade/javascript/g/gkjohnson/react-polymer-component.svg?style=flat-square&label=code-quality)](https://lgtm.com/projects/g/gkjohnson/react-polymer-component/)

A generic `React.Component` for wrapping Polymer Elements and binding events and property data between them. No changes to the element required!

## Use
### Wrapping an Element

Polymer elements can be wrapped and used in two ways and used just like any other React component in the `render()` function:

```js
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

```jsx
<MyPolymerElement items={ this.props.items }></MyPolymerElement>
```

### Event Handling

Events are registered using the existing Polymer convention of prefixing events with `on-`, so they can easily be bound to from a React component.

```jsx
<MyPolymerElement on-my-custom-event={ e => console.log('Event Fired!', e) }></MyPolymerElement>
```

### Slotted Children

Slot elements and slotted children work as expected, including using the `slot` attribute field.

```jsx
<MyPolymerElement>
  <div slot="special-slot">Slotted Content!</div>
</MyPolymerElement>
```

### Styling

The styles passed to the element are applied to the Polymer element directly. CSS variables work to the extent that they work in modern browsers.

```jsx
<MyPolymerElement style={ { '--color-variable': 'red' } }></MyPolymerElement>
```
