# React Native
* * *

## React Native CLI
<details>
<summary>Click to Expand</summary>

```zsh
npx react-native init projectname # create project

cd projectname

npx react-native start # run Metro Bundler (like webpack)

npx react-native run-ios # run app in sim
```

## Navigation
```zsh
npm i @react-navigation/native

npm i react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

npx react-native link

npx pod-install ios

npm install @react-navigation/stack
```

#### App.js (entry file)
```js
import 'react-native-gesture-handler'; // @ VERY TOP
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## Icons
```zsh
npm i --save react-native-vector-icons

npx react-native link

npx pod-install ios
```
```jsx
import Icon from 'react-native-vector-icons/dist/FontAwesome'
...
<Icon name size color />
```

## Fonts

#### package.json
```json
"rnpm": {
  "assets": [
    "./assets/fonts"
  ]
}
```
* * *
</details>

## Expo CLI
```zsh
expo init projectname # create project

cd projectname

npm start # runs Metro Bundler (like webpack) and starts a dev server
```

## Navigation
```zsh
npm i @react-navigation/native@5

expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

npm i @react-navigation/stack
```

#### App.js (entry file)

```jsx
import React from 'react';
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const screenOne = () => <Text>Screen 1</Text>;
const screenTwo = () => <Text>Screen 2</Text>;

const Stack = createStackNavigator();

const StackNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen name="ScreenOne" component={ScreenOne} />
		<Stack.Screen name="ScreenTwo" component={ScreenTwo} />
	</Stack.Navigator>
);

export default function App() {
	return (
		<NavigationContainer>
			<StackNavigator />
		</NavigationContainer>
    )
}
```

Everything in Stack.Navigator will recieve a navigation object on props. We can use that object to call navigation.navigate("screen") onPress of a button to navigate to that screen!\
**NOTE:** you need to pass in the "name" attr of the Stack.Screen.

## Fonts

```zsh
expo install expo-font @expo-google-fonts/your-font-name
```

#### Component.js
```jsx
import { AppLoading } from 'expo';
import { YourFontName_400Regular, useFonts } from '@expo-google-fonts/your-font-name';

const Component = () => {
    let [ fontsLoaded ] = useFonts({
		YourFontName_400Regular
	});

	if (!fontsLoaded) return <AppLoading />;
	
    else {
		return (
            <Text style={styles.YourStyle}><Text>
        )
    }
}

const styles = StyleSheet.create({
	yourStyle: {
		fontFamily: 'YourFontName_400Regular'
    }
}
```

## Icons

@expo/vector-icons is downloaded by default through expo during project init. Just import and add!:

https://icons.expo.fyi/
* * *

## Image Picker
```zsh
expo install expo-image-picker
```


* * *

## Components

**Basic Components**: View, Text, Image, TextInput, ScrollView, StyleSheet

**UI**: Button, Picker, Slider, Switch

**List Views**: FlatList, SectionList

**iOS**: ActionSheetIOS, AlertIOS, etc.

* * *

## Hooks ( React )

#### useState()
```jsx
import React, { useState } from 'react';

function Example() {
    // this.state = { count: 0 }
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>You clicked {count} times</p>
            {/* this.setState( { count: count++ } ) */}
            <button onClick={() => setCount(count + 1)}>
            Click me
            </button>
        </div>
    )
}
```
setCount() is always a callback where the first param is the previous state!

#### useEffect()
```jsx
import React, { useEffect } from 'react';

function Example() {
    // componentDidMount / componentDidUpdate:
    useEffect(() => {
    ...
    });
}
```
Think of effect as running *after* render.

## Hooks (React Native)

```zsh
npm i @react-native-community/hooks
```

If supporting multiple multiple orientations ("default"), Dimensions component will not support. Import the above library to utilize **useDimension** to get dimensions in both orientations!
* * *

## CSS / StyleSheet

- **styles object shortcut:** rnss
- **alignItems:** aligns items along the cross-axis but is specific to a single line (use with no flex wrap)
- **alignContent:** aligns entire content along the cross-axis (multiple lines) but only takes effect with flex wrap on.
- **flexBasis:** sets size of item along the primary-axis
    - flexDirection: "row" --> flexBasis == width
    - flexDirection: "column" --> flexBasis == height
- **flex:** positive number sets flexGrow, negative number sets flexShrink
- **flexShrink:** set to 1 is saying, if there is any overflow, I can shrink so we all fit!
- **position:** is set to relative by default
    - move things around, relative to their current position, with left, right, top, bottom.


## Style Inheritance

* * *

## Dimensions

```jsx
import { Dimensions } from 'react-native'
...
console.log(Dimensions.get('screen | window'));
// Object {
//   "fontScale": 1,
//   "height": 896,
//   "scale": 2,
//   "width": 414,
// }
```
* * *

## Forms (w/ Formik)

```zsh
npm i formik --save
```

#### Form.js
```jsx
import {Formik} from 'formik'
```

* * *