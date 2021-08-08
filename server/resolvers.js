import { fetchMyFbPages, fetchPageById, updateFbPageById, getPageAccessToken } from "./apis/index.js";
import { fbErrorMessageMaker } from "./util.js";

export const resolvers = {
  Query: {
    getConnectedFbPages: async (_, { fbUserId, accessToken }, { dataSources }) => {
      try {
        // going with short-lived access token as this is just a demo,
        // ideally u can get long-lived token @see https://developers.facebook.com/docs/facebook-login/access-tokens/
        const { data: { data } } = await fetchMyFbPages(fbUserId, accessToken);
        const pageList = [];

        // we need to fetch extra info from page, by default this gives only
        // category name token and page id, but we need address phone etc
        // so need to call "https://graph.facebook.com/PAGE-ID&access_token=ACCESS-TOKEN"
        if (data.length) {
          for await (const { category, name, id } of data) {
            const pageInfo = await fetchPageById(id, accessToken);
            pageList.push(pageInfo.data);
          }
          return {
            pageInfo: pageList,
            error: false,
            message: "fetched successfully"
          };
        }
      } catch (error) {
        if (error?.response?.data) {
          return {
            error: true,
            message: fbErrorMessageMaker(error.response.data.error.code)
          }
        }
        // for the other errors also we can do the same
      }
      return {
        error: true,
        message: "Error occurred"
      };
    }
  },
  Mutation: {
    updateFbPage: async (_, { pageId, accessToken, name, about }, { dataSources }) => {
      try {
        // fetch page access token first and use it to update page
        const resp = await getPageAccessToken(pageId, accessToken);
        console.log(pageId);
        const { data: { data } } = await updateFbPageById(pageId, resp.data.access_token, name, about);
        // unfortunately updating page needs app review, without that it wont work
        if (data) {
          return {
            success: data.success,
            error: false,
            message: "Updated successfully"
          };
        }
      } catch (error) {
        console.log(error.response.data);
        if (error?.response?.data) {
          return {
            error: true,
            message: fbErrorMessageMaker(error.response.data.error.code)
          }
        }
        // for the other errors also we can do the same
      }
      return {
        error: true,
        message: "Error occurred"
      };
    }
  },
};
