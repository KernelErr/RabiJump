import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface AnchorAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    addLink: (link: string) => void;
    removeLink: (link: string) => void;
    setChildMap: (value: Record<string, Set<string>>) => void;
    setScrollHeight: (heigh: string) => void;
    setSlideBarTop: (height: number) => void;
    setClickLink: (value: boolean) => void;
    setActiveLink: (link: string, cb: () => void) => void;
    setClickLinkWithCallBack: (value: boolean, link: string, cb: (link: string) => void) => void;
    getContainer: () => HTMLElement | Window;
    getContainerBoundingTop: () => number;
    getLinksBoundingTop: () => number[];
    getAnchorNode: (selector: string) => HTMLElement;
    getContentNode: (selector: string) => HTMLElement;
    notifyChange: (currentLink: string, previousLink: string) => void;
    notifyClick: (e: any, link: string) => void;
    canSmoothScroll: () => boolean;
}
export default class AnchorFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<AnchorAdapter<P, S>, P, S> {
    constructor(adapter: AnchorAdapter<P, S>);
    init: () => void;
    destroy: () => void;
    addLink: (link: string) => void;
    removeLink: (link: string) => void;
    setActiveLink: (link: string, prevLink: string, shouldNotify?: boolean) => void;
    setScrollHeight: () => void;
    updateScrollHeight: (prevState: any, state: any) => void;
    setChildMap: () => void;
    updateChildMap: (prevState: any, state: any) => void;
    getLinksTop: () => number[];
    handleScroll: () => void;
    handleClick: (e: any, link: string, shouldNotify?: boolean) => void;
    handleClickLink: () => void;
    _getLinkToMap: (link: any, parents: string[], linkMap: {
        [key: string]: Set<string>;
    }) => void;
    _scrollIntoView: (link: string) => void;
    _setActiveSlide: () => void;
}
