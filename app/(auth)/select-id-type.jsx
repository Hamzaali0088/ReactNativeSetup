import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ID_OPTIONS = ['Passport', 'Residence Permit', 'Identity Card', 'Drivers License'];

export default function SelectIdTypeScreen() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState('');

  const canContinue = !!selectedId;

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-6 pt-16 pb-8">
        <Pressable
          className="mb-6 h-10 w-10 rounded-full bg-[#f5f6fa] items-center justify-center"
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#111111" />
        </Pressable>

        {/* Stepper – all 4 steps active */}
        <View className="flex-row items-center mb-8">
          <View className="h-1 flex-1 bg-emerald-500" />
          <View className="h-[22px] w-[22px] mx-[0.5px] rounded-full bg-emerald-500 items-center justify-center">
            <Text className="text-[15px] font-semibold text-white">1</Text>
          </View>
          <View className="h-1 flex-1 bg-emerald-500" />

          <View className="h-[22px] w-[22px] mx-[0.5px] rounded-full bg-emerald-500 items-center justify-center">
            <Text className="text-[15px] font-semibold text-white">2</Text>
          </View>
          <View className="h-1 flex-1 bg-emerald-500" />

          <View className="h-[22px] w-[22px] mx-[0.5px] rounded-full bg-emerald-500 items-center justify-center">
            <Text className="text-[15px] font-semibold text-white">3</Text>
          </View>
          <View className="h-1 flex-1 bg-emerald-500" />

          <View className="h-[22px] w-[22px] mx-[0.5px] rounded-full bg-emerald-500 items-center justify-center">
            <Text className="text-[15px] font-semibold text-white">4</Text>
          </View>
          <View className="h-1 flex-1 bg-emerald-500" />
        </View>

        <Text className="text-2xl font-semibold text-neutral-900 mb-2">
          Verify your identity
        </Text>
        <Text className="text-sm text-neutral-500 mb-6">
          Select the country of issuance to view the supporting documents we accept.
        </Text>

        {/* Issuing country card (static demo) */}
        <View className="bg-[#f5f6fa] rounded-2xl p-4 mb-6">
          <Text className="text-xs font-medium text-neutral-600 mb-3">
            Issuing country/Nationality
          </Text>
          <Pressable className="flex-row items-center justify-between bg-white rounded-xl px-4 py-3 border border-emerald-500">
            <View className="flex-row items-center gap-3">
              <View className="h-6 w-6 rounded-full bg-red-600" />
              <View>
                <Text className="text-sm font-semibold text-neutral-900">Romania</Text>
                <Text className="text-[11px] text-emerald-600">24 – 48 Hours</Text>
              </View>
            </View>
            <MaterialCommunityIcons name="chevron-down" size={18} color="#6B7280" />
          </Pressable>
        </View>

        {/* ID type options */}
        <View className="bg-[#f5f6fa] rounded-2xl p-4 mb-6">
          <Text className="text-xs font-medium text-neutral-600 mb-3">Select an ID type</Text>
          {ID_OPTIONS.map((label) => {
            const isActive = selectedId === label;
            return (
              <Pressable
                key={label}
                className={`flex-row items-center justify-between px-4 py-3 rounded-xl mb-3 ${
                  isActive ? 'bg-white border border-emerald-500' : 'bg-white border border-neutral-100'
                }`}
                onPress={() => setSelectedId(label)}
              >
                <View className="flex-row items-center gap-3">
                  <MaterialCommunityIcons
                    name="id-card"
                    size={18}
                    color={isActive ? '#059669' : '#6B7280'}
                  />
                  <Text className="text-sm text-neutral-900">{label}</Text>
                </View>
                <View
                  className={`h-4 w-4 rounded-full border-2 ${
                    isActive ? 'border-emerald-500 bg-emerald-500' : 'border-neutral-300'
                  }`}
                />
              </Pressable>
            );
          })}
        </View>

        <Pressable
          className={`mt-auto rounded-full items-center justify-center py-4 ${
            canContinue ? 'bg-yellow-400' : 'bg-yellow-200'
          }`}
          disabled={!canContinue}
          onPress={() => router.push('/(auth)/residency-selection')}
        >
          <Text className="text-base font-semibold text-neutral-900">Continue</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

