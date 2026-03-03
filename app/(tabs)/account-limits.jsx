import { View, Text, ScrollView, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { CircleFlag } from 'react-circle-flags';
import { ArrowLeft } from 'iconsax-react-native';

export default function AccountLimitsScreen() {
  const router = useRouter();

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

        <Text className="text-2xl font-semibold text-neutral-900 mb-1">EUR limits</Text>
        <Text className="text-sm text-neutral-500 mb-4">
          How much can you send and receive with your EUR Svift account
        </Text>

        <View className="flex-row items-center gap-2 mb-4">
          <View className="h-6 w-6 rounded-full overflow-hidden border border-neutral-200 items-center justify-center">
            {Platform.OS === 'web' ? (
              <CircleFlag countryCode="be" height={20} width={20} />
            ) : (
              <Text className="text-[11px]">🇧🇪</Text>
            )}
          </View>
          <Text className="text-sm font-medium text-neutral-900">Limit on send</Text>
        </View>

        <View className="h-[1px] w-full bg-emerald-500 mb-6" />

        {/* Single transaction limit */}
        <LimitCard
          title="Send Limit (Single transaction)"
          current="€5.000,00"
          total="€5.000,00"
          progress={1}
        />

        {/* Daily limit */}
        <LimitCard
          title="Daily Limit of €5.000,00"
          current="€0,00 / €5.000,00"
          total="€5.000,00 left"
          progress={0}
        />

        {/* Weekly limit */}
        <LimitCard
          title="Weekly Limit of €15.000,00"
          current="€6.522,61 / €5.000,00"
          total="€5.000,00 left"
          progress={0.6}
        />

        {/* Monthly limit */}
        <LimitCard
          title="Monthly Limit of €15.000,00"
          current="€9.644,31 / €5.000,00"
          total="€5.000,00 left"
          progress={0.8}
        />

        <Pressable
          className="mt-8 rounded-full bg-yellow-400 py-4 items-center justify-center"
          onPress={() => router.push('/additional-information')}
        >
          <Text className="text-sm font-semibold text-neutral-900">Increase limits</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function LimitCard({ title, current, total, progress }) {
  const clamped = Math.max(0, Math.min(progress, 1));

  return (
    <View className="mb-4 rounded-2xl bg-[#f5f6fa] px-4 py-4">
      <Text className="text-sm font-semibold text-neutral-900 mb-3">{title}</Text>
      <View className="h-1.5 rounded-full bg-neutral-200 overflow-hidden mb-3">
        <View
          className="h-1.5 rounded-full bg-yellow-400"
          style={{ width: `${clamped * 100}%` }}
        />
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-xs text-neutral-600">{current}</Text>
        <Text className="text-xs text-neutral-600">{total}</Text>
      </View>
    </View>
  );
}

