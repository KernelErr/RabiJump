import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface TabsAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    collectPane: () => void;
    collectActiveKey: () => void;
    notifyTabClick: (activeKey: string, event: any) => void;
    notifyChange: (activeKey: string) => void;
    setNewActiveKey: (activeKey: string) => void;
    getDefaultActiveKeyFromChildren: () => string;
    notifyTabDelete: (tabKey: string) => void;
}
declare class TabsFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<TabsAdapter<P, S>, P, S> {
    constructor(adapter: TabsAdapter<P, S>);
    init(): void;
    destroy: (...args: any[]) => void;
    _notifyChange(activeKey: string): void;
    handleTabClick(activeKey: string, event: any): void;
    handleNewActiveKey(activeKey: string): void;
    getDefaultActiveKey(): string;
    handleTabListChange(): void;
    handleTabPanesChange(): void;
    handleTabDelete(tabKey: string): void;
    handlePrevent: (event: any) => void;
    handleKeyDown: (event: any, itemKey: string, closable: boolean) => void;
    determineOrientation(event: any, tabs: HTMLElement[]): void;
    handleDeleteKeyDown(event: any, tabs: HTMLElement[], itemKey: string, closable: boolean): void;
    switchTabOnArrowPress(event: any, tabs: HTMLElement[]): void;
}
export default TabsFoundation;
