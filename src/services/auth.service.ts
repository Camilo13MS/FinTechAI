import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, } from "firebase/auth";
import { auth } from "./firebase";
import { UserService } from "./user.service";

export const login = async (
  email: string,
  password: string
): Promise<User> => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
};

export const register = async (
  email: string,
  password: string,
  name: string,
  phone: string
): Promise<User> => {
  try {
    // 1. Crear usuario en Auth (Login)
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // 2. Crear documento en Firestore (Base de datos)
    await UserService.createUserProfile(user.uid, {
      email,
      name,
      phone
    });

    return user;
  } catch (error) {
    console.error("Error en proceso de registro:", error);
    throw error; // Lanzamos el error para que la vista lo muestre
  }
};

export const logout = async () => {
  await signOut(auth);
};

