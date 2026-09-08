import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import WelcomeOverlay from "../../src/components/WelcomeOverlay";
import colors from "../../src/constants/colors";
import { login } from "../../src/services/auth.service";
import styles from "../../src/styles/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const router = useRouter();
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Ey 👀", "Completa todos los campos");
      return;
    }

    try {
      await login(email, password);
      setShowWelcome(true); // dispara la transición; la navegación ocurre en onFinish
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    // CAMBIO AQUÍ: Combinamos container (fondo) + scrollContent (padding y centrado)
    <View style={[styles.container, styles.scrollContent]}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <Text
        style={{
          color: colors.textSecondary,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Accede para gestionar tu plan móvil
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
        blurOnSubmit={false}
      />

      <TextInput
        ref={passwordRef}
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor={colors.textMuted}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        returnKeyType="go"
        onSubmitEditing={handleLogin}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => router.push("/(auth)/register")}>
        ¿No tienes cuenta? Regístrate
      </Text>

      {showWelcome && (
        <WelcomeOverlay
          message="¡Bienvenido de nuevo! 👋"
          onFinish={() => router.replace("/(tabs)")}
        />
      )}
    </View>
  );
}
