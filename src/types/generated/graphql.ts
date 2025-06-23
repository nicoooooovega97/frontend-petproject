import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type ClinicalHistoryDto = {
  __typename?: 'ClinicalHistoryDto';
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  diagnosis: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  petId: Scalars['String']['output'];
  treatmentType: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  veterinarianName: Scalars['String']['output'];
  veterinaryClinic: Scalars['String']['output'];
};

export type CreateClinicalHistoryDto = {
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  diagnosis: Scalars['String']['input'];
  petId: Scalars['String']['input'];
  treatmentType: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  veterinarianName: Scalars['String']['input'];
  veterinaryClinic: Scalars['String']['input'];
};

export type CreatePetInput = {
  age: Scalars['Int']['input'];
  breed: Scalars['String']['input'];
  name: Scalars['String']['input'];
  ownerId: Scalars['ID']['input'];
  photoUrl?: InputMaybe<Scalars['String']['input']>;
};

export type LoginDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponseDto = {
  __typename?: 'LoginResponseDto';
  accessToken: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createClinicalHistory: ClinicalHistoryDto;
  createPet: Pet;
  deleteClinicalHistory: Scalars['Boolean']['output'];
  deletePet: Scalars['Boolean']['output'];
  login: LoginResponseDto;
  register: UserDto;
  updateClinicalHistory: ClinicalHistoryDto;
  updatePet: Pet;
};


export type MutationCreateClinicalHistoryArgs = {
  input: CreateClinicalHistoryDto;
};


export type MutationCreatePetArgs = {
  input: CreatePetInput;
};


export type MutationDeleteClinicalHistoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginDto;
};


export type MutationRegisterArgs = {
  input: RegisterDto;
};


export type MutationUpdateClinicalHistoryArgs = {
  id: Scalars['String']['input'];
  input: UpdateClinicalHistoryDto;
};


export type MutationUpdatePetArgs = {
  id: Scalars['ID']['input'];
  input: UpdatePetInput;
};

export type Pet = {
  __typename?: 'Pet';
  age?: Maybe<Scalars['Int']['output']>;
  breed: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['ID']['output'];
  photoUrl?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getClinicalHistoryByPetId: Array<ClinicalHistoryDto>;
  getClinicalHistoryByUserId: Array<ClinicalHistoryDto>;
  getProfile: UserDto;
  pet?: Maybe<Pet>;
  petsByOwner: Array<Pet>;
};


export type QueryGetClinicalHistoryByPetIdArgs = {
  petId: Scalars['String']['input'];
};


export type QueryGetClinicalHistoryByUserIdArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetProfileArgs = {
  userId: Scalars['String']['input'];
};


export type QueryPetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPetsByOwnerArgs = {
  ownerId: Scalars['ID']['input'];
};

