/**
 *
 * @param {string|Date|number} input
 * @param {string} formatToken
 * @param {object} dateFnsLocale
 * @returns {Date}
 */
export declare const parseToDate: (input: string | Date | number, formatToken?: string, dateFnsLocale?: Locale) => Date;
/**
 *
 * @param {string|Date|number} input
 * @returns {number}
 */
export declare const parseToTimestamp: (input: string | Date | number, formatToken?: string, dateFnsLocale?: Locale) => number;
/**
 *
 * @param {Date|number} dateOrTimestamp
 * @param {string} formatToken
 * @returns {string}
 */
export declare const formatToString: (dateOrTimestamp: Date | number, formatToken?: string, dateFnsLocale?: Locale) => string;
export declare const hourIsDisabled: (disabledHours: () => boolean, hour: number) => boolean;
export declare const minuteIsDisabled: (disabledMinutes: (hour: number) => number[], hour: number, minute: number) => boolean;
export declare const secondIsDisabled: (disabledSeconds: (hour: number, minute: number) => number[], hour: number, minute: number, second: number) => boolean;
export declare const transformToArray: (value: any) => any[];
/**
 * Determine whether the time length is the same as the format
 * e.g.
 *  format      | time      | return
 *  HH:mm       | 12:00     | true
 *  HH:mm:ss    | 12:00:00  | true
 *  yyyy HH:mm  | 2021 12:00| true
 *  HH          | 1         | false
 *  HH:mm       | 12:0      | false
 *  HH          | 1         | false
 *  HH:mm:ss    | 12:00:0   | false
 * @param {String} time  e.g. 12:0
 * @param {String} formatToken e.g. HH:mm
 * @returns {Boolean}
 */
export declare const isTimeFormatLike: (time: string, formatToken: string) => boolean;
