import { gql } from '@apollo/client';

// ==================
//     QUERIES
// ==================

/**
 * Obtiene el perfil de un usuario por su ID.
 * Coincide con: getProfile(userId: String!): UserDto!
 *
 * ¡ESTA ES LA VERSIÓN CORREGIDA DE TU GET_USER_PROFILE!
 */
export const GET_USER_PROFILE_QUERY = gql`
  query GetUserProfile($userId: String!) {
    getProfile(userId: $userId) {
      id
      name
      lastName
      email
    }
  }
`;

// ==================
//   MUTATIONS
// ==================

// Por ahora no hay mutaciones de usuario en tu schema,
// así que esta sección queda vacía.