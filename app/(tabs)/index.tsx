import { View, Text, ScrollView, Pressable, Platform } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import { CircleFlag } from 'react-circle-flags';
import { Notification, DirectUp, WalletAdd1, InfoCircle, ProfileAdd, ArrowRight, Scan,DirectSend, Global, HomeTrendUp, ReceiptText, } from 'iconsax-react-native';
import { useRouter } from 'expo-router';

const SERVICES = [
  { id: 'sviftpay', label: 'SviftPay', icon: Scan },
  { id: 'topup', label: 'Mobile Top-up', icon: DirectSend },
  { id: 'travel', label: 'Travel', icon: Global },
  { id: 'merchant', label: 'Merchant', icon: HomeTrendUp },
  { id: 'bills', label: 'Bills', icon: ReceiptText },
  { id: 'gift', label: 'Gift Envelope', icon: ReceiptText },
];

export default function HomeScreen() {
  const userName = 'Khurram';
  const balance = '3634.22';
  const currency = 'EUR';
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ——— Section 1: Top (Yellow) ——— Header + Balance */}
      <View className="bg-primarybg pb-5  glassy-border"
      >
        <View className="flex-row items-center justify-between px-5 pt-14 pb-4">
          <View className="flex-row items-center gap-3">
            <View className="h-11 w-11 rounded-full bg-primary items-center justify-center"
            >
              <Text className="text-xl font-bold text-neutral-900">
                {userName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text className="text-[14px] text-amber-900/70 font-regular">Welcome</Text>
              <Text className="text-[16px] font-medium text-neutral-900">{userName}</Text>
            </View>
          </View>
          <Pressable className="h-11 w-11 rounded-full shadow-[inset_3px_0_6px_rgba(255,255,143,0.9),inset_0_3px_6px_rgba(255,255,143,0.9)] flex items-center justify-center ">
            <Notification size={20} color="#000000" />  
          </Pressable>
          
        </View>

        <View className="mx-4 mt-2 p-5 h-[170px] rounded-3xl bg-[#f9ed7b] border border-[#ffff8e]">
          <View className="flex-row items-start justify-between mb-5">
            <View>
              <Text className="text-sm text-neutral-600 mb-0.5">Total Balance</Text>
              <Text className="text-[22px] font-medium text-neutral-900">€{balance}</Text>
            </View>
            <Pressable className="flex-row h-9 rounded-full p-2 px-3 items-center gap-2 shadow-[inset_3px_0_6px_rgba(255,255,143,0.9),inset_0_3px_6px_rgba(255,255,143,0.9)]">
              <View className="h-[19.5px] w-[19.5px] rounded-full overflow-hidden border flex items-center justify-center">
                {Platform.OS === 'web' ? (
                  <CircleFlag countryCode="eu" height={20} width={20} />
                ) : (
                  <Text className="text-[11px]">🇪🇺</Text>
                )}
              </View>
              <Text className="text-[16px] font-medium text-black">{currency}</Text>
            </Pressable>
          </View>
          <View className="flex-row justify-between px-2">
            <Pressable className="items-center">
              <View className="h-11 w-11 rounded-full shadow-[inset_3px_0_6px_rgba(255,255,143,0.9),inset_0_3px_6px_rgba(255,255,143,0.9)] flex items-center justify-center">
                <DirectUp size={20} color="#000000" className='rotate-45' />
              </View>
              <Text className="text-base font-light text-black">Send money</Text>
            </Pressable>
            <Pressable className="items-center">
              <View className="h-11 w-11 rounded-full shadow-[inset_3px_0_6px_rgba(255,255,143,0.9),inset_0_3px_6px_rgba(255,255,143,0.9)] flex items-center justify-center">
                <WalletAdd1 size={20} color="#000000" />
              </View>
              <Text className="text-xs font-medium text-neutral-700">Add money</Text>
            </Pressable>
            <Pressable className="items-center">
              <View className="h-11 w-11 rounded-full shadow-[inset_3px_0_6px_rgba(255,255,143,0.9),inset_0_3px_6px_rgba(255,255,143,0.9)] flex items-center justify-center">
                <InfoCircle size={20} color="#000000" />
              </View>
              <Text className="text-xs font-medium text-neutral-700">View Details</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* ——— Section 2: Main content (White) ——— Verify + Grid + Carousel */}
      <View className="flex-1 bg-white px-4 py-5">
        <Pressable
          className="flex-row items-center justify-between p-4 rounded-2xl bg-rose-50"
          onPress={() => router.push('/(auth)/verify-phone' as any)}
        >
          <View className="flex-row items-center gap-3 flex-1">
            <View className="h-11 w-11 rounded-full bg-white items-center justify-center">
              <ProfileAdd size={20} color="#000000"/>
            </View>
            <View className="flex-1">
              <Text className="text-[16px] tracking-wider font-medium text-black">Verify Your Identity</Text>
              <Text className="text-[15px] tracking-wider font-light text-neutral-500 mt-0.5">Submit your document to verify</Text>
            </View>
          </View>
          <View className=' items-center justify-center absolute right-2 top-2'>
            <ArrowRight size={24} color="#ef4444" className='-rotate-45 text-red-500 '/>
            <View className='h-[1.5px] w-[70%] bg-red-500 absolute right-[2.5px] bottom-0'/>
          </View>
        </Pressable>

        <View className="flex-row flex-wrap justify-between mt-6">
          {SERVICES.map((item) => (
            <Pressable
              key={item.id}
              className="w-[31%] mb-3 py-5 px-2 rounded-2xl bg-[#f5f6fa] flex flex-col items-center justify-center"
            >
              <View className='bg-white rounded-full p-3 mb-2'>
              <item.icon size={24} color="#000000" />

              </View>
              <Text className="text-[12px] font-regular tracking-wider text-[#686868] text-center" numberOfLines={2}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="mt-4 h-32 rounded-xl bg-secondarybg items-center justify-center">
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
