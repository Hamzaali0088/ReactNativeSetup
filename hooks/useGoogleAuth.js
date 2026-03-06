import { useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { setAuthUser } from '@/lib/authStorage';
import {
  API_BASE_URL,
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from '@/lib/config';

WebBrowser.maybeCompleteAuthSession();

const isWeb = Platform.OS === 'web';
// storeClient = Expo Go, standalone/bare = real build
const isExpoGo = Constants.executionEnvironment === 'storeClient';
const useNativeSignIn = !isWeb && !isExpoGo;

if (useNativeSignIn) {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
  });
}

export function useGoogleAuth() {
  const router = useRouter();
  const webRedirectUri = AuthSession.makeRedirectUri();

  // Always call hook (rules of hooks) – only active on web / Expo Go
  const [, webResponse, webPromptAsync] = Google.useAuthRequest(
    {
      webClientId: GOOGLE_WEB_CLIENT_ID,
      androidClientId: GOOGLE_ANDROID_CLIENT_ID,
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      redirectUri: isWeb ? webRedirectUri : 'https://auth.expo.io/@avalunas-organization/svift',
      scopes: ['openid', 'profile', 'email'],
      responseType: 'token',
    },
    { authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth' },
  );

  useEffect(() => {
    if (useNativeSignIn || !webResponse) return;
    if (webResponse.type === 'success') {
      const accessToken =
        webResponse.authentication?.accessToken ?? webResponse.params?.access_token;
      if (accessToken) {
        handleBackendAuth(accessToken, '');
      } else {
        Alert.alert('Google Sign-In Failed', 'No access token received.');
      }
    } else if (webResponse.type === 'error') {
      Alert.alert('Google Sign-In Failed', webResponse.error?.message ?? 'Please try again.');
    }
  }, [webResponse]);

  async function handleBackendAuth(accessToken, googleName) {
    try {
      let name = googleName;
      if (!name) {
        try {
          const userRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const googleUser = userRes.ok ? await userRes.json() : {};
          name =
            (googleUser.name && String(googleUser.name).trim()) ||
            [googleUser.given_name, googleUser.family_name].filter(Boolean).join(' ').trim() ||
            (googleUser.email && googleUser.email.split('@')[0]) ||
            '';
        } catch (_) {}
      }

      const result = await axios.post(`${API_BASE_URL}/auth/login/google`, { accessToken });
      const { token, email, name: backendName } = result.data || {};
      if (token && email) {
        await setAuthUser({ email, name: name || backendName || '', accesstoken: token });
        router.replace('/(tabs)');
      }
    } catch (err) {
      Alert.alert('Login Failed', 'Could not sign in with Google. Please try again.');
    }
  }

  async function signInWithGoogle() {
    if (isWeb) {
      webPromptAsync();
      return;
    }

    if (useNativeSignIn) {
      // APK / dev build: native Google Sign-In (no redirect URIs needed)
      try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const userInfo = await GoogleSignin.signIn();
        const tokens = await GoogleSignin.getTokens();
        const accessToken = tokens.accessToken;
        if (!accessToken) {
          Alert.alert('Google Sign-In Failed', 'No access token received.');
          return;
        }
        const googleName = userInfo.data?.user?.name || userInfo.user?.name || '';
        await handleBackendAuth(accessToken, googleName);
      } catch (err) {
        console.error('Native Google Sign-In error:', JSON.stringify(err));
        Alert.alert('Sign-In Error', err?.message || JSON.stringify(err));
      }
      return;
    }

    // Expo Go only – proxy may not work
    webPromptAsync({ useProxy: true });
  }

  return { signInWithGoogle };
}
