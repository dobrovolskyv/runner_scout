
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Notifications from 'expo-notifications';



import { Tabs } from 'expo-router';

export type RootStackParamList = {
  Скачки: undefined;
  История: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Пуши не разрешены!');
      }
    })();
  }, []);

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Скачки' }} />
      <Tabs.Screen name="history" options={{ title: 'История' }} />
    </Tabs>
  );
}
