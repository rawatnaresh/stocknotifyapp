import * as React from 'react';
import {Text, View} from 'react-native';
export const TodaysPrice = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f5f5fa',
        paddingHorizontal: 15,
        paddingTop: 10,
      }}>
      <Text>Todays price</Text>
    </View>
  );
};
