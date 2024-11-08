> ### ⚠️ **Notice: This Repository is No Longer Maintained**
> 
> This project has been **deprecated** and is no longer maintained.
> 
> It has been replaced by [**React Interactive Input**]([https://github.com/username/new-repo](https://github.com/designbyadrian/react-interactive-input)) 🎉.
> 
> Please switch to the new package for ongoing support, updates, and improvements.
>
> (No offence to fancy drag people! The new repo is not just a name change, but a complete rewrite. Still love you!)

# 💄 React input with drag

> Lightweight, zero-dependency, number input component with mouse drag actions just like in Blender and 3D Studio Max.

## Install

```sh
npm install --save react-input-with-drag
```

## Usage

```typescript
import InputWithDrag from 'react-input-with-drag';
import type { InputWithDragChangeHandler } from 'react-input-with-drag';

function App() {
  const handleChange: InputWithDragChangeHandler = value => {
    // fired on input change and drag end
  };

  return <InputWithDrag value={100} onChange={handleChange} />;
}
```

## Properties

Since react-input-with-drag overloads a regular HTML input, all the typical properties are accepted, like `onChange`, `onInput`, `step`, `min`, and `max`. Being a React component, you can override the styles with either `style` or `className` as well.

Additionally, these are props to customise react-input-with-drag:

| prop      | default             | description                                                 |
| :-------- | :------------------ | :---------------------------------------------------------- |
| modifiers | `{ shiftKey: 0.1 }` | Sets the precision of a drag when a modifier key is pressed |

> **Note**
>
> A modifier takes the [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/step) property into account. If `step` is 0.1, the default shift key will add/subtract by 0.01

## Read more

- [NPM](https://www.npmjs.com/package/react-input-with-drag)
