import axios from "axios";
const API_URL = "http://localhost:3000/user/";

export interface User {
  username: string;
  token: string;
}

class AuthService {
  async login(username: string, password: string) {
    const res = await axios.post(
      API_URL + "login",
      {
        username,
        password
      },
      {
        validateStatus: function(status) {
          return status < 500;
        }
      }
    );
    if (res.data.ok && res.data.token) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user")!);
  }
}
export default new AuthService();
