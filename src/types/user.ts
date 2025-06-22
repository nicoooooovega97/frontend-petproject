export interface UserProfile {
  id: string;
  name: string;
  email: string;
  rut?: string;
  phone?: string;
  petsCount: number;
  joinDate: string;
}