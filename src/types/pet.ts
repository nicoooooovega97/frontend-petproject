export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  healthStatus: 'HEALTHY' | 'TREATMENT';
  photoUrl?: string;
  owner?: {
    id: string;
    name: string;
  };
  medicalRecords?: Array<{
    id: string;
    date: string;
    diagnosis: string;
    treatment: string;
    vet: string;
  }>;
}