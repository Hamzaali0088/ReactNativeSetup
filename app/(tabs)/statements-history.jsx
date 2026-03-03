import { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Modal, TextInput, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Profile, Calendar, DocumentText, Sms } from 'iconsax-react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function formatDate(day, month, year) {
  if (!day || !month || !year) return null;
  const d = String(day).padStart(2, '0');
  const m = typeof month === 'number' ? month : parseInt(month, 10) || 0;
  const mo = String(m).padStart(2, '0');
  return `${d}/${mo}/${year}`;
}

export default function StatementsHistoryScreen() {
  const router = useRouter();
  const [startDay, setStartDay] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endDay, setEndDay] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');
  const [dateDropupFor, setDateDropupFor] = useState(null); // 'start' | 'end' | null
  const [fileType, setFileType] = useState('PDF');
  const accountName = 'Khurram Iqbal';
  const email = 'oggoair@gmail.com';

  const startDisplay = formatDate(startDay, startMonth, startYear) || 'Select date';
  const endDisplay = formatDate(endDay, endMonth, endYear) || 'Select date';

  function openDateDropup(which) {
    setDateDropupFor(which);
  }

  const sheetSlide = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (dateDropupFor !== null) {
      sheetSlide.setValue(300);
      Animated.spring(sheetSlide, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    }
  }, [dateDropupFor]);

  function confirmDate() {
    handleCloseDateDropup();
  }

  function handleCloseDateDropup() {
    Animated.timing(sheetSlide, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setDateDropupFor(null));
  }

  const isStart = dateDropupFor === 'start';
  const day = isStart ? startDay : endDay;
  const setDay = isStart ? setStartDay : setEndDay;
  const month = isStart ? startMonth : endMonth;
  const setMonth = isStart ? setStartMonth : setEndMonth;
  const year = isStart ? startYear : endYear;
  const setYear = isStart ? setStartYear : setEndYear;

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
          <Pressable>
            <Text className="text-sm font-semibold text-emerald-600">Get help</Text>
          </Pressable>
        </View>

        <Text className="text-2xl font-semibold text-neutral-900 mb-6">Statements history</Text>

        <View className="rounded-2xl bg-white border border-neutral-200 overflow-hidden">
          <View className="flex-row items-center justify-between px-4 py-4 border-b border-neutral-100">
            <View className="flex-row items-center gap-3">
              <View className="h-9 w-9 rounded-full bg-[#f5f6fa] items-center justify-center">
                <Profile size={18} color="#374151" />
              </View>
              <Text className="text-sm text-neutral-600">Account</Text>
            </View>
            <Text className="text-sm font-medium text-neutral-900">{accountName}</Text>
          </View>

          <Pressable
            className="flex-row items-center justify-between px-4 py-4 border-b border-neutral-100"
            onPress={() => openDateDropup('start')}
          >
            <View className="flex-row items-center gap-3">
              <View className="h-9 w-9 rounded-full bg-[#f5f6fa] items-center justify-center">
                <Calendar size={18} color="#374151" />
              </View>
              <Text className="text-sm text-neutral-600">Starting period</Text>
            </View>
            <Text className="text-sm font-semibold text-emerald-600">{startDisplay}</Text>
          </Pressable>

          <Pressable
            className="flex-row items-center justify-between px-4 py-4 border-b border-neutral-100"
            onPress={() => openDateDropup('end')}
          >
            <View className="flex-row items-center gap-3">
              <View className="h-9 w-9 rounded-full bg-[#f5f6fa] items-center justify-center">
                <Calendar size={18} color="#374151" />
              </View>
              <Text className="text-sm text-neutral-600">Ending period</Text>
            </View>
            <Text className="text-sm font-semibold text-emerald-600">{endDisplay}</Text>
          </Pressable>

          <View className="flex-row items-center justify-between px-4 py-4 border-b border-neutral-100">
            <View className="flex-row items-center gap-3">
              <View className="h-9 w-9 rounded-full bg-[#f5f6fa] items-center justify-center">
                <DocumentText size={18} color="#374151" />
              </View>
              <Text className="text-sm text-neutral-600">File type</Text>
            </View>
            <Text className="text-sm font-semibold text-emerald-600">{fileType}</Text>
          </View>

          <View className="flex-row items-center justify-between px-4 py-4">
            <View className="flex-row items-center gap-3">
              <View className="h-9 w-9 rounded-full bg-[#f5f6fa] items-center justify-center">
                <Sms size={18} color="#374151" />
              </View>
              <Text className="text-sm text-neutral-600">Email</Text>
            </View>
            <Text className="text-sm font-medium text-neutral-900">{email}</Text>
          </View>
        </View>

        <Pressable className="mt-8 rounded-full bg-yellow-400 py-4 items-center justify-center">
          <Text className="text-sm font-semibold text-neutral-900">Request statement</Text>
        </Pressable>
      </View>

      {/* Select date dropup: backdrop appears immediately, sheet slides up */}
      <Modal
        visible={dateDropupFor !== null}
        transparent
        animationType="none"
        onRequestClose={handleCloseDateDropup}
      >
        <View className="flex-1">
          <Pressable
            className="absolute inset-0 bg-black/40"
            onPress={handleCloseDateDropup}
          />
          <Animated.View
            className="absolute left-0 right-0 bottom-0 bg-white rounded-t-3xl px-6 pt-4 pb-8"
            style={{ transform: [{ translateY: sheetSlide }] }}
          >
            <Pressable onPress={(e) => e.stopPropagation()}>
            <View className="items-center mb-3">
              <View className="w-10 h-1 rounded-full bg-neutral-300" />
            </View>
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-lg font-semibold text-neutral-900">Select date</Text>
              <Pressable onPress={handleCloseDateDropup}>
                <MaterialCommunityIcons name="close" size={24} color="#111827" />
              </Pressable>
            </View>

            <View className="flex-row gap-4 mb-6">
              <View className="flex-1">
                <Text className="text-xs font-medium text-neutral-600 mb-2">Day</Text>
                <TextInput
                  className="border border-neutral-200 rounded-xl px-3 py-3 text-neutral-900 text-base"
                  placeholder="DD"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  maxLength={2}
                  value={day}
                  onChangeText={setDay}
                />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-medium text-neutral-600 mb-2">Month</Text>
                <TextInput
                  className="border border-neutral-200 rounded-xl px-3 py-3 text-neutral-900 text-base"
                  placeholder="MM"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  maxLength={2}
                  value={month}
                  onChangeText={setMonth}
                />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-medium text-neutral-600 mb-2">Year</Text>
                <TextInput
                  className="border border-neutral-200 rounded-xl px-3 py-3 text-neutral-900 text-base"
                  placeholder="YYYY"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  maxLength={4}
                  value={year}
                  onChangeText={setYear}
                />
              </View>
            </View>

            <Pressable
              className="rounded-full bg-yellow-400 py-4 items-center justify-center"
              onPress={confirmDate}
            >
              <Text className="text-base font-semibold text-neutral-900">Confirm</Text>
            </Pressable>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>
    </ScrollView>
  );
}
