
import { StyleSheet, Text, View } from "react-native";

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
        <Text style={[styles.text, isUser && styles.userText]}>
          {text}
        </Text>
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
    backgroundColor: "#4F46E5",
    borderTopRightRadius: 0,
  },
  bot: {
    backgroundColor: "#E5E7EB",
    borderTopLeftRadius: 0,
  },
  text: {
    fontSize: 15,
    color: "#1F2937",
  },
  userText: {
    color: "#FFFFFF",
  },
});
