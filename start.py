from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes

# Токен бота и ID администратора
BOT_TOKEN = "7706626510:AAGpC7AoYq_ZZ9Nxo6PunGqq5YbJUuCcNfc"
ADMIN_ID = 1776219693  # Замените на ваш Telegram ID

# Команда /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "Привет! Я бот для обратной связи. Напиши мне сообщение, и я передам его администратору."
    )

# Обработка сообщений от пользователей
async def forward_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = update.effective_user
    message = update.message.text

    # Переслать сообщение администратору
    await context.bot.send_message(
        chat_id=1776219693,
        text=f"Сообщение от @{user.username or user.first_name}:\n\n{message}"
    )

    # Подтвердить отправку пользователю
    await update.message.reply_text("Спасибо за ваше сообщение! Мы скоро с вами свяжемся.")

# Основная функция
def main():
    # Создаем приложение
    app = ApplicationBuilder().token(BOT_TOKEN).build()

    # Обработчики команд и сообщений
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, forward_message))

    # Запуск бота
    app.run_polling()

if __name__ == "__main__":
    main()
