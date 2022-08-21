import BaseFoundation, { DefaultAdapter } from '../base/foundation';
import { BreadcrumbItemInfo, Route } from './itemFoundation';
export interface BreadcrumbAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    notifyClick: (itemInfo: BreadcrumbItemInfo, event: any) => void;
    expandCollapsed: (clickEvent?: any) => void;
}
export default class BreadcrumbFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<BreadcrumbAdapter<P, S>, P, S> {
    constructor(adapter: BreadcrumbAdapter<P, S>);
    handleClick(info: BreadcrumbItemInfo, event: any): void;
    handleExpand(clickEvent: any): void;
    /**
     * A11y: simulate clear button click
     */
    handleExpandEnterPress(keyboardEvent: any): void;
    genRoutes(routes: Array<Route>): ({
        name: never;
        _origin: {
            name: never;
        };
    } | {
        [x: string]: any;
        path?: string;
        href?: string;
        name?: string;
        icon?: any;
        _origin?: undefined;
    })[];
}
