import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface SwitchAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    setNativeControlChecked: (nativeControlChecked: boolean | undefined) => void;
    setNativeControlDisabled: (nativeControlDisabled: boolean | undefined) => void;
    setFocusVisible: (focusVisible: boolean) => void;
    notifyChange: (checked: boolean, e: any) => void;
}
export default class SwitchFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<SwitchAdapter<P, S>, P, S> {
    constructor(adapter: SwitchAdapter<P, S>);
    init(): void;
    setChecked(checked: boolean | undefined): void;
    setDisabled(disabled: boolean | undefined): void;
    handleChange(checked: boolean, e: any): void;
    handleFocusVisible: (event: any) => void;
    handleBlur: () => void;
    destroy(): void;
}
