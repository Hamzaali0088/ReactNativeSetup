import { View, Text, ScrollView, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const SERVICES = [
  { id: 'sviftpay', label: 'SviftPay', icon: 'credit-card-outline' as const },
  { id: 'topup', label: 'Mobile Top-up', icon: 'cellphone' as const },
  { id: 'travel', label: 'Travel', icon: 'earth' as const },
  { id: 'merchant', label: 'Merchant', icon: 'store-outline' as const },
  { id: 'bills', label: 'Bills', icon: 'file-document-outline' as const },
  { id: 'gift', label: 'Gift Envelope', icon: 'gift-outline' as const },
];

export default function HomeScreen() {
  const userName = 'Khurram';
  const balance = '3634.22';
  const currency = 'EUR';

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ——— Section 1: Top (Yellow) ——— Header + Balance */}
      <View className="bg-amber-300/80 pb-6 rounded-b-3xl">
        <View className="flex-row items-center justify-between px-5 pt-14 pb-4">
          <View className="flex-row items-center gap-3">
            <View className="h-12 w-12 rounded-full bg-amber-400 items-center justify-center">
              <Text className="text-xl font-bold text-neutral-900">
                {userName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text className="text-sm text-amber-900/70">Welcome</Text>
              <Text className="text-lg font-bold text-neutral-900">{userName}</Text>
            </View>
          </View>
          <Pressable className="h-10 w-10 rounded-full bg-amber-200 border border-amber-600/20 items-center justify-center">
            <MaterialCommunityIcons name="bell-outline" size={22} color="#111" />
            <View className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </Pressable>
        </View>

        <View className="mx-4 mt-2 p-5 rounded-3xl bg-amber-200/95 border border-amber-400/60">
          <View className="flex-row items-start justify-between mb-5">
            <View>
              <Text className="text-sm text-neutral-600 mb-0.5">Total Balance</Text>
              <Text className="text-3xl font-bold text-neutral-900">€{balance}</Text>
            </View>
            <Pressable className="flex-row items-center gap-2 px-3 py-2 rounded-full bg-white border border-amber-400/50">
              <Text className="text-base">🇪🇺</Text>
              <Text className="text-sm font-semibold text-neutral-800">{currency}</Text>
            </Pressable>
          </View>
          <View className="flex-row justify-between px-2">
            <Pressable className="items-center">
              <View className="h-14 w-14 rounded-full bg-amber-100 border border-amber-400/50 items-center justify-center mb-2">
                <MaterialCommunityIcons name="send" size={24} color="#111" />
              </View>
              <Text className="text-xs font-medium text-neutral-700">Send money</Text>
            </Pressable>
            <Pressable className="items-center">
              <View className="h-14 w-14 rounded-full bg-amber-100 border border-amber-400/50 items-center justify-center mb-2">
                <MaterialCommunityIcons name="wallet-plus-outline" size={24} color="#111" />
              </View>
              <Text className="text-xs font-medium text-neutral-700">Add money</Text>
            </Pressable>
            <Pressable className="items-center">
              <View className="h-14 w-14 rounded-full bg-amber-100 border border-amber-400/50 items-center justify-center mb-2">
                <MaterialCommunityIcons name="information-outline" size={24} color="#111" />
              </View>
              <Text className="text-xs font-medium text-neutral-700">View Details</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* ——— Section 2: Main content (White) ——— Verify + Grid + Carousel */}
      <View className="flex-1 bg-white mt-4 px-4 pb-6">
        <Pressable className="flex-row items-center justify-between p-4 rounded-2xl bg-rose-50 border border-rose-200/80">
          <View className="flex-row items-center gap-3 flex-1">
            <View className="h-12 w-12 rounded-full bg-rose-100 border border-rose-200 items-center justify-center">
              <MaterialCommunityIcons name="account-check-outline" size={24} color="#e11d48" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-neutral-900">Verify Your Identity</Text>
              <Text className="text-sm text-neutral-500 mt-0.5">Submit your document to verify</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="arrow-top-right" size={22} color="#374151" />
        </Pressable>

        <View className="flex-row flex-wrap justify-between mt-6">
          {SERVICES.map((item) => (
            <Pressable
              key={item.id}
              className="w-[31%] mb-3 py-5 px-2 rounded-2xl bg-white items-center border border-neutral-100 shadow-sm"
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={28}
                color="#737373"
                style={{ marginBottom: 10 }}
              />
              <Text className="text-xs font-medium text-neutral-800 text-center" numberOfLines={2}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="mt-4 h-32 rounded-3xl bg-amber-200/80 border border-amber-300/50 items-center justify-center">
          <Text className="text-sm text-neutral-600">Promotions & offers</Text>
        </View>
        <View className="flex-row justify-center items-center gap-2 pt-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <View
              key={i}
              className={`rounded-sm ${i === 3 ? 'h-1 w-4 bg-amber-500' : 'h-1 w-3 bg-neutral-300'}`}
            />
          ))}
        </View>
      </View>

      {/* Section 3: Bottom navigation — rendered by (tabs)/_layout.tsx */}
    </ScrollView>
  );
}
