import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # Your schema will go here

type Location {
  city: String
  country: String
  latitude: Float
  longitude: Float
  state: String
  street: String
  zip: String
}

type FbPageDetails {
  accessToken: String
  about: String
  rating_count: Int
  phone: String
  location: Location
  id: String
  name: String
  is_permanently_closed: Boolean
  description: String
}

type FbPageConnectResponse {
  pageInfo: [FbPageDetails],
  error: Boolean,
  message: String!
}

type FbPageUpdateResponse {
  success: Boolean,
  error: Boolean,
  message: String!
}

type Mutation {
  updateFbPage(pageId: String!, accessToken: String!, name: String!, about: String!): FbPageUpdateResponse
}

type Query {
  getConnectedFbPages(fbUserId: String, accessToken: String): FbPageConnectResponse
}
`;
