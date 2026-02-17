import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <View className="flex-1 bg-yellow-400 items-center justify-center">
      <Text className="text-4xl font-bold text-black">Logo</Text>
    </View>
  );
}

