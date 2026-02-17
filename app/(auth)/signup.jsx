import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleContinue() {
    if (!email || !agreed || loading) return;
    setError('');
    setLoading(true);

    try {
      await axios.post('http://localhost:4000/auth/signup/start', {
        email,
      });

      router.push({
        pathname: '/(auth)/verify-email',
        params: { email, mode: 'signup' },
      });
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Unable to create account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-6 pt-16 pb-8">
        <Text className="text-2xl font-semibold text-neutral-900 mb-2">
          Let&apos;s get started
        </Text>
        <Text className="text-sm text-neutral-500 mb-8">
          Enter your email address to set up your account
        </Text>

        <View className="mb-4">
          <Text className="text-xs font-medium text-neutral-600 mb-2">Email</Text>
          <View className="border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50">
            <TextInput
              className="text-sm text-neutral-900"
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <Pressable
          className="flex-row items-start mb-6"
          onPress={() => setAgreed((prev) => !prev)}
        >
          <View
            className={`h-5 w-5 mr-3 rounded border ${
              agreed ? 'bg-emerald-500 border-emerald-500' : 'border-neutral-300'
            }`}
          />
          <Text className="flex-1 text-xs text-neutral-500">
            By checking this box, you agree to our{' '}
            <Text className="text-emerald-600 underline">Terms of Service</Text> and{' '}
            <Text className="text-emerald-600 underline">Privacy Policy</Text>. This includes
            allowing us to verify your identity through your mobile provider and trusted third
            parties.
          </Text>
        </Pressable>

        {error ? (
          <Text className="text-xs text-red-500 mb-4">{error}</Text>
        ) : null}

        <Pressable
          className={`rounded-full items-center justify-center py-4 ${
            email && agreed ? 'bg-yellow-400' : 'bg-yellow-200'
          }`}
          disabled={!email || !agreed}
          onPress={handleContinue}
        >
          <Text className="text-base font-semibold text-neutral-900">
            {loading ? 'Sending code...' : 'Continue'}
          </Text>
        </Pressable>

        <View className="flex-row justify-center items-center mt-6">
          <Text className="text-xs text-neutral-500 mr-1">Have an account?</Text>
          <Pressable onPress={() => router.replace('/(auth)/login')}>
            <Text className="text-xs font-semibold text-emerald-600">Sign In</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

