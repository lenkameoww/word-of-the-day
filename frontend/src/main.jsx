// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import bridge from '@vkontakte/vk-bridge';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import App from './components/App/App';

// Инициализация VK Bridge
bridge.send('VKWebAppInit');

// Настройка viewport для корректного отображения на мобильных устройствах
const setViewport = () => {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover';
    document.head.appendChild(meta);
};

// Проверка платформы (iOS/Android) для тонкой настройки
bridge.send('VKWebAppGetDeviceInfo')
    .then(data => {
        document.body.classList.add(`vkui--platform-${data.platform.toLowerCase()}`);
    })
    .catch(() => {
        document.body.classList.add('vkui--platform-android'); // fallback
    });

setViewport();

// Рендер приложения
ReactDOM.render(
    <ConfigProvider
        appearance={bridge.supports('VKWebAppSetViewSettings') ? 'auto' : 'light'}
        transitionMotionEnabled={true}
    >
        <AdaptivityProvider>
            <App />
        </AdaptivityProvider>
    </ConfigProvider>,
    document.getElementById('root')
);

// Отправка события инициализации в аналитику (опционально)
bridge.send('VKWebAppTrackEvent', { event_name: 'AppInit' });