export interface MedicalEntry {
  id: string;
  petId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  vet: string;
  notes?: string;
}

export type MedicalRecordType = 'CONSULTATION' | 'VACCINATION' | 'SURGERY';

export interface MedicalRecord {
  id: string;
  type: MedicalRecordType;
  date: string;
  diagnosis?: string;
  treatment?: string;
  vaccineType?: string;
  nextVaccinationDate?: string;
  surgeryType?: string;
  notes?: string;
  pet: {
    id: string;
    name: string;
  };
  vet: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecordInput {
  type: MedicalRecordType;
  date: string;
  petId: string;
  vetId: string;
  diagnosis?: string;
  treatment?: string;
  vaccineType?: string;
  nextVaccinationDate?: string;
  surgeryType?: string;
  notes?: string;
}