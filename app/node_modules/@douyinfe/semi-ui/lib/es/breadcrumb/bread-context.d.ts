import React from 'react';
import { showToolTipProps } from './index';
import { BreadcrumbItemInfo } from './item';
export interface BreadContextType {
    onClick?: (info: BreadcrumbItemInfo, event: React.MouseEvent) => void;
    showTooltip?: boolean | showToolTipProps;
    compact?: boolean;
    separator?: React.ReactNode;
}
declare const BreadContext: React.Context<BreadContextType>;
export default BreadContext;
