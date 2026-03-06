import { useEffect } from 'react';
import { Platform, View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from 'expo-image';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
import { setAuthUser } from '@/lib/authStorage';
import {
  API_BASE_URL,
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from '@/lib/config';

WebBrowser.maybeCompleteAuthSession();

// Web: use app origin. Native: use Expo Auth Proxy (must be in Google Console redirect URIs).
const isWeb = Platform.OS === 'web';
const redirectUri = isWeb
  ? AuthSession.makeRedirectUri()
  : 'https://auth.expo.io/@avalunas-organization/svift';

export default function WelcomeScreen() {
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      webClientId: GOOGLE_WEB_CLIENT_ID,
      androidClientId: GOOGLE_ANDROID_CLIENT_ID,
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      redirectUri,
      scopes: ['openid', 'profile', 'email'],
      responseType: 'token',
    },
    { authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth' },
  );

  useEffect(() => {
    console.log('[Google OAuth] Redirect URI to register:', redirectUri);
  }, []);

  useEffect(() => {
    if (!response) return;
    console.log('[Google OAuth] response.type:', response.type);
    console.log('[Google OAuth] response:', JSON.stringify(response, null, 2));

    if (response.type === 'success') {
      // access token can live in authentication.accessToken (native) or params.access_token (web)
      const accessToken =
        response.authentication?.accessToken ?? response.params?.access_token;
      if (accessToken) {
        authenticateWithBackend(accessToken);
      } else {
        console.warn('[Google OAuth] No access token in response', response);
        Alert.alert('Google Sign-In Failed', 'No access token received.');
      }
    } else if (response.type === 'error') {
      console.error('[Google OAuth] error:', response.error);
      Alert.alert('Google Sign-In Failed', response.error?.message ?? 'Please try again.');
    }
  }, [response]);

  async function authenticateWithBackend(accessToken) {
    try {
      let googleName = '';
      try {
        const userRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const googleUser = userRes.ok ? await userRes.json() : {};
        googleName = (googleUser.name && String(googleUser.name).trim())
          || [googleUser.given_name, googleUser.family_name].filter(Boolean).join(' ').trim()
          || (googleUser.email && googleUser.email.split('@')[0])
          || '';
      } catch (_) {
        // Fallback to backend if client-side fetch fails (e.g. CORS)
      }

      const result = await axios.post(`${API_BASE_URL}/auth/login/google`, { accessToken });
      const { token, email, name } = result.data || {};
      if (token && email) {
        await setAuthUser({
          email,
          name: googleName || name || '',
          accesstoken: token,
        });
        router.replace('/(tabs)');
      }
    } catch (err) {
      console.error('Google login failed', err);
      Alert.alert('Login Failed', 'Could not sign in with Google. Please try again.');
    }
  }

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-6 pt-16 pb-10 justify-between">
        <View>
          {/* Illustration placeholder */}
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

          {/* Log in primary button (outlined) */}
          <Pressable
            className="mt-2 rounded-xl border border-yellow-400 py-3.5 items-center justify-center bg-white"
            onPress={() => router.push('/(auth)/login')}
          >
            <Text className="text-sm font-semibold text-neutral-900">Log in</Text>
          </Pressable>

          {/* Social buttons */}
          <View className="flex-row gap-3 mt-4">
            <Pressable
              className="flex-1 border border-neutral-200 rounded-full py-3 items-center bg-white flex-row justify-center gap-2"
              onPress={() => promptAsync(isWeb ? {} : { useProxy: true })}
            >
              <MaterialCommunityIcons name="google" size={18} color="#000000" />
              <Text className="text-sm font-medium text-neutral-800">Google</Text>
            </Pressable>
            <Pressable className="flex-1 bg-black rounded-full py-3 items-center flex-row justify-center gap-2">
              <MaterialCommunityIcons name="apple" size={18} color="#ffffff" />
              <Text className="text-sm font-medium text-white">Apple</Text>
            </Pressable>
          </View>
        </View>

        {/* Create account */}
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

