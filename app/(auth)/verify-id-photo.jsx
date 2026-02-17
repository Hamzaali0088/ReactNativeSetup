import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function VerifyIdPhotoScreen() {
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
          <View className="h-1 flex-1 flex-row items-center justify-center">
            <View className="h-1 flex-1 bg-emerald-500 rounded-r-full" />
            <View className="h-1 flex-1 bg-neutral-200" />
          </View>
        </View>

        <Text className="text-2xl font-semibold text-neutral-900 mb-2">
          Verify your identity
        </Text>
        <Text className="text-sm text-neutral-500 mb-6">
          To comply with regulations and prevent fraud, we require a photo of your ID and a selfie
          to verify your identity.
        </Text>

        {/* Tips for photo ID */}
        <View className="bg-[#f5f6fa] rounded-xl p-4 mb-4">
          <View className="flex-row items-center mb-2">
            <MaterialCommunityIcons
              name="card-account-details-outline"
              size={18}
              color="#22C55E"
            />
            <Text className="ml-2 text-sm font-semibold text-neutral-900">Tips for photo ID</Text>
          </View>
          <Text className="text-xs text-neutral-600 mb-1">
            • Ensure all text on the ID is readable.
          </Text>
          <Text className="text-xs text-neutral-600">
            • Make sure the entire ID is visible and there is no reflection on the ID.
          </Text>
        </View>

        {/* Tips for selfie */}
        <View className="bg-[#f5f6fa] rounded-xl p-4 mb-6">
          <View className="flex-row items-center mb-2">
            <MaterialCommunityIcons name="face-man-outline" size={18} color="#22C55E" />
            <Text className="ml-2 text-sm font-semibold text-neutral-900">Tips for selfie</Text>
          </View>
          <Text className="text-xs text-neutral-600 mb-1">
            • Use good lighting. Keep your face clearly visible.
          </Text>
          <Text className="text-xs text-neutral-600">
            • Remove anything obscuring your face (e.g. glasses, hats, scarves).
          </Text>
        </View>

        <Text className="text-[11px] text-neutral-500 mb-6">
          By clicking &quot;Continue&quot;, you agree to Svift&apos;s partner collecting and
          analyzing your biometric data for identity verification.
        </Text>

        <Pressable
          className="mt-auto rounded-full items-center justify-center py-4 bg-yellow-400"
          onPress={() => router.push('/(auth)/select-id-type')}
        >
          <Text className="text-base font-semibold text-neutral-900">Continue</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

