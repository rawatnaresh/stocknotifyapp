/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileStackParamList} from '../../navigations/ProfileStackNavigator';
import {MainContainer} from '../../components/MainContainer';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/Ionicons';
const img = require('../../assets/images/user.png');

type ProfileProp = StackScreenProps<ProfileStackParamList, 'Profile'>;

export const ProfileScreen = ({navigation}: ProfileProp) => {
  const currentUser = auth().currentUser;
  const photoURL = currentUser?.photoURL ? {uri: currentUser.photoURL} : img;

  return (
    <MainContainer>
      <View style={styles.wrapper}>
        <Text style={styles.screenHeader}>Profile</Text>
        <View style={styles.infoContainer}>
          <Image source={photoURL} style={styles.profileImage} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{currentUser?.displayName}</Text>
          <Text style={styles.info}>{currentUser?.email}</Text>
        </View>
        <TouchableOpacity
          style={[styles.addBtn]}
          onPress={async () => {
            try {
              const fcm = await AsyncStorage.getItem('fcm');
              const parsedFcm = fcm != null ? JSON.parse(fcm) : null;
              if (parsedFcm) {
                const users = firestore().collection('users');
                const authUser = auth().currentUser;
                if (authUser) {
                  const doc = await users.doc(authUser.uid).get();

                  if (doc.exists) {
                    let devices = [];

                    if (doc.data()?.devices) {
                      devices = doc.data()?.devices;
                    }
                    const tokenIndex = devices.findIndex(
                      (dev: any) => dev.pushToken === parsedFcm.token,
                    );
                    if (tokenIndex > -1) {
                      devices.splice(tokenIndex, 1);
                      await users
                        .doc(authUser.uid)
                        .set({devices}, {merge: true});
                    }
                  }
                }

                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
                await auth().signOut();
              }
            } catch (e) {
              console.log(e);
            }
          }}>
          <Icon color="red" name="log-out" size={25} />
          <Text style={styles.addBtnText}> Logout</Text>
        </TouchableOpacity>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  screenHeader: {
    fontWeight: '700',
    fontSize: 24,
    color: '#626364',
    marginBottom: 20,
  },
  wrapper: {
    marginHorizontal: 15,
  },
  addBtn: {
    borderRadius: 20,
    padding: 5,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7edff',
    marginBottom: 20,
  },
  addBtnText: {
    color: 'red',
    fontSize: 14,
    fontWeight: '700',
  },
  profileImage: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 75,
  },
  infoContainer: {
    backgroundColor: '#e7edff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'column',
  },
  info: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '700',
    color: '#2585d9',
  },
});
