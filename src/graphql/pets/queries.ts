import { gql } from '@apollo/client';

export const GET_MY_PETS = gql`
  query GetMyPets {
    myPets {
      id
      name
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
export const GET_PET_DETAILS = gql`
  query GetPetDetails($id: ID!) {
    pet(id: $id) {
      id
      name
      breed
      age
      gender
      healthStatus
      photoUrl
      owner {
        id
        name
        email
      }
      medicalRecords {
        id
        date
        diagnosis
      }
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

