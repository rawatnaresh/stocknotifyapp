import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AddToWatchlistScreen} from '../../screens/AddToWatchlist';
import {WatchlistScreen} from '../../screens/Watchlist';
import {StockDetail} from '../../screens/StockDetail';

export type WatchlistStackParamList = {
  Watchlist: undefined;
  AddToWatchlist: undefined;
  StockDetail: undefined;
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
      <SettingsStack.Screen name="StockDetail" component={StockDetail} />
    </SettingsStack.Navigator>
  );
};
