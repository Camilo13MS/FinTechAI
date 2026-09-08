import { Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import colors from "../src/constants/colors";

export default function ConsumoScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen options={{ title: "Consumo de Datos" }} />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 16, color: colors.textSecondary }}>
          Esta funcionalidad aun sigue en desarrollo 😜
        </Text>
      </ScrollView>
    </View>
  );
}
