import { Tabs } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'white',
        tabBarLabelStyle: {
          fontSize: 22
        },
        tabBarStyle: {
          backgroundColor: '#418b94',
          height: 60,
          paddingBottom: 0, 
          paddingTop: 0,
     
        },
        tabBarItemStyle:{
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 0,
          paddingTop: 0
        },
     
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Скачки',
          tabBarIcon: ()=> null

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
