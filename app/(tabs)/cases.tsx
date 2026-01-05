import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { auth, db } from "../../src/services/firebase";
import styles from "../../src/styles/cases";
import { Case } from "../../src/types/case";

export default function Cases() {
  const [cases, setCases] = useState<Case[]>([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "cases"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Case[];

      setCases(data);
    });

    return unsubscribe;
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "#EF4444"; // rojo
      case "media":
        return "#F59E0B"; // amarillo
      default:
        return "#10B981"; // verde
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mis Casos 📋</Text>

      <ScrollView>
        {cases.length === 0 && (
          <Text>No tienes casos registrados aún 😌</Text>
        )}

        {cases.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.message}>{item.message}</Text>

            <View style={styles.metaRow}>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: getPriorityColor(item.priority) },
                ]}
              >
                <Text style={styles.badgeText}>
                  {item.priority.toUpperCase()}
                </Text>
              </View>

              <Text style={styles.status}>
                Estado: {item.status}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
