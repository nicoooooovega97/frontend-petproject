import { gql } from '@apollo/client';

export const ADD_PET_MUTATION = gql`
  mutation AddPet($input: PetInput!) {
    addPet(input: $input) {
      id
      name
      species
      breed
      age
      gender
      healthStatus
      photoUrl
      owner {
        id
        name
      }
    }
  }
`;

export const DELETE_PET_MUTATION = gql`
  mutation DeletePet($id: ID!) {
    deletePet(id: $id) {
      id
    }
  }
`;