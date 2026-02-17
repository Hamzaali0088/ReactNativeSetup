import { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { email, mode = 'signup' } = useLocalSearchParams();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChangeDigit(index, value) {
    const sanitized = value.replace(/[^0-9]/g, '').slice(-1);
    const updated = [...code];
    updated[index] = sanitized;
    setCode(updated);
  }

  async function handleVerify() {
    if (joinedCode.length !== 6 || loading) return;
    setError('');
    setLoading(true);

    try {
      const endpoint =
        mode === 'login'
          ? 'http://localhost:4000/auth/login/verify'
          : 'http://localhost:4000/auth/verify-email';

      await axios.post(endpoint, {
        email,
        code: joinedCode,
      });
      if (mode === 'login') {
        router.replace('/(tabs)');
      } else {
        router.push({
          pathname: '/(auth)/create-password',
          params: { email },
        });
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Unable to verify code');
    } finally {
      setLoading(false);
    }
  }

  const joinedCode = code.join('');

  return (
    <View className="flex-1 bg-white px-6 pt-16 pb-8">
      <Text className="text-2xl font-semibold text-neutral-900 mb-2">Check your email</Text>
      <Text className="text-sm text-neutral-500 mb-1">
        We sent a verification email to{' '}
        <Text className="font-semibold text-neutral-900">{email}</Text>
      </Text>
      <Pressable className="mb-8">
        <Text className="text-xs text-emerald-600 font-medium">
          Incorrect? <Text className="underline">Change email</Text>
        </Text>
      </Pressable>

      <View className="flex-row justify-between mb-4">
        {code.map((digit, index) => (
          <TextInput
            key={index}
            className="h-12 w-12 rounded-full border border-emerald-400 text-center text-lg font-semibold text-neutral-900"
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleChangeDigit(index, value)}
          />
        ))}
      </View>

      {error ? <Text className="text-xs text-red-500 mb-2">{error}</Text> : null}

      <Text className="text-xs text-emerald-600 mb-6">59s Remaining</Text>

      <Pressable
        className={`rounded-full items-center justify-center py-4 ${
          joinedCode.length === 6 ? 'bg-yellow-400' : 'bg-yellow-200'
        }`}
        disabled={joinedCode.length !== 6}
        onPress={handleVerify}
      >
        <Text className="text-base font-semibold text-neutral-900">
          {loading ? 'Verifying...' : 'Verify'}
        </Text>
      </Pressable>

      <View className="flex-row justify-end mt-4">
        <Pressable>
          <Text className="text-xs text-emerald-600 font-medium">Resend Code</Text>
        </Pressable>
      </View>
    </View>
  );
}

