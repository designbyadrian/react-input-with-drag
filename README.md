# 💄 React input with drag

> Lightweight, zero-dependency, number input component with mouse drag actions just like in Blender and 3D Studio Max.

## Install

```sh
npm install --save-dev react-input-with-drag
```

## Usage

```typescript
import InputWithDrag from 'react-input-with-drag';
import type { InputWithDragChangeHandler } from "react-input-with-drag";

function App() {

  const handleChange: InputWithDragChangeHandler = (value) => {
    // do something with `value`
  }

  return (
    <InputWithDrag value={100} onChange={handleChange} />
  );
}

```

## Properties

Since react-input-with-drag overloads a regular HTML input, all the typical properties are accepted, like `onChange`, `min` and `max`. Being a React component, you can override the styles with either `style` or `className` as well.

Additionally, these are props to customise react-input-with-drag:

| prop | default | description
| :- | :- | :-
| modifiers | `{ shiftKey: 0.1 }` | Sets the precision of a drag when a modifier key is pressed

> **Note**
> 
> A modifier takes the [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/step) property into account. If `step` is 0.1, the default shift key will add/subtract by 0.01
