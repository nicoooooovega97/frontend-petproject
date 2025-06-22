import { gql } from '@apollo/client';


export const GET_MEDICAL_RECORDS = gql`
  query GetMedicalRecords($petId: ID!) {
    medicalRecords(petId: $petId) {
      id
      date
      diagnosis
      treatment
      vet
      notes
      petId
      createdAt
      updatedAt
    }
  }
`;