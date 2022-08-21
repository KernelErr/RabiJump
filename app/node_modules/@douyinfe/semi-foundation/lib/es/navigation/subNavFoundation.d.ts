import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface OnOpenChangeData {
    itemKey: string | number;
    openKeys: (string | number)[];
    isOpen: boolean;
}
export interface OnClickData extends OnOpenChangeData {
    domEvent: any;
}
export interface OnSelectData extends OnOpenChangeData {
    domEvent: any;
}
export interface SubNavAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    updateIsHovered(isHovered: boolean): void;
    getOpenKeys(): (string | number)[];
    getOpenKeysIsControlled(): boolean;
    getCanUpdateOpenKeys(): boolean;
    updateOpen(isOpen: boolean): void;
    notifyGlobalOpenChange(data: OnOpenChangeData): void;
    notifyGlobalOnSelect(data: OnSelectData): void;
    notifyGlobalOnClick(data: OnClickData): void;
    getIsSelected(itemKey: string | number): boolean;
    getIsOpen(): boolean;
}
export default class SubNavFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<SubNavAdapter<P, S>, P, S> {
    constructor(adapter: SubNavAdapter<P, S>);
    _timer: number;
    init(): void;
    destroy(): void;
    clearDelayTimer(): void;
    isValidKey(itemKey: string | number): boolean;
    handleDropdownVisibleChange(visible: boolean): void;
    /**
     *
     * @param {Event} e
     * @param {HTMLElement} titleRef
     */
    handleClick(e: any, titleRef: any): void;
    /**
     * A11y: simulate sub nav click
     * @param e
     * @param titleRef
     */
    handleKeyPress(e: any, titleRef: any): void;
}
