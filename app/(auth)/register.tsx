import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { register } from "../../src/services/auth.service";
import WelcomeOverlay from "../../src/components/WelcomeOverlay";
import styles from "../../src/styles/auth";

export default function Register() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const handleRegister = async () => {
    if (!name || !phone || !email || !password) {
      Alert.alert("Ey 👀", "Por favor completa todos los campos");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Seguridad 🔒", "La contraseña debe tener mínimo 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      await register(email, password, name, phone);
      setShowWelcome(true); // la navegación ocurre en onFinish del overlay
    } catch (err: any) {
      let msg = err.message;
      if (err.code === 'auth/email-already-in-use') msg = "Ese correo ya está registrado.";
      Alert.alert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent} // <--- Aquí usamos el nuevo estilo
      keyboardShouldPersistTaps="handled" // Recomendado para que el teclado no bloquee los taps
    >
      <Text style={styles.title}>Crear cuenta</Text>
      <Text style={{color: '#666', marginBottom: 20, textAlign: 'center'}}>
        Únete para gestionar tu plan móvil
      </Text>

      {/* Input Nombre */}
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        placeholderTextColor="#9CA3AF"
        value={name}
        onChangeText={setName}
      />

      {/* Input Teléfono */}
      <TextInput
        style={styles.input}
        placeholder="Número de celular"
        placeholderTextColor="#9CA3AF"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

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

      <TouchableOpacity 
        style={[styles.button, loading && { opacity: 0.7 }]} 
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creando cuenta..." : "Registrarme"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
        <Text style={styles.link}>
          ¿Ya tienes cuenta? <Text style={{ fontWeight: 'bold' }}>Inicia sesión</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>

    {showWelcome && (
      <WelcomeOverlay
        message={`¡Cuenta creada, ${name}! 🎉`}
        onFinish={() => router.replace("/(tabs)")}
      />
    )}
    </View>
  );
}