import { StyleSheet } from "react-native";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    justifyContent: "center",
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: colors.textPrimary,
  },
  input: {
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: colors.surface,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: colors.primary,
    fontWeight: "600",
  },
});

export default styles;
