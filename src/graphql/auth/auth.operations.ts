import { gql } from '@apollo/client';

// ==================
//   MUTATIONS
// ==================

/**
 * Inicia sesión de un usuario.
 * Coincide con: login(input: LoginDto!): LoginResponseDto!
 */
export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginDto!) {
    login(input: $input) {
      accessToken
    }
  }
`;

/**
 * Registra un nuevo usuario.
 * Coincide con: register(input: RegisterDto!): UserDto!
 */
export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterDto!) {
    register(input: $input) {
      id
      email
      name
      lastName
    }
  }
`;

// ==================
//     QUERIES
// ==================

/**
 * Obtiene el perfil de un usuario por su ID.
 * Coincide con: getProfile(userId: String!): UserDto!
 */
export const GET_PROFILE_QUERY = gql`
  query GetProfile($userId: String!) {
    getProfile(userId: $userId) {
      id
      name
      lastName
      email
    }
  }
`;