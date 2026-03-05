import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTH_KEYS = {
  email: 'email',
  name: 'name',
  accesstoken: 'accesstoken',
} as const;

export async function setAuthUser(data: {
  email: string;
  name?: string;
  accesstoken: string;
}) {
  await Promise.all([
    AsyncStorage.setItem(AUTH_KEYS.email, data.email),
    AsyncStorage.setItem(AUTH_KEYS.name, data.name ?? ''),
    AsyncStorage.setItem(AUTH_KEYS.accesstoken, data.accesstoken),
  ]);
}

export async function getAuthUser(): Promise<{
  email: string | null;
  name: string | null;
  accesstoken: string | null;
}> {
  const [email, name, accesstoken] = await Promise.all([
    AsyncStorage.getItem(AUTH_KEYS.email),
    AsyncStorage.getItem(AUTH_KEYS.name),
    AsyncStorage.getItem(AUTH_KEYS.accesstoken),
  ]);
  return { email, name, accesstoken };
}

export async function getAccessToken(): Promise<string | null> {
  const token = await AsyncStorage.getItem(AUTH_KEYS.accesstoken);
  if (token) return token;
  return AsyncStorage.getItem('svift_access_token');
}

export async function clearAuthUser() {
  await Promise.all([
    AsyncStorage.removeItem(AUTH_KEYS.email),
    AsyncStorage.removeItem(AUTH_KEYS.name),
    AsyncStorage.removeItem(AUTH_KEYS.accesstoken),
  ]);
}
