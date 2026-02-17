import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/config';
import { ArrowLeft } from 'iconsax-react-native';

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
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
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
      <View className="flex-1 px-6 pt-16 pb-8 flex flex-col justify-between">
        <View className=''>
        <Pressable
          className="mb-6 h-10 w-10 rounded-full bg-[#f5f6fa] items-center justify-center"
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#111111" />
        </Pressable>
        <Text className="text-2xl font-semibold text-neutral-900 mb-2">
          Login to your account
        </Text>
        <Text className="text-[14px] tracking-wider font-regular text-neutral-500 mb-8 max-w-[240px]">
          Enter your email address to set up your account
        </Text>
        <View className="bg-[#f5f6fa] rounded-xl p-4 mb-6">
          <View className="mb-4">
            <Text className="text-xs font-medium text-neutral-600 mb-2">Email</Text>
            <View className="border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50 flex-row items-center gap-3">
              <MaterialCommunityIcons name="email-outline" size={18} color="#9CA3AF" />
              <TextInput
                className="flex-1 text-sm text-neutral-900 focus:outline-none"
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
            <View className="border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50 flex-row items-center gap-3">
              <MaterialCommunityIcons name="lock-outline" size={18} color="#9CA3AF" />
              <TextInput
                className="flex-1 text-sm text-neutral-900 focus:outline-none"
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
          <Pressable className="">
            <Text className="text-xs  font-regular">
              Trouble logging in? <Text className="underline text-emerald-600">Recover your account</Text>
            </Text>
          </Pressable>
        </View>
        </View>



        {error ? (
          <Text className="text-xs text-red-500 mb-4">{error}</Text>
        ) : null}

        <View className=' h-fit'>
          <Pressable
            className="bg-yellow-400 rounded-xl items-center justify-center py-4 mb-4"
            onPress={handleLogin}
          >
            <Text className="text-[14px] font-medium text-neutral-900">
              {loading ? 'Signing in...' : 'Continue'}
            </Text>
          </Pressable>

          <View className="flex-row justify-center items-center mb-6">
            <Text className="text-xs text-neutral-500 mr-1">Don&apos;t have an account?</Text>
            <Pressable onPress={() => router.push('/(auth)/signup')}>
              <Text className="text-xs font-semibold text-emerald-600">Sign up</Text>
            </Pressable>
          </View>

          <View className="flex-row gap-3 mb-4">
            <Pressable className="flex-1 border border-neutral-200 rounded-full py-3 items-center bg-white flex-row justify-center gap-2">
              <MaterialCommunityIcons name="google" size={18} color="#000000" />
              <Text className="text-sm font-medium text-neutral-800">Google</Text>
            </Pressable>
            <Pressable className="flex-1 bg-black rounded-full py-3 items-center flex-row justify-center gap-2">
              <MaterialCommunityIcons name="apple" size={18} color="#ffffff" />
              <Text className="text-sm font-medium text-white">Apple</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

