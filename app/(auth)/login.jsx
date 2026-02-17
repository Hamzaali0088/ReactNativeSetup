import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    if (!email || !password || loading) return;
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/auth/login', {
        email,
        password,
      });

      if (response.data.requiresVerification) {
        router.push({
          pathname: '/(auth)/verify-email',
          params: { email, mode: 'login' },
        });
      } else {
        router.replace('/(tabs)');
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Unable to login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-6 pt-16 pb-8">
        <Text className="text-2xl font-semibold text-neutral-900 mb-2">
          Login to your account
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

        <View className="mb-3">
          <Text className="text-xs font-medium text-neutral-600 mb-2">Password</Text>
          <View className="border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50">
            <TextInput
              className="text-sm text-neutral-900"
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <Pressable className="mb-6">
          <Text className="text-xs text-emerald-600 font-medium">
            Trouble logging in? <Text className="underline">Recover your account</Text>
          </Text>
        </Pressable>

        {error ? (
          <Text className="text-xs text-red-500 mb-4">{error}</Text>
        ) : null}

        <Pressable
          className="bg-yellow-400 rounded-full items-center justify-center py-4 mb-4"
          onPress={handleLogin}
        >
          <Text className="text-base font-semibold text-neutral-900">
            {loading ? 'Signing in...' : 'Continue'}
          </Text>
        </Pressable>

        <View className="flex-row justify-center items-center mb-6">
          <Text className="text-xs text-neutral-500 mr-1">Don&apos;t have an account?</Text>
          <Pressable onPress={() => router.push('/(auth)/signup')}>
            <Text className="text-xs font-semibold text-emerald-600">Sign up</Text>
          </Pressable>
        </View>

        <View className="flex-row items-center my-4">
          <View className="flex-1 h-px bg-neutral-200" />
          <Text className="mx-2 text-xs text-neutral-400">or</Text>
          <View className="flex-1 h-px bg-neutral-200" />
        </View>

        <View className="flex-row gap-3 mb-4">
          <Pressable className="flex-1 border border-neutral-200 rounded-full py-3 items-center bg-white">
            <Text className="text-sm font-medium text-neutral-800">Google</Text>
          </Pressable>
          <Pressable className="flex-1 bg-black rounded-full py-3 items-center">
            <Text className="text-sm font-medium text-white">Apple</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

