require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const VK_API_VERSION = '5.131';
const VK_API_URL = 'https://api.vk.com/method';

// Роут для отправки уведомлений
app.post('/api/send-notification', async (req, res) => {
    try {
        const { userId, message } = req.body;

        const response = await axios.post(`${VK_API_URL}/notifications.send`, {
            user_ids: userId,
            message: message,
            access_token: process.env.VK_SERVICE_TOKEN,
            v: VK_API_VERSION
        });

        res.json(response.data);
    } catch (error) {
        console.error('Ошибка:', error.response.data);
        res.status(500).json({ error: 'Не удалось отправить уведомление' });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));