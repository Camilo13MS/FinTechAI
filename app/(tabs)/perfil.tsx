import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { auth, db } from '../../src/services/firebase';
import styles from '../../src/styles/profile';
import { UserProfile } from '../../src/types/user';

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
      router.replace('/(auth)/login');
    } catch (error) {
      console.error("Error al salir", error);
    }
  };

  const MenuOption = ({ icon, title }: { icon: any, title: string }) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuIconBox}>
        <Ionicons name={icon} size={22} color="#4F46E5" />
      </View>
      <Text style={styles.menuText}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4F46E5" />
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
        <MenuOption icon="document-text-outline" title="Mis Facturas" />
        <MenuOption icon="stats-chart-outline" title="Consumo de Datos" />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#EF4444" />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}