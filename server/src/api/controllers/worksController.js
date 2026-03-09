import { Work } from "../../db/models/models.js";
import { v4 as uuidv4 } from "uuid";
import { staticPath } from "../../conf.js";
import path from "path";
import fs from "fs";
import ApiError from "../../error/ApiError.js";
import WorksService from "../services/WorksService.js";

class WorksController {
  async create(req, res, next) {
    try {
      const { img } = req.files;
      if (!img) {
        return next(ApiError.badRequest("Image file is required"));
      }

      let fileName = uuidv4() + ".jpg";

      if (!fs.existsSync(staticPath)) {
        fs.mkdirSync(staticPath);
      }

      const worksPath = path.resolve(staticPath, "/works");

      if (!fs.existsSync(worksPath)) {
        fs.mkdirSync(worksPath);
      }

      img.mv(path.resolve(worksPath, fileName));

      const work = await WorksService.createWork({
        fileName,
      });

      return res.json({
        status: "success",
        message: "Work has been created successfully",
        data: { work },
      });
    } catch (e) {
      console.error(`Error while creating new work: ${e}, ${e.message}`);
      next(e);
    }
  }

  async createExamples(req, res, next) {
    try {
      await WorksService.createExamples();

      const works = await WorksService.findAll();
      return res.json({
        status: "success",
        message: "Works has been created",
        data: { works },
      });
    } catch (e) {
      console.error(e);
      next(ApiError.badRequest(e.message));
    }
  }

  async getSmart(req, res, next) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    try {
      let works;

      if (page && limit) {
        works = await WorksService.findByPages(page, limit);

        return res.status(200).json({
          status: "success",
          message: "Getting works with pagination successful",
          data: {
            page,
            limit,
            totalItems: works.count,
            totalPages: Math.ceil(works.count / limit),
            works: works.rows,
          },
        });
      } else {
        works = await WorksService.findAll();

        return res.status(200).json({
          status: "success",
          message: "Getting whole list of works images successful",
          data: { works },
        });
      }
    } catch (e) {
      console.error(`Error while getting works: ${e}, ${e.message}`);
      return next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const work = await WorksService.findById(id);

      return res.json({
        status: "success",
        message: "work has been found",
        data: {
          work,
        },
      });
    } catch (e) {
      console.error(`Error while finding work: ${e}, ${e.message}`);
      return next(e);
    }
  }

  async deleteAll(req, res, next) {
    try {
      await WorksService.deleteAll();

      return res.status(204).send();
    } catch (e) {
      console.error(`Error while deleting all works: ${e}, ${e.message}`);
      return next(e);
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      await WorksService.deleteById(id);

      return res.status(204).send();
    } catch (e) {
      console.error(
        `Error while deleting work with ID ${id}: ${e}, ${e.message}`,
      );
      return next(e);
    }
  }
}

export default new WorksController();
