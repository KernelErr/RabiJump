/**
 * @file
 * Various date-related analysis methods
 */
import { Locale } from 'date-fns';
/**
 * Parsing value to Date object
 */
export declare function compatibleParse(value: string, formatToken?: string, baseDate?: Date, locale?: Locale): Date | null;
/**
 * whether value can be parsed with date-fns `parse`
 *
 * @example
 * isValueParseValid({ value: '2021-01-01', formatToken: 'yyyy-MM-dd' }); // true
 * isValueParseValid({ value: '2021-01-0', formatToken: 'yyyy-MM-dd' }); // false
 * isValueParseValid({ value: '2021-01', formatToken: 'yyyy-MM-dd' }); // false
 */
export declare function isValueParseValid(options: {
    value: string;
    formatToken: string;
    baseDate?: Date;
    locale?: Locale;
}): boolean;
