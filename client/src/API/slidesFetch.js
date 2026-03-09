import axios from "axios";

export default class SlidesService {
  static async getSlides() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/slides`,
    );
    return response.data;
  }
  static async createEx() {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/slides/examples`,
      {},
      { withCredentials: true },
    );
    return response.data;
  }
  static async deleteAll() {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/slides`,
      { withCredentials: true },
    );
    return response.data;
  }
}
