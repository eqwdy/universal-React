import { Work } from "../../db/models/models.js";
import ApiError from "../../error/ApiError.js";

class WorksService {
  async findByPages(page, limit) {
    const offset = (page - 1) * limit;

    const works = await Work.findAndCountAll({
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    return works;
  }

  async findAll() {
    const works = await Work.findAll();
    return works;
  }

  async findById(id) {
    const work = await Work.findByPk(id);
    return work;
  }

  async createWork({ fileName }) {
    const work = await Work.create({
      img: fileName,
    });

    return work;
  }

  async createExamples() {
    await Promise.all([
      Work.create({
        img: "1.jpg",
      }),
      Work.create({
        img: "2.jpg",
      }),
      Work.create({
        img: "3.jpg",
      }),
      Work.create({
        img: "4.jpg",
      }),
      Work.create({
        img: "5.jpg",
      }),
      Work.create({
        img: "6.jpg",
      }),
      Work.create({
        img: "7.jpg",
      }),
      Work.create({
        img: "8.jpg",
      }),
      Work.create({
        img: "9.jpg",
      }),
      Work.create({
        img: "10.jpg",
      }),
      Work.create({
        img: "11.jpg",
      }),
      Work.create({
        img: "12.jpg",
      }),
      Work.create({
        img: "13.jpg",
      }),
      Work.create({
        img: "14.jpg",
      }),
      Work.create({
        img: "15.jpg",
      }),
      Work.create({
        img: "16.jpg",
      }),
      Work.create({
        img: "17.jpg",
      }),
      Work.create({
        img: "18.jpg",
      }),
      Work.create({
        img: "19.jpg",
      }),
      Work.create({
        img: "20.jpg",
      }),
      Work.create({
        img: "21.jpg",
      }),
      Work.create({
        img: "22.jpg",
      }),
      Work.create({
        img: "23.jpg",
      }),
      Work.create({
        img: "24.jpg",
      }),
    ]);
  }

  async deleteAll() {
    await Work.destroy({ truncate: true, restartIdentity: true });
  }

  async deleteById(id) {
    const work = thi.findById(id);
    if (!work) {
      throw ApiError.notFound("Work not found", "id", "DataBase");
    }

    await work.destroy();
  }
}

export default new WorksService();
