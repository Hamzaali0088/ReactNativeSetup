import { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function VerifyCardScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

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
      // Capture the card image (front of ID or card).
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      // TODO: upload or process `photo.uri` as needed.
      // Show 5s loading then go to face-verify page.
      setVerifying(true);
      setTimeout(() => {
        router.push('/(auth)/face-verify');
      }, 5000);
    } finally {
      setIsCapturing(false);
    }
  }

  return (
    <View className="flex-1 bg-black">
      {/* Camera preview */}
      <CameraView
        ref={cameraRef}
        className="flex-1"
        facing="back"
      />

      {/* Back button */}
      <Pressable
        className="absolute top-16 left-6 h-10 w-10 rounded-full bg-[#f5f6fa] items-center justify-center"
        onPress={() => router.back()}
      >
        <ArrowLeft size={20} color="#111111" />
      </Pressable>

      {/* Bottom sheet: capture vs loading */}
      <View className="absolute left-0 right-0 bottom-0 rounded-t-3xl bg-white px-6 pt-4 pb-8">
        <View className="items-center mb-3">
          <View className="h-1 w-12 rounded-full bg-neutral-300" />
        </View>

        {verifying ? (
          <>
            <Text className="text-center text-3xl font-semibold text-yellow-400 mb-2">95%</Text>
            <Text className="text-center text-sm text-neutral-700 mb-4">
              Verifying your card…
            </Text>
          </>
        ) : (
          <>
            <Text className="text-center text-base font-semibold text-neutral-900 mb-2">
              Verify Your Card
            </Text>
            <Text className="text-xs text-neutral-600 mb-1 text-center">
              Hold your card within the frame and make sure all details are visible.
            </Text>
            <Text className="text-xs text-neutral-600 mb-4 text-center">
              Avoid glare and reflections. Ensure the image is clear and not blurry.
            </Text>

            <Pressable
              className={`mt-2 rounded-full items-center justify-center py-4 ${
                isCapturing ? 'bg-yellow-200' : 'bg-yellow-400'
              }`}
              disabled={isCapturing}
              onPress={handleCapture}
            >
              <Text className="text-base font-semibold text-neutral-900">
                {isCapturing ? 'Capturing…' : 'Capture card'}
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

