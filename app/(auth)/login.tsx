import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { login } from "../../src/services/auth.service";
import WelcomeOverlay from "../../src/components/WelcomeOverlay";
import styles from "../../src/styles/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const router = useRouter();

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
      <Text style={{color: '#666', marginBottom: 20, textAlign: 'center'}}>
        Accede para gestionar tu plan móvil
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
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