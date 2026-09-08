import { StyleSheet } from "react-native";
import colors from "../constants/colors";

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: colors.border,
  },
  statusBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.success, // Verde "Online"
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: colors.surface,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  userPlan: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: "hidden", // Necesario para el borderRadius en Text en Android a veces
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 15,
    marginLeft: 10,
  },
  menuItem: {
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primaryLight, // Un azul muy clarito
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  logoutButton: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: colors.dangerLight,
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: colors.danger,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});

export default profileStyles;
