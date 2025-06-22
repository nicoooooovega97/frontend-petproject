export const GET_MEDICAL_RECORDS = gql`
  query GetMedicalRecords($petId: ID!) {
    medicalRecords(petId: $petId) {
      id
      date
      vetName
    }
  }
`;