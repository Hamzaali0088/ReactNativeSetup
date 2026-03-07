import { View, Text, ScrollView, Pressable, Platform, Modal, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import { CircleFlag } from 'react-circle-flags';
import { Notification, DirectUp, WalletAdd1, InfoCircle, ProfileAdd, ArrowRight, Scan, DirectSend, Global, HomeTrendUp, ReceiptText } from 'iconsax-react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuthUser } from '@/lib/authStorage';
import { useProfilePhotoStore } from '@/lib/profilePhotoStore';
import InviteFriendImg from '../../assets/images/invite-friend.png';

const SERVICES = [
  { id: 'sviftpay', label: 'SviftPay', icon: Scan },
  { id: 'topup', label: 'Mobile Top-up', icon: DirectSend },
  { id: 'travel', label: 'Travel', icon: Global },
  { id: 'merchant', label: 'Merchant', icon: HomeTrendUp },
  { id: 'bills', label: 'Bills', icon: ReceiptText },
  { id: 'gift', label: 'Gift Envelope', icon: ReceiptText },
];

export default function HomeScreen() {
  const [userName, setUserName] = useState('User');
  const balance = '3634.22';
  const currency = 'EUR';
  const router = useRouter();
  const [showAccountOptions, setShowAccountOptions] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const accountOptionsSheetSlide = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (showAccountOptions) {
      accountOptionsSheetSlide.setValue(300);
      Animated.spring(accountOptionsSheetSlide, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    }
  }, [showAccountOptions]);

  function closeAccountOptions() {
    Animated.timing(accountOptionsSheetSlide, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowAccountOptions(false));
  }

  const profilePhotoUrl = useProfilePhotoStore((s) => s.profilePhotoUrl);
  const setStorePhoto = useProfilePhotoStore((s) => s.setProfilePhotoUrl);

  function loadUser() {
    getAuthUser().then(({ name, profilePhotoUrl: url }) => {
      if (name) setUserName(name);
      setStorePhoto(url ?? null);
    }).catch(() => {});
  }

  useEffect(() => { loadUser(); }, []);
  useFocusEffect(React.useCallback(() => { loadUser(); }, []));

  useEffect(() => {
    AsyncStorage.getItem('svift_is_verified')
      .then((value) => {
        if (value === 'true') {
          setIsVerified(true);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ——— Section 1: Top (Yellow) ——— Header + Balance */}
      <View className="bg-primarybg pb-5  glassy-border"
      >
        <View className="flex-row items-center justify-between px-5 pt-14 pb-4">
          <Pressable
            className="flex-row items-center gap-3 active:opacity-70"
            onPress={() => router.push('/profile' as never)}
          >
            <View className="h-11 w-11 rounded-full overflow-hidden bg-primary items-center justify-center">
              {profilePhotoUrl ? (
                <Image source={{ uri: profilePhotoUrl }} className="h-11 w-11" contentFit="cover" />
              ) : (
                <Text className="text-xl font-bold text-neutral-900">
                  {userName.charAt(0).toUpperCase()}
                </Text>
              )}
            </View>
            <View>
              <Text className="text-[14px] text-amber-900/70 font-regular">Welcome</Text>
              <Text className="text-[16px] font-medium text-neutral-900">{userName}</Text>
            </View>
          </Pressable>
          <Pressable className="h-11 w-11 rounded-full shadow-[inset_3px_0_6px_rgba(255,255,143,0.9),inset_0_3px_6px_rgba(255,255,143,0.9)] flex items-center justify-center ">
            <Notification size={20} color="#000000" />  
          </Pressable>
          
        </View>

        <View className="mx-4 mt-2 p-5 h-[170px] rounded-3xl bg-[#f9ed7b] border border-[#ffff8e]">
          <View className="flex-row items-start justify-between mb-5">
            <View>
              <Text className="text-sm text-neutral-600 mb-0.5">Total Balance</Text>
              <Text className="text-[22px] font-medium text-neutral-900">€{balance}</Text>
            </View>
            <Pressable className="flex-row h-9 rounded-full p-2 px-3 items-center gap-2 shadow-[inset_3px_0_6px_rgba(255,255,143,0.9),inset_0_3px_6px_rgba(255,255,143,0.9)]">
              <View className="h-[19.5px] w-[19.5px] rounded-full overflow-hidden border flex items-center justify-center">
                {Platform.OS === 'web' ? (
                  <CircleFlag countryCode="eu" height={20} width={20} />
                ) : (
                  <Text className="text-[11px]">🇪🇺</Text>
                )}
              </View>
              <Text className="text-[16px] font-medium text-black">{currency}</Text>
            </Pressable>
          </View>
          <View className="flex-row justify-between px-2">
            <Pressable className="items-center">
              <View className="h-11 w-11 rounded-full shadow-[inset_3px_0_6px_rgba(255,255,143,0.9),inset_0_3px_6px_rgba(255,255,143,0.9)] flex items-center justify-center">
                <DirectUp size={20} color="#000000" className='rotate-45' />
              </View>
              <Text className="text-base font-light text-black">Send money</Text>
            </Pressable>
            <Pressable className="items-center">
              <View className="h-11 w-11 rounded-full shadow-[inset_3px_0_6px_rgba(255,255,143,0.9),inset_0_3px_6px_rgba(255,255,143,0.9)] flex items-center justify-center">
                <WalletAdd1 size={20} color="#000000" />
              </View>
              <Text className="text-xs font-medium text-neutral-700">Add money</Text>
            </Pressable>
            <Pressable className="items-center" onPress={() => setShowAccountOptions(true)}>
              <View className="h-11 w-11 rounded-full shadow-[inset_3px_0_6px_rgba(255,255,143,0.9),inset_0_3px_6px_rgba(255,255,143,0.9)] flex items-center justify-center">
                <InfoCircle size={20} color="#000000" />
              </View>
              <Text className="text-xs font-medium text-neutral-700">View Details</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* ——— Section 2: Main content (White) ——— Invite / Verify + Grid + Carousel */}
      <View className="flex-1 bg-white px-4 py-5">
        {/* Invite friends banner – only after verification */}
        {isVerified && (
          <View className="mb-4 rounded-2xl bg-[#eaf7f3] px-4 py-3 flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-xs font-semibold text-neutral-900 mb-1">
                Earn 15 EUR when you refer your friends.
              </Text>
              <Text className="text-[11px] text-neutral-600 mb-3">
                You earn when they make their first international transfer of 100 EUR or more.
              </Text>
              <View className="flex-row items-center gap-3">
                <Pressable className="px-3 py-1 rounded-full bg-emerald-500">
                  <Text className="text-[11px] font-semibold text-white">Invite friends</Text>
                </Pressable>
                <Pressable>
                  <Text className="text-[11px] text-neutral-500">Dismiss</Text>
                </Pressable>
              </View>
            </View>
            <View className="items-center justify-center">
        <Image
                source={InviteFriendImg}
                contentFit="contain"
                style={{ width: 90, height: 60 }}
              />
            </View>
          </View>
        )}

        {/* Verify identity card – hide after verification */}
        {!isVerified && (
          <Pressable
            className="flex-row items-center justify-between p-4 rounded-2xl bg-rose-50"
            onPress={() => router.push('/(auth)/verify-phone' as any)}
          >
            <View className="flex-row items-center gap-3 flex-1">
              <View className="h-11 w-11 rounded-full bg-white items-center justify-center">
                <ProfileAdd size={20} color="#000000"/>
              </View>
              <View className="flex-1">
                <Text className="text-[16px] tracking-wider font-medium text-black">Verify Your Identity</Text>
                <Text className="text-[15px] tracking-wider font-light text-neutral-500 mt-0.5">Submit your document to verify</Text>
              </View>
            </View>
            <View className=' items-center justify-center absolute right-2 top-2'>
              <ArrowRight size={24} color="#ef4444" className='-rotate-45 text-red-500 '/>
              <View className='h-[1.5px] w-[70%] bg-red-500 absolute right-[2.5px] bottom-0'/>
            </View>
          </Pressable>
        )}

        <View className="flex-row flex-wrap justify-between mt-6">
          {SERVICES.map((item) => (
            <Pressable
              key={item.id}
              className="w-[31%] mb-3 py-5 px-2 rounded-2xl bg-[#f5f6fa] flex flex-col items-center justify-center"
            >
              <View className='bg-white rounded-full p-3 mb-2'>
              <item.icon size={24} color="#000000" />

              </View>
              <Text className="text-[12px] font-regular tracking-wider text-[#686868] text-center" numberOfLines={2}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="mt-4 h-32 rounded-xl bg-secondarybg items-center justify-center">
          <Text className="text-sm text-neutral-600">Promotions & offers</Text>
        </View>
        <View className="flex-row justify-center items-center gap-2 pt-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <View
              key={i}
              className={`rounded-sm ${i === 3 ? 'h-1 w-4 bg-amber-500' : 'h-1 w-3 bg-neutral-300'}`}
            />
          ))}
        </View>
      </View>

      {/* Account options drop-up: backdrop appears immediately, sheet slides up */}
      <Modal
        visible={showAccountOptions}
        transparent
        animationType="none"
        onRequestClose={closeAccountOptions}
      >
        <View className="flex-1">
          <Pressable className="absolute inset-0 bg-black/40" onPress={closeAccountOptions} />
          <Animated.View
            className="absolute left-0 right-0 bottom-0 bg-white rounded-t-3xl px-6 pt-4 pb-8 shadow-lg"
            style={{ transform: [{ translateY: accountOptionsSheetSlide }] }}
          >
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View className="items-center mb-3">
                <View className="w-10 h-1 rounded-full bg-neutral-300" />
              </View>
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-base font-semibold text-neutral-900">Account Options</Text>
                <Pressable onPress={closeAccountOptions}>
                  <MaterialCommunityIcons name="close" size={20} color="#111827" />
                </Pressable>
              </View>
              <Pressable
                className="flex-row items-center justify-between py-3 border-b border-neutral-200"
                onPress={() => {
                  closeAccountOptions();
                  setTimeout(() => router.push('/account-limits' as any), 220);
                }}
              >
                <View className="flex-row items-center gap-3">
                  <MaterialCommunityIcons name="tune" size={18} color="#111827" />
                  <Text className="text-sm text-neutral-900">Account Limits</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={18} color="#9CA3AF" />
              </Pressable>
              <Pressable
                className="flex-row items-center justify-between py-3"
                onPress={() => {
                  closeAccountOptions();
                  setTimeout(() => router.push('/statements-history' as any), 220);
                }}
              >
                <View className="flex-row items-center gap-3">
                  <MaterialCommunityIcons name="file-document-outline" size={18} color="#111827" />
                  <Text className="text-sm text-neutral-900">Account Statement</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={18} color="#9CA3AF" />
              </Pressable>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>

      {/* Section 3: Bottom navigation — rendered by (tabs)/_layout.tsx */}
    </ScrollView>
  );
}
