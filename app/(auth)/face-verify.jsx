import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function FaceVerifyScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-6 pt-16 pb-8">
        <Pressable
          className="mb-6 h-10 w-10 rounded-full bg-[#f5f6fa] items-center justify-center"
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#111111" />
        </Pressable>

        <Text className="text-2xl font-semibold text-neutral-900 mb-2">Set up Face ID</Text>
        <Text className="text-sm text-neutral-500 mb-8">
          Unlock with your Face ID, quick and secured.
        </Text>

        <View className="items-center mb-8">
          <View className="h-48 w-48 rounded-full bg-[#FFF7CC] items-center justify-center">
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={96}
              color="#FACC15"
            />
          </View>
        </View>

        <Pressable
          className="mt-auto rounded-full items-center justify-center py-4 bg-yellow-400"
          onPress={() => router.push('/(auth)/face-verify-scan')}
        >
          <Text className="text-base font-semibold text-neutral-900">Scan My Face</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

