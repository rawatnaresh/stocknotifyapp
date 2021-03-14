import React, {useState, useEffect, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {MainBottomTabNavigator} from './src/navigations/BottomTabNavigator';
import {Login} from './src/screens/Login';

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    async (authUser) => {
      if (authUser) {
        try {
          const fcm = await AsyncStorage.getItem('fcm');
          const parsedFcm = fcm != null ? JSON.parse(fcm) : null;
          if (parsedFcm) {
            // update fcm in firebase
            const users = firestore().collection('users');
            const userDocRef = users.doc(authUser.uid);

            const doc = await userDocRef.get();

            let devices = [];

            if (doc.data()?.devices) {
              devices = doc.data()?.devices;
            }
            const tokenExists = devices.find(
              (dev: any) => dev.pushToken === parsedFcm.token,
            );
            if (!tokenExists) {
              devices.push({os: parsedFcm.os, pushToken: parsedFcm.token});
              await users
                .doc(authUser.uid)
                .set({devices, uid: authUser.uid}, {merge: true});
            }
          }
        } catch (e) {
          console.log(e);
        }
        setUser(authUser);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  if (initializing) {
    return null;
  }
  if (!user) {
    return <Login />;
  }

  return (
    <NavigationContainer>
      <MainBottomTabNavigator />
    </NavigationContainer>
  );
}
