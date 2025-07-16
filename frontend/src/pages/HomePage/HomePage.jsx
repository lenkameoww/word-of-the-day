import React, { useState, useEffect } from 'react';
import { Panel, PanelHeader, Header, Group, Cell, Div, Button, Spinner } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import styles from './HomePage.module.css';

const HomePage = () => {
    const [wordOfTheDay, setWordOfTheDay] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Заглушка для теста (позже заменим на реальный API-запрос)
    const fetchWordOfTheDay = async () => {
        setIsLoading(true);
        try {
            // Имитация загрузки данных
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Тестовые данные (удалите этот блок при подключении API)
            const mockData = {
                word: "Привет",
                count: 42,
                date: new Date().toLocaleDateString()
            };

            setWordOfTheDay(mockData);
            setError(null);
        } catch (err) {
            setError("Ошибка при загрузке слова");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Загружаем данные при открытии страницы
    useEffect(() => {
        fetchWordOfTheDay();
    }, []);

    return (
        <Panel>
            <PanelHeader>Слово дня</PanelHeader>

            <Group header={<Header mode="secondary" className={styles.statsHeader}>Ваша статистика</Header>}>
                <Div className={styles.wordCard}>
                    <div className={styles.word}>{wordOfTheDay.word}</div>
                    <div className={styles.count}>Использовано {wordOfTheDay.count} раз</div>
                    <div className={styles.date}>{wordOfTheDay.date}</div>
                </Div>

                <Button
                    className={styles.refreshButton}
                    size="l"
                    stretched
                    onClick={fetchWordOfTheDay}
                    loading={isLoading}
                >
                    Обновить
                </Button>
            </Group>
        </Panel>
    );
};

export default HomePage;