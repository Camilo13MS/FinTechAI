export type CaseCategory =
  | "facturacion"
  | "internet"
  | "senal"
  | "otro";

export type CasePriority =
  | "baja"
  | "media"
  | "alta";

export type CaseStatus =
  | "abierto"
  | "en_proceso"
  | "cerrado";

export interface Case {
  id?: string;
  userId: string;
  message: string;
  category: CaseCategory;
  priority: CasePriority;
  status: CaseStatus;
  createdAt: any;
}
