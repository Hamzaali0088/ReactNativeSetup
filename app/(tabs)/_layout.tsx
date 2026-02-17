import { Tabs } from 'expo-router';
import React from 'react';
import { View, Pressable, Text } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Home, Profile2User, ReceiveSquare2, DirectUp } from 'iconsax-react-native';

const TAB_YELLOW = '#FACC15';
const TAB_DEFAULT = '#9CA3AF';

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const routes = state.routes.filter((route) => route.name !== 'explore');

  const handlePress = (routeName: string, routeKey: string, isFocused: boolean) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: routeKey,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(routeName as never);
    }
  };

  const sendRoute = routes.find((r) => r.name === 'send');
  const homeRoute = routes.find((r) => r.name === 'index');
  const recipientsRoute = routes.find((r) => r.name === 'recipients');
  const earnRoute = routes.find((r) => r.name === 'earn');
  const helpRoute = routes.find((r) => r.name === 'help');

  return (
    <View className="absolute left-0 right-0 bottom-0 ">
      {/* Floating center button */}
      

      {/* Main bar */}
      <View className="bg-white shadow-lg shadow-black/5 pt-3 pb-4">
        <View className="flex-row items-center justify-between">
          {homeRoute && (
            <Pressable
              className="items-center justify-center flex-1"
              onPress={() =>
                handlePress(
                  homeRoute.name,
                  homeRoute.key,
                  state.index === state.routes.indexOf(homeRoute),
                )
              }
            >
              <View className="items-center justify-center">
                <Home
                  size={22}
                  color={
                    state.index === state.routes.indexOf(homeRoute) ? TAB_YELLOW : TAB_DEFAULT
                  }
                  variant="Linear"
                />
              </View>
              <Text
                className={`mt-1 text-[11px] ${
                  state.index === state.routes.indexOf(homeRoute)
                    ? 'text-[#FACC15] font-semibold'
                    : 'text-neutral-500'
                }`}
              >
                Home
              </Text>
            </Pressable>
          )}

          {recipientsRoute && (
            <Pressable
              className="items-center justify-center flex-1"
              onPress={() =>
                handlePress(
                  recipientsRoute.name,
                  recipientsRoute.key,
                  state.index === state.routes.indexOf(recipientsRoute),
                )
              }
            >
              <View className="items-center justify-center">
                <Profile2User
                  size={22}
                  color={
                    state.index === state.routes.indexOf(recipientsRoute)
                      ? TAB_YELLOW
                      : TAB_DEFAULT
                  }
                  variant="Linear"
                />
              </View>
              <Text
                className={`mt-1 text-[11px] ${
                  state.index === state.routes.indexOf(recipientsRoute)
                    ? 'text-[#FACC15] font-semibold'
                    : 'text-neutral-500'
                }`}
              >
                Recipients
              </Text>
            </Pressable>
          )}
            {sendRoute && (
              <Pressable
                className="z-50 h-14 w-14 rounded-full bg-[#FACC15] translate-y-[-40px] items-center justify-center shadow-lg shadow-black/20"
                onPress={() => handlePress(sendRoute.name, sendRoute.key, state.index === state.routes.indexOf(sendRoute))}
              >
                <DirectUp size={26} color="#111111" variant="Linear" />
              </Pressable>
            )}  

          {earnRoute && (
            <Pressable
              className="items-center justify-center flex-1"
              onPress={() =>
                handlePress(
                  earnRoute.name,
                  earnRoute.key,
                  state.index === state.routes.indexOf(earnRoute),
                )
              }
            >
              <View className="items-center justify-center">
                <ReceiveSquare2
                  size={22}
                  color={
                    state.index === state.routes.indexOf(earnRoute) ? TAB_YELLOW : TAB_DEFAULT
                  }
                  variant="Linear"
                />
              </View>
              <Text
                className={`mt-1 text-[11px] ${
                  state.index === state.routes.indexOf(earnRoute)
                    ? 'text-[#FACC15] font-semibold'
                    : 'text-neutral-500'
                }`}
              >
                Earn
              </Text>
            </Pressable>
          )}

          {helpRoute && (
            <Pressable
              className="items-center justify-center flex-1"
              onPress={() =>
                handlePress(
                  helpRoute.name,
                  helpRoute.key,
                  state.index === state.routes.indexOf(helpRoute),
                )
              }
            >
              <View className="items-center justify-center">
                <MaterialCommunityIcons
                  name="help-circle-outline"
                  size={22}
                  color={
                    state.index === state.routes.indexOf(helpRoute) ? TAB_YELLOW : TAB_DEFAULT
                  }
                />
              </View>
              <Text
                className={`mt-1 text-[11px] ${
                  state.index === state.routes.indexOf(helpRoute)
                    ? 'text-[#FACC15] font-semibold'
                    : 'text-neutral-500'
                }`}
              >
                Help
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="recipients" options={{ title: 'Recipients' }} />
      <Tabs.Screen name="send" options={{ title: 'Send' }} />
      <Tabs.Screen name="earn" options={{ title: 'Earn' }} />
      <Tabs.Screen name="help" options={{ title: 'Help' }} />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
