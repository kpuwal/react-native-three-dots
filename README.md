# React Native Animated Three Dots Loader
A simple, customizable animated dots component for use in React Native apps. Ideal for loading screens.

## Installation
```shell
npm install --save react-native-three-dots
```

## Importing
```js
import Loader from 'react-native-three-dots';
```

## Usage
Just include the component in the output of any other component like this:

```jsx
export default function App() {
  return (
    <View>
      <Loader />
      <StatusBar style="auto" />
    </View>
  );
}
```

<!-- which will get you something like this: -->

## Props
Customize color of dots, animation type, and animation speed using these props:

| Property | Description |
|----------|-------------|
| **`color`** | The color of dots you'd like to show. Defaults to **black**. |
| **`type`** | Animation type="txtloader" or threedots. Defaults to **threedots**. |
| **`speed`** | The length in milliseconds of each phase of the animated. Defaults to **300**. |


<!-- ## More Examples -->