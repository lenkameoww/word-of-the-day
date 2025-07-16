import React, { useState, useEffect } from 'react';
import {
    Panel,
    PanelHeader,
    Group,
    Div,
    Button,
    Tabs,
    TabsItem,
    Spinner,
    Text
} from '@vkontakte/vkui';
import WordStats from '../../components/WordStats/WordStats';
import styles from './HistoryPage.module.css';
import '@vkontakte/vkui/dist/vkui.css';

const HistoryPage = ({ userId }) => {
    const [wordsData, setWordsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [period, setPeriod] = useState('week'); // week/month/year/all

    const fetchWordsHistory = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Здесь будет реальный запрос к API
            // const response = await fetch(`/api/words/history?userId=${userId}&period=${period}`);
            // const data = await response.json();
            // setWordsData(data);

            await new Promise(resolve => setTimeout(resolve, 800));

            // Тестовые данные
            const mockData = [
                { word: "Привет", count: 42 + Math.floor(Math.random() * 20) },
                { word: "Пока", count: 31 + Math.floor(Math.random() * 15) },
                { word: "Код", count: 28 + Math.floor(Math.random() * 10) },
                { word: "Проект", count: 25 + Math.floor(Math.random() * 8) },
                { word: "ВК", count: 20 + Math.floor(Math.random() * 5) },
            ];

            setWordsData(mockData);
        } catch (err) {
            setError('Не удалось загрузить историю');
            console.error('Ошибка:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userId) fetchWordsHistory();
    }, [userId, period]);

    return (
        <Panel className={styles.panel}>
            <PanelHeader>История слов</PanelHeader>

            <Group>
                <Div className={styles.periodSelector}>
                    <Tabs>
                        <TabsItem
                            selected={period === 'week'}
                            onClick={() => setPeriod('week')}
                            className={period === 'week' ? styles.periodButtonActive : styles.periodButton}
                        >
                            Неделя
                        </TabsItem>
                        <TabsItem
                            selected={period === 'month'}
                            onClick={() => setPeriod('month')}
                            className={period === 'month' ? styles.periodButtonActive : styles.periodButton}
                        >
                            Месяц
                        </TabsItem>
                        <TabsItem
                            selected={period === 'all'}
                            onClick={() => setPeriod('all')}
                            className={period === 'all' ? styles.periodButtonActive : styles.periodButton}
                        >
                            Все время
                        </TabsItem>
                    </Tabs>
                </Div>

                <Div className={styles.refreshButton}>
                    <Button
                        size="l"
                        stretched
                        onClick={fetchWordsHistory}
                        loading={isLoading}
                    >
                        Обновить
                    </Button>
                </Div>

                {isLoading ? (
                    <Div className={styles.loadingIndicator}>
                        <Spinner size="regular" />
                    </Div>
                ) : error ? (
                    <Text className={styles.errorMessage}>{error}</Text>
                ) : wordsData.length === 0 ? (
                    <Div className={styles.emptyState}>
                        <Text>Нет данных за выбранный период</Text>
                    </Div>
                ) : (
                    <WordStats words={wordsData} />
                )}
            </Group>
        </Panel>
    );
};

export default HistoryPage;