import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {WatchlistStackNavigator} from '../WatchlistStackNavigator';
import {HomeStackNavigator} from '../HomeStackNavigator';
import {ProfileStackNavigator} from '../ProfileStackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';

const Tab = createBottomTabNavigator();

export const MainBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      backBehavior={'initialRoute'}
      screenOptions={({route}) => ({
        unmountOnBlur: true,
        tabBarIcon: ({focused}) => {
          let iconName = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Watchlists') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <Icon
              name={iconName}
              size={22}
              color={focused ? '#2585d9' : 'gray'}
            />
          );
        },
        tabBarButton: (props) => <TouchableOpacity {...props} />,
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#2585d9',
        inactiveTintColor: 'gray',
        style: {
          paddingTop: 5,
        },
      }}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Watchlists" component={WatchlistStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};
