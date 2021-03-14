/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeScreen} from '../../screens/Home';

type HomeProp = StackScreenProps<HomeStackParamList, 'Home'>;

export type HomeStackParamList = {
  Home: undefined;
};

const HomeStack = createStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};
