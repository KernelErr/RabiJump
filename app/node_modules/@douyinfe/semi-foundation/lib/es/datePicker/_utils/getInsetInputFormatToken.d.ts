import { strings } from '../constants';
/**
 * 获取 insetInput 输入框的 placeholder
 * Get the placeholder of the insetInput input
 *
 * If type is time related, we only recognize the format like `dateFormat timeFormat`
 *  - 'yyyy-MM-dd HH:mm:ss' // ok
 *  - 'yyyy-MM-dd  HH:mm:ss' // bad format
 *
 * @example
 * 'yyyy-MM-dd' => 'yyyy-MM-dd'
 * 'yyyy-MM' => 'yyyy-MM'
 * 'yyyy-MM-dd HH:mm:ss' => 'yyyy-MM-dd HH:mm:ss'
 * 'yyyy-MM-dd HH:mm' => 'yyyy-MM-dd HH:mm'
 * 'Pp' => 'yyyy-MM-dd'
 */
export default function getInsetInputFormatToken(options: {
    format: string;
    type: typeof strings.TYPE_SET[number];
}): string;
