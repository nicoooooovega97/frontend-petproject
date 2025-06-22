import { gql } from '@apollo/client';

export const CREATE_MEDICAL_RECORD = gql`
  mutation CreateMedicalRecord($input: MedicalRecordInput!) {
    createMedicalRecord(input: $input) {
      id
      type
      date
      diagnosis
      treatment
      vaccineType
      nextVaccinationDate
      surgeryType
      notes
      pet {
        id
        name
      }
      vet {
        id
        name
      }
    }
  }
`;

export const UPDATE_MEDICAL_RECORD = gql`
  mutation UpdateMedicalRecord($id: ID!, $input: MedicalRecordInput!) {
    updateMedicalRecord(id: $id, input: $input) {
      id
      type
      date
      diagnosis
      treatment
      vaccineType
      nextVaccinationDate
      surgeryType
      notes
    }
  }
`;