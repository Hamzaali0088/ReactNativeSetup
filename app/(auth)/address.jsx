import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const MOCK_ADDRESSES = [
  {
    id: '1',
    title: 'Calea Moșilor 209 Sectorul 2',
    subtitle: 'București, 020863 - 2 addresses',
  },
  {
    id: '2',
    title: 'Calea Moșilor',
    subtitle: 'Sectorul 2 020883 București - 2 addresses',
  },
];

export default function AddressScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [manualMode, setManualMode] = useState(false);

  const showList = query.trim().length > 0 && !manualMode && !selectedAddress;

  const canSave =
    manualMode || !!selectedAddress;

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-6 pt-16 pb-8">
        <Pressable
          className="mb-6 h-10 w-10 rounded-full bg-[#f5f6fa] items-center justify-center"
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#111111" />
        </Pressable>

        {/* Stepper – steps 1,2,3 active */}
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
          <View className="h-1 flex-1 flex-row items-center justify-center">
            <View className="h-1 flex-1 bg-emerald-500 rounded-r-full" />
            <View className="h-1 flex-1 bg-neutral-200" />
          </View>

          <View className="h-[22px] w-[22px] mx-[0.5px] rounded-full bg-neutral-200 items-center justify-center">
            <Text className="text-[15px] font-semibold text-neutral-400">4</Text>
          </View>
          <View className="h-1 flex-1 bg-neutral-200" />
        </View>

        <Text className="text-2xl font-semibold text-neutral-900 mb-2">
          What&apos;s your home address?
        </Text>
        <Text className="text-[14px] text-neutral-500 mb-4">
          Enter your home address. No P.O. Boxes.
        </Text>

        {/* Search / manual entry header */}
        {!manualMode && !selectedAddress && (
          <View className="flex-row items-center border border-neutral-200 rounded-xl px-4 py-3 bg-[#f5f6fa] mb-4">
            <MaterialCommunityIcons name="magnify" size={18} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-2 text-sm text-neutral-900"
              placeholder="Search address"
              value={query}
              onChangeText={(text) => {
                setQuery(text);
                setSelectedAddress(null);
              }}
            />
            {query ? (
              <Pressable onPress={() => setQuery('')}>
                <MaterialCommunityIcons name="close" size={18} color="#9CA3AF" />
              </Pressable>
            ) : null}
          </View>
        )}

        {/* Empty state */}
        {!manualMode && !selectedAddress && !showList && (
          <View className="flex-1 mt-6 bg-[#f5f6fa] rounded-2xl items-center justify-center py-16">
            <Text className="text-sm text-neutral-400">
              Relevant addresses will show here
            </Text>
          </View>
        )}

        {/* List results */}
        {showList && (
          <View className="mt-4">
            {MOCK_ADDRESSES.map((addr) => (
              <Pressable
                key={addr.id}
                className="flex-row items-center justify-between py-3 border-b border-neutral-100"
                onPress={() => setSelectedAddress(addr)}
              >
                <View className="flex-1 pr-4">
                  <Text className="text-sm font-medium text-neutral-900">{addr.title}</Text>
                  <Text className="text-xs text-neutral-500 mt-1">{addr.subtitle}</Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color="#9CA3AF"
                />
              </Pressable>
            ))}
            <View className="mt-4 pt-4 border-t border-neutral-100">
              <Text className="text-xs text-neutral-400 mb-1">
                Footer: Don&apos;t see your address?
              </Text>
              <Pressable onPress={() => setManualMode(true)}>
                <Text className="text-xs text-emerald-600 font-medium">
                  Enter your address manually instead
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Manual address form or selected address */}
        {(manualMode || selectedAddress) && (
          <View className="mt-4 bg-[#f5f6fa] rounded-xl p-4">
            {selectedAddress && !manualMode ? (
              <View className="mb-4 bg-white rounded-xl px-4 py-3">
                <Text className="text-sm font-medium text-neutral-900">
                  {selectedAddress.title}
                </Text>
                <Text className="text-xs text-neutral-500 mt-1">
                  {selectedAddress.subtitle}
                </Text>
              </View>
            ) : (
              <>
                <View className="mb-3">
                  <Text className="text-xs font-medium text-neutral-600 mb-2">
                    Address line 1
                  </Text>
                  <View className="border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50">
                    <TextInput
                      className="text-sm text-neutral-900"
                      placeholder="Address line 1"
                    />
                  </View>
                </View>
                <View className="mb-3">
                  <Text className="text-xs font-medium text-neutral-600 mb-2">
                    Address line 2
                  </Text>
                  <View className="border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50">
                    <TextInput
                      className="text-sm text-neutral-900"
                      placeholder="Address line 2"
                    />
                  </View>
                </View>
                <View className="mb-3">
                  <Text className="text-xs font-medium text-neutral-600 mb-2">City</Text>
                  <View className="border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50">
                    <TextInput className="text-sm text-neutral-900" placeholder="City" />
                  </View>
                </View>
                <View className="mb-3">
                  <Text className="text-xs font-medium text-neutral-600 mb-2">Country</Text>
                  <View className="border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50">
                    <TextInput className="text-sm text-neutral-900" placeholder="Country" />
                  </View>
                </View>
                <View className="mb-1">
                  <Text className="text-xs font-medium text-neutral-600 mb-2">
                    Postal code
                  </Text>
                  <View className="border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50">
                    <TextInput
                      className="text-sm text-neutral-900"
                      placeholder="Postal code"
                    />
                  </View>
                </View>
              </>
            )}
          </View>
        )}

        {/* Save button */}
        <Pressable
          className={`mt-6 rounded-full items-center justify-center py-4 ${
            canSave ? 'bg-yellow-400' : 'bg-yellow-200'
          }`}
          disabled={!canSave}
          onPress={() => router.push('/(auth)/verify-id-photo')}
        >
          <Text className="text-base font-semibold text-neutral-900">Save address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

