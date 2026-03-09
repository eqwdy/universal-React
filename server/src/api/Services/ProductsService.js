import { Card } from "../../db/models/models.js";
import ApiError from "../../error/ApiError.js";
import {
  createPlitkaCard,
  createFbsCard,
  createBorduresCard,
  createRoundesCard,
  createSpheresCard,
  createPorebrikCard,
} from "../../helper/createExamples.js";
import isEqualField from "../../helper/isFieldEqual.js";

class ProductsService {
  async findById(id) {
    const product = Card.findByPk(id);
    if (!product) {
      throw ApiError.notFound("Product not found", "id", "DataBase");
    }

    return product;
  }

  async createProduct({
    img,
    title,
    price,
    description,
    types = [],
    sizes = [],
    colors = [],
  }) {
    const card = await Card.create({
      img,
      title,
      price: Number(price),
      description,
      types,
      sizes,
      colors,
    });

    if (!card) {
      throw new ApiError.internal("Error while creating product");
    }

    return card;
  }

  async createExamples() {
    await Promise.all([
      Card.create(createPlitkaCard()),
      Card.create(createFbsCard()),
      Card.create(createBorduresCard()),
      Card.create(createRoundesCard()),
      Card.create(createSpheresCard()),
      Card.create(createPorebrikCard()),
    ]);
  }

  async patchProduct(id, payload) {
    const product = await Card.findByPk(id);
    if (!product) {
      throw ApiError.notFound("Card not found", "id", "DataBase");
    }

    const keys = Object.keys(payload).filter(
      (k) => payload[k] !== null && payload[k] !== undefined,
    );

    const noChanges = keys.every((key) =>
      isEqualField(product[key], payload[key]),
    );

    if (noChanges) {
      throw ApiError.badRequest(
        "All provided fields are the same, no changes were made",
        "data",
        "body",
      );
    }

    if (payload.img) product.img = payload.img;
    if (payload.title) product.title = payload.title.trim();
    if (payload.price) product.price = Number(payload.price);
    if (payload.description) product.description = payload.description.trim();
    if (payload.types)
      product.types = Array.isArray(payload.types) ? payload.types : [];
    if (payload.sizes)
      product.sizes = Array.isArray(payload.sizes) ? payload.sizes : [];
    if (payload.colors)
      product.colors = Array.isArray(payload.colors) ? payload.colors : [];

    await product.save();
    return product;
  }

  async deleteProduct(id) {
    const product = await Card.findByPk(id);
    if (!product) {
      throw ApiError.notFound("Card not found", "id", "DataBase");
    }

    await product.destroy();
  }
}

export default new ProductsService();
