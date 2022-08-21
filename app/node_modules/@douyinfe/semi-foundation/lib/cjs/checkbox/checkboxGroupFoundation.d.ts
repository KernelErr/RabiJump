import BaseFoundation, { DefaultAdapter } from '../base/foundation';
import { BasicCheckboxEvent } from './checkboxFoundation';
export interface CheckboxGroupAdapter extends DefaultAdapter {
    updateGroupValue: (value: any[]) => void;
    notifyChange: (value: any[]) => void;
}
declare class CheckboxGroupFoundation extends BaseFoundation<CheckboxGroupAdapter> {
    static get checkboxGroupDefaultAdapter(): {};
    constructor(adapter: CheckboxGroupAdapter);
    init(): void;
    notifyChange(value: any[]): void;
    handleChange(evt: BasicCheckboxEvent): void;
    getFormatName(): any;
    handlePropValueChange(newPropValue: any[]): void;
    destroy(): void;
}
export default CheckboxGroupFoundation;
