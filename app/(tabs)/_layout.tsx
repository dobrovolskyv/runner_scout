import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarStyle: {
          height: 40,
          paddingBottom: 20,
          flexDirection: 'row',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Скачки',
          tabBarIcon: ()=>null

        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: 'История',
          tabBarIcon: ()=>null

        }}
      />

    </Tabs>
  );
}
