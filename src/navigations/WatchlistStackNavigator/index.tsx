import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AddToWatchlistScreen} from '../../screens/AddToWatchlist';
import {WatchlistScreen} from '../../screens/Watchlist';

export type WatchlistStackParamList = {
  Watchlist: undefined;
  AddToWatchlist: undefined;
};

const SettingsStack = createStackNavigator();

export const WatchlistStackNavigator = () => {
  return (
    <SettingsStack.Navigator screenOptions={{headerShown: false}}>
      <SettingsStack.Screen name="Watchlist" component={WatchlistScreen} />
      <SettingsStack.Screen
        name="AddToWatchlist"
        component={AddToWatchlistScreen}
      />
    </SettingsStack.Navigator>
  );
};
