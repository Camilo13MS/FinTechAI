import { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

type Props = {
  /** true cuando la app ya sabe a dónde navegar (auth resuelto + tiempo mínimo cumplido) */
  ready: boolean;
  /** se llama cuando termina el fade-out, para desmontar el overlay */
  onFinish: () => void;
};

const BAR_COLORS = [colors.primary, "#11A497", "#0FB4B0", colors.accent];

export default function AnimatedSplash({ ready, onFinish }: Props) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const barAnims = useRef(BAR_COLORS.map(() => new Animated.Value(0.3))).current;

  // Entrada del logo
  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 450,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Barras tipo "señal" en loop mientras carga
  useEffect(() => {
    const loops = barAnims.map((val, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 120),
          Animated.timing(val, {
            toValue: 1,
            duration: 350,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(val, {
            toValue: 0.3,
            duration: 350,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      )
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, []);

  // Fade-out cuando la app ya está lista
  useEffect(() => {
    if (!ready) return;
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 350,
      delay: 150,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) onFinish();
    });
  }, [ready]);

  return (
    <Animated.View
      pointerEvents={ready ? "none" : "auto"}
      style={[styles.container, { opacity: overlayOpacity }]}
    >
      <Animated.Image
        source={require("../../assets/images/icon.png")}
        style={[
          styles.logo,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
        resizeMode="contain"
      />

      <Text style={styles.appName}>FinTech Portal</Text>

      <View style={styles.barsRow}>
        {barAnims.map((val, i) => (
          <Animated.View
            key={i}
            style={[
              styles.bar,
              {
                backgroundColor: BAR_COLORS[i],
                transform: [
                  {
                    scaleY: val.interpolate({
                      inputRange: [0.3, 1],
                      outputRange: [0.4, 1],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 30,
    marginBottom: 18,
  },
  appName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 36,
    letterSpacing: 0.5,
  },
  barsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 28,
    gap: 8,
  },
  bar: {
    width: 10,
    height: 28,
    borderRadius: 4,
  },
});
