import { gql } from '@apollo/client';

// ==================
//   MUTATIONS
// ==================

/**
 * Crea una entrada en el historial clínico.
 * Coincide con: createClinicalHistory(input: CreateClinicalHistoryDto!): ClinicalHistoryDto!
 */
export const CREATE_CLINICAL_HISTORY_MUTATION = gql`
  mutation CreateClinicalHistory($input: CreateClinicalHistoryDto!) {
    createClinicalHistory(input: $input) {
      id
      description
      diagnosis
      date
      petId
      userId
    }
  }
`;

/**
 * Actualiza una entrada del historial clínico.
 * Coincide con: updateClinicalHistory(id: String!, input: UpdateClinicalHistoryDto!): ClinicalHistoryDto!
 */
export const UPDATE_CLINICAL_HISTORY_MUTATION = gql`
  mutation UpdateClinicalHistory($id: String!, $input: UpdateClinicalHistoryDto!) {
    updateClinicalHistory(id: $id, input: $input) {
      id
      description
      diagnosis
    }
  }
`;

/**
 * Elimina una entrada del historial clínico.
 * Coincide con: deleteClinicalHistory(id: String!): Boolean!
 */
export const DELETE_CLINICAL_HISTORY_MUTATION = gql`
  mutation DeleteClinicalHistory($id: String!) {
    deleteClinicalHistory(id: $id)
  }
`;

// ==================
//     QUERIES
// ==================

/**
 * Obtiene el historial clínico de una mascota específica.
 * Coincide con: getClinicalHistoryByPetId(petId: String!): [ClinicalHistoryDto!]!
 */
export const GET_HISTORY_BY_PET_ID_QUERY = gql`
  query GetClinicalHistoryByPetId($petId: String!) {
    getClinicalHistoryByPetId(petId: $petId) {
      id
      date
      description
      diagnosis
      treatmentType
      veterinarianName
      veterinaryClinic
      petId
      userId
    }
  }
`;

/**
 * Obtiene todo el historial clínico de un usuario.
 * Coincide con: getClinicalHistoryByUserId(userId: String!): [ClinicalHistoryDto!]!
 */
export const GET_HISTORY_BY_USER_ID_QUERY = gql`
  query GetClinicalHistoryByUserId($userId: String!) {
    getClinicalHistoryByUserId(userId: $userId) {
      id
      date
      description
      petId
    }
  }
`;