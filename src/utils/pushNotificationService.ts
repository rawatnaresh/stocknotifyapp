import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const enablePushNotification = () => {
  PushNotification.configure({
    onRegister: async function (token) {
      try {
        const jsonValue = JSON.stringify(token);
        await AsyncStorage.setItem('fcm', jsonValue);
      } catch (e) {
        // save error
        console.log('Error while storing in local storage');
      }
    },
    onNotification: function (notification) {
      if (
        notification.foreground === true &&
        notification.userInteraction === false
      ) {
        PushNotification.localNotification({
          title: notification.title,
          message: notification.message.toString(),
          group: 'group',
        });
      }
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    onAction: function (notification) {
      console.log(notification);
    },

    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};
