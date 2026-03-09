import ApiError from "../../error/ApiError.js";
import bot from "../../bot/bot.js";

class BotService {
  messageConstructor({ name, tel, message = null, products = null }) {
    let botMessage = `Имя: ${name}\nТелефон: ${tel}`;

    if (message) {
      botMessage += `\nСообщение: ${message}`;
    }

    if (products) {
      let productsArray = [];

      if (typeof products === "string") {
        try {
          productsArray = JSON.parse(products);
          if (!Array.isArray(productsArray)) {
            throw ApiError.badRequest(
              "Uncorrect products data",
              "products",
              "body",
            );
          }
        } catch (e) {
          console.error(
            `Error while parsing JSON data of products in bot send message: ${e}, ${e.message}`,
          );
          throw ApiError.badRequest(
            "Uncorrect products data",
            "products",
            "body",
          );
        }
      } else if (Array.isArray(products)) {
        productsArray = products;
      }

      if (productsArray.length > 0) {
        let productsMessage = `\nТовары:`;

        for (let product of productsArray) {
          let productMessage = `
      Продукт: ${product.title}
      Тип: ${product.type || ""}
      Размер: ${product.size || ""}
      Цвет: ${product.color || ""}
      Количество: ${product.quantity} м²
      Цена: ${product.price}
    `;
          productsMessage += productMessage;
        }

        const totalPrice = productsArray.reduce(
          (sum, product) => sum + product.price,
          0,
        );
        const parsedTotalPrice = totalPrice.toLocaleString("ru-RU");
        botMessage += productsMessage;
        botMessage += `\nОбщая стоимость: ${parsedTotalPrice} руб.`;
      }
    }

    const nowDate = new Date();
    const formattedTime = nowDate.toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    botMessage += `\nВремя отправки: ${formattedTime}`;

    return botMessage;
  }

  async sendMessage({ id, name, tel, message = null, products = null }) {
    const CHAT_ID = process.env.BOT_CHATID;

    const botMessage = this.messageConstructor({
      name,
      tel,
      message,
      products,
    });

    try {
      await bot.sendMessage(CHAT_ID, botMessage, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "✅ Принять", callback_data: `approve:${id}` },
              { text: "❌ Отклонить", callback_data: `reject:${id}` },
            ],
          ],
        },
      });
    } catch (e) {
      console.error(`Error while sending message: ${e}, ${e.message}`);
      throw ApiError.internal(
        `Error while sending message: ${e}, ${e.message}`,
      );
    }
  }
}

export default new BotService();
