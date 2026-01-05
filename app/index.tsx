import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import HomeStyles from "../src/styles/home";

export default function Home() {
  const router = useRouter();

  return (
    <View style={HomeStyles.container}>
      <Text style={HomeStyles.title}>FinTech Portal</Text>

      <Text style={HomeStyles.subtitle}>Ingreso de clientes</Text>

      <TouchableOpacity
        style={HomeStyles.button}
        onPress={() => router.push("/(auth)/login")}
      >
        <Text style={HomeStyles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={HomeStyles.outlineButton}
        onPress={() => router.push("/(auth)/register")}
      >
        <Text style={HomeStyles.outlineText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

