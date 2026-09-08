'use strict';

/**
 * Функция, создающая глубокую копию значения:
 * вложенные объекты и массивы копируются, а не переиспользуются по ссылке
 *
 * Поддерживаются примитивы, обычные объекты, массивы и Date,
 * в том числе структуры с циклическими ссылками.
 *
 * Ограничения области применения:
 * - прототип не сохраняется, копия любого объекта является обычным объектом;
 *   так же ведёт себя встроенный structuredClone
 * - Map, Set, RegExp и другие встроенные типы не поддерживаются:
 *   их содержимое лежит во внутренних слотах, а не в собственных свойствах,
 *   поэтому копия окажется пустым объектом
 *
 * @param {*} value - значение любого типа
 * @param {WeakMap} [seen] - служебный параметр: объекты, уже скопированные
 * в текущем вызове; нужен для обработки циклических ссылок
 *
 * @example
 * // returns { a: 1, b: { c: 2 } }
 * deepClone({ a: 1, b: { c: 2 } });
 *
 * @returns {*}
 */
const deepClone = (value, seen = new WeakMap()) => {
    if (typeof value !== 'object' || value === null) {
        return value;
    }

    if (value instanceof Date) {
        return new Date(value.getTime());
    }

    if (seen.has(value)) {
        return seen.get(value);
    }

    const copy = Array.isArray(value) ? [] : {};

    seen.set(value, copy);

    Object.entries(value).forEach(([key, item]) => {
        copy[key] = deepClone(item, seen);
    });

    return copy;
};
