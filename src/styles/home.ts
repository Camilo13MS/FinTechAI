import { StyleSheet } from "react-native";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    color: colors.surface,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.surface,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: colors.primary,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: colors.surface,
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
  outlineText: {
    color: colors.surface,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
