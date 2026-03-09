import axios from "axios";

export default class CardService {
  static async createEx() {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/card/examples`,
      {},
      { withCredentials: true },
    );
    return response.data;
  }
  static async getCards() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/card`,
    );
    return response.data;
  }
  static async getCardById(id) {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/card/${id}`,
    );
    return response.data;
  }
  static async deleteAll() {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/card`,
      { withCredentials: true },
    );
    return response.data;
  }
  static async pathCardById(id, formData) {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/card/${id}`,
      formData,
      {
        withCredentials: true,
      },
    );
    return response.data;
  }
}
