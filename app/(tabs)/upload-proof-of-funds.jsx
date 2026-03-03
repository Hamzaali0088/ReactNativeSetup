import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';

function getTitleFromType(type) {
  switch (type) {
    case 'pay-slip':
      return 'Pay slip';
    case 'bank-statement':
      return 'Bank statement';
    case 'tax-return':
      return 'Tax return';
    case 'investment':
      return 'Proof of investment/pension';
    default:
      return 'Proof of funds document';
  }
}

export default function UploadProofOfFundsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const type = typeof params.type === 'string' ? params.type : '';
  const docTitle = getTitleFromType(type);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="px-6 pt-14 pb-4">
        <View className="flex-row items-center justify-between mb-6">
          <Pressable
            className="h-10 w-10 rounded-full bg-[#f5f6fa] items-center justify-center"
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="#111827" />
          </Pressable>
        </View>

        <Text className="text-2xl font-semibold text-neutral-900 mb-2">Additional information</Text>
        <Text className="text-sm text-neutral-700 mb-1">Upload proof of funds document</Text>
        <Text className="text-xs text-neutral-500 mb-6">
          Document type: <Text className="font-semibold text-neutral-900">{docTitle}</Text>
        </Text>

        <View className="mb-6">
          <Text className="text-sm font-semibold text-neutral-900 mb-2">
            Document requirements:
          </Text>
          <View className="gap-1">
            <Text className="text-xs text-neutral-600">• Contains your name</Text>
            <Text className="text-xs text-neutral-600">• Shows proof of funds</Text>
            <Text className="text-xs text-neutral-600">• Is from the past 3 months</Text>
            <Text className="text-xs text-neutral-600">
              • Password protected documents will not be accepted
            </Text>
          </View>
        </View>

        <Text className="text-sm font-semibold text-neutral-900 mb-3">
          Choose how to upload document
        </Text>

        <View className="gap-3 mb-8">
          <Pressable className="rounded-full bg-yellow-400 py-3 items-center justify-center">
            <Text className="text-sm font-semibold text-neutral-900">Take a photo</Text>
          </Pressable>
          <Pressable className="rounded-full border border-emerald-500 py-3 items-center justify-center">
            <Text className="text-sm font-semibold text-emerald-600">Upload a file</Text>
          </Pressable>
          <Pressable className="rounded-full border border-emerald-500 py-3 items-center justify-center">
            <Text className="text-sm font-semibold text-emerald-600">Upload an image</Text>
          </Pressable>
        </View>

        <Pressable className="rounded-full bg-yellow-400 py-4 items-center justify-center">
          <Text className="text-sm font-semibold text-neutral-900">Submit</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

