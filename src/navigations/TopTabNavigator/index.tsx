import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Animated from 'react-native-reanimated';
import {Floorsheet} from '../../screens/Floorsheet';
import {LiveData} from '../../screens/LiveData';
import {MainContainer} from '../../components/MainContainer';
import {TodaysPrice} from '../../screens/TodaysPrice';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5fa" />
      <View style={styles.wrapper}>
        <Text style={styles.screenHeader}>Nepse</Text>
        <View style={{flexDirection: 'row'}}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
            // modify inputRange for custom behavior
            const inputRange = state.routes.map((_, i) => i);
            const opacity = Animated.interpolate(position, {
              inputRange,
              outputRange: inputRange.map((i) => (i === index ? 1 : 0.5)),
            });

            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                key={route.name}
                style={{fontSize: 20, marginRight: 10}}>
                <Animated.Text
                  style={{
                    opacity,
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#2585d9',
                  }}>
                  {label}
                </Animated.Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

export const NepseTab = () => {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Livedata"
        component={LiveData}
        options={{title: 'Live Data'}}
      />
      <Tab.Screen
        name="Floorsheet"
        component={Floorsheet}
        options={{title: 'Floor Sheet'}}
      />
      <Tab.Screen
        name="TodaysPrice"
        component={TodaysPrice}
        options={{title: "Today's Price"}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5fa',
  },
  safearea: {
    paddingTop: 20,
    backgroundColor: '#f5f5fa',
  },
  screenHeader: {
    fontWeight: '700',
    fontSize: 24,
    color: '#626364',
    marginBottom: 20,
  },
  wrapper: {
    marginHorizontal: 15,
  },
});
