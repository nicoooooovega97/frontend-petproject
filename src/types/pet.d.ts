// src/types/pet.d.ts
interface Pet {
  id: string;
  name: string;
  species: "dog" | "cat" | "bird";
  birthDate: string;
  ownerId: string;
}