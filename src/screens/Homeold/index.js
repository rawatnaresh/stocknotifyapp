import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {StockListingProvider} from '../../providers/StockListingProvider';
import {SecuritiesListing} from '../../components/SecuritiesListing';
import {WatchList} from '../../components/Watchlist';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const Tabbed = () => {
  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle="light-content" backgroundColor="#4f0a3a" />
      <View style={styles.headerBar}>
        <Text style={styles.headerBarTitle}>Stock Notifier</Text>
      </View>
      <StockListingProvider>
        <Tab.Navigator
          tabBarOptions={{indicatorStyle: {backgroundColor: '#5d1049'}}}>
          <Tab.Screen name="Watchlists" component={WatchList} />
          <Tab.Screen name="Securities" component={SecuritiesListing} />
        </Tab.Navigator>
      </StockListingProvider>
    </SafeAreaView>
  );
};

export const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Tabbed}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  safearea: {
    backgroundColor: '#4f0a3a',
    flex: 1,
  },
  headerBar: {
    fontSize: 32,
    backgroundColor: '#5d1049',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  headerBarTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#ffffff',
  },
});
