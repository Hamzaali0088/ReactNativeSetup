import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';

const DOCUMENT_OPTIONS = [
  {
    id: 'pay-slip',
    title: 'Pay slip',
    subtitle: 'We need 1 full month salary, and the month of pay must be within the last 3 months.',
  },
  {
    id: 'bank-statement',
    title: 'Bank statement',
    subtitle:
      'The bank statement end date must be in the last 30 days before upload, and must cover at least 3 months.',
  },
  {
    id: 'tax-return',
    title: 'Tax return',
    subtitle: 'Must be tax return from most recent tax year.',
  },
  {
    id: 'investment',
    title: 'Proof of investment/pension',
    subtitle: 'The statement must be issued in the last 3 months.',
  },
];

export default function AdditionalInformationScreen() {
  const router = useRouter();

  function handleSelect(type) {
    router.push({
      pathname: '/upload-proof-of-funds',
      params: { type },
    });
  }

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
        <Text className="text-sm text-neutral-600 mb-6">
          Select a proof of funds document to upload
        </Text>

        {DOCUMENT_OPTIONS.map((opt) => (
          <Pressable
            key={opt.id}
            className="mb-3 rounded-2xl bg-[#f5f6fa] px-4 py-4 flex-row items-center justify-between"
            onPress={() => handleSelect(opt.id)}
          >
            <View className="flex-1 pr-3">
              <Text className="text-sm font-semibold text-neutral-900 mb-1">{opt.title}</Text>
              <Text className="text-xs text-neutral-600">{opt.subtitle}</Text>
            </View>
            <Text className="text-xl text-neutral-400">{'>'}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

