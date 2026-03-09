import TelegramBot from "node-telegram-bot-api";
import { configDotenv } from "dotenv";
import { Request } from "../db/models/models.js";
configDotenv();

const BOT_TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
bot.setMyCommands([
  { command: "getchatid", description: "Получить ID текущего чата" },
]);

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === "/getchatid") {
    try {
      bot.sendMessage(chatId, `ID текущего чата: ${chatId}`);
    } catch (error) {
      console.error(`Ошибка при отправке сообщения ботом: ${error}`);
    }
  }
});

async function handleRequestAction(
  statusText,
  emoji,
  requestId,
  chatId,
  messageId,
) {
  try {
    await bot.editMessageReplyMarkup(
      { inline_keyboard: [] },
      { chat_id: chatId, message_id: messageId },
    );

    const request = await Request.findByPk(requestId);
    if (!request) {
      console.log(`Request not found for requestId: ${requestId}`);
      await bot.sendMessage(
        chatId,
        `Ошибка: Заявка ${requestId} не найдена! Возможно пользователь уже удалил её!`,
      );
      return;
    }
    if (request.status !== "pending") {
      console.log(
        `Request not pending, status: ${request.status || "unknown"}`,
      );
      const status =
        request.status === "approved"
          ? "одобрена"
          : request.status === "rejected"
            ? "отклонена"
            : request.status;
      await bot.sendMessage(
        chatId,
        `Ошибка: Заявка ${requestId} уже просмотрена! Её статус - ${status}`,
      );
      return;
    }

    try {
      request.status = statusText;
      await request.save({ validate: true });
    } catch (e) {
      console.error(`Error while saving request: ${e}, ${e.message}`);
      await bot.sendMessage(
        chatId,
        `Ошибка при сохранении заявки: ${e}, ${e.message}`,
      );
      return;
    }

    await bot.sendMessage(chatId, `Заявка ${requestId} ${emoji}`);
  } catch (e) {
    console.error(`Error while changing request status: ${e}, ${e.message}`);
  }
}

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const [action, requestId] = query.data.split(":");

  if (action === "approve") {
    await handleRequestAction(
      "approved",
      "принята ✅",
      requestId,
      chatId,
      messageId,
    );
  }
  if (action === "reject") {
    await handleRequestAction(
      "rejected",
      "отклонена ❌",
      requestId,
      chatId,
      messageId,
    );
  }

  bot.answerCallbackQuery(query.id);
});

export default bot;
