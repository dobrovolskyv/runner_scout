import { Tabs } from 'expo-router';
import React from 'react';



export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
          backgroundColor: '#458d94',
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
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
