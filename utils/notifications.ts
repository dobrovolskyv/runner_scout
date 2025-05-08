
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true, 
      shouldShowList: true,   
    }),
  });

export async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    alert('Уведомления отключены');
    return false;
  }


  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  return true;
}


export async function sendRaceNotification(winnerIndex: number) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Результаты скачек',
      body: `Победила лошадь №${winnerIndex + 1}!`,
    },
    trigger: null, 
  });
}
