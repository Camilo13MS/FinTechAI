import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "@/src/constants/colors";
import { auth, db } from "../../src/services/firebase";
import styles from "../../src/styles/profile";
import { UserProfile } from "../../src/types/user";

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Verificar si hay usuario logueado
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setLoading(false);
      return;
    }

    // 2. Escuchar cambios en tiempo real en Firestore
    const userRef = doc(db, "users", currentUser.uid);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setUser({ uid: docSnap.id, ...docSnap.data() } as UserProfile);
      }
      setLoading(false);
    });

    // Limpiar suscripción al salir
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error al salir", error);
    }
  };

  const MenuOption = ({
    icon,
    title,
    onPress,
  }: {
    icon: any;
    title: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconBox}>
        <Ionicons name={icon} size={22} color={colors.primary} />
      </View>
      <Text style={styles.menuText}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {/* Avatar por defecto si no tiene imagen */}
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            style={styles.avatar}
          />
          <View style={styles.statusBadge} />
        </View>
        <Text style={styles.userName}>{user?.name || "Usuario"}</Text>

        {/* Aquí mostramos el teléfono y plan reales */}
        <Text style={styles.userPlan}>
          {user?.phone || "Sin número"} • {user?.plan || "Prepago Básico"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mi Cuenta</Text>
        <MenuOption
          icon="document-text-outline"
          title="Mis Facturas"
          onPress={() => router.push("/facturas")}
        />
        <MenuOption
          icon="stats-chart-outline"
          title="Consumo de Datos"
          onPress={() => router.push("/consumo")}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color={colors.danger} />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
