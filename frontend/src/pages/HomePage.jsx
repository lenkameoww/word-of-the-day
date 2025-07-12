import { Button, Div, Title } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

export const HomePage = () => {
    return (
        <Div>
            <Title level="1" style={{ marginBottom: 16 }}>
                Слово дня
            </Title>
            <Button
                size="l"
                onClick={() => alert("Начинаем анализ сообщений...")}
            >
                Найти популярное слово
            </Button>
        </Div>
    );
};