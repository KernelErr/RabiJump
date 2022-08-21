import React from 'react';
export interface VirtualRowProps {
    index: number;
    data: Record<string, any>;
    style?: React.CSSProperties;
}
declare const VirtualRow: ({ index, data, style }: VirtualRowProps) => any;
export default VirtualRow;
