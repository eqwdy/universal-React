import ApiError from "../../error/ApiError.js";
import RequestService from "../services/RequestService.js";

class requestController {
  async getSmart(req, res, next) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const userId = Number(req.user?.id);

    if (!userId) {
      return next(ApiError.badRequest("Bad user id!", "id", "cookie"));
    }

    try {
      let requests;

      if (page && limit) {
        requests = await RequestService.findAllUserRequestsByPages(
          userId,
          page,
          limit,
        );

        return res.status(200).json({
          status: "success",
          message: "Getting requests with pagination successful",
          data: {
            page,
            limit,
            totalItems: requests.count,
            totalPages: Math.ceil(requests.count / limit),
            requests: requests.rows,
          },
        });
      } else {
        requests = await RequestService.findAllUserRequests(userId);

        return res.status(200).json({
          status: "success",
          message: `Getting whole list of requests successfull!`,
          data: { requests },
        });
      }
    } catch (e) {
      console.error(`Error while getting requests: ${e}, ${e.message}`);
      return next(e);
    }
  }

  async getOne(req, res, next) {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) return next(ApiError.badRequest("Bad user id!"));
    if (!id) return next(ApiError.badRequest("Invalid request data"));

    try {
      const request = await RequestService.findRequest(id);
      if (!request) {
        return next(ApiError.internal("Error while getting a request"));
      }
      if (request.userId !== userId) {
        return next(ApiError.forbidden("Not enough rules"));
      }

      return res.status(200).json(request);
    } catch (e) {
      console.error(`Request get one error: ${e} \n${e.message}`);
      return next(e);
    }
  }

  async addRequest(req, res, next) {
    const userId = req.user?.id;
    const { message, products } = req.body || {};

    if (!userId) return next(ApiError.badRequest("Bad user id!"));

    try {
      const request = await RequestService.addRequest(userId, {
        message,
        products,
      });

      return res.status(201).json({
        status: "success",
        message: "Request was added and sended successfull",
        data: { request },
      });
    } catch (e) {
      console.error(`Request add error: ${e} \n${e.message}`);
      return next(e);
    }
  }

  async deleteRequest(req, res, next) {
    const userId = req.user?.id;
    const { id } = req.params;

    try {
      await RequestService.deleteRequest(id, userId);

      return res.status(204).send();
    } catch (e) {
      console.error(`Request delete error: ${e} \n${e.message}`);
      return next(e);
    }
  }
}

export default new requestController();
