/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';

import App from './App';
import {name as appName} from './app.json';
import {enablePushNotification} from './src/utils/pushNotificationService';
enablePushNotification();
AppRegistry.registerComponent(appName, () => App);
