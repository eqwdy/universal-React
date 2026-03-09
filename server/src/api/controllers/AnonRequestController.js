import RequestService from "../services/RequestService.js";

class AnonRequestController {
  async createRequest(req, res, next) {
    const { name, tel, message, products } = req.body;
    try {
      const request = await RequestService.addAnonRequest({
        name,
        tel,
        message,
        products,
      });

      return res.json({
        status: "success",
        message: "Request was created and sended successfully",
        data: {
          request,
        },
      });
    } catch (e) {
      console.error(`Error while creating request: ${e}, ${e.message}`);
      next(e);
    }
  }
}

export default new AnonRequestController();
