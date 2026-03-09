import axios from "axios";

export default class RequestsService {
  static async fetchUserRequests(page = null, limit = null) {
    const params = page && limit ? { page, limit } : {};
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/request/user`,
      {
        withCredentials: true,
        params,
      },
    );
    return response.data;
  }
  static async addRequestAnon(formData) {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/request/anon`,
      formData,
      { withCredentials: true },
    );
    return response.data;
  }

  static async addRequest(formData) {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/request/user`,
      formData,
      { withCredentials: true },
    );
    return response.data;
  }
  static async deleteRequest(id) {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/request/user/${id}`,
      { withCredentials: true },
    );
    return response;
  }
  static async changeRequestStatus(id, status) {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/request/admin/${id}`,
      { status },
      {
        withCredentials: true,
      },
    );
    return response.data;
  }
  static async fetchPendingRequests(page = null, limit = null) {
    const params = page && limit ? { page, limit } : {};
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/request/admin`,
      { withCredentials: true, params },
    );
    return response.data;
  }
}
