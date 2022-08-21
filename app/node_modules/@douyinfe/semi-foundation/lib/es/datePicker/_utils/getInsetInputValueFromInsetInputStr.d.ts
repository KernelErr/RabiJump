import { strings } from '../constants';
/**
 * 从 insetInputStr 字符串解析出 insetInputValue 对象
 * Parse the insetInputValue object from the insetInputStr string
 *
 * @example
 * ```
 * '2022-02-01' => { monthLeft: { dateInput: '2022-02-01' } }
 * '2022-02-01 00:00:00' => { monthLeft: { dateInput: '2022-02-01', timeInput: '00:00:00' } }
 * '2022-02-01 00:00:00 ~ 2022-02-15 00:00:00' => { monthLeft: { dateInput: '2022-02-01', timeInput: '00:00:00'}, monthRight: { dateInput: '2022-02-15', timeInput: '00:00:00' } }
 *
 * '2022-0' => { monthLeft: { dateInput: '2022-0' } }
 * '2022-02-01 00:00:' => { monthLeft: { dateInput: '2022-02-01', timeInput: '00:00:' } }
 * '2022-02-01 00:00:00 ~ ' => { monthLeft: { dateInput: '2022-02-01', timeInput: '00:00:00'}, monthRight: { dateInput: '', timeInput: '' } }
 * ' ~ 2022-02-15 00:00:00' => { monthLeft: { dateInput: '', timeInput: '' }, monthRight: { dateInput: '2022-02-15', timeInput: '00:00:00' } }
 * ```
 */
export default function getInsetInputValueFromInsetInputStr(options: {
    inputValue: string;
    rangeSeparator: string;
    type: typeof strings.TYPE_SET[number];
}): {
    monthLeft: {
        dateInput: string;
        timeInput: string;
    };
    monthRight: {
        dateInput: string;
        timeInput: string;
    };
};
