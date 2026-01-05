import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../../src/styles/mainscreen";
import { UserProfile } from '../../src/types/user';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null); 

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>👋 Bienvenido </Text>
      <Text style={styles.subtitle}>
        ¿En qué podemos ayudarte hoy?
      </Text>

      <TouchableOpacity
        style={styles.cardPrimary}
        onPress={() => router.push("/(tabs)/chatbot")}
      >
        <Ionicons name="chatbubbles" size={32} color="#FFFFFF" />
        <Text style={styles.cardTitle}>Hablar con un asesor</Text>
        <Text style={styles.cardText}>
          Resuelve dudas o crea un caso automáticamente
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/(tabs)/cases")}
      >
        <Ionicons name="folder" size={28} color="#4F46E5" />
        <Text style={styles.cardTitleDark}>Mis casos</Text>
        <Text style={styles.cardTextDark}>
          Consulta el estado de tus solicitudes
        </Text>
      </TouchableOpacity>
    </View>
  );
}
