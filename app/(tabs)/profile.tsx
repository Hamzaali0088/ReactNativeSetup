import { View, Text, ScrollView, Pressable, Alert, ActivityIndicator, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  ArrowLeft,
  User,
  DocumentText,
  Lock1,
  Notification,
  Setting2,
  InfoCircle,
  Headphone,
  Logout,
  TickCircle,
  Camera,
} from 'iconsax-react-native';
import { getAuthUser, clearAuthUser, setProfilePhotoUrl, getAccessToken } from '@/lib/authStorage';
import { useProfilePhotoStore } from '@/lib/profilePhotoStore';
import { API_BASE_URL } from '@/lib/config';

const MENU_ITEMS = [
  { id: 'account', label: 'Account information', icon: User },
  { id: 'payment-reminder', label: 'Payment Reminder', icon: DocumentText },
  { id: 'security', label: 'Security and privacy', icon: Lock1 },
  { id: 'notifications', label: 'Notification preferences', icon: Notification },
  { id: 'payment-method', label: 'Payment Method', icon: Setting2 },
  { id: 'about', label: 'About', icon: InfoCircle },
  { id: 'help', label: 'Help and support', icon: Headphone },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [profilePhotoUrl, setProfilePhotoUrlState] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getAuthUser().then(({ name, email, profilePhotoUrl: url }) => {
      setUserName(name ?? 'User');
      setUserEmail(email ?? '');
      setProfilePhotoUrlState(url ?? null);
    }).catch(() => {});
  }, []);

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photos to upload a profile picture.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (result.canceled || !result.assets?.[0]) return;

    setUploading(true);
    try {
      const token = await getAccessToken();
      if (!token) {
        Alert.alert('Error', 'Please log in again.');
        return;
      }

      const asset = result.assets[0];
      const uri = asset.uri;
      const filename = 'photo.jpg';
      const mimeType = asset.mimeType || 'image/jpeg';

      const formData = new FormData();
      if (Platform.OS === 'web' && uri.startsWith('blob:')) {
        const response = await fetch(uri);
        const blob = await response.blob();
        formData.append('photo', new File([blob], filename, { type: mimeType }));
      } else {
        formData.append('photo', { uri, type: mimeType, name: filename } as any);
      }

      const response = await fetch(`${API_BASE_URL}/users/me/profile-photo`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Upload failed');
      }

      const data = await response.json();
      const newUrl = data.profilePhotoUrl;
      if (newUrl) {
        setProfilePhotoUrlState(newUrl);
        await setProfilePhotoUrl(newUrl);
        useProfilePhotoStore.getState().setProfilePhotoUrl(newUrl);
      }
    } catch (err) {
      Alert.alert('Upload failed', err instanceof Error ? err.message : 'Could not upload photo.');
    } finally {
      setUploading(false);
    }
  }

  async function handleLogout() {
    await clearAuthUser();
    useProfilePhotoStore.getState().setProfilePhotoUrl(null);
    router.replace('/(auth)/welcome' as never);
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Yellow header with back button */}
      <View className="bg-primarybg px-5 pt-14 pb-8">
        <Pressable
          className="h-10 w-10 rounded-full bg-white items-center justify-center mb-6"
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#111827" />
        </Pressable>

        {/* Profile picture */}
        <View className="items-center">
          <View className="relative">
            <Pressable
              onPress={handlePickImage}
              disabled={uploading}
              className="h-24 w-24 rounded-full overflow-hidden bg-neutral-300 items-center justify-center"
            >
              {profilePhotoUrl ? (
                <Image
                  source={{ uri: profilePhotoUrl }}
                  className="h-24 w-24 rounded-full"
                  contentFit="cover"
                />
              ) : (
                <Text className="text-4xl font-semibold text-neutral-600">
                  {userName.charAt(0).toUpperCase()}
                </Text>
              )}
              {uploading && (
                <View className="absolute inset-0 bg-black/40 items-center justify-center">
                  <ActivityIndicator size="small" color="#fff" />
                </View>
              )}
            </Pressable>
            <Pressable
              onPress={handlePickImage}
              disabled={uploading}
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary items-center justify-center border-2 border-white"
            >
              <Camera size={14} color="#111827" variant="Bold" />
            </Pressable>
          </View>
          <View className="flex-row items-center gap-2 mt-3">
            <Text className="text-xl font-bold text-neutral-900">{userName}</Text>
            <TickCircle size={18} color="#22C55E" variant="Bold" />
          </View>
          <Text className="text-sm text-neutral-500 mt-1">{userEmail}</Text>
        </View>
      </View>

      {/* Menu items */}
      <View className="px-4 py-4">
        {MENU_ITEMS.map((item) => (
          <Pressable
            key={item.id}
            className="flex-row items-center justify-between py-4 px-4 rounded-2xl bg-[#f5f6fa] mb-2 active:opacity-70"
          >
            <View className="flex-row items-center gap-3">
              <item.icon size={22} color="#374151" variant="Linear" />
              <Text className="text-[15px] font-medium text-neutral-900">
                {item.label}
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={22} color="#9CA3AF" />
          </Pressable>
        ))}

        {/* Log out */}
        <Pressable
          className="flex-row items-center justify-between py-4 px-4 rounded-2xl bg-[#f5f6fa] mt-2 active:opacity-70"
          onPress={handleLogout}
        >
          <View className="flex-row items-center gap-3">
            <Logout size={22} color="#EF4444" variant="Linear" />
            <Text className="text-[15px] font-medium text-red-500">Log out</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={22} color="#9CA3AF" />
        </Pressable>
      </View>
    </ScrollView>
  );
}
