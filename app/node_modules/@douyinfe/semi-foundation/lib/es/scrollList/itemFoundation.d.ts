import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface Item {
    [x: string]: any;
    transform?: (value: any, text: string) => string;
    value: any;
    text?: string;
    disabled?: boolean;
}
export interface ScrollItemAdapter<P = Record<string, any>, S = Record<string, any>, I = Item> extends DefaultAdapter<P, S> {
    setPrependCount: (prependCount: number) => void;
    setAppendCount: (appendCount: number) => void;
    setSelectedNode: (el: HTMLElement) => void;
    isDisabledIndex: (i: number) => boolean;
    notifySelectItem: (data: I) => void;
    scrollToCenter: (selectedNode: Element, scrollWrapper?: Element, duration?: number) => void;
}
export default class ItemFoundation<P = Record<string, any>, S = Record<string, any>, I = Item> extends BaseFoundation<ScrollItemAdapter<P, S, I>, P, S> {
    _cachedSelectedNode: HTMLElement;
    selectIndex(index: number, listWrapper: HTMLElement): void;
    selectNode(node: HTMLElement, listWrapper: HTMLElement): void;
    /**
     *
     * @param {HTMLElement} listWrapper
     * @param {HTMLElement} scrollWrapper
     * @param {number} ratio
     * @returns {boolean}
     */
    shouldAppend(listWrapper: HTMLElement, scrollWrapper: HTMLElement, ratio?: number): number | false;
    /**
     *
     * @param {HTMLElement} listWrapper
     * @param {HTMLElement} scrollWrapper
     * @param {number} ratio
     *
     * @returns {boolean}
     */
    shouldPrepend(listWrapper: HTMLElement, scrollWrapper: HTMLElement, ratio?: number): number;
    /**
     *
     * @param {HTMLElement} listWrapper
     * @param {HTMLElement} wrapper
     * @param {Function} [callback]
     */
    initWheelList(listWrapper: HTMLElement, wrapper: HTMLElement, callback: () => void): void;
    /**
     *
     * @param {HTMLElement} listWrapper
     * @param {HTMLElement} wrapper
     * @param {HTMLElement} [nearestNode]
     */
    adjustInfiniteList(listWrapper: HTMLElement, wrapper: HTMLElement, nearestNode: HTMLElement): void;
    /**
     *
     * @param {HTMLElement} listWrapper
     * @param {HTMLElement} selector
     *
     */
    getNearestNodeInfo(listWrapper: HTMLElement, selector: HTMLElement): {
        nearestNode: HTMLElement;
        nearestIndex: number;
    };
    /**
     *
     * @param {HTMLElement} listWrapper
     *
     * @param {HTMLElement|null}
     */
    getTargetNode(e: any, listWrapper: HTMLElement): {
        targetNode: HTMLLIElement;
        targetIndex: number;
        indexInList: number;
        infoInList: any;
    };
}
