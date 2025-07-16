/**
 * Утилиты для обработки текста
 */
import pymorphy2 from 'pymorphy2';

const morph = pymorphy2();

// Списки стоп-слов и исключений
const STOP_WORDS = new Set([
    'и', 'в', 'не', 'на', 'я', 'что', 'а', 'то', 'но', 'как',
    'у', 'с', 'к', 'о', 'из', 'за', 'от', 'по', 'же', 'бы',
    'для', 'это', 'мы', 'так', 'вот', 'был', 'но', 'ну', 'ли'
]);

// Части речи, которые учитываем
const ALLOWED_POS = new Set(['NOUN', 'ADJF', 'ADJS', 'VERB', 'ADVB', 'INFN']);

/**
 * Нормализация слова с pymorphy2
 * @param {string} word 
 * @returns {string} Нормальная форма слова
 */
export const normalizeWord = (word) => {
    try {
        const parsed = morph.parse(word)[0];
        return parsed.normalForm;
    } catch (e) {
        return word.toLowerCase();
    }
};

/**
 * Проверка, является ли слово значимым
 * @param {string} word 
 * @returns {boolean}
 */
export const isMeaningfulWord = (word) => {
    if (word.length < 3 || STOP_WORDS.has(word)) return false;

    try {
        const parsed = morph.parse(word)[0];
        return ALLOWED_POS.has(parsed.tag.POS);
    } catch (e) {
        return false;
    }
};

/**
 * Очистка и токенизация текста
 * @param {string} text 
 * @returns {string[]}
 */
export const prepareText = (text) => {
    return text
        .toLowerCase()
        .replace(/[^а-яё\s-]/g, ' ') // Удаляем все кроме русских букв и дефисов
        .replace(/\s+/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0);
};

/**
 * Анализ текста с морфологическим разбором
 * @param {string} text 
 * @returns {Map<string, {count: number, forms: Set<string>}>}
 */
export const analyzeText = (text) => {
    const words = prepareText(text);
    const result = new Map();

    words.forEach(word => {
        if (!isMeaningfulWord(word)) return;

        const normalForm = normalizeWord(word);
        const entry = result.get(normalForm) || { count: 0, forms: new Set() };

        entry.count++;
        entry.forms.add(word);
        result.set(normalForm, entry);
    });

    return result;
};

/**
 * Получение статистики по словам
 * @param {string} text 
 * @returns {Array<{word: string, count: number, forms: string[]}>}
 */
export const getWordStatistics = (text) => {
    const analysis = analyzeText(text);
    return Array.from(analysis.entries())
        .map(([word, { count, forms }]) => ({
            word,
            count,
            forms: Array.from(forms)
        }))
        .sort((a, b) => b.count - a.count);
};

/**
 * Получение самого частого слова
 * @param {string} text 
 * @returns {{word: string, count: number}|null}
 */
export const getMostFrequentWord = (text) => {
    const stats = getWordStatistics(text);
    return stats.length > 0 ? stats[0] : null;
};

/**
 * Группировка слов по частям речи
 * @param {string} text 
 * @returns {Map<string, string[]>}
 */
export const groupByPartOfSpeech = (text) => {
    const words = prepareText(text);
    const result = new Map();

    words.forEach(word => {
        try {
            const parsed = morph.parse(word)[0];
            if (!ALLOWED_POS.has(parsed.tag.POS)) return;

            const pos = parsed.tag.POS;
            const group = result.get(pos) || [];
            group.push(word);
            result.set(pos, group);
        } catch (e) {
            console.error(`Error parsing word: ${word}`, e);
        }
    });

    return result;
};