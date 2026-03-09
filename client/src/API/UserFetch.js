import axios from "axios";

export default class UserService {
  static async register(formData) {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/user/register`,
      formData,
      {
        withCredentials: true,
      },
    );
    return response?.data;
  }
  static async registerUser(formData) {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/user/register/user`,
      formData,
      {
        withCredentials: true,
      },
    );
    return response?.data;
  }
  static async login(formData) {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/user/login`,
      formData,
      {
        withCredentials: true,
      },
    );
    return response?.data;
  }
  static async logout() {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/user/logout`,
      {},
      {
        withCredentials: true,
      },
    );
    return response?.data;
  }
  static async check() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user/auth`,
      {
        withCredentials: true,
      },
    );
    return response?.data;
  }
  static async getUsers() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user`,
      {
        withCredentials: true,
      },
    );
    return response?.data;
  }
  static async deleteUser(id) {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/user/${id}`,
      {
        withCredentials: true,
      },
    );
    return response?.data;
  }
  static async registerADMIN(formData) {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/user/register/admin`,
      formData,
      {
        withCredentials: true,
      },
    );
    return response.data;
  }
  static async getADMINS() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user/admin`,
      {
        withCredentials: true,
      },
    );
    return response?.data;
  }
  static async deleteADMIN(id) {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/user/admin/${id}`,
      {
        withCredentials: true,
      },
    );
    return response?.data;
  }
}
