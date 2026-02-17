import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function BasicInfoScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');

  const canContinue = firstName.trim() && lastName.trim() && email.trim() && dob.trim();

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-6 pt-16 pb-8">
        <Pressable
          className="mb-6 h-10 w-10 rounded-full bg-[#f5f6fa] items-center justify-center"
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#111111" />
        </Pressable>

        {/* Stepper – steps 1 & 2 active */}
        <View className="flex-row items-center mb-8">
          <View className="h-1 flex-1 bg-emerald-500" />
          <View className="h-[22px] w-[22px] mx-[0.5px] rounded-full bg-emerald-500 items-center justify-center">
            <Text className="text-[15px] font-semibold text-white">1</Text>
          </View>
          <View className="h-1 flex-1 bg-emerald-500" />

          <View className="h-[22px] w-[22px] mx-[0.5px] rounded-full bg-emerald-500 items-center justify-center">
            <Text className="text-[15px] font-semibold text-white">2</Text>
          </View>
          <View className="h-1 flex-1 flex-row items-center justify-center">
            <View className="h-1 flex-1 bg-emerald-500 rounded-r-full" />
            <View className="h-1 flex-1 bg-neutral-200" />
          </View>

          <View className="h-[22px] w-[22px] mx-[0.5px] rounded-full bg-neutral-200 items-center justify-center">
            <Text className="text-[15px] font-semibold text-neutral-400">3</Text>
          </View>
          <View className="h-1 flex-1 bg-neutral-200" />

          <View className="h-[22px] w-[22px] mx-[0.5px] rounded-full bg-neutral-200 items-center justify-center">
            <Text className="text-[15px] font-semibold text-neutral-400">4</Text>
          </View>
          <View className="h-1 flex-1 bg-neutral-200" />
        </View>

        <Text className="text-2xl font-semibold text-neutral-900 mb-2">Basic information</Text>

        <View className="bg-yellow-50 border border-yellow-200 rounded-md px-3 py-3 mb-6">
          <Text className="text-xs text-yellow-900">
            Enter your full legal name exactly as it appears on your government issued ID, no
            initials.
          </Text>
        </View>

        <View className="bg-[#f5f6fa] rounded-xl p-4 mb-6">
          <View className="mb-4 flex-row gap-3">
            <View className="flex-1">
              <Text className="text-xs font-medium text-neutral-600 mb-2">First name</Text>
              <View className="border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50">
                <TextInput
                  className="text-sm text-neutral-900"
                  placeholder="First name"
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-xs font-medium text-neutral-600 mb-2">
                Middle name (optional)
              </Text>
              <View className="border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50">
                <TextInput
                  className="text-sm text-neutral-900"
                  placeholder="Middle name"
                  value={middleName}
                  onChangeText={setMiddleName}
                />
              </View>
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-xs font-medium text-neutral-600 mb-2">Last name</Text>
            <View className="border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50">
              <TextInput
                className="text-sm text-neutral-900"
                placeholder="Last name"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-xs font-medium text-neutral-600 mb-2">Email address</Text>
            <View className="border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50 flex-row items-center gap-3">
              <MaterialCommunityIcons name="email-outline" size={18} color="#9CA3AF" />
              <TextInput
                className="flex-1 text-sm text-neutral-900"
                placeholder="Email address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View className="mb-2">
            <Text className="text-xs font-medium text-neutral-600 mb-2">Date of birth</Text>
            <View className="border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50 flex-row items-center gap-3">
              <MaterialCommunityIcons name="calendar-blank-outline" size={18} color="#9CA3AF" />
              <TextInput
                className="flex-1 text-sm text-neutral-900"
                placeholder="YYYY-MM-DD"
                value={dob}
                onChangeText={setDob}
              />
            </View>
          </View>
        </View>

        <Pressable
          className={`mt-4 rounded-full items-center justify-center py-4 ${
            canContinue ? 'bg-yellow-400' : 'bg-yellow-200'
          }`}
          disabled={!canContinue}
          onPress={() => router.push('/(auth)/address')}
        >
          <Text className="text-base font-semibold text-neutral-900">Continue</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

