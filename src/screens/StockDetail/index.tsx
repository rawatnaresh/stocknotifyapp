/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../navigations/HomeStackNavigator';
import {MainContainer} from '../../components/MainContainer';

type HomeProp = StackScreenProps<HomeStackParamList, 'StockDetail'>;

export const StockDetail = ({navigation}: HomeProp) => {
  return (
    <MainContainer>
      <View style={styles.wrapper}>
        <Text style={styles.screenHeader}>NIFRA</Text>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f3fb',
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
