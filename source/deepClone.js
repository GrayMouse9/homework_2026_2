'use strict';

/**
 * Функция, создающая глубокую копию значения:
 * вложенные объекты и массивы копируются, а не переиспользуются по ссылке
 * @param {*} value - значение любого типа
 *
 * @example
 * // returns { a: 1, b: { c: 2 } }
 * deepClone({ a: 1, b: { c: 2 } });
 *
 * @returns {*}
 */
const deepClone = (value) => {
    if (typeof value !== 'object' || value === null) {
        return value;
    }

    if (Array.isArray(value)) {
        return value.map(deepClone);
    }

    return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, deepClone(item)])
    );
};
