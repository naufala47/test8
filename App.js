import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './component/List';
import Register from './component/Register';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="">
          <Stack.Screen name="List" component={List} options={{ title: 'List' }} />
          <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;