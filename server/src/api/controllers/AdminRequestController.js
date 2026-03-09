import { Op } from "sequelize";
import ApiError from "../../error/ApiError.js";
import RequestService from "../services/RequestService.js";

class AdminRequestController {
  async getSmart(req, res, next) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const currentUserId = Number(req.user?.id);
    if (!currentUserId) {
      return next(ApiError.badRequest("Bad user id!", "id", "cookie"));
    }

    try {
      let requests;

      if (page && limit) {
        requests = await RequestService.findAllRequestsForAdminByPages(
          currentUserId,
          page,
          limit,
        );

        return res.status(200).json({
          status: "success",
          message:
            "Getting list of requests with pagination by admin successfull",
          data: {
            page,
            limit,
            totalItems: requests.count,
            totalPages: Math.ceil(requests.count / limit),
            requests: requests.rows,
          },
        });
      } else {
        requests = await RequestService.findAllRequestsForAdmin(currentUserId);

        return res.status(200).json({
          status: "success",
          message: `Getting whole list of requests by admin successfull!`,
          data: { requests },
        });
      }
    } catch (e) {
      console.error(`Error while getting requests: ${e}, ${e.message}`);
      return next(e);
    }
  }

  async changeRequestStatus(req, res, next) {
    const { id } = req.params;
    const { status } = req.body || {};

    try {
      const request = await RequestService.changeRequestStatus(status, id);

      return res.json({
        status: "success",
        message: `Request status was changed to ${status}`,
        data: { request },
      });
    } catch (e) {
      console.error(`Request delete error: ${e} \n${e.message}`);
      return next(e);
    }
  }
}

export default new AdminRequestController();
