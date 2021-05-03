//const API_DOMAIN = "https://grow-more-dev.netlify.app";
const API_DOMAIN = "http://192.168.43.31:9000";
const BASE_PATH = "/.netlify/functions/api";

const userBasePath = `${API_DOMAIN}${BASE_PATH}/user`;
const productBasePath = `${API_DOMAIN}${BASE_PATH}/products`;

export const API_CONFIG = {
  createUser: {
    method: "POST",
    url: `${userBasePath}/create`,
  },
  updateProfile: {
    method: "PATCH",
    url: `${userBasePath}/update`,
  },
  getProfile: {
    method: "GET",
    url: `${userBasePath}/profile`,
  },
  getProducts: {
    method: "GET",
    url: `${productBasePath}`,
  },
};
