import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface RadioChangeEvent {
    target: {
        [x: string]: any;
        checked: boolean;
        value: any;
    };
    stopPropagation: () => void;
    preventDefault: () => void;
}
export interface RadioInnerAdapter extends DefaultAdapter {
    notifyChange?: (e: RadioChangeEvent) => void;
    setNativeControlChecked?: (checked: boolean) => void;
}
export default class RadioInnerFoundation extends BaseFoundation<RadioInnerAdapter> {
    constructor(adapter: RadioInnerAdapter);
    init(): void;
    setChecked(checked: boolean): void;
    getChecked(): any;
    handleChange(e: any): void;
    destroy(): void;
}
