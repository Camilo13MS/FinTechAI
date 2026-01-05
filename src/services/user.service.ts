import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { UserProfile } from "../types/user"; // Asegúrate de que importas tu tipo
import { db } from "./firebase";

export const UserService = {
  /**
   * Crea el documento del usuario en Firestore justo después del registro
   */
  async createUserProfile(uid: string, data: { email: string; name: string; phone: string }) {
    try {
      await setDoc(doc(db, "users", uid), {
        email: data.email,
        name: data.name,
        phone: Number(data.phone), // Lo guardamos como número según tu estructura
        role: "cliente",
        plan: "Prepago Básico", // Valor por defecto
        createdAt: serverTimestamp(),
      });
      console.log("✅ Perfil creado en Firestore");
    } catch (error) {
      console.error("❌ Error creando perfil:", error);
      throw error;
    }
  },

  /**
   * Obtener datos del usuario actual
   */
  async getUserData(uid: string) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
  }
};