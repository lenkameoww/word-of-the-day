/**
 * Утилиты для работы с датами в приложении "Слово дня"
 */

// Форматы дат для разных случаев использования
export const DATE_FORMATS = {
    dayMonth: 'dd.MM',
    fullDate: 'dd.MM.yyyy',
    weekday: 'EEEE',
    apiFormat: 'yyyy-MM-dd'
};

/**
 * Форматирование даты с учетом локали
 * @param {Date|string} date - Дата для форматирования
 * @param {string} format - Формат (из DATE_FORMATS)
 * @returns {string} Отформатированная дата
 */
export const formatDate = (date, format = DATE_FORMATS.fullDate) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return new Intl.DateTimeFormat('ru-RU', {
        day: format.includes('dd') ? '2-digit' : undefined,
        month: format.includes('MM') ? '2-digit' : undefined,
        year: format.includes('yyyy') ? 'numeric' : undefined,
        weekday: format.includes('EEEE') ? 'long' : undefined
    }).format(dateObj);
};

/**
 * Проверка, является ли дата сегодняшним днем
 * @param {Date|string} date - Дата для проверки
 * @returns {boolean}
 */
export const isToday = (date) => {
    const today = new Date();
    const checkDate = typeof date === 'string' ? new Date(date) : date;

    return (
        checkDate.getDate() === today.getDate() &&
        checkDate.getMonth() === today.getMonth() &&
        checkDate.getFullYear() === today.getFullYear()
    );
};

/**
 * Получение даты в формате для API (yyyy-MM-dd)
 * @param {Date} [date] - Дата, если не указана - используется текущая
 * @returns {string}
 */
export const getApiDateFormat = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

/**
 * Получение массива дат за последние N дней
 * @param {number} daysCount - Количество дней
 * @returns {Array<{date: Date, formatted: string}>}
 */
export const getLastDays = (daysCount = 7) => {
    return Array.from({ length: daysCount }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);

        return {
            date,
            formatted: formatDate(date, DATE_FORMATS.dayMonth),
            apiFormat: getApiDateFormat(date)
        };
    }).reverse();
};

/**
 * Сравнение двух дат без учета времени
 * @param {Date} date1 
 * @param {Date} date2 
 * @returns {boolean}
 */
export const isSameDate = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

/**
 * Конвертация даты из API формата в объект Date
 * @param {string} dateString - Дата в формате yyyy-MM-dd
 * @returns {Date}
 */
export const parseApiDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
};