import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import colors from "../../src/constants/colors";
import { useAuth } from "../../src/hooks/useAuth";

export default function TabsLayout() {
  const { user, loading } = useAuth();

  if (!loading && !user) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          height: 70,
          paddingBottom: 10,
          paddingTop: 6,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: 2,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "index") iconName = "home";
          if (route.name === "chatbot") iconName = "chatbubbles";
          if (route.name === "cases") iconName = "folder";
          if (route.name === "perfil") iconName = "person";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Inicio" }} />
      <Tabs.Screen name="chatbot" options={{ title: "Asesor" }} />
      <Tabs.Screen name="cases" options={{ title: "Casos" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
