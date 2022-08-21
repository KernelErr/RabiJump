import BaseFoundation, { DefaultAdapter } from '../base/foundation';
import { AnchorAdapter } from './foundation';
export interface LinkAdapter extends DefaultAdapter {
    addLink: AnchorAdapter['addLink'];
    removeLink: AnchorAdapter['removeLink'];
}
export default class LinkFoundation extends BaseFoundation<LinkAdapter> {
    constructor(adapter: LinkAdapter);
    init(): void;
    destroy(): void;
    handleAddLink(): void;
    handleUpdateLink(href: string, prevHref: string): void;
    handleRemoveLink(): void;
}
