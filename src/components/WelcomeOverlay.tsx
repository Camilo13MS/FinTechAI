import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import colors from "../constants/colors";

type Props = {
  message: string;
  /** se llama cuando termina toda la animación, momento ideal para navegar */
  onFinish: () => void;
};

const BAR_COLORS = [
  colors.primary,
  colors.secondary,
  colors.tertiary,
  colors.accent,
];

export default function WelcomeOverlay({ message, onFinish }: Props) {
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const barAnims = useRef(BAR_COLORS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.sequence([
      // 1. el overlay tapa la pantalla
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      // 2. logo entra con rebote + texto
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        // 3. barras "se llenan" una a una, como confirmando conexión
        Animated.stagger(
          110,
          barAnims.map((val) =>
            Animated.timing(val, {
              toValue: 1,
              duration: 260,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
          ),
        ),
      ]),
      // 4. mini pausa para que se alcance a leer/ver antes de navegar
      Animated.delay(350),
    ]).start(({ finished }) => {
      if (finished) onFinish();
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: overlayOpacity }]}>
      <Animated.Image
        source={require("../../assets/images/icon.png")}
        style={[styles.logo, { transform: [{ scale: logoScale }] }]}
        resizeMode="contain"
      />

      <Animated.Text style={[styles.message, { opacity: textOpacity }]}>
        {message}
      </Animated.Text>

      <Animated.View style={[styles.barsRow, { opacity: textOpacity }]}>
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
                      inputRange: [0, 1],
                      outputRange: [0.3, 1],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 26,
    marginBottom: 16,
  },
  message: {
    color: colors.surface,
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 28,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  barsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 26,
    gap: 8,
  },
  bar: {
    width: 10,
    height: 26,
    borderRadius: 4,
  },
});
