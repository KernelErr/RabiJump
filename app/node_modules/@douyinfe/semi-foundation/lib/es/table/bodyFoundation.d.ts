import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface BodyAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    setVirtualizedData: (virtualizedData: any[], cb: () => void) => void;
    setCachedExpandBtnShouldInRow: (cachedExpandBtnShouldInRow: boolean) => void;
    setCachedExpandRelatedProps: (cachedExpandRelatedProps: string[]) => void;
    observeBodyResize: (bodyWrapDOM: any) => void;
    unobserveBodyResize: () => void;
}
export default class TableBodyFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<BodyAdapter<P, S>, P, S> {
    init(): void;
    destroy(): void;
    initVirtualizedData(cb?: (...args: any[]) => void): void;
    initExpandBtnShouldInRow(newExpandRelatedProps?: any[]): void;
    flattenData(dataSource?: any[], level?: number, parentKeys?: any[], childrenKeys?: any[]): (FlattenData | GroupFlattenData)[];
    /**
     * Use ResizeObserver to monitor changes in the size of the body content area, and notify Table to recalculate if it changes. columns #1219
     * (Only monitor the scroll.y scene, other scenes are not monitored, because the header of the scroll.y scene is a separate table, and a scrollbar column will be inserted)
     */
    observeBodyResize(bodyDOM: any): void;
    unobserveBodyResize(): void;
}
export interface GroupFlattenData {
    key: number | string;
    level: number;
    sectionRow: boolean;
    group: Map<string, Record<string, any>[]>;
    groupKey: number;
    expanded: boolean;
}
export interface FlattenData {
    key: number | string;
    record: Record<string, any>;
    level: number;
    parentKeys?: any[];
    childrenKeys?: any[];
    expandedRow?: boolean;
    sectionRow?: boolean;
}
