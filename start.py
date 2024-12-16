from telegram import BotCommand
from telegram.ext import ApplicationBuilder, CommandHandler

# Токен вашего бота
BOT_TOKEN = "7706626510:AAGpC7AoYq_ZZ9Nxo6PunGqq5YbJUuCcNfc"


# Основная функция
def main():
    app = ApplicationBuilder().token(BOT_TOKEN).build()

    # Установка меню команд
    app.bot.set_my_commands([
        BotCommand("start", "Начать работу с ботом"),
        BotCommand("catalog", "Каталог товаров"),
        BotCommand("cart", "Показать корзину"),
        BotCommand("feedback", "Обратная связь"),
        BotCommand("help", "Показать справку"),
    ])

    # Обработчики команд
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_command))
    app.add_handler(CommandHandler("catalog", catalog))
    app.add_handler(CommandHandler("cart", cart))
    app.add_handler(CommandHandler("feedback", feedback))

    app.run_polling()

# Команды бота
async def start(update, context):
    await update.message.reply_text("Привет! Выберите команду из меню или введите её вручную.")

async def help_command(update, context):
    await update.message.reply_text("Список команд:\n/start - Начать\n/catalog - Каталог\n/cart - Корзина\n/feedback - Обратная связь\n/help - Помощь")

async def catalog(update, context):
    await update.message.reply_text("Здесь будет каталог.")

async def cart(update, context):
    await update.message.reply_text("Ваша корзина пуста.")

async def feedback(update, context):
    await update.message.reply_text("Напишите сообщение для связи с администратором.")

if __name__ == "__main__":
    main()
