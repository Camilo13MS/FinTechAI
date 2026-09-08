import { StyleSheet } from "react-native";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.inputBackground,
    paddingTop: 10,
  },
  messages: {
    flex: 1,
    padding: 15,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
