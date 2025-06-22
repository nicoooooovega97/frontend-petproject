import { gql } from '@apollo/client';

export const GET_MY_PETS = gql`
  query GetMyPets {
    myPets {
      id
      name
      breed
      age
      photoUrl
      healthStatus
    }
  }
`;

export const ADD_PET = gql`
  mutation AddPet($input: PetInput!) {
    addPet(input: $input) {
      id
      name
    }
  }
`;

