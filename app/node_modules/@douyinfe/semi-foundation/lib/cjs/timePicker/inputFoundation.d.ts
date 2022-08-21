import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface TimeInputAdapter extends DefaultAdapter {
    notifyChange: (e: any) => void;
    notifyFocus: (e: any) => void;
    notifyBlur: (e: any) => void;
}
declare class TimePickerFoundation extends BaseFoundation<TimeInputAdapter> {
    constructor(adapter: TimeInputAdapter);
    init(): void;
    destroy(): void;
    handleFocus(e: any): void;
    handleChange(v: string): void;
    handleBlur(e: any): void;
    storeCursor(): void;
    restoreCursor(): void;
    clearCursor(): void;
}
export default TimePickerFoundation;
