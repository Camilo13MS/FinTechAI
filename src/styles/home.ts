import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D9488",
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
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#ddd",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: "#0D9488",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: "#fff",
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
  outlineText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
