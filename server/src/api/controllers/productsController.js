import { Card } from "../../db/models/models.js";
import { v4 as uuidv4 } from "uuid";
import { productImagesStaticPath as staticPath } from "../../conf.js";
import path from "path";
import fs from "fs";
import ApiError from "../../error/ApiError.js";
import ProductsService from "../Services/ProductsService.js";

class ProductsController {
  async create(req, res, next) {
    try {
      const { title, price, description, types, sizes, colors } =
        req.body || {};
      const { img } = req.files;

      let filename = uuidv4() + ".jpg";

      if (!fs.existsSync(staticPath)) {
        fs.mkdirSync(staticPath);
      }

      img.mv(path.resolve(staticPath, filename));

      const card = await ProductsService.createProduct({
        img: filename,
        title,
        price: Number(price),
        description,
        types,
        sizes,
        colors,
      });

      return res.json({
        status: "success",
        message: "Product was created successfull",
        data: {
          product: card,
        },
      });
    } catch (e) {
      console.error(`Error while creating product: ${e}, ${e.message}`);
      next(e);
    }
  }

  async createExamples(req, res, next) {
    try {
      await ProductsService.createExamples();

      return res.json({ status: "success", message: "Examples were created" });
    } catch (e) {
      console.error(
        `Error while creating examples products: ${e}, ${e.message}`,
      );
      next(e);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { img } = req.files || {};
    let { title, price, description, types, sizes, colors } = req.body;

    if (typeof types === "string") {
      try {
        types = JSON.parse(types);
      } catch (e) {
        console.error(
          `Error while parsing types data of product: ${e}, ${e.message}`,
        );
        return ApiError.internal("Error while parsing product data");
      }
    }
    if (typeof sizes === "string") {
      try {
        sizes = JSON.parse(sizes);
      } catch (e) {
        console.error(
          `Error while parsing sizes data of product: ${e}, ${e.message}`,
        );
        return ApiError.internal("Error while parsing product data");
      }
    }
    if (typeof colors === "string") {
      try {
        colors = JSON.parse(colors);
      } catch (e) {
        console.error(
          `Error while parsing colors data of product: ${e}, ${e.message}`,
        );
        return ApiError.internal("Error while parsing product data");
      }
    }

    try {
      let filename;
      if (img) {
        filename = uuidv4() + ".jpg";

        if (!fs.existsSync(staticPath)) {
          fs.mkdirSync(staticPath);
        }

        img.mv(path.resolve(staticPath, filename));
      }

      const product = await ProductsService.patchProduct(id, {
        img: filename || undefined,
        title,
        price,
        description,
        types,
        sizes,
        colors,
      });
      return res.json({
        status: "success",
        message: "Product was updated",
        data: {
          product,
        },
      });
    } catch (e) {
      console.error(`Error while patching product: ${e}, ${e.message}`);
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const products = await Card.findAll();
      return res.json({
        status: "success",
        message: "Products were getted successfully",
        data: { products },
      });
    } catch (e) {
      console.error(`Error while getting all products: ${e}, ${e.message}`);
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const product = await ProductsService.findById(id);

      return res.json({
        status: "success",
        message: "Product was getted successfully",
        data: {
          product,
        },
      });
    } catch (e) {
      console.error(`Error while getting product: ${e}, ${e.message}`);
      next(e);
    }
  }

  async deleteAll(req, res, next) {
    try {
      await Card.destroy({ truncate: true, restartIdentity: true });

      return res.status(204).send();
    } catch (e) {
      console.error(`Error while deleting all products: ${e}, ${e.message}`);
      return next(ApiError.internal(e.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      await ProductsService.deleteProduct(id);

      return res.status(204).send();
    } catch (e) {
      console.error(`Error while deleting product: ${e}, ${e.message}`);
      next(e);
    }
  }
}

export default new ProductsController();
