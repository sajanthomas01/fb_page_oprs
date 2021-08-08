import { gql } from "@apollo/client";


export const GET_BOOKS = gql`
  query GetBooks{
    books{
      title,
      author
    }
}
`;

export const GET_CONNECTED_FB_PAGES = gql`
  query getConnectedFbPages($fbUserId: String!, $accessToken: String!) {
    getConnectedFbPages(fbUserId: $fbUserId, accessToken: $accessToken) {
      pageInfo {
        name
        about
        description
        rating_count
        phone
        location {
          city
          country
          latitude
          longitude
          state
          street
          zip
        }
        id
        is_permanently_closed
      }
      error
      message
    }
    }
`;