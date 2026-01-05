export type UserRole = "cliente" | "admin";

export interface UserProfile {
  uid: string; // El ID del documento
  email: string;
  name: string;
  phone: number;
  role: UserRole;
  createdAt: any;
  // Campos nuevos para la UI del perfil
  plan?: string; 
  dataUsage?: number; // Porcentaje de datos usados (ej: 0.7 para 70%)
}