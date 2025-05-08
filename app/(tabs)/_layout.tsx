import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';




export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fab88c',
        tabBarInactiveTintColor: 'white',
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 0,
          backgroundColor: '#24909c',
        },
      
        tabBarItemStyle: {
          justifyContent: 'center',
        },

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Скачки',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flag" size={20} color={color} />

          )
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: 'История',
          tabBarIcon: ({color, size}) =>(
            <Ionicons name="barcode-outline" size={20} color={color} />
          ) 

        }}
      />

    </Tabs>
  );
}
