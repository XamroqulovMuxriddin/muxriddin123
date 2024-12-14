const TelegramBot = require('node-telegram-bot-api');
const TOKEN = '7681381096:AAFPKt7gF7yxRfyj_8GxEXwNcoMgd-lT80Q';
const { downLoaderMethod } = require('./request');

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', async (message) => {
    let chatId;
    try {
        chatId = message.chat.id; // chatId aniqlash
        const name = message.from.first_name ;
        const lastName = message.from.last_name;

        // /start komandasi uchun xabar
        if (message.text === '/start') {
            await bot.sendMessage(
                chatId,
                `🤖✋Assalomu aleykum <b>${name} ${lastName}</b>, botimizga xush kelibsiz.\n 🔘 Botga Instagram video link yuboring, men yuklab beraman.`,
                { parse_mode: 'HTML' }
            );
            return;
        }

        // Instagram URL formatini tekshirish
        const urlRegex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|tv)\/[a-zA-Z0-9_-]+/;
        if (!urlRegex.test(message.text)) {
            return bot.sendMessage(chatId, '⚠️ Iltimos, to‘g‘ri Instagram video havolasini yuboring.');
        }

        // Instagramdan video ma'lumotlarini olish
        const getVideoUrl = await downLoaderMethod(message.text);

        // Video URL tekshiruvi
        if (!getVideoUrl || !getVideoUrl.videoUrl) {
            return bot.sendMessage(chatId, '⚠️ Uzr, ushbu havolada video topilmadi yoki noto‘g‘ri havola.');
        }

        // Videoni jo'natish
        try {
            await bot.sendVideo(chatId, getVideoUrl.videoUrl, {
                caption: `${getVideoUrl.caption}\nTelegram kanalim: @MukhriddinMinecraft`,
            });
        } catch (err) {
            console.error(err);
            return bot.sendMessage(chatId, '⚠️ Video yuborishda xatolik yuz berdi.');
        }

    } catch (error) {
        console.error(error);
        if (chatId) {
            await bot.sendMessage(chatId, '⚠️ Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.');
        }
    }
});