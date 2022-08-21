export declare const DEFAULT_TOGGLE_ICON: {
    open: string;
    closed: string;
};
export default class NavItem {
    items: any[];
    toggleIcon: any;
    constructor(options?: any);
    static isValidToggleIcon(toggleIcon: any): boolean;
}
