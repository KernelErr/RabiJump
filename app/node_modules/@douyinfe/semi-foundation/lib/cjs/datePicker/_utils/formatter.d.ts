import { BaseValueType } from '../foundation';
/**
 * Formats the displayed date text
 * @param {string[]|Date[]} values
 * @param {string} formatToken
 * @param {Object} groupOptions
 * @param {Object} locale
 * @returns {string}
 */
export declare function formatDateValues(values: BaseValueType[], formatToken: string, { groupInnerSeparator, groupSize, groupSeparator, }: {
    groupInnerSeparator?: string;
    groupSize?: number;
    groupSeparator?: string;
}, locale: any): string;
