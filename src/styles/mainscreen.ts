import { StyleSheet } from "react-native";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    paddingTop: 40,
  },
  welcome: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 30,
  },
  cardPrimary: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  cardText: {
    color: colors.primaryLight,
    marginTop: 5,
  },
  cardTitleDark: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  cardTextDark: {
    color: colors.textSecondary,
    marginTop: 5,
  },
});

export default styles;
