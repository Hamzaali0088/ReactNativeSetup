import { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function FaceVerifyScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  useEffect(() => {
    // Simulate a 5s verification then finish.
    if (verifying) {
      const timer = setTimeout(() => {
        router.replace('/(tabs)');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [verifying, router]);

  if (!permission || !permission.granted) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-sm text-neutral-200">Requesting camera permission…</Text>
      </View>
    );
  }

  async function handleCapture() {
    if (isCapturing || !cameraRef.current) return;
    try {
      setIsCapturing(true);
      await cameraRef.current.takePictureAsync({ quality: 0.7 });
    } finally {
      setIsCapturing(false);
    }
  }

  return (
    <View className="flex-1 bg-black">
      {/* Front camera preview */}
      <CameraView ref={cameraRef} className="flex-1" facing="front" />

      {/* Back / close button */}
      <Pressable
        className="absolute top-16 left-6 h-10 w-10 rounded-full bg-[#f5f6fa] items-center justify-center"
        onPress={() => router.back()}
      >
        <ArrowLeft size={20} color="#111111" />
      </Pressable>

      {/* Bottom verifying sheet */}
      <View className="absolute left-0 right-0 bottom-0 rounded-t-3xl bg-white px-6 pt-4 pb-8">
        <View className="items-center mb-3">
          <View className="h-1 w-12 rounded-full bg-neutral-300" />
        </View>
        <Text className="text-center text-3xl font-semibold text-yellow-400 mb-2">95%</Text>
        <Text className="text-center text-sm text-neutral-700 mb-4">
          Verifying your face…
        </Text>

        <View className="flex-row items-center justify-center gap-8 mt-2">
          <Pressable
            className="h-10 w-10 rounded-full border border-neutral-300 items-center justify-center"
            onPress={handleCapture}
          >
            <Text className="text-xs text-neutral-700">📷</Text>
          </Pressable>
          <Pressable className="h-10 w-10 rounded-full bg-yellow-400 items-center justify-center">
            <Text className="text-lg text-neutral-900">✓</Text>
          </Pressable>
          <Pressable className="h-10 w-10 rounded-full border border-neutral-300 items-center justify-center">
            <Text className="text-xs text-neutral-700">💡</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

