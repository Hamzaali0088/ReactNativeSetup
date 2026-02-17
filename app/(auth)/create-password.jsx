import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function CreatePasswordScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const minLengthOk = password.length >= 8 && password.length <= 20;
  const complexityOk = /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
  const passwordsMatch = password && password === confirmPassword;

  const canSubmit = minLengthOk && complexityOk && passwordsMatch && !loading;

  async function handleCreateAccount() {
    if (!canSubmit) return;
    setError('');
    setLoading(true);

    try {
      await axios.post('http://localhost:4000/auth/signup/complete', {
        email,
        password,
      });

      router.replace('/(tabs)');
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
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-2xl font-semibold text-neutral-900">Protect your account</Text>
          <Pressable>
            <Text className="text-xs font-semibold text-emerald-600">Get help</Text>
          </Pressable>
        </View>
        <Text className="text-sm text-neutral-500 mb-8">
          Enter a secure password with at least 8 characters, including one symbol and one number.
        </Text>

        <View className="mb-4">
          <Text className="text-xs font-medium text-neutral-600 mb-2">Create your password</Text>
          <View className="flex-row items-center border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50">
            <TextInput
              className="flex-1 text-sm text-neutral-900"
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable onPress={() => setShowPassword((prev) => !prev)}>
              <Text className="text-xs font-semibold text-emerald-600">
                {showPassword ? 'HIDE' : 'SHOW'}
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-xs font-medium text-neutral-600 mb-2">Confirm your password</Text>
          <View className="flex-row items-center border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50">
            <TextInput
              className="flex-1 text-sm text-neutral-900"
              placeholder="Password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Pressable onPress={() => setShowConfirmPassword((prev) => !prev)}>
              <Text className="text-xs font-semibold text-emerald-600">
                {showConfirmPassword ? 'HIDE' : 'SHOW'}
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="mt-2 mb-6">
          <View className="flex-row items-center mb-2">
            <View
              className={`h-3 w-3 rounded-full mr-2 ${
                minLengthOk ? 'bg-emerald-500' : 'border border-neutral-300'
              }`}
            />
            <Text className="text-xs text-neutral-600">Must be 8 - 20 characters</Text>
          </View>
          <View className="flex-row items-center">
            <View
              className={`h-3 w-3 rounded-full mr-2 ${
                complexityOk ? 'bg-emerald-500' : 'border border-neutral-300'
              }`}
            />
            <Text className="text-xs text-neutral-600">
              Must include at least one number or one special character (e.g. $%!)
            </Text>
          </View>
        </View>

        {error ? <Text className="text-xs text-red-500 mb-4">{error}</Text> : null}

        <Pressable
          className={`rounded-full items-center justify-center py-4 ${
            canSubmit ? 'bg-yellow-400' : 'bg-neutral-200'
          }`}
          disabled={!canSubmit}
          onPress={handleCreateAccount}
        >
          <Text className="text-base font-semibold text-neutral-900">
            {loading ? 'Creating...' : 'Create Account'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

