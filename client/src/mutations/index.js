import { gql } from '@apollo/client';

export const UPDATE_FB_PAGE = gql`
  mutation updateFbPage($updateFbPagePageId: String!, $updateFbPageAccessToken: String!, $updateFbPageName: String!, $updateFbPageAbout: String!) {
    updateFbPage(pageId: $updateFbPagePageId, accessToken: $updateFbPageAccessToken, name: $updateFbPageName, about: $updateFbPageAbout) {
        success
        error
        message      
      }
    }
`;