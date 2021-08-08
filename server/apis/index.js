import axios from "axios";

const api = axios.create({ baseURL: "https://graph.facebook.com/" });

export const fetchMyFbPages = async (fbUserId, accessToken) => {
  return api({
    url: `${fbUserId}/accounts`,
    method: 'GET',
    params: {
      access_token: accessToken,
    },
  });
}

export const fetchPageById = async (pageId, accessToken) => {
  return api({
    url: `${pageId}`,
    method: 'GET',
    params: {
      access_token: accessToken,
      fields: "name, about, description, rating_count, phone, location, is_permanently_closed"
    },
  });
}

export const updateFbPageById = async (pageId, accessToken, name, about) => {
  return api({
    url: `${pageId}`,
    method: 'POST',
    params: {
      about,
      name,
      access_token: accessToken
    },
  });
}

export const getPageAccessToken = async (pageId, accessToken) => {
  return api({
    url: `${pageId}`,
    method: 'GET',
    params: {
      fields:"access_token",
      access_token: accessToken,
      scope:"pages_manage_metadata"
    },
  });
}