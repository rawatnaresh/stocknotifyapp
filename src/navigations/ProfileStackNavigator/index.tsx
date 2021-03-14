/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {StackScreenProps} from '@react-navigation/stack';
import {ProfileScreen} from '../../screens/Profile';

type ProfileProp = StackScreenProps<ProfileStackParamList, 'Profile'>;

export type ProfileStackParamList = {
  Profile: undefined;
};

const ProfileStack = createStackNavigator();

export const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};
