import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import AnimatedSplash from "../src/components/AnimatedSplash";
import { useAuth } from "../src/hooks/useAuth";

// Evita que el splash nativo se oculte solo; lo controlamos nosotros
SplashScreen.preventAutoHideAsync().catch(() => {});

const MIN_SPLASH_MS = 1200; // tiempo mínimo visible, para que no "parpadee"

export default function RootLayout() {
  const { loading } = useAuth();
  const [minTimeDone, setMinTimeDone] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setMinTimeDone(true), MIN_SPLASH_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // El splash nativo (estático) se apaga apenas React ya pintó nuestro
    // overlay animado encima, así no hay hueco en blanco entre los dos.
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  const appReady = !loading && minTimeDone;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>

      {showSplash && (
        <AnimatedSplash
          ready={appReady}
          onFinish={() => setShowSplash(false)}
        />
      )}
    </>
  );
}
