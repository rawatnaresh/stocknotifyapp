/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {enablePushNotification} from './src/utils/pushNotificationService';

enablePushNotification();
AppRegistry.registerComponent(appName, () => App);
