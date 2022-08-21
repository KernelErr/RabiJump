import React from 'react';
import { TooltipProps } from '../tooltip/index';
export interface DropdownContextType {
    level?: number;
    showTick?: boolean;
    trigger?: TooltipProps['trigger'];
}
declare const DropdownContext: React.Context<DropdownContextType>;
export default DropdownContext;
