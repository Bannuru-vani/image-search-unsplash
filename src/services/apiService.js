import axios from "axios";

const unsplashBaseUrl = "https://api.unsplash.com";
const unsplashAccessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

const apiService = axios.create({
  baseURL: unsplashBaseUrl,
  headers: {
    Authorization: `Client-ID ${unsplashAccessKey}`,
  },
});

const apiServiceInstance = {
  getImages: (page, perPage, query) => {
    if (query) {
      return apiService.get("/search/photos", {
        params: {
          page: page,
          per_page: perPage,
          query: query,
        },
      });
    } else {
      return apiService.get("/photos", {
        params: {
          page: page,
          per_page: perPage,
        },
      });
    }
  },

  getImageDetails: (id) => {
    return apiService.get(`/photos/${id}`);
  },
};

export default apiServiceInstance;
