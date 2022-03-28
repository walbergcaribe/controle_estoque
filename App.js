import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import Cadastro from './src/Cadastro';
import Editar from './src/Editar';
import Home from './src/Home';

const StackNavigator = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <StackNavigator.Navigator initialRouteName='Home'>
        <StackNavigator.Screen component={Home} name='Home' />
        <StackNavigator.Screen component={Cadastro} name='Cadastro' />
        <StackNavigator.Screen component={Editar} name='Editar' />
      </StackNavigator.Navigator>
    </NavigationContainer >
  )
};

export default App;