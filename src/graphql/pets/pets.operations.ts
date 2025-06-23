import { gql } from '@apollo/client';

// ==================
//   MUTATIONS
// ==================

/**
 * Crea una nueva mascota.
 * Coincide con: createPet(input: CreatePetInput!): Pet!
 */
export const CREATE_PET_MUTATION = gql`
  mutation CreatePet($input: CreatePetInput!) {
    createPet(input: $input) {
      id
      name
      breed
      age
      ownerId
      photoUrl
    }
  }
`;

/**
 * Actualiza una mascota existente.
 * Coincide con: updatePet(id: ID!, input: UpdatePetInput!): Pet!
 */
export const UPDATE_PET_MUTATION = gql`
  mutation UpdatePet($id: ID!, $input: UpdatePetInput!) {
    updatePet(id: $id, input: $input) {
      id
      name
      breed
      age
      photoUrl
    }
  }
`;

/**
 * Elimina una mascota.
 * Coincide con: deletePet(id: ID!): Boolean!
 * NOTA: No pide campos de vuelta porque devuelve un Booleano.
 */
export const DELETE_PET_MUTATION = gql`
  mutation DeletePet($id: ID!) {
    deletePet(id: $id)
  }
`;

// ==================
//     QUERIES
// ==================

/**
 * Obtiene los detalles de una mascota específica.
 * Coincide con: pet(id: ID!): Pet
 */
export const GET_PET_DETAILS_QUERY = gql`
  query GetPet($id: ID!) {
    pet(id: $id) {
      id
      name
      breed
      age
      photoUrl
      ownerId
    }
  }
`;

/**
 * Obtiene todas las mascotas de un dueño.
 * Coincide con: petsByOwner(ownerId: ID!): [Pet!]!
 */
export const GET_PETS_BY_OWNER_QUERY = gql`
  query GetPetsByOwner($ownerId: ID!) {
    petsByOwner(ownerId: $ownerId) {
      id
      name
      breed
      age
      photoUrl
    }
  }
`;