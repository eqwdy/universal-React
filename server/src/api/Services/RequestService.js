import ApiError from "../../error/ApiError.js";
import { User, Request } from "../../db/models/models.js";
import { Op } from "sequelize";
import BotService from "./BotService.js";
import normalizeProducts from "../../helper/normalizeProducts.js";

class RequestsService {
  async findAllUserRequests(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw ApiError.notFound("User wasn't found!");
    }

    const requests = await user.getRequests({ order: [["updatedAt", "DESC"]] });
    return requests;
  }

  async findAllUserRequestsByPages(userId, page, limit) {
    const offset = (page - 1) * limit;

    const requests = await Request.findAndCountAll({
      where: { user_id: userId },
      limit,
      offset,
      order: [["updatedAt", "DESC"]],
    });

    return requests;
  }

  async findRequest(requestId) {
    const request = await Request.findOne({ where: { id: requestId } });
    if (!request) {
      throw ApiError.notFound("Request wasn't found!");
    }

    return request;
  }

  async findAllRequestsForAdmin(adminId) {
    const requests = await Request.findAll({
      //   where: { status: "pending", user_id: { [Op.ne]: adminId } },
      where: { status: "pending" },
      order: [["updatedAt", "DESC"]],
    });

    return requests;
  }

  async findAllRequestsForAdminByPages(adminId, page, limit) {
    const offset = (page - 1) * limit;

    const requests = await Request.findAndCountAll({
      //   where: { status: "pending", user_id: { [Op.ne]: adminId } },
      where: { status: "pending" },
      limit,
      offset,
      order: [["updatedAt", "DESC"]],
    });

    return requests;
  }

  async addRequest(userId, { message, products }) {
    const user = await User.findByPk(userId);
    if (!user) return next(ApiError.badRequest("User wasn't found!"));

    const productsArray = normalizeProducts(products);
    const request = await user.createRequest({
      userId: userId,
      name: user.name,
      tel: user.tel,
      message: message,
      products: productsArray,
      status: "pending",
    });
    if (!request) {
      throw ApiError.internal("Error while creating request");
    }

    try {
      await BotService.sendMessage(request);
    } catch (e) {
      throw ApiError.internal("Error while sending a telegram message");
    }

    return request;
  }

  async addAnonRequest({ name, tel, message, products }) {
    const productsArray = normalizeProducts(products);
    const request = await Request.create({
      name,
      tel,
      message,
      products: productsArray,
      status: "pending",
    });
    if (!request) {
      throw ApiError.internal("Error while creating anon request");
    }

    try {
      await BotService.sendMessage(request);
    } catch (e) {
      console.log(`Error while sending a telegram message: ${e}`);
      throw ApiError.internal("Error while sending a telegram message");
    }

    return request;
  }

  async changeRequestStatus(status, requestId) {
    const request = await this.findRequest(requestId);

    request.status = status;
    await request.save({ validate: true });

    return request;
  }

  async deleteRequest(requestId, userId) {
    const request = await this.findRequest(requestId);
    if (request?.user_id !== userId) {
      throw ApiError.forbidden("You can't delete other user's requests");
    }
    if (request?.status !== "pending") {
      throw ApiError.badRequest("You can't delete checked requests");
    }

    await request.destroy();
  }
}

export default new RequestsService();
