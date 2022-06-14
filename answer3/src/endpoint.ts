import axios from "axios";

export const API_SERVER =
  process.env.REACT_APP_API_SERVER || "http://localhost:3000";

const instance = axios.create({
  baseURL: API_SERVER
});

instance.defaults.headers.common["Content-Type"] = "application/json";
instance.defaults.headers.common["Accept"] = "application/json";
instance.defaults.headers.common["mode"] = "cors";

instance.interceptors.request.use(function(config) {
  const token = JSON.parse(localStorage.getItem("user")!).token!;
  config.headers!.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  async err => {
    const { response } = err;
    if (response && response.status === 401) {
      const user = localStorage.getItem("user");
      if (user) {
        localStorage.removeItem("user");
        window.location.reload();
      }
    }
    throw err;
  }
);

export default instance;
