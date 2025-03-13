import { gql } from '@apollo/client';

export const GET_CONSTITUENTS = gql`
  query GetConstituents {
    me {
      id
      constituents {
        id
        name
        email
        phone
        address
        city
        state
        zip
        county
        partyAffiliation
        isActive
        isVoter
        createdAt
        updatedAt
      }
    }
  }
`;

export const CREATE_CONSTITUENT = gql`
  mutation CreateConstituent(
    $name: String!
    $email: String!
    $phone: String!
    $address: String
    $city: String
    $state: String
    $zip: String
    $county: String
    $partyAffiliation: PoliticalParty
    $isActive: Boolean
    $isVoter: Boolean
  ) {
    createConstituent(
      name: $name
      email: $email
      phone: $phone
      address: $address
      city: $city
      state: $state
      zip: $zip
      county: $county
      partyAffiliation: $partyAffiliation
      isActive: $isActive
      isVoter: $isVoter
    ) {
      id
      name
      email
    }
  }
`; 