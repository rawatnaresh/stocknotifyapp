import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {MainContainer} from '../../components/MainContainer';

GoogleSignin.configure({
  webClientId:
    '601646496381-sg2eu9hlb826p77tkmbpfhofhc1vbc9t.apps.googleusercontent.com',
});

export const Login = () => {
  const [state, setState] = useState({
    loading: false,
    error: '',
  });

  const onGoogleButtonPress = async () => {
    // Get the users ID token
    setState({error: '', loading: true});
    try {
      const {idToken} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      return await auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.log(e, 'error');
      setState({error: 'Error', loading: false});
    }
  };

  return (
    <MainContainer>
      <View style={styles.centerItems}>
        <Text style={styles.welcomeTitle}>Welcome!</Text>
        <GoogleSigninButton
          style={styles.googleLoginBtn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={onGoogleButtonPress}
          disabled={state.loading}
        />
        <Text style={styles.error}>{state.error}</Text>
      </View>
    </MainContainer>
  );
};
const styles = StyleSheet.create({
  googleLoginBtn: {
    width: 250,
    height: 55,
    marginBottom: 40,
  },
  centerItems: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  welcomeTitle: {
    marginBottom: 50,
    fontSize: 30,
  },
  error: {
    color: 'red',
  },
});
