import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function ResidencySelectionScreen() {
  const router = useRouter();
  const [selection, setSelection] = useState('');

  const canContinue = !!selection;

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

        <Text className="text-2xl font-semibold text-neutral-900 mb-6">
          I&apos;m a resident of or live in:
        </Text>

        {/* Globe icon */}
        <View className="items-center mb-6">
          <View className="h-16 w-16 rounded-full bg-yellow-400 items-center justify-center">
            <MaterialCommunityIcons name="earth" size={32} color="#111827" />
          </View>
        </View>

        {/* Country selection */}
        <View className="bg-[#f5f6fa] rounded-2xl p-4 mb-2">
          <Pressable
            className={`flex-row items-center justify-between px-4 py-3 rounded-xl mb-3 ${
              selection === 'global'
                ? 'bg-white border border-emerald-500'
                : 'bg-white border border-neutral-100'
            }`}
            onPress={() => setSelection('global')}
          >
            <View className="flex-row items-center gap-3">
              <MaterialCommunityIcons name="earth" size={18} color="#16A34A" />
              <Text className="text-sm text-neutral-900">All countries except USA</Text>
            </View>
            <View
              className={`h-4 w-4 rounded-full border-2 ${
                selection === 'global' ? 'border-emerald-500 bg-emerald-500' : 'border-neutral-300'
              }`}
            />
          </Pressable>

          <Pressable
            className={`flex-row items-center justify-between px-4 py-3 rounded-xl ${
              selection === 'usa'
                ? 'bg-white border border-emerald-500'
                : 'bg-white border border-neutral-100'
            }`}
            onPress={() => setSelection('usa')}
          >
            <View className="flex-row items-center gap-3">
              <View className="h-5 w-5 rounded-full bg-red-600" />
              <Text className="text-sm text-neutral-900">United States of America</Text>
            </View>
            <View
              className={`h-4 w-4 rounded-full border-2 ${
                selection === 'usa' ? 'border-emerald-500 bg-emerald-500' : 'border-neutral-300'
              }`}
            />
          </Pressable>
        </View>

        <Pressable
          className={`mt-auto rounded-full items-center justify-center py-4 ${
            canContinue ? 'bg-yellow-400' : 'bg-yellow-200'
          }`}
          disabled={!canContinue}
          onPress={() => router.push('/(auth)/verify-card')}
        >
          <Text className="text-base font-semibold text-neutral-900">Continue</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

