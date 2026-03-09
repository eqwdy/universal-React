// src/services/WorksService.js
import axios from "axios";

export default class WorksService {
  static async getSlides(page, limit) {
    const params = page && limit ? { page, limit } : {};
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/works`,
      { params },
    );
    return response.data;
  }
}
