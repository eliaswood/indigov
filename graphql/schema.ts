export const typeDefs = `#graphql
  enum FigureType {
    CONGRESS
    SENATE
    HOUSE
    STATE_SENATE
    STATE_HOUSE
    GOVERNOR
    OTHER
  }

  enum PoliticalParty {
    DEMOCRATIC
    REPUBLICAN
    LIBERTARIAN
    GREEN
    CONSTITUTION
    ALLIANCE
    AMERICAN_SOLIDARITY
    FORWARD
    REFORM
    SOCIALIST_PARTY_USA
    WORKING_FAMILIES
    PEACE_AND_FREEDOM
    PROHIBITION
  }

  type User {
    id: String!
    email: String!
    name: String
    username: String!
    password: String!
    figureType: FigureType
    constituents: [Constituents!]!
  }

  type Constituents {
    id: String!
    name: String!
    email: String!
    phone: String!
    createdAt: String!
    updatedAt: String!
    address: String
    city: String
    state: String
    zip: String
    county: String
    partyAffiliation: PoliticalParty
    isActive: Boolean!
    isVoter: Boolean!
    approvalRating: Int
    representedBy: User
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User!]!
    user(id: String!): User
    constituents: [Constituents!]!
    constituent(id: String!): Constituents
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    
    createUser(
      email: String!, 
      name: String, 
      username: String!, 
      password: String!, 
      figureType: FigureType
    ): User!
    
    createConstituent(
      name: String!, 
      email: String!, 
      phone: String!, 
      address: String, 
      city: String, 
      state: String, 
      zip: String, 
      county: String, 
      partyAffiliation: PoliticalParty, 
      isActive: Boolean, 
      isVoter: Boolean, 
      approvalRating: Int, 
      representedById: String
    ): Constituents!
    
    updateConstituent(
      id: String!,
      name: String, 
      email: String, 
      phone: String, 
      address: String, 
      city: String, 
      state: String, 
      zip: String, 
      county: String, 
      partyAffiliation: PoliticalParty, 
      isActive: Boolean, 
      isVoter: Boolean, 
      approvalRating: Int, 
      representedById: String
    ): Constituents!
  }
`

