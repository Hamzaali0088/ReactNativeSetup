import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { useAppleAuth } from '@/hooks/useAppleAuth';

WebBrowser.maybeCompleteAuthSession();

export default function WelcomeScreen() {
  const router = useRouter();
  const { signInWithGoogle } = useGoogleAuth();
  const { signInWithApple, showAppleButton } = useAppleAuth();

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-6 pt-16 pb-10 justify-between">
        <View>
          <View className="items-center mb-4 mt-4">
            <Image
              source={require('../../assets/images/welcompage.png')}
              className="h-80 w-full"
            />
          </View>

          <View className="items-center mb-8">
            <Text className="text-2xl font-normal text-neutral-900 mb-2">
              Send Love Home
            </Text>
            <Text className="text-sm text-gray-900 font-extralight text-center max-w-[280px]">
              Trusted by over <Text className="font-semibold text-[#ccb835] italic">500,000</Text> people
              sending money to Africa &amp; Asia.
            </Text>
          </View>

          <Pressable
            className="mt-2 rounded-xl border border-yellow-400 py-3.5 items-center justify-center bg-white"
            onPress={() => router.push('/(auth)/login')}
          >
            <Text className="text-sm font-semibold text-neutral-900">Log in</Text>
          </Pressable>

          <View className="flex-row gap-3 mt-4">
            <Pressable
              className="flex-1 border border-neutral-200 rounded-full py-3 items-center bg-white flex-row justify-center gap-2"
              onPress={signInWithGoogle}
            >
              <MaterialCommunityIcons name="google" size={18} color="#000000" />
              <Text className="text-sm font-medium text-neutral-800">Google</Text>
            </Pressable>
            {showAppleButton && (
              <Pressable
                className="flex-1 bg-black rounded-full py-3 items-center flex-row justify-center gap-2"
                onPress={signInWithApple}
              >
                <MaterialCommunityIcons name="apple" size={18} color="#ffffff" />
                <Text className="text-sm font-medium text-white">Apple</Text>
              </Pressable>
            )}
          </View>
        </View>

        <View className="mt-10">
          <View className="flex-row items-center justify-center mb-3">
            <View className="flex-1 h-[1px] bg-neutral-200" />
            <Text className="mx-3 text-xs text-neutral-400">Or</Text>
            <View className="flex-1 h-[1px] bg-neutral-200" />
          </View>
          <Pressable
            className="rounded-full bg-yellow-400 py-4 items-center justify-center"
            onPress={() => router.push('/(auth)/signup')}
          >
            <Text className="text-sm font-semibold text-neutral-900">
              Create a new Account
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