export type RegisterDto = {
  email: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UpdateClinicalHistoryDto = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  diagnosis?: InputMaybe<Scalars['String']['input']>;
  petId?: InputMaybe<Scalars['String']['input']>;
  treatmentType?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  veterinarianName?: InputMaybe<Scalars['String']['input']>;
  veterinaryClinic?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePetInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  breed?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UserDto = {
  __typename?: 'UserDto';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  input: LoginDto;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponseDto', accessToken: string } };

export type RegisterMutationVariables = Exact<{
  input: RegisterDto;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserDto', id: string, email: string, name: string, lastName?: string | null } };

export type GetProfileQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetProfileQuery = { __typename?: 'Query', getProfile: { __typename?: 'UserDto', id: string, name: string, lastName?: string | null, email: string } };

export type CreateClinicalHistoryMutationVariables = Exact<{
  input: CreateClinicalHistoryDto;
}>;


export type CreateClinicalHistoryMutation = { __typename?: 'Mutation', createClinicalHistory: { __typename?: 'ClinicalHistoryDto', id: string, description: string, diagnosis: string, date: any, petId: string, userId: string } };

export type UpdateClinicalHistoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateClinicalHistoryDto;
}>;


export type UpdateClinicalHistoryMutation = { __typename?: 'Mutation', updateClinicalHistory: { __typename?: 'ClinicalHistoryDto', id: string, description: string, diagnosis: string } };

export type DeleteClinicalHistoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteClinicalHistoryMutation = { __typename?: 'Mutation', deleteClinicalHistory: boolean };

export type GetClinicalHistoryByPetIdQueryVariables = Exact<{
  petId: Scalars['String']['input'];
}>;


export type GetClinicalHistoryByPetIdQuery = { __typename?: 'Query', getClinicalHistoryByPetId: Array<{ __typename?: 'ClinicalHistoryDto', id: string, date: any, description: string, diagnosis: string, treatmentType: string, veterinarianName: string, veterinaryClinic: string, petId: string, userId: string }> };

export type GetClinicalHistoryByUserIdQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetClinicalHistoryByUserIdQuery = { __typename?: 'Query', getClinicalHistoryByUserId: Array<{ __typename?: 'ClinicalHistoryDto', id: string, date: any, description: string, petId: string }> };

export type CreatePetMutationVariables = Exact<{
  input: CreatePetInput;
}>;


export type CreatePetMutation = { __typename?: 'Mutation', createPet: { __typename?: 'Pet', id: string, name: string, breed: string, age?: number | null, ownerId: string, photoUrl?: string | null } };

export type UpdatePetMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdatePetInput;
}>;


export type UpdatePetMutation = { __typename?: 'Mutation', updatePet: { __typename?: 'Pet', id: string, name: string, breed: string, age?: number | null, photoUrl?: string | null } };

export type DeletePetMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePetMutation = { __typename?: 'Mutation', deletePet: boolean };

export type GetPetQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPetQuery = { __typename?: 'Query', pet?: { __typename?: 'Pet', id: string, name: string, breed: string, age?: number | null, photoUrl?: string | null, ownerId: string } | null };

export type GetPetsByOwnerQueryVariables = Exact<{
  ownerId: Scalars['ID']['input'];
}>;


export type GetPetsByOwnerQuery = { __typename?: 'Query', petsByOwner: Array<{ __typename?: 'Pet', id: string, name: string, breed: string, age?: number | null, photoUrl?: string | null }> };

export type GetUserProfileQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserProfileQuery = { __typename?: 'Query', getProfile: { __typename?: 'UserDto', id: string, name: string, lastName?: string | null, email: string } };


export const LoginDocument = gql`
    mutation Login($input: LoginDto!) {
  login(input: $input) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterDto!) {
  register(input: $input) {
    id
    email
    name
    lastName
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetProfileDocument = gql`
    query GetProfile($userId: String!) {
  getProfile(userId: $userId) {
    id
    name
    lastName
    email
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables> & ({ variables: GetProfileQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export function useGetProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileSuspenseQueryHookResult = ReturnType<typeof useGetProfileSuspenseQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const CreateClinicalHistoryDocument = gql`
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
export type CreateClinicalHistoryMutationFn = Apollo.MutationFunction<CreateClinicalHistoryMutation, CreateClinicalHistoryMutationVariables>;

/**
 * __useCreateClinicalHistoryMutation__
 *
 * To run a mutation, you first call `useCreateClinicalHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClinicalHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClinicalHistoryMutation, { data, loading, error }] = useCreateClinicalHistoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateClinicalHistoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateClinicalHistoryMutation, CreateClinicalHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClinicalHistoryMutation, CreateClinicalHistoryMutationVariables>(CreateClinicalHistoryDocument, options);
      }
export type CreateClinicalHistoryMutationHookResult = ReturnType<typeof useCreateClinicalHistoryMutation>;
export type CreateClinicalHistoryMutationResult = Apollo.MutationResult<CreateClinicalHistoryMutation>;
export type CreateClinicalHistoryMutationOptions = Apollo.BaseMutationOptions<CreateClinicalHistoryMutation, CreateClinicalHistoryMutationVariables>;
export const UpdateClinicalHistoryDocument = gql`
    mutation UpdateClinicalHistory($id: String!, $input: UpdateClinicalHistoryDto!) {
  updateClinicalHistory(id: $id, input: $input) {
    id
    description
    diagnosis
  }
}
    `;
export type UpdateClinicalHistoryMutationFn = Apollo.MutationFunction<UpdateClinicalHistoryMutation, UpdateClinicalHistoryMutationVariables>;

/**
 * __useUpdateClinicalHistoryMutation__
 *
 * To run a mutation, you first call `useUpdateClinicalHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClinicalHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClinicalHistoryMutation, { data, loading, error }] = useUpdateClinicalHistoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateClinicalHistoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClinicalHistoryMutation, UpdateClinicalHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClinicalHistoryMutation, UpdateClinicalHistoryMutationVariables>(UpdateClinicalHistoryDocument, options);
      }
export type UpdateClinicalHistoryMutationHookResult = ReturnType<typeof useUpdateClinicalHistoryMutation>;
export type UpdateClinicalHistoryMutationResult = Apollo.MutationResult<UpdateClinicalHistoryMutation>;
export type UpdateClinicalHistoryMutationOptions = Apollo.BaseMutationOptions<UpdateClinicalHistoryMutation, UpdateClinicalHistoryMutationVariables>;
export const DeleteClinicalHistoryDocument = gql`
    mutation DeleteClinicalHistory($id: String!) {
  deleteClinicalHistory(id: $id)
}
    `;
export type DeleteClinicalHistoryMutationFn = Apollo.MutationFunction<DeleteClinicalHistoryMutation, DeleteClinicalHistoryMutationVariables>;

/**
 * __useDeleteClinicalHistoryMutation__
 *
 * To run a mutation, you first call `useDeleteClinicalHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClinicalHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClinicalHistoryMutation, { data, loading, error }] = useDeleteClinicalHistoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClinicalHistoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClinicalHistoryMutation, DeleteClinicalHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClinicalHistoryMutation, DeleteClinicalHistoryMutationVariables>(DeleteClinicalHistoryDocument, options);
      }
export type DeleteClinicalHistoryMutationHookResult = ReturnType<typeof useDeleteClinicalHistoryMutation>;
export type DeleteClinicalHistoryMutationResult = Apollo.MutationResult<DeleteClinicalHistoryMutation>;
export type DeleteClinicalHistoryMutationOptions = Apollo.BaseMutationOptions<DeleteClinicalHistoryMutation, DeleteClinicalHistoryMutationVariables>;
export const GetClinicalHistoryByPetIdDocument = gql`
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
 * __useGetClinicalHistoryByPetIdQuery__
 *
 * To run a query within a React component, call `useGetClinicalHistoryByPetIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClinicalHistoryByPetIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClinicalHistoryByPetIdQuery({
 *   variables: {
 *      petId: // value for 'petId'
 *   },
 * });
 */
export function useGetClinicalHistoryByPetIdQuery(baseOptions: Apollo.QueryHookOptions<GetClinicalHistoryByPetIdQuery, GetClinicalHistoryByPetIdQueryVariables> & ({ variables: GetClinicalHistoryByPetIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClinicalHistoryByPetIdQuery, GetClinicalHistoryByPetIdQueryVariables>(GetClinicalHistoryByPetIdDocument, options);
      }
export function useGetClinicalHistoryByPetIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClinicalHistoryByPetIdQuery, GetClinicalHistoryByPetIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClinicalHistoryByPetIdQuery, GetClinicalHistoryByPetIdQueryVariables>(GetClinicalHistoryByPetIdDocument, options);
        }
export function useGetClinicalHistoryByPetIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetClinicalHistoryByPetIdQuery, GetClinicalHistoryByPetIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetClinicalHistoryByPetIdQuery, GetClinicalHistoryByPetIdQueryVariables>(GetClinicalHistoryByPetIdDocument, options);
        }
export type GetClinicalHistoryByPetIdQueryHookResult = ReturnType<typeof useGetClinicalHistoryByPetIdQuery>;
export type GetClinicalHistoryByPetIdLazyQueryHookResult = ReturnType<typeof useGetClinicalHistoryByPetIdLazyQuery>;
export type GetClinicalHistoryByPetIdSuspenseQueryHookResult = ReturnType<typeof useGetClinicalHistoryByPetIdSuspenseQuery>;
export type GetClinicalHistoryByPetIdQueryResult = Apollo.QueryResult<GetClinicalHistoryByPetIdQuery, GetClinicalHistoryByPetIdQueryVariables>;
export const GetClinicalHistoryByUserIdDocument = gql`
    query GetClinicalHistoryByUserId($userId: String!) {
  getClinicalHistoryByUserId(userId: $userId) {
    id
    date
    description
    petId
  }
}
    `;

/**
 * __useGetClinicalHistoryByUserIdQuery__
 *
 * To run a query within a React component, call `useGetClinicalHistoryByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClinicalHistoryByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClinicalHistoryByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetClinicalHistoryByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetClinicalHistoryByUserIdQuery, GetClinicalHistoryByUserIdQueryVariables> & ({ variables: GetClinicalHistoryByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClinicalHistoryByUserIdQuery, GetClinicalHistoryByUserIdQueryVariables>(GetClinicalHistoryByUserIdDocument, options);
      }
export function useGetClinicalHistoryByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClinicalHistoryByUserIdQuery, GetClinicalHistoryByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClinicalHistoryByUserIdQuery, GetClinicalHistoryByUserIdQueryVariables>(GetClinicalHistoryByUserIdDocument, options);
        }
export function useGetClinicalHistoryByUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetClinicalHistoryByUserIdQuery, GetClinicalHistoryByUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetClinicalHistoryByUserIdQuery, GetClinicalHistoryByUserIdQueryVariables>(GetClinicalHistoryByUserIdDocument, options);
        }
export type GetClinicalHistoryByUserIdQueryHookResult = ReturnType<typeof useGetClinicalHistoryByUserIdQuery>;
export type GetClinicalHistoryByUserIdLazyQueryHookResult = ReturnType<typeof useGetClinicalHistoryByUserIdLazyQuery>;
export type GetClinicalHistoryByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetClinicalHistoryByUserIdSuspenseQuery>;
export type GetClinicalHistoryByUserIdQueryResult = Apollo.QueryResult<GetClinicalHistoryByUserIdQuery, GetClinicalHistoryByUserIdQueryVariables>;
export const CreatePetDocument = gql`
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
export type CreatePetMutationFn = Apollo.MutationFunction<CreatePetMutation, CreatePetMutationVariables>;

/**
 * __useCreatePetMutation__
 *
 * To run a mutation, you first call `useCreatePetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPetMutation, { data, loading, error }] = useCreatePetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePetMutation(baseOptions?: Apollo.MutationHookOptions<CreatePetMutation, CreatePetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePetMutation, CreatePetMutationVariables>(CreatePetDocument, options);
      }
export type CreatePetMutationHookResult = ReturnType<typeof useCreatePetMutation>;
export type CreatePetMutationResult = Apollo.MutationResult<CreatePetMutation>;
export type CreatePetMutationOptions = Apollo.BaseMutationOptions<CreatePetMutation, CreatePetMutationVariables>;
export const UpdatePetDocument = gql`
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
export type UpdatePetMutationFn = Apollo.MutationFunction<UpdatePetMutation, UpdatePetMutationVariables>;

/**
 * __useUpdatePetMutation__
 *
 * To run a mutation, you first call `useUpdatePetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePetMutation, { data, loading, error }] = useUpdatePetMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePetMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePetMutation, UpdatePetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePetMutation, UpdatePetMutationVariables>(UpdatePetDocument, options);
      }
export type UpdatePetMutationHookResult = ReturnType<typeof useUpdatePetMutation>;
export type UpdatePetMutationResult = Apollo.MutationResult<UpdatePetMutation>;
export type UpdatePetMutationOptions = Apollo.BaseMutationOptions<UpdatePetMutation, UpdatePetMutationVariables>;
export const DeletePetDocument = gql`
    mutation DeletePet($id: ID!) {
  deletePet(id: $id)
}
    `;
export type DeletePetMutationFn = Apollo.MutationFunction<DeletePetMutation, DeletePetMutationVariables>;

/**
 * __useDeletePetMutation__
 *
 * To run a mutation, you first call `useDeletePetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePetMutation, { data, loading, error }] = useDeletePetMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePetMutation(baseOptions?: Apollo.MutationHookOptions<DeletePetMutation, DeletePetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePetMutation, DeletePetMutationVariables>(DeletePetDocument, options);
      }
export type DeletePetMutationHookResult = ReturnType<typeof useDeletePetMutation>;
export type DeletePetMutationResult = Apollo.MutationResult<DeletePetMutation>;
export type DeletePetMutationOptions = Apollo.BaseMutationOptions<DeletePetMutation, DeletePetMutationVariables>;
export const GetPetDocument = gql`
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
 * __useGetPetQuery__
 *
 * To run a query within a React component, call `useGetPetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPetQuery(baseOptions: Apollo.QueryHookOptions<GetPetQuery, GetPetQueryVariables> & ({ variables: GetPetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPetQuery, GetPetQueryVariables>(GetPetDocument, options);
      }
export function useGetPetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPetQuery, GetPetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPetQuery, GetPetQueryVariables>(GetPetDocument, options);
        }
export function useGetPetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPetQuery, GetPetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPetQuery, GetPetQueryVariables>(GetPetDocument, options);
        }
export type GetPetQueryHookResult = ReturnType<typeof useGetPetQuery>;
export type GetPetLazyQueryHookResult = ReturnType<typeof useGetPetLazyQuery>;
export type GetPetSuspenseQueryHookResult = ReturnType<typeof useGetPetSuspenseQuery>;
export type GetPetQueryResult = Apollo.QueryResult<GetPetQuery, GetPetQueryVariables>;
export const GetPetsByOwnerDocument = gql`
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

/**
 * __useGetPetsByOwnerQuery__
 *
 * To run a query within a React component, call `useGetPetsByOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPetsByOwnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPetsByOwnerQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function useGetPetsByOwnerQuery(baseOptions: Apollo.QueryHookOptions<GetPetsByOwnerQuery, GetPetsByOwnerQueryVariables> & ({ variables: GetPetsByOwnerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPetsByOwnerQuery, GetPetsByOwnerQueryVariables>(GetPetsByOwnerDocument, options);
      }
export function useGetPetsByOwnerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPetsByOwnerQuery, GetPetsByOwnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPetsByOwnerQuery, GetPetsByOwnerQueryVariables>(GetPetsByOwnerDocument, options);
        }
export function useGetPetsByOwnerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPetsByOwnerQuery, GetPetsByOwnerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPetsByOwnerQuery, GetPetsByOwnerQueryVariables>(GetPetsByOwnerDocument, options);
        }
export type GetPetsByOwnerQueryHookResult = ReturnType<typeof useGetPetsByOwnerQuery>;
export type GetPetsByOwnerLazyQueryHookResult = ReturnType<typeof useGetPetsByOwnerLazyQuery>;
export type GetPetsByOwnerSuspenseQueryHookResult = ReturnType<typeof useGetPetsByOwnerSuspenseQuery>;
export type GetPetsByOwnerQueryResult = Apollo.QueryResult<GetPetsByOwnerQuery, GetPetsByOwnerQueryVariables>;
export const GetUserProfileDocument = gql`
    query GetUserProfile($userId: String!) {
  getProfile(userId: $userId) {
    id
    name
    lastName
    email
  }
}
    `;

/**
 * __useGetUserProfileQuery__
 *
 * To run a query within a React component, call `useGetUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserProfileQuery(baseOptions: Apollo.QueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables> & ({ variables: GetUserProfileQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
      }
export function useGetUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
        }
export function useGetUserProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
        }
export type GetUserProfileQueryHookResult = ReturnType<typeof useGetUserProfileQuery>;
export type GetUserProfileLazyQueryHookResult = ReturnType<typeof useGetUserProfileLazyQuery>;
export type GetUserProfileSuspenseQueryHookResult = ReturnType<typeof useGetUserProfileSuspenseQuery>;
export type GetUserProfileQueryResult = Apollo.QueryResult<GetUserProfileQuery, GetUserProfileQueryVariables>;