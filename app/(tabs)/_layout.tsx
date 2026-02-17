import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const TAB_YELLOW = '#EAB308';
const TAB_DEFAULT = '#737373';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: TAB_YELLOW,
        tabBarInactiveTintColor: TAB_DEFAULT,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e5e5e5',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 20,
                backgroundColor: focused ? '#FEF3C7' : 'transparent',
              }}
            >
              <MaterialCommunityIcons
                name="home"
                size={26}
                color={focused ? TAB_YELLOW : color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="recipients"
        options={{
          title: 'Recipients',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="account-multiple-outline"
              size={26}
              color={focused ? TAB_YELLOW : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="send"
        options={{
          title: 'Send',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                marginTop: -24,
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: TAB_YELLOW,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <MaterialCommunityIcons name="send" size={26} color="#111" />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="earn"
        options={{
          title: 'Earn',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="gift-outline"
              size={26}
              color={focused ? TAB_YELLOW : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: 'Help',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="help-circle-outline"
              size={26}
              color={focused ? TAB_YELLOW : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
