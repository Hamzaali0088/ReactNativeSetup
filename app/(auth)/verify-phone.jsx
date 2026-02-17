import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';

export default function VerifyPhoneScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');

  const canContinue = phone.trim().length > 0;

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-6 pt-16 pb-8">
        {/* Back button */}
        <Pressable
          className="mb-6 h-10 w-10 rounded-full bg-[#f5f6fa] items-center justify-center"
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#111111" />
        </Pressable>

        {/* Stepper – step 1 active */}
        <View className="flex-row items-center mb-8 ">
          <View className="h-1 flex-1 bg-emerald-500" />
          <View className="h-[22px] w-[22px] mx-[0.5px] rounded-full bg-emerald-500 items-center justify-center">
            <Text className="text-[15px] font-semibold text-white">1</Text>
          </View>
          <View className="h-1 flex-1 flex-row items-center justify-center">
            <View className="h-1 flex-1 bg-emerald-500 rounded-r-full" />
            <View className="h-1 flex-1 bg-neutral-200" />
          </View>

          <View className="h-[22px] w-[22px] mx-[0.5px] rounded-full bg-neutral-200 items-center justify-center">
            <Text className="text-[15px] font-semibold text-neutral-400">2</Text>
          </View>
          <View className="h-1 flex-1 bg-neutral-200" />

          <View className="h-[22px] w-[22px] mx-[0.5px] rounded-full bg-neutral-200 items-center justify-center">
            <Text className="text-[15px] font-semibold text-neutral-400">3</Text>
          </View>
          <View className="h-1 flex-1 bg-neutral-200" />

          <View className="h-[22px] w-[22px] mx-[0.5px] rounded-full bg-neutral-200 items-center justify-center">
            <Text className="text-[15px] font-semibold text-neutral-400">4</Text>
          </View>
          <View className="h-1 flex-1 bg-neutral-200" />
        </View>

        <Text className="text-2xl font-semibold text-neutral-900 mb-2">
          Verify your phone number
        </Text>
        <Text className="text-[14px] text-neutral-500 mb-8 max-w-[260px]">
          Enter your phone number to set up your account
        </Text>

        {/* Phone input card */}
        <View className="bg-[#f5f6fa] rounded-xl p-4 mb-6">
          <Text className="text-xs font-medium text-neutral-600 mb-2">Phone number</Text>
          <View className="flex-row items-center border border-neutral-200 rounded-xl bg-white">
            <Pressable className="flex-row items-center px-3 py-3 border-r border-neutral-200">
              <View className="h-6 w-6 rounded-full bg-red-600 mr-2" />
              <Text className="text-sm text-neutral-800">+32</Text>
            </Pressable>
            <TextInput
              className="flex-1 px-3 py-3 text-sm text-neutral-900"
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        {/* Spacer */}
        <View className="flex-1" />

        {/* Continue button */}
        <Pressable
          className={`rounded-full items-center justify-center py-4 ${
            canContinue ? 'bg-yellow-400' : 'bg-yellow-200'
          }`}
          disabled={!canContinue}
          onPress={() =>
            router.push({
              pathname: '/(auth)/verify-phone-otp',
              params: { phone },
            })
          }
        >
          <Text className="text-base font-semibold text-neutral-900">Continue</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

