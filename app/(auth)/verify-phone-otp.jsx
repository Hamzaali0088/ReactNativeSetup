import { useState, useRef } from 'react';
import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';

export default function VerifyPhoneOtpScreen() {
  const router = useRouter();
  const { phone = '' } = useLocalSearchParams();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  function handleChangeDigit(index, value) {
    const sanitized = value.replace(/[^0-9]/g, '').slice(-1);
    const updated = [...code];
    updated[index] = sanitized;
    setCode(updated);

     // Move focus to next input when a digit is entered
    if (sanitized && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  const joinedCode = code.join('');
  const canContinue = joinedCode.length === 6;

  function handleVerify() {
    if (!canContinue) return;
    // In a real app, call phone-OTP verify API here.
    router.push('/(auth)/basic-info');
  }

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-6 pt-16 pb-8">
        <Pressable
          className="mb-6 h-10 w-10 rounded-full bg-[#f5f6fa] items-center justify-center"
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#111111" />
        </Pressable>

        {/* Stepper – step 1 active */}
        <View className="flex-row items-center mb-8">
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
        <Text className="text-sm text-neutral-500 mb-8">
          We sent a 6-digit code to{' '}
          <Text className="font-semibold text-neutral-900">{phone}</Text>
        </Text>

        <View className="flex-row justify-between mb-4">
          {code.map((digit, index) => (
            <TextInput
              key={index}
              className="h-12 w-12 rounded-full border border-emerald-400 text-center text-lg font-semibold text-neutral-900"
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              onChangeText={(value) => handleChangeDigit(index, value)}
            />
          ))}
        </View>

        {error ? <Text className="text-xs text-red-500 mb-2">{error}</Text> : null}

        <Text className="text-xs text-emerald-600 mb-6">59s Remaining</Text>

        <Pressable
          className={`rounded-full items-center justify-center py-4 ${
            canContinue ? 'bg-yellow-400' : 'bg-yellow-200'
          }`}
          disabled={!canContinue}
          onPress={handleVerify}
        >
          <Text className="text-base font-semibold text-neutral-900">Continue</Text>
        </Pressable>

        <View className="flex-row justify-end mt-4">
          <Pressable>
            <Text className="text-xs text-emerald-600 font-medium">Resend Code</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

