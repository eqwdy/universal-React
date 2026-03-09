import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { Slide } from "../../db/models/models.js";
import { staticPath } from "../../conf.js";
import ApiError from "../../error/ApiError.js";
import SlidesService from "../Services/SlidesService.js";

class SlideController {
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

      const slidesPath = path.resolve(staticPath, "/slides");

      if (!fs.existsSync(slidesPath)) {
        fs.mkdirSync(slidesPath);
      }

      img.mv(path.resolve(slidesPath, fileName));

      const slide = await SlidesService.createSlide({
        fileName,
      });

      return res.json({
        status: "success",
        message: "Slide created successfully",
        data: { slide },
      });
    } catch (e) {
      console.error(`Error while creating slide: ${e}, ${e.message}`);
      next(e);
    }
  }

  async createExamples(req, res, next) {
    try {
      await SlidesService.createExamples();

      const slides = await SlidesService.findAll();

      return res.json({
        status: "success",
        message: "Slides created successfully",
        data: { slides },
      });
    } catch (e) {
      console.error(`Error while creating examples slides: ${e}, ${e.message}`);
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const slides = await SlidesService.findAll();
      return res.json({
        status: "success",
        message: "Slides getted successfully",
        data: { slides },
      });
    } catch (e) {
      console.error(`Error while getting slides: ${e}, ${e.message}`);
      return next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const slide = SlidesService.findById(id);

      return res.json({
        status: "success",
        message: "Slide getted successfully",
        data: { slide },
      });
    } catch (e) {
      console.error(`Error while getting slide: ${e}, ${e.message}`);
      return next(e);
    }
  }

  async deleteAll(req, res, next) {
    try {
      await Slide.destroy({ truncate: true, restartIdentity: true });

      return res.json({ event: "deleteAll" });
    } catch (e) {
      console.error(e.message);
      return next(ApiError.internal(e.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const slide = await Slide.findByPk(id);
      if (!slide) {
        return next(ApiError.badRequest("Slide not found"));
      }

      await slide.destroy();

      return res.json({ event: "deleteOne" });
    } catch (e) {
      console.error(e.message);
      return next(ApiError.internal(e.message));
    }
  }
}

export default new SlideController();
