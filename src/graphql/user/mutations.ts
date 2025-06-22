import { gql } from '@apollo/client';

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      email
      rut
      phone
      petsCount
      joinDate
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    me {
      id
      name
      email
      rut
      phone
      petsCount
      joinDate
    }
  }
`;

