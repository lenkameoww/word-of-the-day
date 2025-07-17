// 1. Импорт необходимых библиотек
require('dotenv').config(); // Для работы с .env файлом
const express = require('express'); // Фреймворк для сервера
const cors = require('cors'); // Чтобы фронтенд мог обращаться к бэкенду
const vk = require('vk-io'); // Для работы с API ВКонтакте

// 2. Создаем Express-приложение
const app = express();

// 3. Настройка middleware (промежуточное ПО)
app.use(cors()); // Разрешаем запросы с других доменов
app.use(express.json()); // Чтобы сервер понимал JSON-данные

// 4. Подключаем VK API
const vkApi = new vk.VK({
    token: process.env.VK_API_TOKEN // Токен из .env файла
});

// 5. Основной маршрут для проверки работы сервера
app.get('/', (req, res) => {
    res.send('Сервер работает! 🚀');
});

// 6. Маршрут для получения сообщений пользователя
app.post('/api/messages', async (req, res) => {
    try {
        const { userId } = req.body; // ID пользователя из запроса

        // Получаем последние 200 сообщений пользователя
        const messages = await vkApi.api.messages.getHistory({
            user_id: userId,
            count: 200,
        });

        res.json(messages); // Отправляем сообщения обратно
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({ error: 'Не удалось получить сообщения' });
    }
});

app.post('/api/analyze', async (req, res) => {
    try {
        const { userId, period = 'day' } = req.body;

        // Получаем сообщения
        const messages = await vkApi.api.messages.getHistory({
            user_id: userId,
            count: 200,
            start_time: getTimePeriod(period) // Нужно реализовать эту функцию
        });

        // Анализируем и возвращаем результат
        const result = analyzeMessages(messages.items);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// 7. Запуск сервера
const PORT = process.env.PORT || 3001; // Порт из .env или 3001
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});