import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { getAccessToken } from '@/lib/authStorage';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      try {
        const token = await getAccessToken();
        const target = token ? '/(tabs)' : '/(auth)/welcome';
        if (!isMounted) return;
        setTimeout(() => {
          if (isMounted) {
            router.replace(target);
          }
        }, 3000);
      } catch (e) {
        if (isMounted) {
          setTimeout(() => router.replace('/(auth)/welcome'), 3000);
        }
      }
    }

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <View className="flex-1 bg-yellow-400 items-center justify-center">
      <Text className="text-4xl font-bold text-black">Logo</Text>
    </View>
  );
}

