/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {Text, View, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
type PropType = {
  children: React.ReactNode;
};
export const MainContainer = ({children}: PropType) => {
  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5fa" />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: '#f5f5fa',
  },
  container: {
    // flex: 1,
    // backgroundColor: 'red',
    paddingTop: 15,
  },
});
