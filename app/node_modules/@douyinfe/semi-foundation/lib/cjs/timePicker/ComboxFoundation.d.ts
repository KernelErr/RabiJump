import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export declare const formatOption: (option: number, disabledOptions: number[]) => {
    value: string;
    disabled: boolean;
};
declare class ComboboxFoundation extends BaseFoundation<DefaultAdapter> {
    constructor(adapter: DefaultAdapter);
    isAM(): any;
    initData(): {
        showHour: boolean;
        showMinute: boolean;
        showSecond: boolean;
        hourOptions: any[];
        minuteOptions: any[];
        secondOptions: any[];
    };
    getPosition(): any;
    getDefaultFormatIfNeed(): any;
    disabledHours(): number[];
    getValidFormat(format?: string): string;
    /**
     * from 13-bit timestamp  -> get display date
     * by combobox use
     */
    getDisplayDateFromTimeStamp(timeStamp: Date | string): any;
    /**
     * create a date at 00:00:00
     */
    createDateDefault(): Date;
}
export default ComboboxFoundation;
