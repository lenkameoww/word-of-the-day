import React from 'react';
import { Card, Div, Title, Text, Progress } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import styles from './WordStats.module.css';

const WordStats = ({ words }) => {
    // Сортируем слова по частоте использования
    const sortedWords = [...words].sort((a, b) => b.count - a.count);
    // Берем топ-5 слов
    const topWords = sortedWords.slice(0, 5);
    // Максимальное количество использований для шкалы прогресса
    const maxCount = topWords[0]?.count || 1;

    return (
        <Card className={styles.card}>
            <Div>
                <Title level="2" className={styles.title}>
                    Топ-5 слов за период
                </Title>

                {topWords.length > 0 ? (
                    topWords.map((word, index) => (
                        <Div key={word.word + index} className={styles.wordItem}>
                            <Text weight="medium" className={styles.wordText}>
                                {index + 1}. {word.word}
                            </Text>
                            <div className={styles.progressContainer}>
                                <Progress
                                    value={(word.count / maxCount) * 100}
                                    className={styles.progressBar}
                                />
                                <Text className={styles.countText}>
                                    {word.count} раз
                                </Text>
                            </div>
                        </Div>
                    ))
                ) : (
                    <Text>Нет данных для отображения</Text>
                )}
            </Div>
        </Card>
    );
};

export default WordStats;