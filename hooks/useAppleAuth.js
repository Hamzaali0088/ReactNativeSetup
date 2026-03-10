import { Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as AppleAuthentication from 'expo-apple-authentication';
import axios from 'axios';
import { setAuthUser } from '@/lib/authStorage';
import { useProfilePhotoStore } from '@/lib/profilePhotoStore';
import { API_BASE_URL } from '@/lib/config';

export function useAppleAuth() {
  const router = useRouter();

  async function signInWithApple() {
    if (Platform.OS !== 'ios') {
      Alert.alert('Apple Sign-In', 'Apple login is only available on iOS for now.');
      return;
    }

    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const { identityToken, fullName, email } = credential;
      if (!identityToken) {
        Alert.alert('Apple Sign-In Failed', 'No identity token received.');
        return;
      }

      const fullNameObj =
        fullName?.givenName || fullName?.familyName
          ? {
              givenName: fullName?.givenName || '',
              familyName: fullName?.familyName || '',
            }
          : undefined;

      const result = await axios.post(`${API_BASE_URL}/auth/login/apple`, {
        identityToken,
        fullName: fullNameObj,
        email: email || undefined,
      });

      const { token, email: resEmail, name, profilePhotoUrl } = result.data || {};
      if (token && resEmail) {
        await setAuthUser({
          email: resEmail,
          name: name || '',
          accesstoken: token,
          profilePhotoUrl,
        });
        if (profilePhotoUrl) {
          useProfilePhotoStore.getState().setProfilePhotoUrl(profilePhotoUrl);
        }
        router.replace('/(tabs)');
      } else {
        Alert.alert('Login Failed', 'Could not complete Apple Sign-In.');
      }
    } catch (err) {
      if (err.code === 'ERR_REQUEST_CANCELED') {
        return;
      }
      console.error('Apple Sign-In error:', err);
      Alert.alert(
        'Sign-In Error',
        err?.response?.data?.message || err?.message || 'Apple Sign-In failed. Please try again.'
      );
    }
  }

  // Always show the Apple button so the UI is consistent across platforms.
  const showAppleButton = true;

  return { signInWithApple, showAppleButton };
}
