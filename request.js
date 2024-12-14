const axios = require('axios');

async function downLoaderMethod(insta_url) {
    try {
        const options = {
            method: 'GET',
            url: 'https://instagram-media-downloader.p.rapidapi.com/rapid/post.php',
            params: { url: insta_url },  // instadagi URL
            headers: {
                'x-rapidapi-key': '2a3eb83985msheb5597d0112ad39p1ecc3bjsncdfbf4af40ac',
                'x-rapidapi-host': 'instagram-media-downloader.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);

        // Javobni tekshirish
        if (!response.data || !response.data.video) {
            throw new Error('Video topilmadi yoki noto‘g‘ri havola.');
        }

        // Javobdan kerakli ma'lumotlarni olish
        const result = {
            videoUrl: response.data.video,
            caption: response.data.caption || 'No caption available'
        };

        return result;

    } catch (error) {
        console.log('Error while downloading the video:', error.message);
        // Xatolik haqida aniq xabar qaytarish
        throw new Error('Video yuklab olishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.');
    }
}

module.exports = {
    downLoaderMethod
};
