import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface BasicOptionProps {
    [x: string]: any;
    value?: string | number;
    label?: string | number | unknown;
    children?: unknown;
    disabled?: boolean;
    showTick?: boolean;
    className?: string;
    style?: Record<string, any>;
}
export interface OptionDefaultAdapter extends Partial<DefaultAdapter> {
    notifyClick(option: BasicOptionProps): void;
}
export default class OptionFoundation extends BaseFoundation<OptionDefaultAdapter> {
    constructor(adapter: OptionDefaultAdapter);
    init(): void;
    destroy(): void;
    onOptionClick(option: BasicOptionProps): void;
    _isDisabled(): any;
}
