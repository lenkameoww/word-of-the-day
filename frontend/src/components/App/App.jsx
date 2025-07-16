import React from 'react';
import { AdaptivityProvider, ConfigProvider, AppRoot, SplitLayout, SplitCol, View, Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import HomePage from '../../pages/HomePage/HomePage';
import HistoryPage from '../../pages/HistoryPage/HistoryPage';
import { Icon28NewsfeedOutline, Icon28HistoryOutline } from '@vkontakte/icons';
import styles from './App.module.css';

const App = () => {
    const [activeView, setActiveView] = React.useState('home');
    const [fetchedUser, setFetchedUser] = React.useState(null);

    // Инициализация приложения
    React.useEffect(() => {
        async function init() {
            try {
                // Получаем данные пользователя через VK Bridge
                const user = await window.vkBridge.send('VKWebAppGetUserInfo');
                setFetchedUser(user);
            } catch (err) {
                console.error('Ошибка при загрузке данных пользователя:', err);
            }
        }
        init();
    }, []);

    return (
        <ConfigProvider>
            <AdaptivityProvider>
                <AppRoot className={styles.appContainer}>
                    <SplitLayout className={styles.splitLayout}>
                        <SplitCol className={styles.splitCol}>
                            <Epic
                                activeStory={activeView}
                                tabbar={
                                    <Tabbar>
                                        <TabbarItem
                                            onClick={() => setActiveView('home')}
                                            selected={activeView === 'home'}
                                            text="Сегодня"
                                        >
                                            <Icon28NewsfeedOutline />
                                        </TabbarItem>
                                        <TabbarItem
                                            onClick={() => setActiveView('history')}
                                            selected={activeView === 'history'}
                                            text="История"
                                        >
                                            <Icon28HistoryOutline />
                                        </TabbarItem>
                                    </Tabbar>
                                }
                            >
                                <View id="home" activePanel="home">
                                    <HomePage id="home" user={fetchedUser} />
                                </View>
                                <View id="history" activePanel="history">
                                    <HistoryPage id="history" userId={fetchedUser?.id} />
                                </View>
                            </Epic>
                        </SplitCol>
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
};

export default App;