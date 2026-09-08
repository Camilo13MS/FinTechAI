import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

type Props = {
  text: string;
  from: "user" | "bot";
};

export default function ChatBubble({ text, from }: Props) {
  const isUser = from === "user";

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.botContainer,
      ]}
    >
      <View style={[styles.bubble, isUser ? styles.user : styles.bot]}>
        {!isUser && <Text style={styles.roleLabel}>🤖 Agente Bot</Text>}
        <Text style={[styles.text, isUser && styles.userText]}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    flexDirection: "row",
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  botContainer: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
  },
  user: {
    backgroundColor: colors.primary,
    borderTopRightRadius: 0,
  },
  bot: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 0,
  },
  roleLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 4,
  },
  text: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  userText: {
    color: colors.surface,
  },
});
