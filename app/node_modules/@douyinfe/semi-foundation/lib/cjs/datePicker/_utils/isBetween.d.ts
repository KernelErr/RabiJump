/**
 * is the date between start and end?(not including start and end)
 *   - if start > end, return false
 * @param {String|Date} day
 * @param {Object} { start: string|Date, end: string|Date}
 * @returns {Boolean}
 */
export default function isBetween(day: string | Date, { start, end }: {
    start: string | Date;
    end: string | Date;
}): boolean;
