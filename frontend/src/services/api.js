import axios from 'axios';

// Базовый URL API (замените на ваш)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Создаем экземпляр axios с базовыми настройками
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Добавляем интерсептор для авторизации
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('vk_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Методы API
const ApiService = {
    // Получение статистики слов
    getWordStats: async (userId, period = 'week') => {
        try {
            const response = await api.get(`/words/stats?userId=${userId}&period=${period}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching word stats:', error);
            throw error;
        }
    },

    // Анализ сообщений и получение слова дня
    analyzeMessages: async (userId, peerId = null) => {
        try {
            const response = await api.post('/messages/analyze', { userId, peerId });
            return response.data;
        } catch (error) {
            console.error('Error analyzing messages:', error);
            throw error;
        }
    },

    // Получение истории слов
    getWordsHistory: async (userId, limit = 50) => {
        try {
            const response = await api.get(`/words/history?userId=${userId}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching words history:', error);
            throw error;
        }
    },

    // Отправка уведомления
    sendNotification: async (userId, message) => {
        try {
            const response = await api.post('/notifications/send', { userId, message });
            return response.data;
        } catch (error) {
            console.error('Error sending notification:', error);
            throw error;
        }
    },

    // Получение настроек пользователя
    getUserSettings: async (userId) => {
        try {
            const response = await api.get(`/users/${userId}/settings`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user settings:', error);
            throw error;
        }
    },

    // Обновление настроек пользователя
    updateUserSettings: async (userId, settings) => {
        try {
            const response = await api.put(`/users/${userId}/settings`, settings);
            return response.data;
        } catch (error) {
            console.error('Error updating user settings:', error);
            throw error;
        }
    },
};

export default ApiService;