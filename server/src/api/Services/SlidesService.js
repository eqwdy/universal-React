import { Slide } from "../../db/models/models.js";
import ApiError from "../../error/ApiError.js";

class SlidesService {
  async createSlide({ fileName }) {
    const slide = await Slide.create({
      img: fileName,
    });

    return slide;
  }

  async createExamples() {
    await Promise.all([
      Slide.create({
        img: "1.png",
      }),
      Slide.create({
        img: "2.png",
      }),
      Slide.create({
        img: "3.png",
      }),
      Slide.create({
        img: "4.png",
      }),
      Slide.create({
        img: "5.png",
      }),
      Slide.create({
        img: "6.png",
      }),
    ]);
  }

  async findAll() {
    const slides = await Slide.findAll();
    return slides;
  }

  async findById(id) {
    const slide = await Slide.findByPk(id);
    if (!slide) {
      throw ApiError.notFound("Slide not found", "id", "DataBase");
    }

    return slide;
  }
}

export default new SlidesService();
