import BaseFoundation, { DefaultAdapter } from '../base/foundation';
import { RadioChangeEvent } from './radioInnerFoundation';
export interface RadioGroupAdapter extends DefaultAdapter {
    isInProps?: (name: string) => boolean;
    notifyChange?: (e: RadioChangeEvent) => void;
    setValue?: (value: any) => void;
}
export default class RadioGroupFoundation extends BaseFoundation<RadioGroupAdapter> {
    constructor(adapter: RadioGroupAdapter);
    init(): void;
    _getDisplayValue(): any;
    handleChange(evt: any): void;
    handlePropValueChange(propValue: any): void;
    _setValue(value: any): void;
    destroy(): void;
}
